"use client";

import Link from "next/link";
import { useState } from "react";

type ActivityType = "bookmark" | "like" | "comment" | "mini-game";

type ActivityItem = {
  id: string;
  type: ActivityType;
  title: string;
  time: string;
  href: string;
};

const MOCK_DATA: ActivityItem[] = [
  {
    id: "1",
    type: "bookmark",
    title: "Nhận biết bạo lực tinh thần trong lớp học",
    time: "10:32 18/12/2025",
    href: "/kienthuc",
  },
  {
    id: "2",
    type: "comment",
    title: "Đã bình luận trong chủ đề: Khi bị trêu chọc",
    time: "09:10 18/12/2025",
    href: "/tro-chuyen",
  },
  {
    id: "3",
    type: "like",
    title: "Đã thích một bài thảo luận",
    time: "21:40 17/12/2025",
    href: "/tro-chuyen",
  },
  {
    id: "4",
    type: "mini-game",
    title: "Hoàn thành Quiz: Bạo lực học đường",
    time: "20:15 17/12/2025",
    href: "/mini-game",
  },
];

const LABEL: Record<ActivityType, string> = {
  bookmark: "Yêu thích",
  like: "Thích",
  comment: "Bình luận",
  "mini-game": "Mini game",
};

export default function ActivityHistoryPage() {
  const [filter, setFilter] = useState<ActivityType | "all">("all");

  const list =
    filter === "all"
      ? MOCK_DATA
      : MOCK_DATA.filter((i) => i.type === filter);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-extrabold">Lịch sử hoạt động</h1>
        <p className="text-sm text-slate-500">
          Các tương tác gần đây của bạn trên Lio Connect
        </p>
      </header>

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {(["all", "bookmark", "like", "comment", "mini-game"] as const).map(
          (k) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className={`rounded-xl border px-3 py-1.5 text-xs font-semibold ${
                filter === k
                  ? "bg-sky-100 border-sky-300 text-sky-800"
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {k === "all" ? "Tất cả" : LABEL[k]}
            </button>
          )
        )}
      </div>

      {/* List */}
      <section className="rounded-2xl border bg-white/80 shadow-sm">
        <ul className="divide-y">
          {list.map((item) => (
            <li key={item.id} className="p-4 flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-sky-600">
                  {LABEL[item.type]}
                </span>
                <Link
                  href={item.href}
                  className="block font-semibold hover:underline"
                >
                  {item.title}
                </Link>
              </div>
              <span className="text-xs text-slate-400">{item.time}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
