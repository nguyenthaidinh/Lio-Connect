// src/services/gameLeaderboard.ts
"use client";

import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";

export async function submitGameRun(params: {
  gameId: string;
  uid: string;
  displayName: string;
  photoURL?: string;
  score: number;
  meta?: {
    endingId?: string;
    stats?: Record<string, number>;
    durationMs?: number;
  };
}) {
  const { gameId, uid, displayName, photoURL, score, meta } = params;

  // 1) log run
  await addDoc(collection(db, "games", gameId, "runs"), {
    uid,
    displayName,
    photoURL: photoURL ?? null,
    score,
    meta: meta ?? {},
    createdAt: serverTimestamp(),
  });

  // 2) update leaderboard bestScore
  const ref = doc(db, "games", gameId, "leaderboard", uid);

  await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    const prev = snap.exists() ? (snap.data() as any) : null;

    const prevBest = typeof prev?.bestScore === "number" ? prev.bestScore : 0;
    const nextBest = Math.max(prevBest, score);

    tx.set(
      ref,
      {
        uid,
        displayName,
        photoURL: photoURL ?? null,
        bestScore: nextBest,
        lastScore: score,
        plays: increment(1),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  });
}

// ✅ cái EndingLeaderboard đang cần
export async function getGameLeaderboard(gameId: string, topN = 10) {
  const q = query(
    collection(db, "games", gameId, "leaderboard"),
    orderBy("bestScore", "desc"),
    orderBy("updatedAt", "asc"),
    limit(topN)
  );

  const snap = await getDocs(q);

  return snap.docs.map((d) => {
    const data = d.data() as any;
    return {
      id: d.id, // uid
      uid: data.uid,
      displayName: data.displayName ?? "Player",
      photoURL: data.photoURL ?? null,
      bestScore: data.bestScore ?? 0,
      lastScore: data.lastScore ?? 0,
      plays: data.plays ?? 0,
    };
  });
}
