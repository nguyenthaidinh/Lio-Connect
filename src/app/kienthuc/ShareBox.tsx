// src/app/kienthuc/ShareBox.tsx
"use client";

import { useState } from "react";

export default function ShareBox() {
  const [type, setType] = useState<"law" | "article">("law");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !link) {
      setMsg("Vui lòng nhập đầy đủ tiêu đề và link.");
      return;
    }
    // TODO: gọi API lưu
    setMsg("✅ Đã gửi yêu cầu. Quản trị viên sẽ kiểm duyệt và đăng bài.");
    setTitle("");
    setLink("");
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-base font-semibold">Chia sẻ tài liệu / bài viết</h2>
      <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
        Gửi link tài liệu luật hoặc bài báo về bạo lực học đường. Quản trị viên
        sẽ kiểm duyệt trước khi hiển thị.
      </p>

      <form onSubmit={handleSubmit} className="mt-3 space-y-3 text-xs">
        <div className="flex gap-2 text-[11px]">
          <button
            type="button"
            onClick={() => setType("law")}
            className={
              type === "law"
                ? "flex-1 rounded-full bg-sky-600 px-3 py-1 font-semibold text-white"
                : "flex-1 rounded-full border border-slate-300 px-3 py-1 font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200"
            }
          >
            Tài liệu luật
          </button>
          <button
            type="button"
            onClick={() => setType("article")}
            className={
              type === "article"
                ? "flex-1 rounded-full bg-sky-600 px-3 py-1 font-semibold text-white"
                : "flex-1 rounded-full border border-slate-300 px-3 py-1 font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200"
            }
          >
            Bài báo / nghiên cứu
          </button>
        </div>

        <div className="space-y-1">
          <label className="block text-[11px] font-medium text-slate-700 dark:text-slate-300">
            Tiêu đề
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
            placeholder="Ví dụ: Nghiên cứu về BLHD tại trường THPT X..."
          />
        </div>

        <div className="space-y-1">
          <label className="block text-[11px] font-medium text-slate-700 dark:text-slate-300">
            Đường link (URL)
          </label>
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
            placeholder="https://..."
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-sky-600 py-2 text-xs font-semibold text-white hover:bg-sky-700"
        >
          Gửi yêu cầu đăng bài
        </button>

        {msg && (
          <p className="text-[11px] text-emerald-500 dark:text-emerald-400">
            {msg}
          </p>
        )}
      </form>
    </section>
  );
}
