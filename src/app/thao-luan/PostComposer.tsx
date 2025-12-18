"use client";

import { useState, type ChangeEvent } from "react";
import {
  createPost,
  uploadPostImages,
  type UserProfile,
} from "@/services/discussionService";
import { useAuth } from "@/hooks/useAuth";
import type { User } from "firebase/auth";

interface AuthHookResult {
  user: User | null;
  profile: UserProfile | null;
  loadingAuth: boolean;
}

export default function PostComposer() {
  const { user, profile, loadingAuth } = useAuth() as AuthHookResult;

  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Ảnh chọn từ máy
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const disabled = submitting || !content.trim() || !user || loadingAuth;

  const handleSelectFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files;
    if (!list) return;
    const arr = Array.from(list);
    setFiles(arr);
    setPreviewUrls(arr.map((f) => URL.createObjectURL(f)));
  };

  const handleSubmit = async () => {
    if (!user || !content.trim()) return;

    setSubmitting(true);
    try {
      let imageUrls: string[] = [];

      // Nếu có chọn ảnh thì upload trước rồi mới tạo post
      if (files.length) {
        imageUrls = await uploadPostImages(user.uid, files);
      }

      await createPost({
        content,
        isAnonymous,
        user,
        profile,
        imageUrls,
      });

      // reset form
      setContent("");
      setIsAnonymous(false);
      setFiles([]);
      setPreviewUrls([]);
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingAuth) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-400">
        Đang tải tài khoản...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-300">
        Bạn cần <span className="font-semibold">đăng nhập</span> để đăng bài và tham gia
        thảo luận.
      </div>
    );
  }

  const displayName = isAnonymous
    ? "Ẩn danh"
    : profile?.displayName ?? user.displayName ?? "Bạn";

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg shadow-sky-900/30">
      {/* Header nhỏ với avatar & ẩn danh */}
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-600 text-sm font-semibold text-white">
          {displayName.charAt(0).toUpperCase()}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-slate-100">
            Đăng bài với tên: {displayName}
          </span>
          <label className="mt-0.5 flex items-center gap-2 text-[11px] text-slate-400">
            <input
              type="checkbox"
              className="h-3.5 w-3.5 rounded border-slate-600 bg-slate-900"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
            />
            Đăng ẩn danh để bảo vệ danh tính
          </label>
        </div>
      </div>

      {/* Nội dung bài viết */}
      <textarea
        className="min-h-[90px] w-full resize-none rounded-xl border border-slate-700 bg-slate-950/70 p-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-sky-500"
        placeholder="Kể câu chuyện, đặt câu hỏi hoặc chia sẻ cảm xúc của bạn..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* Preview ảnh */}
      {previewUrls.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-2">
          {previewUrls.map((url, idx) => (
            <div
              key={idx}
              className="overflow-hidden rounded-xl border border-slate-700"
            >
              <img src={url} className="h-32 w-full object-cover" />
            </div>
          ))}
        </div>
      )}

      <div className="mt-3 flex items-center justify-between gap-3">
        {/* Nút chọn ảnh */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <label className="cursor-pointer rounded-full border border-slate-700 px-3 py-1 text-[11px] hover:border-sky-500 hover:text-sky-300">
            Ảnh
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleSelectFiles}
            />
          </label>
        </div>

        {/* Nút đăng bài */}
        <button
          onClick={handleSubmit}
          disabled={disabled}
          className="rounded-full px-4 py-1.5 text-sm font-medium 
                     bg-sky-500 text-white hover:bg-sky-400
                     disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Đang đăng..." : "Đăng bài"}
        </button>
      </div>
    </div>
  );
}
