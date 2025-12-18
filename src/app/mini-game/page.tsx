"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Brain, ImageIcon, Trophy, Sparkles } from "lucide-react";

type MiniGame = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  difficulty: "Dễ" | "Trung bình" | "Khó";
  icon: ReactNode;
  href: string;
  comingSoon?: boolean;
};

const MINI_GAMES: MiniGame[] = [
  {
    slug: "quiz",
    title: "Quiz BLHD",
    subtitle: "Trắc nghiệm nhanh",
    description:
      "Trả lời các câu hỏi về bạo lực học đường, kỹ năng ứng xử và kiến thức pháp luật. Phù hợp để ôn tập và tự kiểm tra.",
    badge: "Kiến thức",
    difficulty: "Dễ",
    icon: <Brain className="w-6 h-6" />,
    href: "/mini-game/quiz",
  },
  {
    slug: "picture-guess",
    title: "Đuổi hình bắt chữ",
    subtitle: "Đoán từ khoá",
    description:
      "Nhìn hình đoán ra hành vi hoặc khái niệm liên quan đến bạo lực học đường. Vừa vui vừa giúp nhận diện đúng hành vi.",
    badge: "Vui nhộn",
    difficulty: "Trung bình",
    icon: <ImageIcon className="w-6 h-6" />,
    href: "/mini-game/duoi-hinh-bat-chu",
  },
  {
    slug: "question-tower",
    title: "Tháp câu hỏi",
    subtitle: "Lên tầng kiến thức",
    description:
      "Mỗi câu trả lời đúng giúp bạn leo lên một bậc mới trong tháp. Càng lên cao, câu hỏi càng khó và thú vị hơn.",
    badge: "Thử thách",
    difficulty: "Trung bình",
    icon: <Trophy className="w-6 h-6" />,
    href: "/mini-game/thap-cau-hoi",
  },
  {
    slug: "scenario",
    title: "Tình huống xử lý",
    subtitle: "Chọn cách ứng xử",
    description:
      "Đặt bạn vào các tình huống thực tế trong lớp học, chọn cách xử lý phù hợp để bảo vệ bản thân và bạn bè.",
    badge: "Kỹ năng sống",
    difficulty: "Dễ",
    icon: <Sparkles className="w-6 h-6" />,
    href: "/mini-game/tinh-huong",
    comingSoon: true,
  },
];

export default function MiniGamePage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-sky-50 to-white dark:from-slate-950 dark:to-slate-900">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-3">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-sky-100/80 px-3 py-1 text-xs font-medium text-sky-700 dark:bg-sky-900/40 dark:text-sky-200 sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Khu vực giải trí &amp; học tập
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50 sm:text-3xl">
              Mini-Game
            </h1>
            <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-300 sm:text-base">
              Chọn một mini-game để bắt đầu: vừa chơi vừa học về bạo lực học
              đường, kỹ năng ứng xử và kiến thức pháp luật. Các game đều nhẹ,
              phù hợp trên cả máy tính và điện thoại.
            </p>
          </div>
        </div>

        {/* Grid game card */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MINI_GAMES.map((game, index) => (
            <motion.div
              key={game.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
            >
              <Link
                href={game.comingSoon ? "#" : game.href}
                className={`group relative flex h-full flex-col rounded-2xl border border-slate-100 bg-white/80 p-4 shadow-sm backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/70 ${
                  game.comingSoon ? "cursor-default opacity-80" : "cursor-pointer"
                }`}
              >
                {/* Badge + difficulty */}
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center rounded-full bg-sky-100 px-2.5 py-1 text-xs font-medium text-sky-700 dark:bg-sky-900/60 dark:text-sky-200">
                    {game.badge}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Độ khó:{" "}
                    <span className="font-semibold text-slate-700 dark:text-slate-100">
                      {game.difficulty}
                    </span>
                  </span>
                </div>

                {/* Icon + title */}
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-700 transition group-hover:bg-sky-100 dark:bg-sky-900/40 dark:text-sky-200">
                    {game.icon}
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                      {game.title}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {game.subtitle}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="mb-4 line-clamp-3 text-sm text-slate-600 dark:text-slate-300">
                  {game.description}
                </p>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  {game.comingSoon ? (
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-amber-700 dark:bg-amber-900/40 dark:text-amber-200">
                      Sắp ra mắt
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-sky-600 group-hover:gap-1.5 dark:text-sky-300">
                      Bắt đầu chơi
                      <span className="text-sm">→</span>
                    </span>
                  )}
                  <span className="text-[11px]">Thời lượng ~ 5–10 phút</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
