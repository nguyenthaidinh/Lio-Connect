"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  subscribeToComments,
  addComment,
  updateComment,
  deleteComment,
  type Comment,
  type UserProfile,
} from "@/services/discussionService";
import type { User } from "firebase/auth";

interface AuthHookResult {
  user: User | null;
  profile: UserProfile | null;
  loadingAuth: boolean;
}

interface CommentSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const { user, profile, loadingAuth } = useAuth() as AuthHookResult;

  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const [newContent, setNewContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");

  // subscribe realtime comment của post
  useEffect(() => {
    const unsub = subscribeToComments(postId, (list) => {
      setComments(list);
      setLoading(false);
    });
    return () => unsub();
  }, [postId]);

  const handleAdd = async () => {
    if (!user) {
      alert("Bạn cần đăng nhập để bình luận.");
      return;
    }
    if (!newContent.trim() || submitting) return;

    setSubmitting(true);
    try {
      await addComment({
        postId,
        content: newContent,
        user,
        profile,
      });
      setNewContent("");
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = (c: Comment) => {
    setEditingId(c.id);
    setEditingContent(c.content);
  };

  const handleUpdate = async () => {
    if (!editingId || !editingContent.trim()) {
      setEditingId(null);
      return;
    }
    await updateComment(postId, editingId, editingContent);
    setEditingId(null);
    setEditingContent("");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Xoá bình luận này?")) return;
    await deleteComment(postId, id);
  };

  const canInteract = !!user && !loadingAuth;

  return (
    <div className="mt-2 rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
      {/* danh sách bình luận */}
      {loading ? (
        <p className="text-xs text-slate-400">Đang tải bình luận…</p>
      ) : comments.length === 0 ? (
        <p className="text-xs text-slate-500">Chưa có bình luận nào. Hãy là người đầu tiên!</p>
      ) : (
        <ul className="space-y-2 mb-3">
          {comments.map((c) => {
            const isOwner = user?.uid === c.authorId;
            const displayFirstLetter = (c.authorDisplayName || "A")
              .charAt(0)
              .toUpperCase();

            const isEditing = editingId === c.id;

            return (
              <li key={c.id} className="flex gap-2">
                {/* avatar tròn nhỏ */}
                <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-slate-700 text-[11px] font-semibold text-slate-100">
                  {displayFirstLetter}
                </div>

                <div className="flex-1 rounded-xl bg-slate-900/80 px-3 py-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold text-slate-100">
                      {c.authorDisplayName}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {c.createdAt.toLocaleString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "2-digit",
                        month: "2-digit",
                      })}
                    </span>
                  </div>

                  {/* nội dung / edit */}
                  {!isEditing ? (
                    <p className="mt-1 text-[13px] text-slate-100 whitespace-pre-line">
                      {c.content}
                    </p>
                  ) : (
                    <div className="mt-1 space-y-1">
                      <textarea
                        className="w-full resize-none rounded-lg border border-slate-700 bg-slate-950/50 p-2 text-[13px] text-slate-100 outline-none focus:border-sky-500"
                        rows={2}
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                      />
                      <div className="flex gap-2 justify-end text-[11px]">
                        <button
                          onClick={handleUpdate}
                          className="rounded-lg bg-sky-600 px-2.5 py-1 font-semibold text-white hover:bg-sky-500"
                        >
                          Lưu
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditingContent("");
                          }}
                          className="rounded-lg border border-slate-600 px-2.5 py-1 font-semibold text-slate-200 hover:bg-slate-800"
                        >
                          Hủy
                        </button>
                      </div>
                    </div>
                  )}

                  {/* actions cho owner */}
                  {isOwner && !isEditing && (
                    <div className="mt-1 flex gap-3 text-[10px] text-slate-400">
                      <button
                        onClick={() => startEdit(c)}
                        className="hover:text-sky-400"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="hover:text-rose-400"
                      >
                        Xoá
                      </button>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* form viết bình luận */}
      <div className="mt-2 border-t border-slate-800 pt-2">
        {!canInteract ? (
          <p className="text-[11px] text-slate-500">
            Đăng nhập để tham gia bình luận.
          </p>
        ) : (
          <div className="flex gap-2">
            <textarea
              className="flex-1 min-h-[40px] resize-none rounded-lg border border-slate-700 bg-slate-950/70 p-2 text-[13px] text-slate-100 outline-none placeholder:text-slate-500 focus:border-sky-500"
              rows={2}
              placeholder="Viết bình luận..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
            />
            <button
              onClick={handleAdd}
              disabled={submitting || !newContent.trim()}
              className="h-fit rounded-lg bg-sky-600 px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-sky-500 disabled:opacity-50"
            >
              Gửi
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
