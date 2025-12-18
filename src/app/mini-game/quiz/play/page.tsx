// app/mini-game/quiz/play/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

import { quizTopics } from "../data";
import { saveGameResult } from "@/services/miniGameService";
import { useAuth } from "@/hooks/useAuth";

type ReviewItem = {
  question: string;
  userAnswer: number | null;
  correctAnswer: number;
  explanation: string;
};

const QUESTIONS_PER_GAME = 10; // 👉 mỗi lần chơi 10 câu

export default function PlayQuiz() {
  const searchParams = useSearchParams();
  const topicIdParam = searchParams.get("topic") || "";

  const topic = quizTopics.find((t) => t.id === topicIdParam);

  // Nếu không tìm thấy chủ đề -> trả UI rồi return luôn
  if (!topic) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-4">
            Chủ đề không tồn tại hoặc thiếu tham số <code>?topic=...</code>
          </p>
          <Link
            href="/mini-game/quiz"
            className="inline-flex items-center rounded-full bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
          >
            ← Quay lại chọn chủ đề
          </Link>
        </div>
      </div>
    );
  }

  const { user } = useAuth();

  // 👉 RANDOM 10 CÂU CHO LẦN CHƠI NÀY
  const [questions] = useState(() => {
    const shuffled = [...topic.questions].sort(() => Math.random() - 0.5);
    const limit = Math.min(QUESTIONS_PER_GAME, shuffled.length);
    return shuffled.slice(0, limit);
  });

  const totalQuestions = questions.length;
  const topicId = topic.id;

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [review, setReview] = useState<ReviewItem[]>([]);
  const [finished, setFinished] = useState(false);

  const current = questions[index];

  // Đếm ngược 30s mỗi câu
  useEffect(() => {
    if (finished) return;

    if (timer === 0) {
      // hết giờ mà chưa chọn → coi như không trả lời
      handleAnswer(null);
      return;
    }

    const id = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer, finished]);

  async function handleAnswer(choice: number | null) {
    if (feedback || finished) return; // đang animate hoặc game kết thúc rồi

    const isCorrect = choice === current.correctIndex;
    const newScore = score + (isCorrect ? 1 : 0);

    setSelected(choice);
    setFeedback(isCorrect ? "correct" : "wrong");

    setReview((prev) => [
      ...prev,
      {
        question: current.question,
        userAnswer: choice,
        correctAnswer: current.correctIndex,
        explanation: current.explanation,
      },
    ]);

    setTimeout(async () => {
      setFeedback(null);
      setSelected(null);

      const isLastQuestion = index === totalQuestions - 1;

      // nếu là câu cuối cùng → kết thúc + lưu điểm
      if (isLastQuestion) {
        setFinished(true);
        setScore(newScore);

        await saveGameResult({
          gameType: "quiz",
          score: newScore,
          maxScore: totalQuestions, // 👉 tối đa là số câu trong lượt chơi (thường là 10)
          topicId,
          extra: { reviewCount: totalQuestions },
          userId: user?.uid ?? null,
          displayName: user?.displayName ?? user?.email ?? null,
        });

        return;
      }

      // chuyển sang câu tiếp theo
      setIndex((i) => i + 1);
      setTimer(30);
      setScore(newScore);
    }, 800);
  }

  if (finished) {
    return (
      <ResultPage
        score={score}
        topicName={topic.name}
        total={totalQuestions}
        review={review}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-sky-200 dark:from-slate-800 dark:to-slate-950 py-14 px-6">
      <div className="max-w-3xl mx-auto bg-white/90 dark:bg-slate-900/80 p-6 rounded-2xl shadow-xl backdrop-blur">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-xs text-slate-600 dark:text-slate-300">
            Chủ đề: <span className="font-semibold">{topic.name}</span>
          </div>
          <Link
            href="/mini-game/quiz"
            className="text-xs px-3 py-1 rounded-full border border-slate-300 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            ← Đổi chủ đề
          </Link>
        </div>

        {/* TIMER + số câu */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm text-slate-600 dark:text-slate-300">
            Câu {index + 1}/{totalQuestions}
          </span>

          <div className="flex items-center gap-2">
            <div className="h-2 w-32 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div
                className="h-full bg-sky-500 transition-all"
                style={{ width: `${(timer / 30) * 100}%` }}
              />
            </div>
            <div className="text-lg font-bold text-sky-600 dark:text-sky-300">
              ⏳ {timer}s
            </div>
          </div>
        </div>

        {/* Câu hỏi */}
        <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">
          {current.question}
        </h2>

        {/* Đáp án */}
        <div className="space-y-3">
          {current.options.map((opt, idx) => {
            const isSelected = selected === idx;
            const isCorrect =
              feedback === "correct" && idx === current.correctIndex;
            const isWrong =
              feedback === "wrong" && isSelected && idx !== current.correctIndex;

            return (
              <motion.button
                whileTap={{ scale: 0.98 }}
                key={idx}
                className={`w-full p-4 rounded-xl border text-left text-sm transition ${
                  isCorrect
                    ? "border-emerald-500 bg-emerald-100 dark:bg-emerald-900/40"
                    : isWrong
                    ? "border-rose-500 bg-rose-100 dark:bg-rose-900/40"
                    : isSelected
                    ? "border-sky-500 bg-sky-100 dark:bg-sky-900/40"
                    : "border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-700 hover:border-sky-400"
                }`}
                onClick={() => handleAnswer(idx)}
                disabled={!!feedback}
              >
                {opt}
              </motion.button>
            );
          })}
        </div>

        <div className="mt-4 text-right text-xs text-slate-500 dark:text-slate-400">
          Điểm hiện tại:{" "}
          <span className="font-semibold">
            {score}/{totalQuestions}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------- RESULT PAGE ---------- */

function ResultPage({
  score,
  total,
  topicName,
  review,
}: {
  score: number;
  total: number;
  topicName: string;
  review: ReviewItem[];
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 dark:from-slate-800 dark:to-slate-950 py-14 px-6">
      <div className="max-w-3xl mx-auto bg-white/90 dark:bg-slate-900/80 p-6 rounded-2xl shadow-xl backdrop-blur">
        <h1 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-4">
          🎉 Hoàn thành Quiz &quot;{topicName}&quot;!
        </h1>

        <p className="text-center text-lg mb-6">
          Bạn đạt{" "}
          <span className="font-bold text-sky-600 dark:text-sky-300">
            {score}/{total}
          </span>{" "}
          câu đúng.
        </p>

        <h2 className="font-semibold mb-3 text-slate-900 dark:text-slate-200">
          Chi tiết câu trả lời
        </h2>

        <div className="space-y-4 max-h-[380px] overflow-y-auto">
          {review.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
            >
              <p className="font-medium mb-1">
                Câu {idx + 1}: {item.question}
              </p>

              <p className="text-sm text-emerald-600">
                ✔ Đáp án đúng: {item.correctAnswer + 1}
              </p>

              <p
                className={`text-sm ${
                  item.userAnswer === item.correctAnswer
                    ? "text-emerald-600"
                    : "text-rose-600"
                }`}
              >
                ✦ Bạn chọn:{" "}
                {item.userAnswer === null
                  ? "Không trả lời"
                  : item.userAnswer + 1}
              </p>

              <p className="text-xs mt-2 text-slate-600 dark:text-slate-400">
                💡 {item.explanation}
              </p>
            </div>
          ))}
        </div>

        <Link
          href="/mini-game/quiz"
          className="mt-6 block text-center rounded-full bg-sky-600 text-white py-2 text-sm font-semibold hover:bg-sky-700"
        >
          Chọn chủ đề khác
        </Link>
      </div>
    </div>
  );
}
