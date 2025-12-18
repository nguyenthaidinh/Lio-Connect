"use client";

import { useEffect, useState } from "react";
import { getMiniGameLeaderboard, type MiniGameType } from "@/services/miniGameLeaderboard";

export default function MiniGameLeaderboard({
  gameType,
  topicId,
  title,
  topN = 10,
}: {
  gameType: MiniGameType;
  topicId: string;
  title?: string;
  topN?: number;
}) {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const data = await getMiniGameLeaderboard(gameType, topicId, topN);
        if (!alive) return;
        setRows(data);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [gameType, topicId, topN]);

  return (
    <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
      <div className="text-sm font-semibold text-slate-100">
        {title ?? "🏆 Bảng xếp hạng"}
      </div>

      {loading ? (
        <div className="mt-3 text-xs text-slate-400">Đang tải…</div>
      ) : rows.length === 0 ? (
        <div className="mt-3 text-xs text-slate-400">Chưa có dữ liệu BXH.</div>
      ) : (
        <ul className="mt-3 space-y-2 text-sm">
          {rows.map((r, idx) => (
            <li
              key={r.id}
              className="flex items-center justify-between rounded-xl bg-slate-950/60 px-3 py-2"
            >
              <span className="flex items-center gap-2">
                <span className="w-7 text-slate-300 font-semibold">#{idx + 1}</span>
                <span className="text-slate-100">{r.displayName || "Ẩn danh"}</span>
              </span>
              <span className="text-slate-300 font-semibold">{r.bestScore ?? r.score ?? 0}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
