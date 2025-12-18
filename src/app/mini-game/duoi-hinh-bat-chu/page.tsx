"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { saveGameResult } from "@/services/miniGameService";

// ✅ BXH chuẩn
import MiniGameLeaderboard from "@/components/game/MiniGameLeaderboard";
import { submitMiniGameRun } from "@/services/miniGameLeaderboard";

import { catchwordLevel1 } from "./level1";
import { catchwordLevel2 } from "./level2";
import { catchwordLevel3 } from "./level3";
import type { CatchwordQuestion } from "./level1";

// ───────── CONFIG ─────────

type LevelId = 1 | 2 | 3;
type GameState = "idle" | "question" | "feedback" | "finished";

const QUESTION_TIME = 30;
const QUESTIONS_PER_SESSION = 5;
const MAX_SCORE_PER_QUESTION = 30;
const MAX_SCORE_PER_SESSION = QUESTIONS_PER_SESSION * MAX_SCORE_PER_QUESTION;

const levelMap: Record<LevelId, CatchwordQuestion[]> = {
  1: catchwordLevel1,
  2: catchwordLevel2,
  3: catchwordLevel3,
};

const levelLabels: Record<LevelId, string> = {
  1: "Level 1 – Hành vi bạo lực",
  2: "Level 2 – Cảm xúc & hậu quả",
  3: "Level 3 – Giải pháp & phòng chống",
};

function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

interface QuestionResult {
  questionId: string;
  answer: string;
  correctAnswer: string;
  isCorrect: boolean;
  timeUsed: number;
}

function pickRandomQuestions(source: CatchwordQuestion[], count: number): CatchwordQuestion[] {
  const arr = [...source];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, count);
}

export default function CatchwordGamePage() {
  const { user } = useAuth();

  const [selectedLevel, setSelectedLevel] = useState<LevelId>(1);
  const [unlockedLevels, setUnlockedLevels] = useState<LevelId[]>([1]);

  const [questions, setQuestions] = useState<CatchwordQuestion[]>(
    pickRandomQuestions(levelMap[1], QUESTIONS_PER_SESSION)
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [gameState, setGameState] = useState<GameState>("question");

  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalElapsed, setTotalElapsed] = useState(0);

  const [results, setResults] = useState<QuestionResult[]>([]);

  const [feedback, setFeedback] = useState<{
    title: string;
    message: string;
    type: "correct" | "wrong" | "timeout";
  } | null>(null);

  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  const startLevel = (level: LevelId) => {
    setSelectedLevel(level);
    setQuestions(pickRandomQuestions(levelMap[level], QUESTIONS_PER_SESSION));
    setCurrentIndex(0);
    setAnswer("");
    setGameState("question");
    setTimeLeft(QUESTION_TIME);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setCorrectCount(0);
    setTotalElapsed(0);
    setResults([]);
    setFeedback(null);
    setSaveMessage(null);
  };

  useEffect(() => {
    if (gameState !== "question") return;
    if (!currentQuestion) return;

    if (timeLeft <= 0) {
      handleTimeout();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
      setTotalElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, gameState, currentQuestion]);

  const progressPercent = useMemo(
    () => Math.round(((currentIndex + 1) / totalQuestions) * 100),
    [currentIndex, totalQuestions]
  );

  const handleTimeout = () => {
    if (!currentQuestion) return;
    const timeUsed = QUESTION_TIME;

    setResults((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        answer: "",
        correctAnswer: currentQuestion.answer,
        isCorrect: false,
        timeUsed,
      },
    ]);

    setStreak(0);
    setFeedback({
      title: "Hết giờ ⏰",
      message: "Hết thời gian cho câu này. Xem đáp án rồi sang câu tiếp theo nhé.",
      type: "timeout",
    });
    setGameState("feedback");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentQuestion) return;
    if (gameState !== "question") return;

    const normalizedAnswer = normalize(answer);
    const normalizedCorrect = normalize(currentQuestion.answer);

    const isCorrect = normalizedAnswer === normalizedCorrect;
    const timeUsed = QUESTION_TIME - timeLeft;

    setResults((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        answer: answer.trim(),
        correctAnswer: currentQuestion.answer,
        isCorrect,
        timeUsed: timeUsed < 0 ? 0 : timeUsed,
      },
    ]);

    if (isCorrect) {
      const timeBonus = Math.floor((timeLeft / QUESTION_TIME) * 20);
      const gain = 10 + timeBonus;

      setScore((s) => s + gain);
      setCorrectCount((c) => c + 1);

      setStreak((prev) => {
        const ns = prev + 1;
        if (ns > bestStreak) setBestStreak(ns);
        if (ns > 0 && ns % 3 === 0) setScore((s) => s + 10);
        return ns;
      });

      setFeedback({
        title: "Chính xác! 🎉",
        message: "Đúng rồi — được điểm thưởng theo thời gian.",
        type: "correct",
      });
    } else {
      setStreak(0);
      setFeedback({
        title: "Chưa đúng 😢",
        message: "Chưa khớp. Xem giải thích rồi cố gắng ở câu sau nhé.",
        type: "wrong",
      });
    }

    setGameState("feedback");
  };

  const goNext = () => {
    if (currentIndex + 1 >= totalQuestions) {
      setGameState("finished");

      const pass = correctCount >= 3;
      if (pass && !unlockedLevels.includes((selectedLevel + 1) as LevelId)) {
        if (selectedLevel < 3) {
          setUnlockedLevels((prev) => [...prev, (selectedLevel + 1) as LevelId]);
        }
      }
      return;
    }

    setCurrentIndex((idx) => idx + 1);
    setAnswer("");
    setGameState("question");
    setTimeLeft(QUESTION_TIME);
    setFeedback(null);
  };

  const skipQuestion = () => handleTimeout();
  const restartCurrentLevel = () => startLevel(selectedLevel);

  // ✅ LƯU KẾT QUẢ + UPDATE BXH
  const handleSaveResult = async () => {
    if (!user) {
      setSaveMessage("Cần đăng nhập để lưu kết quả.");
      return;
    }

    try {
      setSaving(true);

      // 1) lưu history kiểu cũ (tuỳ Lio giữ)
      await saveGameResult({
        gameType: "picture-guess",
        score,
        maxScore: MAX_SCORE_PER_SESSION,
        userId: user.uid,
        displayName: user.displayName ?? user.email ?? null,
        extra: {
          level: selectedLevel,
          correctCount,
          totalQuestions,
          durationSeconds: totalElapsed,
          details: results,
        },
        topicId: "catchword-blhd",
      });

      // 2) ✅ update BXH bestScore theo uid (mỗi người 1 dòng)
      await submitMiniGameRun({
        gameType: "picture-guess",
        topicId: "catchword-blhd", // BXH riêng cho game này
        uid: user.uid,
        displayName: user.displayName ?? user.email ?? "Player",
        photoURL: user.photoURL ?? undefined,
        score,
        maxScore: MAX_SCORE_PER_SESSION,
        meta: {
          level: selectedLevel,
          correctCount,
          totalQuestions,
          durationSeconds: totalElapsed,
        },
      });

      setSaveMessage("Đã lưu kết quả + cập nhật BXH! 🎉");
    } catch (err) {
      console.error(err);
      setSaveMessage("Có lỗi khi lưu kết quả, thử lại sau nhé.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-slate-50 px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* HEADER */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Đuổi hình bắt chữ – Bạo lực học đường</h1>
            <p className="text-sm text-slate-300 mt-1">
              Mỗi lượt gồm 5 câu hỏi ngẫu nhiên. Trả lời càng nhanh, điểm càng cao.
            </p>
          </div>
          <div className="text-right text-xs text-slate-400">
            {user ? (
              <>
                Đang đăng nhập:{" "}
                <span className="font-semibold text-sky-300">
                  {user.displayName || user.email}
                </span>
              </>
            ) : (
              <span>Không đăng nhập vẫn chơi được, nhưng phải đăng nhập để lưu điểm.</span>
            )}
          </div>
        </header>

        {/* LEVEL SELECTOR */}
        <section className="bg-slate-900/60 border border-slate-700 rounded-2xl p-4 flex flex-wrap gap-3 items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-slate-400">Chọn level</p>
            <p className="text-sm text-slate-200 max-w-lg">
              Hoàn thành level với ít nhất 3/5 câu đúng để mở khóa level tiếp theo.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3].map((lv) => {
              const isUnlocked = unlockedLevels.includes(lv as LevelId);
              const isSelected = selectedLevel === lv;
              return (
                <button
                  key={lv}
                  onClick={() => isUnlocked && startLevel(lv as LevelId)}
                  className={`px-3 py-2 rounded-full text-xs sm:text-sm font-medium transition flex items-center gap-1 ${
                    isSelected
                      ? "bg-sky-500 text-white shadow-lg shadow-sky-500/40"
                      : isUnlocked
                      ? "bg-slate-800 text-slate-200 hover:bg-slate-700"
                      : "bg-slate-900 text-slate-500 border border-slate-700 cursor-not-allowed"
                  }`}
                >
                  {levelLabels[lv as LevelId]}
                  {!isUnlocked && <span className="text-yellow-400 text-[10px]">Locked</span>}
                </button>
              );
            })}
          </div>
        </section>

        {/* FINISHED */}
        {gameState === "finished" ? (
          <section className="bg-slate-900/80 border border-slate-700 rounded-2xl p-6 space-y-5">
            <h2 className="text-xl font-semibold mb-1">
              Kết quả lượt chơi – {levelLabels[selectedLevel]}
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-400">Điểm tổng</p>
                <p className="text-3xl font-bold text-sky-400">{score}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Số câu đúng</p>
                <p className="text-2xl font-semibold">
                  {correctCount}/{totalQuestions}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Streak dài nhất</p>
                <p className="text-2xl font-semibold">{bestStreak}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Thời gian chơi</p>
                <p className="text-2xl font-semibold">{totalElapsed}s</p>
              </div>
            </div>

            <div className="mt-2">
              {correctCount >= 3 ? (
                <p className="text-sm text-emerald-300">
                  🎉 Pass level! Nếu chưa mở thì level tiếp theo đã được unlock.
                </p>
              ) : (
                <p className="text-sm text-orange-300">
                  Chưa đủ 3/5 câu đúng. Thử chơi lại để pass nhé.
                </p>
              )}
            </div>

            {/* Review */}
            <div className="mt-4">
              <h3 className="text-sm font-semibold mb-2">Xem lại đáp án chi tiết</h3>
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {results.map((r, idx) => {
                  const q = questions.find((qq) => qq.id === r.questionId);
                  if (!q) return null;
                  return (
                    <div
                      key={q.id}
                      className={`rounded-xl p-3 border text-sm ${
                        r.isCorrect
                          ? "border-emerald-600 bg-emerald-900/30"
                          : "border-slate-700 bg-slate-900"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-medium">
                          Câu {idx + 1}: <span className="text-sky-300">{q.answer}</span>
                        </p>
                        <p className="text-xs text-slate-400">Thời gian: {r.timeUsed}s</p>
                      </div>
                      <p className="text-xs mt-1">
                        Trả lời:{" "}
                        {r.answer ? (
                          <span className={r.isCorrect ? "text-emerald-300" : "text-red-300"}>
                            {r.answer}
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">Bỏ qua / hết giờ</span>
                        )}
                      </p>
                      {!r.isCorrect && (
                        <p className="text-xs mt-1">
                          Đáp án đúng: <span className="text-sky-300">{r.correctAnswer}</span>
                        </p>
                      )}
                      <p className="text-xs text-slate-300 mt-1">Giải thích: {q.explanation}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              <button
                onClick={restartCurrentLevel}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-medium"
              >
                Chơi lại level này
              </button>
              <button
                onClick={handleSaveResult}
                disabled={saving}
                className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 disabled:bg-sky-800 text-sm font-medium"
              >
                {saving ? "Đang lưu..." : "Lưu kết quả + cập nhật BXH"}
              </button>
            </div>

            {saveMessage && <p className="text-sm mt-1 text-slate-300">{saveMessage}</p>}

            {/* ✅ BXH */}
            <MiniGameLeaderboard
              gameType="picture-guess"
              topicId="catchword-blhd"
              title="🏆 BXH Đuổi hình bắt chữ"
              topN={10}
            />
          </section>
        ) : (
          currentQuestion && (
            <>
              {/* STATUS BAR */}
              <section className="bg-slate-900/70 border border-slate-700 rounded-2xl p-4 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-4 items-center">
                  <div>
                    <p className="text-xs text-slate-400">Level</p>
                    <p className="text-sm font-semibold">{levelLabels[selectedLevel]}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Câu hiện tại</p>
                    <p className="text-lg font-semibold">
                      {currentIndex + 1} / {totalQuestions}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Điểm</p>
                    <p className="text-lg font-semibold text-sky-400">{score}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Streak</p>
                    <p className="text-lg font-semibold">{streak}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Thời gian còn</p>
                    <p className={`text-lg font-semibold ${timeLeft <= 5 ? "text-red-400" : "text-emerald-400"}`}>
                      {timeLeft}s
                    </p>
                  </div>
                </div>

                <div className="w-full sm:w-64 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-sky-400 to-emerald-400 transition-all"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </section>

              {/* MAIN GAME CARD */}
              <section className="bg-slate-900/80 border border-slate-700 rounded-2xl p-5 md:p-6 grid md:grid-cols-[1.5fr,1.3fr] gap-6 items-start">
                <div className="space-y-4">
                  <p className="text-xs text-slate-400">
                    Nhìn 2 hình gợi ý và đoán cụm từ liên quan đến bạo lực học đường.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {currentQuestion.clues.map((clue) => (
                      <div
                        key={clue.codepoint}
                        className="relative aspect-square rounded-2xl bg-slate-800 flex items-center justify-center overflow-hidden"
                      >
                        <Image src={clue.imageUrl} alt={clue.alt} fill className="object-contain p-4" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Đáp án</p>

                    {gameState === "question" && (
                      <form onSubmit={handleSubmit} className="space-y-3">
                        <input
                          type="text"
                          value={answer}
                          onChange={(e) => setAnswer(e.target.value)}
                          placeholder="Gõ đáp án (không dấu cũng được)..."
                          className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="submit"
                            className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-sm font-medium"
                          >
                            Kiểm tra
                          </button>
                          <button
                            type="button"
                            onClick={skipQuestion}
                            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-medium"
                          >
                            Bỏ qua
                          </button>
                        </div>
                      </form>
                    )}

                    {gameState === "feedback" && feedback && (
                      <div
                        className={`mt-1 rounded-xl p-3 text-sm border ${
                          feedback.type === "correct"
                            ? "bg-emerald-900/40 border-emerald-600"
                            : feedback.type === "wrong"
                            ? "bg-red-900/30 border-red-600"
                            : "bg-orange-900/30 border-orange-600"
                        }`}
                      >
                        <p className="font-semibold">{feedback.title}</p>
                        <p className="mt-1">{feedback.message}</p>
                        <p className="mt-2 text-xs text-slate-100">
                          Đáp án đúng:{" "}
                          <span className="font-semibold text-sky-300">{currentQuestion.answer}</span>
                        </p>
                        <p className="mt-1 text-xs text-slate-200">Giải thích: {currentQuestion.explanation}</p>
                        <button
                          type="button"
                          onClick={goNext}
                          className="mt-3 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-xs font-medium"
                        >
                          Tiếp tục câu tiếp theo
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </>
          )
        )}
      </div>
    </div>
  );
}
