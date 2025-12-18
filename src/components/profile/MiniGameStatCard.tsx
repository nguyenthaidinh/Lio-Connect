"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import type { MiniGameType } from "@/services/miniGameLeaderboard";

function docId(gameType: MiniGameType, topicId: string, uid: string) {
  return `${gameType}__${topicId}__${uid}`;
}

export default function MiniGameStatCard({
  title,
  uid,
  gameType,
  topicId,
}: {
  title: string;
  uid: string;
  gameType: MiniGameType;
  topicId: string;
}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const ref = doc(db, "miniGameLeaderboards", docId(gameType, topicId, uid));
        const snap = await getDoc(ref);
        if (!alive) return;
        setData(snap.exists() ? snap.data() : null);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [uid, gameType, topicId]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-900/60">
      <div className="text-sm font-extrabold text-slate-900 dark:text-slate-100">{title}</div>

      {loading ? (
        <div className="mt-3 text-xs text-slate-500">Đang tải…</div>
      ) : !data ? (
        <div className="mt-3 text-xs text-slate-500">Chưa chơi</div>
      ) : (
        <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
          <div className="rounded-xl bg-slate-50 p-2 dark:bg-slate-800">
            <div className="text-slate-500">Best</div>
            <div className="text-base font-bold text-slate-900 dark:text-white">{data.bestScore ?? 0}</div>
          </div>
          <div className="rounded-xl bg-slate-50 p-2 dark:bg-slate-800">
            <div className="text-slate-500">Plays</div>
            <div className="text-base font-bold text-slate-900 dark:text-white">{data.plays ?? 0}</div>
          </div>
          <div className="rounded-xl bg-slate-50 p-2 dark:bg-slate-800">
            <div className="text-slate-500">Last</div>
            <div className="text-base font-bold text-slate-900 dark:text-white">{data.lastScore ?? 0}</div>
          </div>
        </div>
      )}

      <div className="mt-2 text-[11px] text-slate-500">
        {gameType} • {topicId}
      </div>
    </div>
  );
}
