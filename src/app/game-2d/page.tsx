"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type StoryMeta = {
  id: string;
  title: string;
  description?: string;
  cover?: string;      // 1 ảnh
  covers?: string[];   // ✅ nhiều ảnh (dùng riêng cho nhung-nga-re)
  tags?: string[];
};

type ComingSoonMeta = {
  title: string;
  desc: string;
  tags: string[];
  cover: string;
  progress: number;
  eta?: string;
};

export default function GameHub() {
  const [stories, setStories] = useState<StoryMeta[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Auto-rotate cover index (chỉ cho "nhung-nga-re")
  const [ngaReCoverIdx, setNgaReCoverIdx] = useState(0);

  // ✅ 2 game “coming soon”
  const comingSoon: ComingSoonMeta[] = useMemo(
    () => [
      {
        title: "Im Lặng Hay Lên Tiếng",
        desc: "Ở vai trò người chứng kiến, mỗi lựa chọn đều có hậu quả: can thiệp, tìm trợ giúp hay im lặng.",
        tags: ["Chứng kiến", "Can thiệp", "An toàn"],
        cover: "/vn/bg/hanhlang.png",
        progress: 35,
        eta: "Sắp ra mắt",
      },
      {
        title: "Tin Nhắn Lúc Nửa Đêm",
        desc: "Khi tin đồn lan nhanh và tin nhắn ẩn danh xuất hiện, bạn xử lý thế nào để bảo vệ người bị hại?",
        tags: ["Bạo lực mạng", "Bằng chứng", "Báo cáo"],
        cover: "/vn/bg/classroom.jpg",
        progress: 10,
        eta: "Đang viết kịch bản",
      },
    ],
    []
  );

  // ✅ modal state
  const [open, setOpen] = useState(false);
  const [modalGame, setModalGame] = useState<ComingSoonMeta | null>(null);

  const openModal = (g: ComingSoonMeta) => {
    setModalGame(g);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setTimeout(() => setModalGame(null), 120);
  };

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // ✅ fetch stories client-side
  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/stories/index.json", { cache: "no-store" });
        const data = res.ok ? ((await res.json()) as StoryMeta[]) : [];
        if (alive) setStories(data);
      } catch {
        if (alive) setStories([]);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  // ✅ Auto-rotate timer (chỉ chạy khi có covers của nhung-nga-re)
  useEffect(() => {
    const ngaRe = stories.find((x) => x.id === "nhung-nga-re");
    const covers = ngaRe?.covers?.length ? ngaRe.covers : null;
    if (!covers || covers.length <= 1) return;

    const t = window.setInterval(() => {
      setNgaReCoverIdx((i) => (i + 1) % covers.length);
    }, 4500);

    return () => window.clearInterval(t);
  }, [stories]);

  // helper: lấy cover (riêng cho nhung-nga-re sẽ auto đổi)
  const getStoryCover = (s: StoryMeta) => {
    if (s.id === "nhung-nga-re" && s.covers && s.covers.length > 0) {
      return s.covers[ngaReCoverIdx % s.covers.length];
    }
    return s.cover;
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-[#0B1220] via-[#0A1020] to-[#070B14] shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
        {/* subtle glows */}
        <div className="pointer-events-none absolute -top-28 -right-28 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-28 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(56,189,248,0.10),transparent_35%)]" />

        <div className="relative p-6 sm:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                🎭 Visual Novel <span className="text-white/40">•</span> Game giáo dục BLHD
              </div>

              <h1 className="mt-4 text-3xl sm:text-5xl font-semibold tracking-tight text-white">
                Game Xử Lý Tình Huống
              </h1>

              <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/70">
                Chọn cách phản ứng trước các tình huống bạo lực học đường. Mỗi quyết định tạo ra hệ quả khác nhau — và cuối cùng rút ra bài học.
              </p>

              <div className="mt-5 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/70">
                  ✅ Nhiều nhánh
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/70">
                  ✅ Đa nhân vật
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/70">
                  ✅ Có bài học cuối
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Link
                href="/kienthuc"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 hover:bg-white/10 hover:border-white/20 transition"
              >
                📚 Kiến thức liên quan
              </Link>
              <Link
                href="/mini-game"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 hover:bg-white/10 hover:border-white/20 transition"
              >
                🎮 Mini game
              </Link>
            </div>
          </div>

          {/* LIST */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* loading skeleton */}
            {loading && (
              <>
                <div className="h-[356px] rounded-[26px] border border-white/10 bg-white/[0.03] animate-pulse" />
                <div className="h-[356px] rounded-[26px] border border-white/10 bg-white/[0.03] animate-pulse" />
                <div className="h-[356px] rounded-[26px] border border-white/10 bg-white/[0.03] animate-pulse" />
              </>
            )}

            {/* stories thật */}
            {!loading &&
              stories.map((s) => {
                const cover = getStoryCover(s);

                return (
                  <Link
                    key={s.id}
                    href={`/game-2d/play/${s.id}`}
                    className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
                  >
                    {/* cover */}
                    <div className="relative h-36 w-full overflow-hidden">
                      {cover ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={`${s.id}-${cover}`} // ✅ đổi cover -> re-render mượt
                          src={cover}
                          alt={s.title}
                          className="h-full w-full object-cover opacity-95 group-hover:scale-[1.03] transition duration-300"
                          style={{
                            // ✅ fade nhẹ khi đổi cover (đặc biệt cho nhung-nga-re)
                            animation: s.id === "nhung-nga-re" ? "fadeIn 450ms ease-out" : undefined,
                          }}
                        />
                      ) : (
                        <div className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.18),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.18),transparent_45%),linear-gradient(to_bottom,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]" />
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                      <div className="absolute right-3 top-3">
                        <span className="inline-flex items-center gap-2 rounded-full bg-sky-500/90 px-3 py-1 text-xs font-semibold text-black shadow-lg shadow-sky-500/20 group-hover:bg-sky-400 transition">
                          ▶ Chơi ngay
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="text-lg font-semibold text-white leading-snug">{s.title}</div>
                        <span className="hidden sm:inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                          VN
                        </span>
                      </div>

                      {s.description ? (
                        <div className="mt-2 text-sm text-white/70 leading-relaxed line-clamp-3">
                          {s.description}
                        </div>
                      ) : (
                        <div className="mt-2 text-sm text-white/55">Bắt đầu trải nghiệm tình huống…</div>
                      )}

                      <div className="mt-4 flex flex-wrap gap-2">
                        {(s.tags ?? ["Tương tác", "Lựa chọn", "Bài học"]).slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/65"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="mt-5 flex items-center justify-between text-xs text-white/55">
                        <span className="opacity-80">Bắt đầu câu chuyện</span>
                        <span className="text-white/75 group-hover:text-white transition">Vào game →</span>
                      </div>
                    </div>

                    <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-sky-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition" />
                  </Link>
                );
              })}

            {/* ✅ 2 game đang phát triển (click mở modal) */}
            {!loading &&
              comingSoon.map((g) => (
                <button
                  key={g.title}
                  type="button"
                  onClick={() => openModal(g)}
                  className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.03] text-left shadow-[0_12px_30px_rgba(0,0,0,0.25)] hover:bg-white/[0.06] hover:border-white/20 transition"
                >
                  <div className="relative h-36 w-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={g.cover}
                      alt={g.title}
                      className="h-full w-full object-cover opacity-70 group-hover:opacity-85 transition"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />

                    <div className="absolute left-3 top-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/85">
                        🔒 Coming soon
                      </span>
                    </div>

                    <div className="absolute right-3 top-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur">
                        🛠 Đang phát triển
                      </span>
                    </div>

                    {/* progress pill */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="flex items-center justify-between text-[11px] text-white/80">
                        <span>Tiến độ</span>
                        <span className="font-semibold text-white">{g.progress}%</span>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-sky-400/90"
                          style={{ width: `${Math.min(100, Math.max(0, g.progress))}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="text-lg font-semibold text-white leading-snug">{g.title}</div>
                    <div className="mt-2 text-sm text-white/70 leading-relaxed line-clamp-3">
                      {g.desc}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {g.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/65"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex items-center justify-between text-xs text-white/55">
                      <span className="opacity-80">{g.eta ?? "Sắp ra mắt"}</span>
                      <span className="text-white/75 group-hover:text-white transition">Xem chi tiết →</span>
                    </div>
                  </div>

                  <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-sky-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition" />
                </button>
              ))}

            {!loading && stories.length === 0 && (
              <div className="rounded-[26px] border border-white/10 bg-white/[0.03] p-5 text-white/70">
                Chưa có story nào. Hãy thêm file story vào <b>public/stories</b> và cập nhật{" "}
                <b>public/stories/index.json</b>.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ✅ MODAL */}
      {open && modalGame && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" />

          <div className="relative w-full max-w-lg overflow-hidden rounded-[26px] border border-white/10 bg-[#0B1220] shadow-[0_30px_90px_rgba(0,0,0,0.6)]">
            <div className="relative h-44 w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={modalGame.cover}
                alt={modalGame.title}
                className="h-full w-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute left-4 top-4 flex gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/85">
                  🛠 Đang phát triển
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/85">
                  🔒 Coming soon
                </span>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/40 px-3 py-2 text-xs text-white/80 hover:bg-black/55 transition"
                aria-label="Đóng"
              >
                ✕
              </button>
            </div>

            <div className="p-5">
              <div className="text-xl font-semibold text-white">{modalGame.title}</div>
              <div className="mt-2 text-sm text-white/70 leading-relaxed">{modalGame.desc}</div>

              <div className="mt-4 flex flex-wrap gap-2">
                {modalGame.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between text-xs text-white/75">
                  <span>Tiến độ phát triển</span>
                  <span className="font-semibold text-white">{modalGame.progress}%</span>
                </div>
                <div className="mt-2 h-2.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-sky-400/90"
                    style={{ width: `${Math.min(100, Math.max(0, modalGame.progress))}%` }}
                  />
                </div>

                <div className="mt-3 text-xs text-white/60">
                  Gợi ý: viết kịch bản → chuẩn hóa JSON → dựng scene.
                </div>
              </div>

              <div className="mt-5 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10 transition"
                >
                  Đóng
                </button>
                <Link
                  href="/kienthuc"
                  className="rounded-2xl bg-sky-400/90 px-4 py-2 text-sm font-semibold text-black hover:bg-sky-300 transition"
                  onClick={closeModal}
                >
                  Xem kiến thức →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* keyframes fade */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0.25; transform: scale(1.005); }
          to   { opacity: 0.95; transform: scale(1); }
        }
      `}</style>
    </main>
  );
}
