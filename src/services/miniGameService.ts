"use client";

import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

export type GameType = "quiz" | "picture-guess" | "question-tower";

export type GameResultPayload = {
  gameType: GameType;
  score: number;
  maxScore: number;
  topicId?: string; // <-- thêm
  extra?: Record<string, any>; // <-- thêm
  userId?: string | null;
  displayName?: string | null;
};

export async function saveGameResult(payload: GameResultPayload) {
  try {
    await addDoc(collection(db, "gameResults"), {
      ...payload,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error saving game result:", error);
  }
}

export type LeaderboardEntry = {
  id: string;
  displayName: string;
  score: number;
  maxScore: number;
};

export async function getQuizLeaderboard(
  topicId: string,
  limitCount = 5
): Promise<LeaderboardEntry[]> {
  const q = query(
    collection(db, "gameResults"),
    where("gameType", "==", "quiz"),
    where("topicId", "==", topicId),
    orderBy("score", "desc"),
    orderBy("createdAt", "asc"),
    limit(limitCount)
  );

  const snap = await getDocs(q);
  return snap.docs.map((doc) => {
    const data = doc.data() as any;
    return {
      id: doc.id,
      displayName: data.displayName || "Ẩn danh",
      score: data.score,
      maxScore: data.maxScore,
    };
  });
}
