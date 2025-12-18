"use client";

import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  doc,
  increment,
  runTransaction,
  serverTimestamp,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";

export type MiniGameType = "quiz" | "picture-guess" | "question-tower";

export function miniGameLbDocId(gameType: MiniGameType, topicId: string, uid: string) {
  return `${gameType}__${topicId}__${uid}`;
}

/**
 * ✅ Submit 1 lượt chơi:
 * 1) Ghi log runs (detailed)
 * 2) Update leaderboard bestScore / lastScore / plays (fast read)
 */
export async function submitMiniGameRun(params: {
  gameType: MiniGameType;
  topicId: string;           // quiz: topic.id, đuổi hình: "catchword-blhd"
  uid: string;
  displayName: string;
  photoURL?: string;
  score: number;
  maxScore?: number;
  meta?: Record<string, any>;
}) {
  const { gameType, topicId, uid, displayName, photoURL, score, maxScore, meta } = params;

  // 1) log run
  await addDoc(collection(db, "miniGameRuns"), {
    gameType,
    topicId,
    uid,
    displayName,
    photoURL: photoURL ?? null,
    score,
    maxScore: maxScore ?? null,
    meta: meta ?? {},
    createdAt: serverTimestamp(),
  });

  // 2) update leaderboard
  const id = miniGameLbDocId(gameType, topicId, uid);
  const ref = doc(db, "miniGameLeaderboards", id);

  await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    const prev = snap.exists() ? (snap.data() as any) : null;

    const prevBest = typeof prev?.bestScore === "number" ? prev.bestScore : 0;
    const nextBest = Math.max(prevBest, score);

    tx.set(
      ref,
      {
        id, // lưu cho dễ debug
        gameType,
        topicId,
        uid,
        displayName,
        photoURL: photoURL ?? null,
        bestScore: nextBest,
        lastScore: score,
        maxScore: maxScore ?? null,
        plays: increment(1),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  });
}

/** ✅ Lấy top leaderboard cho 1 gameType + topicId */
export async function getMiniGameLeaderboard(
  gameType: MiniGameType,
  topicId: string,
  limitCount = 10
) {
  const q = query(
    collection(db, "miniGameLeaderboards"),
    orderBy("bestScore", "desc"),
    orderBy("updatedAt", "asc"),
    limit(limitCount)
  );

  // Firestore không hỗ trợ where + orderBy linh tinh nếu chưa có index.
  // Cách "chuẩn" nhất: tạo subcollection theo gameType/topicId.
  // Nhưng để giữ đơn giản, mình lọc client-side một bước:
  const snap = await getDocs(q);
  const rows = snap.docs
    .map((d) => ({ id: d.id, ...(d.data() as any) }))
    .filter((r) => r.gameType === gameType && r.topicId === topicId);

  return rows.slice(0, limitCount);
}
