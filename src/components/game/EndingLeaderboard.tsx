"use client";

import { useEffect, useState } from "react";
import { getGameLeaderboard } from "@/services/gameLeaderboard";

export default function EndingLeaderboard({ gameId }: { gameId: string }) {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getGameLeaderboard(gameId, 10);
      setRows(data);
      setLoading(false);
    })();
  }, [gameId]);

  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04]">
      <div className="border-b border-white/10 px-4 py-3 text-sm font-semibold text-white">
        🏆 Bảng xếp hạng game
      </div>

      {loading ? (
        <div className="p-4 text-white/60">Đang tải BXH…</div>
      ) : rows.length === 0 ? (
        <div className="p-4 text-white/60">Chưa có dữ liệu.</div>
      ) : (
        <div className="divide-y divide-white/10">
          {rows.map((r, idx) => (
            <div key={r.id} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="w-8 text-white/60">#{idx + 1}</div>
                <div>
                  <div className="font-medium text-white">
                    {r.displayName ?? "Player"}
                  </div>
                  <div className="text-xs text-white/50">
                    Lượt chơi: {r.plays ?? 0}
                  </div>
                </div>
              </div>
              <div className="text-lg font-bold text-white">
                {r.bestScore ?? 0}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
