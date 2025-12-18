// src/app/video/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { blhdVideos, featuredVideoId, type BlhdVideo } from "./data";

const CATEGORIES: Array<
  "Tất cả" | "Phóng sự" | "Pháp luật" | "Kỹ năng" | "Bài giảng" | "Talkshow" | "Khác"
> = ["Tất cả", "Phóng sự", "Pháp luật", "Kỹ năng", "Bài giảng", "Talkshow", "Khác"];

export default function VideoPage() {
  const searchParams = useSearchParams();
  const vFromUrl = searchParams.get("v");

  const [selectedId, setSelectedId] = useState<string>(featuredVideoId);
  const [q, setQ] = useState("");
  const [category, setCategory] =
    useState<
      "Tất cả" | "Phóng sự" | "Pháp luật" | "Kỹ năng" | "Bài giảng" | "Talkshow" | "Khác"
    >("Tất cả");

  // ✅ nếu url có ?v=... và tồn tại trong data.ts → chọn video đó
  useEffect(() => {
    if (!vFromUrl) return;
    const exists = blhdVideos.some((x) => x.id === vFromUrl);
    if (exists) setSelectedId(vFromUrl);
  }, [vFromUrl]);

  // 1️⃣ Lọc theo category
  const byCategory: BlhdVideo[] = useMemo(() => {
    if (category === "Tất cả") return blhdVideos;
    return blhdVideos.filter((v) => v.category === category);
  }, [category]);

  // 2️⃣ Video đang xem
  const current: BlhdVideo | undefined = useMemo(() => {
    if (byCategory.length === 0) return undefined;
    const found = byCategory.find((v) => v.id === selectedId);
    return found ?? byCategory[0];
  }, [selectedId, byCategory]);

  // 3️⃣ Playlist: ưu tiên match từ khóa
  const playlist: BlhdVideo[] = useMemo(() => {
    const normQ = q.toLowerCase().trim();
    if (!normQ) return byCategory;

    const matches: BlhdVideo[] = [];
    const others: BlhdVideo[] = [];

    byCategory.forEach((v) => {
      const haystack = (v.title + " " + v.description + " " + v.source).toLowerCase();
      if (haystack.includes(normQ)) matches.push(v);
      else others.push(v);
    });

    return [...matches, ...others];
  }, [byCategory, q]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-sky-600 dark:text-sky-300">
              Kho video
            </p>
            <h1 className="text-2xl font-extrabold sm:text-3xl">
              Video về bạo lực học đường &amp; pháp luật
            </h1>
            <p className="mt-1 max-w-2xl text-xs text-slate-600 dark:text-slate-300 sm:text-sm">
              Tổng hợp phóng sự, talkshow, bài giảng, kỹ năng ứng phó liên quan đến
              bạo lực học đường để Lio dùng cho tuyên truyền, học tập, làm slide.
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <ThemeToggle />
            <div className="flex items-center gap-2">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Tìm video theo từ khóa…"
                className="w-56 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs shadow-sm placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-900"
              />
            </div>
          </div>
        </header>

        <div className="mb-4 flex flex-wrap gap-2 text-xs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={
                category === cat
                  ? "rounded-full bg-sky-600 px-3 py-1 font-semibold text-white shadow-sm"
                  : "rounded-full border border-slate-300 px-3 py-1 font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              }
            >
              #{cat === "Tất cả" ? "all" : cat}
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,2.5fr),minmax(0,1fr)]">
          <main className="space-y-6">
            {current && (
              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="relative w-full pt-[56.25%]">
                  <iframe
                    className="absolute inset-0 h-full w-full rounded-t-2xl"
                    src={`https://www.youtube.com/embed/${current.youtubeId}`}
                    title={current.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="space-y-1 px-4 py-3">
                  <div className="inline-flex items-center gap-2 text-[11px]">
                    <span className="rounded-full bg-sky-100 px-2 py-0.5 font-semibold text-sky-700 dark:bg-sky-900/40 dark:text-sky-300">
                      {current.category}
                    </span>
                    {current.source && (
                      <span className="text-slate-500 dark:text-slate-400">
                        Nguồn: {current.source}
                      </span>
                    )}
                  </div>
                  <h2 className="text-base font-bold sm:text-lg">{current.title}</h2>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {current.description}
                  </p>
                </div>
              </section>
            )}

            <section className="space-y-3">
              <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                Tất cả video {category !== "Tất cả" && `· ${category}`}
              </h2>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {playlist.map((v) => {
                  const isActive = v.id === current?.id;
                  const thumb = `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedId(v.id)}
                      className={
                        "flex flex-col overflow-hidden rounded-2xl border bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-900 " +
                        (isActive
                          ? "border-sky-500 ring-2 ring-sky-300/60 dark:ring-sky-500/50"
                          : "border-slate-200 dark:border-slate-800")
                      }
                    >
                      <div className="relative w-full pt-[56.25%] bg-slate-200 dark:bg-slate-800">
                        <img
                          src={thumb}
                          alt={v.title}
                          className="absolute inset-0 h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-1 px-3 py-2">
                        <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                          {v.category} · {v.source}
                        </span>
                        <span className="line-clamp-2 text-[13px] font-semibold">
                          {v.title}
                        </span>
                        <span className="line-clamp-3 text-[11px] text-slate-600 dark:text-slate-400">
                          {v.description}
                        </span>
                      </div>
                    </button>
                  );
                })}

                {playlist.length === 0 && (
                  <p className="col-span-full text-xs text-slate-500">
                    Không có video nào trong mục này.
                  </p>
                )}
              </div>
            </section>
          </main>

          <aside className="space-y-4">
            <section className="rounded-2xl border border-slate-200 bg-white p-4 text-xs text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
              <h3 className="mb-1 text-sm font-semibold">Mẹo tìm kiếm</h3>
              <ul className="list-disc space-y-1 pl-4 text-[11px]">
                <li>Gõ tên kênh: ví dụ “VTV24”, “VTC14”, “HTV”.</li>
                <li>Gõ loại nội dung: “phóng sự”, “kỹ năng”, “pháp luật”, “talkshow”…</li>
                <li>Kết hợp hashtag category phía trên.</li>
              </ul>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-slate-900 p-4 text-xs text-slate-100 shadow-sm dark:border-slate-800">
              <h3 className="mb-1 text-sm font-semibold">Gợi ý sử dụng video</h3>
              <ul className="list-disc space-y-1 pl-4 text-[11px] text-slate-200">
                <li>Dùng làm tư liệu minh họa trong slide, thảo luận nhóm.</li>
                <li>Cắt đoạn phóng sự, talkshow để lồng vào bài giảng.</li>
                <li>Gắn link video với từng chuyên đề trong “Học tập & Tài liệu”.</li>
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
