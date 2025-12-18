"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function AuthCTA() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  if (user) {
    // Nếu đã login
    return (
      <div className="mt-4 flex justify-center gap-3">
        <Link
          href="/profile"
          className="rounded-2xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-700"
        >
          Trang cá nhân
        </Link>
        <Link
          href="/kienthuc"
          className="rounded-2xl border border-sky-200 px-4 py-2.5 text-sm font-semibold text-sky-800 hover:bg-sky-50 dark:border-slate-700 dark:text-slate-200"
        >
          Xem bài học
        </Link>
      </div>
    );
  }

  // Nếu chưa login
  return (
    <div className="mt-4 flex justify-center gap-3">
      <Link
        href="/auth/login"
        className="rounded-2xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-700"
      >
        Đăng nhập
      </Link>
      <Link
        href="/kienthuc"
        className="rounded-2xl border border-sky-200 px-4 py-2.5 text-sm font-semibold text-sky-800 hover:bg-sky-50 dark:border-slate-700 dark:text-slate-200"
      >
        Xem bài học
      </Link>
    </div>
  );
}
