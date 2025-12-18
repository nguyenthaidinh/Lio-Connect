"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErr(null);
    setSent(false);
    setLoading(true);
    try {
      // Dùng trang reset mặc định của Firebase, không cần handleCodeInApp
      await sendPasswordResetEmail(auth, email);
      setSent(true);
    } catch (e: any) {
      console.error("RESET PASSWORD ERROR:", e?.code, e?.message);
      setErr(formatError(e?.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-indigo-50 to-violet-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl place-items-center px-4">
        <main className="w-full max-w-md rounded-2xl border border-white/50 bg-white/70 p-8 shadow-[0_10px_40px_rgba(2,132,199,.15)] backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/60">
          {/* Header */}
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-500 text-white shadow">
              LC
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              Quên mật khẩu
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Nhập email để nhận liên kết đặt lại mật khẩu.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Email
              </label>
              <input
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white/80 p-3 text-sm shadow-sm outline-none placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900/60"
                placeholder="you@example.com"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="h-10 w-full rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 px-4 text-sm font-semibold text-white shadow-md transition hover:brightness-110 disabled:opacity-60"
            >
              {loading ? "Đang gửi..." : "Gửi liên kết đặt lại"}
            </button>

            {sent && (
              <p className="rounded-lg bg-emerald-50/80 p-2 text-center text-sm font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                Đã gửi! Kiểm tra hộp thư (Inbox/Spam) để đặt lại mật khẩu.
              </p>
            )}
            {err && (
              <p className="rounded-lg bg-rose-50/70 p-2 text-center text-sm font-medium text-rose-700 dark:bg-rose-950/30 dark:text-rose-300">
                {err}
              </p>
            )}
          </form>

          <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
            <Link href="/auth/login" className="font-semibold text-sky-700 hover:underline dark:text-sky-300">
              ← Quay lại đăng nhập
            </Link>
            {" · "}
            <Link href="/auth/register" className="font-semibold text-sky-700 hover:underline dark:text-sky-300">
              Tạo tài khoản mới
            </Link>
          </p>
        </main>
      </div>
    </div>
  );
}

function formatError(code?: string) {
  switch (code) {
    case "auth/missing-email": return "Vui lòng nhập email.";
    case "auth/invalid-email": return "Email không hợp lệ.";
    case "auth/user-not-found": return "Không tìm thấy tài khoản với email này.";
    case "auth/too-many-requests": return "Bạn yêu cầu quá nhiều lần. Hãy thử lại sau.";
    case "auth/unauthorized-domain": return "Domain chưa được cho phép trong Firebase.";
    default: return "Gửi email thất bại. Vui lòng thử lại.";
  }
}
