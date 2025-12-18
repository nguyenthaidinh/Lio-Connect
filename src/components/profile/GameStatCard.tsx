"use client";

import { useEffect, useState } from "react";
import {
  getUserMiniGameStat,
  getUserVNStat,
  type UserGameStat,
} from "@/services/userGameStats";

type Variant =
  | { kind: "vn"; gameId: string }
  | { kind: "mini"; gameType: "quiz" | "picture-guess" | "question-tower"; topicId: string };

export default function GameStatCard({
  title,
  uid,
  variant,
}: {
  title: string;
  uid: string;
  variant: Variant;
}) {
  const [stat, setStat] = useState<UserGameStat | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    (async () => {
      setLoading(true);
      setErr(null);

      try {
        const data =
          variant.kind === "vn"
            ? await getUserVNStat(variant.gameId, uid)
            : await getUserMiniGameStat({
                gameType: variant.gameType,
                topicId: variant.topicId,
                uid,
              });

        if (!alive) return;
        setStat(data);
      } catch (e: any) {
        console.error(
          "[GameStatCard] LOAD ERROR",
          { title, uid, variant },
          e?.code,
          e?.message,
          e
        );
        if (!alive) return;
        setErr(e?.code || "unknown");
        setStat(null);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [uid, variant, title]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/60">
      <div className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
        {title}
      </div>

      {loading ? (
        <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">Đang tải…</div>
      ) : err ? (
        <div className="mt-2 text-xs text-rose-600 dark:text-rose-400">
          Không đọc được thống kê ({err})
        </div>
      ) : !stat ? (
        <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">Chưa chơi</div>
      ) : (
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl bg-slate-50 p-2 dark:bg-slate-800">
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Best</div>
            <div className="text-lg font-bold">{stat.bestScore}</div>
          </div>
          <div className="rounded-xl bg-slate-50 p-2 dark:bg-slate-800">
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Last</div>
            <div className="text-lg font-bold">{stat.lastScore}</div>
          </div>
          <div className="rounded-xl bg-slate-50 p-2 dark:bg-slate-800">
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Plays</div>
            <div className="text-lg font-bold">{stat.plays}</div>
          </div>
        </div>
      )}
    </div>
  );
}
