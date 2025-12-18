"use client";

import { useState } from "react";
import { towerQuestions } from "./data";
import { useAuth } from "@/hooks/useAuth";
import { saveGameResult } from "@/services/miniGameService";

export default function QuestionTowerPage() {
  const { user } = useAuth();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [score, setScore] = useState(0); // bậc cao nhất

  const current = towerQuestions[index];
  const total = towerQuestions.length;

  const handleConfirm = async () => {
    if (selected === null || isFinished) return;

    const isCorrect = selected === current.correctIndex;
    const newScore = isCorrect ? current.level : score;

    if (!isCorrect) {
      setIsFailed(true);
      setIsFinished(true);

      await saveGameResult({
        gameType: "question-tower",
        score: score,
        maxScore: total,
        extra: { failedAtLevel: current.level },
        userId: user?.uid ?? null,
        displayName: user?.displayName ?? user?.email ?? null,
      });
      return;
    }

    setScore(newScore);

    if (index === total - 1) {
      setIsFinished(true);
      await saveGameResult({
        gameType: "question-tower",
        score: newScore,
        maxScore: total,
        extra: { completed: true },
        userId: user?.uid ?? null,
        displayName: user?.displayName ?? user?.email ?? null,
      });
    } else {
      setSelected(null);
      setIndex((i) => i + 1);
    }
  };

  const handleRestart = () => {
    setIndex(0);
    setSelected(null);
    setIsFinished(false);
    setIsFailed(false);
    setScore(0);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-sky-50 to-white dark:from-slate-950 dark:to-slate-900">
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50 sm:text-3xl">
            Tháp câu hỏi
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Mỗi câu đúng giúp bạn leo lên một bậc trong tháp. Trả lời sai là rớt
            tháp!
          </p>
        </div>

        <div className="mb-4 flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
          <span>
            Bậc hiện tại:{" "}
            <span className="font-semibold">
              {current.level}/{total}
            </span>
          </span>
          <span>
            Bậc cao nhất: <span className="font-semibold">{score}</span>
          </span>
        </div>

        {isFinished ? (
          <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
            {isFailed ? (
              <>
                <h2 className="mb-2 text-xl font-semibold text-rose-600">
                  Bạn đã rớt tháp ở bậc {current.level} 😢
                </h2>
                <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
                  Bậc cao nhất bạn đạt được là{" "}
                  <span className="font-semibold">{score}</span>.
                </p>
              </>
            ) : (
              <>
                <h2 className="mb-2 text-xl font-semibold text-emerald-600">
                  Tuyệt vời! Bạn đã chinh phục toàn bộ tháp 🎉
                </h2>
                <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
                  Bậc cao nhất: {score}/{total}.
                </p>
              </>
            )}
            <button
              onClick={handleRestart}
              className="inline-flex items-center justify-center rounded-full bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
            >
              Chơi lại
            </button>
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
            <h2 className="mb-4 text-base font-semibold text-slate-900 dark:text-slate-50">
              {current.question}
            </h2>

            <div className="space-y-3">
              {current.options.map((opt, idx) => {
                const isSelected = selected === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelected(idx)}
                    className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition ${
                      isSelected
                        ? "border-sky-500 bg-sky-50 dark:border-sky-400 dark:bg-sky-950"
                        : "border-slate-200 bg-white hover:border-sky-300 dark:border-slate-700 dark:bg-slate-900"
                    }`}
                  >
                    <span className="font-medium">
                      {String.fromCharCode(65 + idx)}.
                    </span>{" "}
                    {opt}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={handleConfirm}
                disabled={selected === null}
                className="inline-flex items-center rounded-full bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-sky-300"
              >
                Xác nhận
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
