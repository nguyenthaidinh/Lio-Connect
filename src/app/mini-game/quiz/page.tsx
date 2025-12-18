// app/mini-game/quiz/page.tsx
"use client";

import { useEffect, useState } from "react";
import { quizTopics, type QuizTopic } from "./data";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

// ✅ lưu history (tuỳ Lio giữ lại)
import { saveGameResult } from "@/services/miniGameService";

// ✅ BXH chuẩn bestScore theo uid
import MiniGameLeaderboard from "@/components/game/MiniGameLeaderboard";
import { submitMiniGameRun } from "@/services/miniGameLeaderboard";

const QUESTIONS_PER_GAME = 10; // mỗi lượt chơi 10 câu

export default function QuizPage() {
  const [selectedTopic, setSelectedTopic] = useState<QuizTopic | null>(null);

  if (!selectedTopic) return <TopicSelect onSelect={setSelectedTopic} />;
  return <QuizPlay topic={selectedTopic} onBack={() => setSelectedTopic(null)} />;
}

function TopicSelect({ onSelect }: { onSelect: (t: QuizTopic) => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white dark:from-slate-900 dark:to-slate-950 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-2"
        >
          Quiz BLHD
        </motion.h1>

        <p className="text-center text-sm text-slate-600 dark:text-slate-300 mb-8">
          Chọn một chủ đề để bắt đầu. Mỗi lượt chơi hệ thống sẽ chọn ngẫu nhiên{" "}
          <span className="font-semibold">10 câu</span>, mỗi câu có 30 giây trả lời.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {quizTopics.map((topic, idx) => (
            <motion.button
              key={topic.id}
              onClick={() => onSelect(topic)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              className="group block w-full text-left p-5 rounded-2xl bg-white/90 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow hover:shadow-lg hover:-translate-y-1 transition backdrop-blur"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="text-3xl">{topic.icon}</div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {topic.name}
                </h2>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300">
                {topic.description}
              </p>

              <p className="mt-3 text-[11px] uppercase tracking-wide text-sky-600 dark:text-sky-300">
                {topic.questions.length} câu trong ngân hàng •{" "}
                <span className="font-semibold">10 câu mỗi lượt chơi</span>
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuizPlay({ topic, onBack }: { topic: QuizTopic; onBack: () => void }) {
  const { user } = useAuth();

  // random 10 câu
  const [questions] = useState(() => {
    const shuffled = [...topic.questions].sort(() => Math.random() - 0.5);
    const limit = Math.min(QUESTIONS_PER_GAME, shuffled.length);
    return shuffled.slice(0, limit);
  });

  const total = questions.length;
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [finished, setFinished] = useState(false);

  const [review, setReview] = useState<
    {
      question: string;
      options: string[];
      correctIndex: number;
      userIndex: number | null;
      explanation: string;
    }[]
  >([]);

  const current = questions[index];

  useEffect(() => {
    if (finished) return;
    if (timer === 0) {
      handleAnswer(null);
      return;
    }
    const id = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer, finished]);

  async function handleAnswer(choice: number | null) {
    if (feedback !== null || finished) return;

    const isCorrect = choice === current.correctIndex;
    const newScore = score + (isCorrect ? 1 : 0);

    setSelected(choice);
    setFeedback(isCorrect ? "correct" : "wrong");

    setReview((prev) => [
      ...prev,
      {
        question: current.question,
        options: current.options,
        correctIndex: current.correctIndex,
        userIndex: choice,
        explanation: current.explanation,
      },
    ]);

    setTimeout(async () => {
      const isLast = index === total - 1;

      if (isLast) {
        setFinished(true);
        setScore(newScore);

        // (tuỳ Lio) lưu history kiểu cũ
        await saveGameResult({
          gameType: "quiz",
          score: newScore,
          maxScore: total,
          topicId: topic.id,
          extra: { reviewCount: total },
          userId: user?.uid ?? null,
          displayName: user?.displayName ?? user?.email ?? null,
        });

        // ✅ update BXH bestScore (bắt buộc login mới ghi BXH)
        if (user?.uid) {
          await submitMiniGameRun({
            gameType: "quiz",
            topicId: topic.id, // ✅ BXH riêng theo topic
            uid: user.uid,
            displayName: user.displayName ?? user.email ?? "Player",
            photoURL: user.photoURL ?? undefined,
            score: newScore,
            maxScore: total,
            meta: { reviewCount: total },
          });
        }

        return;
      }

      setIndex((i) => i + 1);
      setTimer(30);
      setScore(newScore);
      setSelected(null);
      setFeedback(null);
    }, 900);
  }

  if (finished) {
    return (
      <QuizResult
        topic={topic}
        score={score}
        total={total}
        review={review}
        onBack={onBack}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-sky-200 dark:from-slate-800 dark:to-slate-950 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="text-xs px-3 py-1 rounded-full border border-slate-300 text-slate-600 hover:bg-white/70 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-900/60"
          >
            ← Đổi chủ đề
          </button>
          <span className="text-xs text-slate-500 dark:text-slate-300">
            Chủ đề: <span className="font-semibold">{topic.name}</span>
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id + index}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
            className="bg-white/95 dark:bg-slate-900/90 rounded-2xl shadow-xl p-6 backdrop-blur"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-slate-600 dark:text-slate-300">
                Câu{" "}
                <span className="font-semibold">
                  {index + 1}/{total}
                </span>
              </span>
              <div className="flex items-center gap-2">
                <div className="h-2 w-32 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div
                    className="h-full bg-sky-500 transition-all"
                    style={{ width: `${(timer / 30) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-sky-600 dark:text-sky-300">
                  ⏳ {timer}s
                </span>
              </div>
            </div>

            <h2 className="text-base sm:text-lg font-semibold mb-4 text-slate-900 dark:text-white">
              {current.question}
            </h2>

            <div className="space-y-3">
              {current.options.map((opt, idx) => {
                const isSelected = selected === idx;
                const isCorrect = feedback === "correct" && idx === current.correctIndex;
                const isWrong =
                  feedback === "wrong" && isSelected && idx !== current.correctIndex;

                return (
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={feedback !== null}
                    className={`w-full text-left p-3 rounded-xl border text-sm transition ${
                      isCorrect
                        ? "border-emerald-500 bg-emerald-100 dark:bg-emerald-900/40"
                        : isWrong
                        ? "border-rose-500 bg-rose-100 dark:bg-rose-900/40"
                        : isSelected
                        ? "border-sky-500 bg-sky-100 dark:bg-sky-900/40"
                        : "border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-700 hover:border-sky-400"
                    }`}
                  >
                    {opt}
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-4 text-right text-xs text-slate-500 dark:text-slate-400">
              Điểm hiện tại:{" "}
              <span className="font-semibold">
                {score}/{total}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function QuizResult({
  topic,
  score,
  total,
  review,
  onBack,
}: {
  topic: QuizTopic;
  score: number;
  total: number;
  review: {
    question: string;
    options: string[];
    correctIndex: number;
    userIndex: number | null;
    explanation: string;
  }[];
  onBack: () => void;
}) {
  const isPerfect = score === total;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-sky-100 dark:from-slate-800 dark:to-slate-950 py-8 px-4 relative overflow-hidden">
      <AnimatePresence>
        {isPerfect && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div className="text-5xl sm:text-6xl select-none">🎆🎉🎆🎉🎆</div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        <div className="bg-white/95 dark:bg-slate-900/90 rounded-2xl shadow-xl p-6 backdrop-blur">
          <h1 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-2">
            🎉 Hoàn thành Quiz: {topic.name}
          </h1>
          <p className="text-center text-sm text-slate-600 dark:text-slate-300 mb-2">
            Đúng{" "}
            <span className="font-semibold text-sky-600 dark:text-sky-300">
              {score}/{total}
            </span>{" "}
            câu.
          </p>

          {isPerfect && (
            <p className="text-center text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
              Hoàn hảo! 10/10 câu trả lời chính xác! 🔥
            </p>
          )}

          <div className="flex justify-center gap-4 text-xs text-slate-600 dark:text-slate-300">
            <button
              onClick={onBack}
              className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
            >
              ← Chọn chủ đề khác
            </button>
            <Link
              href="/mini-game"
              className="px-4 py-2 rounded-full bg-sky-600 text-white hover:bg-sky-700 text-center"
            >
              Quay về Mini-game
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* ✅ BXH chuẩn */}
          <div className="bg-white/95 dark:bg-slate-900/90 rounded-2xl shadow p-5">
            <MiniGameLeaderboard
              gameType="quiz"
              topicId={topic.id}
              title="🏆 BXH Quiz theo chủ đề"
              topN={10}
            />
            <p className="mt-3 text-[11px] text-slate-500 dark:text-slate-400">
              * BXH lấy bestScore theo UID (mỗi người chỉ có 1 dòng).
            </p>
          </div>

          {/* Review */}
          <div className="bg-white/95 dark:bg-slate-900/90 rounded-2xl shadow p-5 max-h-[420px] overflow-y-auto">
            <h2 className="text-sm font-semibold mb-3 text-slate-900 dark:text-slate-100">
              📚 Xem lại câu hỏi & giải thích
            </h2>
            <div className="space-y-3 text-xs">
              {review.map((r, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 p-3"
                >
                  <p className="font-medium mb-1">
                    Câu {idx + 1}: {r.question}
                  </p>
                  <p className="text-[11px] text-emerald-600">
                    ✔ Đáp án đúng: {r.options[r.correctIndex]}
                  </p>
                  <p
                    className={`text-[11px] ${
                      r.userIndex === r.correctIndex ? "text-emerald-600" : "text-rose-600"
                    }`}
                  >
                    ✦ Chọn:{" "}
                    {r.userIndex === null ? "Không trả lời" : r.options[r.userIndex]}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-300">
                    💡 {r.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400">
          Nếu muốn “chỉ lưu BXH khi bấm nút Lưu”, có thể đổi logic submitMiniGameRun sang nút.
        </div>
      </div>
    </div>
  );
}
