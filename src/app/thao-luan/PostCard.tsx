// src/app/thao-luan/PostCard.tsx
"use client";

import { useEffect, useState } from "react";
import type { Post } from "@/types/discussion";
import { useAuth } from "@/hooks/useAuth";
import {
  hasUserLiked,
  toggleBookmark,
  toggleLike,
} from "@/services/discussionService";
import CommentSection from "./CommentSection";

/* --------- Helper Cloudinary: tạo URL thumbnail / large --------- */

function buildCloudinaryUrl(url: string, transformation: string): string {
  // Nếu không phải Cloudinary thì trả nguyên
  if (!url.includes("res.cloudinary.com")) return url;
  // Chèn đoạn transform vào sau /upload/
  return url.replace("/upload/", `/upload/${transformation}/`);
}

// Thumbnail cho gallery (nhỏ nhưng vẫn đủ nét)
function getThumbUrl(url: string): string {
  // c_fill: crop vừa khung, q_auto: chất lượng tự, f_auto: chọn định dạng tốt nhất
  return buildCloudinaryUrl(url, "c_fill,q_auto,f_auto,w_900,h_600");
}

// Bản lớn cho lightbox
function getLargeUrl(url: string): string {
  return buildCloudinaryUrl(url, "c_fit,q_auto,f_auto,w_1600");
}

/* -------------------- Component chính -------------------- */

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const { user } = useAuth();
  const isOwner = user?.uid === post.authorId;

  const displayName = post.isAnonymous
    ? "Ẩn danh"
    : post.authorDisplayName || "Người dùng";

  // avatar: nếu ẩn danh dùng avatar chung
  const avatarUrl = post.isAnonymous
    ? "https://ui-avatars.com/api/?name=An+Danh&background=364153&color=ffffff"
    : post.authorAvatarUrl ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        post.authorDisplayName || "User"
      )}&background=0ea5e9&color=ffffff`;

  /* ===== LIKE ===== */

  const [liked, setLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    hasUserLiked(post.id, user.uid)
      .then(setLiked)
      .catch(console.error);
  }, [user, post.id]);

  const handleLike = async () => {
    if (!user) {
      alert("Bạn cần đăng nhập để thích bài viết.");
      return;
    }
    if (likeLoading) return;
    setLikeLoading(true);
    try {
      await toggleLike(post.id, user.uid);
      setLiked((prev) => !prev);
    } finally {
      setLikeLoading(false);
    }
  };

  /* ===== BOOKMARK (LƯU) ===== */

  const [saved, setSaved] = useState(false);

  const handleBookmark = async () => {
    if (!user) {
      alert("Bạn cần đăng nhập để lưu bài viết.");
      return;
    }
    setSaved((prev) => !prev);
    await toggleBookmark(post.id, user.uid);
  };

  /* ===== COMMENTS ===== */

  const [showComments, setShowComments] = useState(false);

  /* ===== MENU 3 CHẤM ===== */

  const [openMenu, setOpenMenu] = useState(false);

  /* ===== LIGHTBOX XEM ẢNH FULL ===== */

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const hasImages = !!post.imageUrls && post.imageUrls.length > 0;

  const openLightbox = (index: number) => {
    if (!hasImages) return;
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const showPrev = () => {
    if (!hasImages) return;
    const len = post.imageUrls!.length;
    setLightboxIndex((prev) => (prev === 0 ? len - 1 : prev - 1));
  };

  const showNext = () => {
    if (!hasImages) return;
    const len = post.imageUrls!.length;
    setLightboxIndex((prev) => (prev === len - 1 ? 0 : prev + 1));
  };

  /* ===== TIME LABEL ===== */

  const createdLabel = post.createdAt.toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
  });

  // Hiển thị số like (cộng thêm local state)
  const likeCountDisplay = post.likeCount ?? 0;

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* HEADER: avatar + tên + thời gian + 3 chấm */}
      <header className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full bg-slate-700">
            <img
              src={avatarUrl}
              alt={displayName}
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                {displayName}
              </span>
              {isOwner && !post.isAnonymous && (
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                  Bạn
                </span>
              )}
              {post.isAnonymous && (
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                  Ẩn danh
                </span>
              )}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              {createdLabel}
            </div>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setOpenMenu((v) => !v)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
          >
            ⋯
          </button>

          {openMenu && (
            <div
              className="absolute right-0 mt-1 w-44 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              onMouseLeave={() => setOpenMenu(false)}
            >
              <button className="block w-full px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800">
                Báo cáo bài viết
              </button>
              {isOwner && (
                <>
                  <button className="block w-full px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800">
                    Chỉnh sửa (sau)
                  </button>
                  <button className="block w-full px-3 py-2 text-left text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/40">
                    Xoá bài (sau)
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </header>

      {/* NỘI DUNG TEXT */}
      <p className="whitespace-pre-line text-[15px] leading-relaxed text-slate-900 dark:text-slate-100">
        {post.content}
      </p>

      {/* GALLERY ẢNH */}
      {hasImages && (
        <div
          className={`mt-3 grid gap-1 overflow-hidden rounded-xl ${
            post.imageUrls!.length === 1
              ? "grid-cols-1"
              : post.imageUrls!.length === 2
              ? "grid-cols-2"
              : "grid-cols-2"
          }`}
        >
          {post.imageUrls!.map((url, i) => {
            const thumb = getThumbUrl(url);

            return (
              <button
                key={i}
                type="button"
                onClick={() => openLightbox(i)}
                className="group relative max-h-80 overflow-hidden"
              >
                <div className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
                <img
                  src={thumb}
                  alt=""
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* THỐNG KÊ */}
      <div className="mt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>
          {likeCountDisplay > 0 ? `${likeCountDisplay} lượt thích` : ""}
        </span>
        <span>
          {post.commentCount > 0 ? `${post.commentCount} bình luận` : ""}
        </span>
      </div>

      {/* ACTION BAR: Thích / Bình luận / Lưu */}
      <div className="mt-2 border-t border-slate-200 pt-1 text-sm dark:border-slate-800">
        <div className="flex items-center justify-between text-[13px]">
          {/* LIKE */}
          <button
            onClick={handleLike}
            disabled={likeLoading}
            className={`flex flex-1 items-center justify-center gap-1 rounded-lg py-2 hover:bg-slate-100 dark:hover:bg-slate-800 ${
              liked ? "text-sky-500" : "text-slate-600 dark:text-slate-300"
            }`}
          >
            <span>👍</span>
            <span>{liked ? "Đã thích" : "Thích"}</span>
          </button>

          {/* COMMENT */}
          <button
            onClick={() => setShowComments((v) => !v)}
            className="flex flex-1 items-center justify-center gap-1 rounded-lg py-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <span>💬</span>
            <span>Bình luận</span>
          </button>

          {/* SAVE */}
          <button
            onClick={handleBookmark}
            className={`flex flex-1 items-center justify-center gap-1 rounded-lg py-2 hover:bg-slate-100 dark:hover:bg-slate-800 ${
              saved ? "text-yellow-500" : "text-slate-600 dark:text-slate-300"
            }`}
          >
            <span>🔖</span>
            <span>{saved ? "Đã lưu" : "Lưu"}</span>
          </button>
        </div>
      </div>

      {/* COMMENT SECTION */}
      {showComments && (
        <div className="mt-3 border-t border-slate-200 pt-3 dark:border-slate-800">
          <CommentSection postId={post.id} />
        </div>
      )}

      {/* LIGHTBOX FULLSCREEN */}
      {lightboxOpen && hasImages && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          {/* Backdrop click để tắt */}
          <button
            type="button"
            className="absolute inset-0 h-full w-full cursor-default"
            onClick={closeLightbox}
          />

          {/* Ảnh lớn */}
          <div className="relative z-10 max-h-full max-w-5xl">
            <img
              src={getLargeUrl(post.imageUrls![lightboxIndex])}
              alt=""
              className="max-h-[80vh] w-auto rounded-xl object-contain shadow-2xl"
            />

            {/* Info góc dưới */}
            <div className="mt-2 text-center text-xs text-slate-200">
              Ảnh {lightboxIndex + 1}/{post.imageUrls!.length}
            </div>

            {/* Nút đóng */}
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute right-2 top-2 rounded-full bg-black/60 px-2 py-1 text-xs text-white hover:bg-black/80"
            >
              ✕
            </button>

            {/* Prev / Next */}
            {post.imageUrls!.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    showPrev();
                  }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-2 py-2 text-lg text-white hover:bg-black/80"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    showNext();
                  }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-2 py-2 text-lg text-white hover:bg-black/80"
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
