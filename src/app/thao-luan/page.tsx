// src/app/thao-luan/page.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { usePosts } from "@/hooks/usePosts";
import PostComposer from "./PostComposer";
import PostCard from "./PostCard";

export default function DiscussionPage() {
  const { user, profile } = useAuth();
  const { posts, loading } = usePosts();
  const [searchTerm, setSearchTerm] = useState("");

  // Lọc bài theo ô tìm kiếm (tạm thời chỉ tìm trong content)
  const filteredPosts = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    if (!keyword) return posts;
    return posts.filter((p) => p.content.toLowerCase().includes(keyword));
  }, [posts, searchTerm]);

  return (
    <div className="min-h-screen bg-slate-100 pb-10 pt-4 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-2 sm:px-4">
        {/* Thanh tiêu đề + theme toggle */}
        <header className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-50 sm:text-xl">
              Cộng đồng · Thảo luận
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Chia sẻ kinh nghiệm, đặt câu hỏi và hỗ trợ nhau về bạo lực học
              đường.
            </p>
          </div>
          <ThemeToggle />
        </header>

        {/* GRID 3 CỘT: trái – giữa – phải */}
        <div className="grid gap-4 lg:grid-cols-[260px,minmax(0,1.7fr),260px]">
          {/* CỘT TRÁI */}
          <aside className="space-y-4">
            {/* Thẻ hồ sơ ngắn */}
            <section className="rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-900 dark:shadow-slate-900/60">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-600 text-sm font-semibold text-white">
                  {(profile?.displayName ?? "L").charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                    {profile?.displayName ?? "Khách"}
                  </div>
                  {user?.email && (
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      @{user.email.split("@")[0]}
                    </div>
                  )}
                </div>
              </div>

              <Link
                href="/profile"
                className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Xem trang cá nhân
              </Link>
            </section>

            {/* Người dùng mới (mock tĩnh) */}
            <section className="rounded-2xl bg-white p-4 text-xs shadow-sm dark:bg-slate-900 dark:text-slate-200">
              <h2 className="mb-2 text-[13px] font-semibold text-slate-800 dark:text-slate-100">
                Người dùng mới
              </h2>
              <ul className="space-y-1.5">
                <li className="flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-[11px] font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-50">
                    T
                  </span>
                  <span>Tiến Thụy</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-[11px] font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-50">
                    H
                  </span>
                  <span>Hân Gia</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-[11px] font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-50">
                    L
                  </span>
                  <span>Long Nguyễn</span>
                </li>
              </ul>
              <button className="mt-2 text-[11px] font-medium text-sky-600 hover:underline dark:text-sky-300">
                Xem tất cả
              </button>
            </section>

            {/* Tag phổ biến */}
            <section className="rounded-2xl bg-white p-4 text-xs shadow-sm dark:bg-slate-900 dark:text-slate-200">
              <h2 className="mb-2 text-[13px] font-semibold text-slate-800 dark:text-slate-100">
                Tag phổ biến
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "#bạo_lực_học_đường",
                  "#cyberbullying",
                  "#áp_lực_học_tập",
                  "#tâm_lý_học_sinh",
                  "#kỹ_năng_ứng_xử",
                ].map((tag) => (
                  <button
                    key={tag}
                    className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] text-slate-700 hover:bg-sky-100 hover:text-sky-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </section>
          </aside>

          {/* CỘT GIỮA – FEED */}
          <section className="space-y-4 border-x border-slate-200 bg-slate-50/80 px-1 sm:px-2 dark:border-slate-800 dark:bg-slate-950/40">
            {/* Thanh tìm kiếm + Tạo bài viết mới */}
            <div className="rounded-2xl bg-white p-3 shadow-sm dark:bg-slate-900">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Tìm kiếm bài viết..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-sky-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                    Enter để tìm
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("post-composer");
                    el?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }}
                  className="rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-sky-600"
                >
                  + Tạo bài viết mới
                </button>
              </div>
            </div>

            {/* Ô đăng bài */}
            <div id="post-composer">
              <PostComposer />
            </div>

            {/* Thông tin nhỏ */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span>
                {loading
                  ? "Đang tải bài viết..."
                  : `Có ${filteredPosts.length} bài thảo luận`}
              </span>
              <span>Bài mới hiển thị trước</span>
            </div>

            {/* Feed bài viết */}
            <div className="space-y-4">
              {!loading && filteredPosts.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
                  Không tìm thấy bài viết nào phù hợp. Hãy thử tìm từ khóa khác
                  hoặc tạo một bài viết mới nhé!
                </div>
              )}

              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>

          {/* CỘT PHẢI */}
          <aside className="space-y-4">
            {/* Điều hướng */}
            <section className="rounded-2xl bg-white p-4 text-xs shadow-sm dark:bg-slate-900 dark:text-slate-200">
              <h2 className="mb-2 text-[13px] font-semibold text-slate-800 dark:text-slate-100">
                Điều hướng
              </h2>
              <nav className="space-y-1">
                <Link
                  href="/thao-luan"
                  className="flex items-center justify-between rounded-xl bg-sky-50 px-3 py-2 text-[12px] font-medium text-sky-700 hover:bg-sky-100 dark:bg-sky-900/40 dark:text-sky-200 dark:hover:bg-sky-900/70"
                >
                  <span>Trang chủ</span>
                </Link>
                <button className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-[12px] text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
                  <span>Xu hướng</span>
                  <span className="text-[10px] text-slate-400">Soon</span>
                </button>
                <Link
                  href="/favorites"
                  className="flex items-center justify-between rounded-xl px-3 py-2 text-[12px] text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <span>Yêu thích</span>
                </Link>
                <Link
                  href="/profile/me"
                  className="flex items-center justify-between rounded-xl px-3 py-2 text-[12px] text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <span>Bài viết của tôi</span>
                </Link>
              </nav>
            </section>

            {/* Nhóm thành viên (mock) */}
            <section className="rounded-2xl bg-white p-4 text-xs shadow-sm dark:bg-slate-900 dark:text-slate-200">
              <h2 className="mb-2 text-[13px] font-semibold text-slate-800 dark:text-slate-100">
                Nhóm thành viên
              </h2>
              <ul className="space-y-1.5">
                <li className="flex items-center justify-between">
                  <span>CLB Tin học</span>
                  <span className="text-[10px] text-slate-400">
                    137 thành viên
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Chăm sóc sức khỏe tâm lý</span>
                  <span className="text-[10px] text-slate-400">
                    10 thành viên
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Cộng đồng lập trình</span>
                  <span className="text-[10px] text-slate-400">
                    9 thành viên
                  </span>
                </li>
              </ul>
              <button className="mt-2 text-[11px] font-medium text-sky-600 hover:underline dark:text-sky-300">
                Xem tất cả
              </button>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
