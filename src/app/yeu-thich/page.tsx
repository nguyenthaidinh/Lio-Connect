"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";

type BookmarkDoc = {
  postId: string;
  createdAt?: Timestamp;
};

type Post = {
  id: string;
  title?: string;
  content?: string;
  createdAt?: Timestamp;
  authorName?: string;
  authorId?: string;
};

function previewText(s?: string, max = 140) {
  if (!s) return "";
  const t = s.replace(/\s+/g, " ").trim();
  return t.length > max ? t.slice(0, max) + "…" : t;
}

export default function FavoritesPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState<Post[]>([]);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        if (!user) {
          if (alive) {
            setBookmarks([]);
            setLoading(false);
          }
          return;
        }

        // users/{uid}/bookmarks (docId = postId)
        const qy = query(
          collection(db, "users", user.uid, "bookmarks"),
          orderBy("createdAt", "desc"),
          limit(60)
        );

        const snap = await getDocs(qy);
        const ids = snap.docs.map((d) => {
          const data = d.data() as Partial<BookmarkDoc>;
          return data.postId ?? d.id;
        });

        // fetch posts
        const posts: Post[] = [];
        for (const id of ids) {
          const ps = await getDoc(doc(db, "posts", id));
          if (ps.exists()) {
            const p = ps.data() as any;
            posts.push({
              id,
              title: p.title,
              content: p.content,
              createdAt: p.createdAt,
              authorName: p.authorName,
              authorId: p.authorId,
            });
          }
        }

        if (alive) {
          setBookmarks(posts);
          setLoading(false);
        }
      } catch {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [user?.uid]);

  const empty = useMemo(() => !loading && bookmarks.length === 0, [loading, bookmarks]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-5">
        <h1 className="text-2xl font-extrabold">Các tin đã yêu thích</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Danh sách bài viết đã lưu để xem lại.
        </p>
      </header>

      {!user && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900">
          Cần đăng nhập để xem mục này.{" "}
          <Link className="font-semibold text-sky-700 hover:underline dark:text-sky-300" href="/auth/login">
            Đăng nhập
          </Link>
        </div>
      )}

      {user && loading && <p className="text-sm text-slate-500">Đang tải…</p>}

      {user && empty && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900">
          Chưa có tin nào được lưu. Vào{" "}
          <Link className="font-semibold text-sky-700 hover:underline dark:text-sky-300" href="/tro-chuyen">
            Thảo luận
          </Link>{" "}
          để lưu bài viết.
        </div>
      )}

      {user && !loading && bookmarks.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bookmarks.map((p) => (
            <Link
              key={p.id}
              href={`/tro-chuyen?post=${p.id}`}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {p.authorName ? `Tác giả: ${p.authorName}` : "Bài viết"}
              </div>
              <div className="mt-1 line-clamp-2 text-base font-bold">
                {p.title || previewText(p.content, 60) || "Bài viết đã lưu"}
              </div>
              <div className="mt-2 line-clamp-3 text-sm text-slate-600 dark:text-slate-300">
                {previewText(p.content)}
              </div>
              <div className="mt-3 text-sm font-semibold text-sky-700 dark:text-sky-300">
                Xem lại →
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
