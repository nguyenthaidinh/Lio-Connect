"use client";

import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

/** Stat chuẩn để hiển thị trên Profile */
export type UserGameStat = {
  bestScore: number;
  lastScore: number;
  plays: number;
  updatedAt?: any;
};

export async function getUserVNStat(gameId: string, uid: string): Promise<UserGameStat | null> {
  // VN BLHD: games/{gameId}/leaderboard/{uid}
  const ref = doc(db, "games", gameId, "leaderboard", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;

  const d = snap.data() as any;
  return {
    bestScore: d.bestScore ?? 0,
    lastScore: d.lastScore ?? 0,
    plays: d.plays ?? 0,
    updatedAt: d.updatedAt,
  };
}

export async function getUserMiniGameStat(params: {
  gameType: "quiz" | "picture-guess" | "question-tower";
  topicId: string; // ví dụ quiz topicId = topic.id, đuổi hình = "catchword-blhd"
  uid: string;
}): Promise<UserGameStat | null> {
  const { gameType, topicId, uid } = params;

  // Mini-game leaderboard docId dạng: `${gameType}__${topicId}__${uid}`
  const id = `${gameType}__${topicId}__${uid}`;
  const ref = doc(db, "miniGameLeaderboards", id);

  const snap = await getDoc(ref);
  if (!snap.exists()) return null;

  const d = snap.data() as any;
  return {
    bestScore: d.bestScore ?? 0,
    lastScore: d.lastScore ?? 0,
    plays: d.plays ?? 0,
    updatedAt: d.updatedAt,
  };
}
