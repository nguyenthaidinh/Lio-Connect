// src/app/auth/register/page.tsx
"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
  type User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import PasswordInput from "@/components/PasswordInput";

export default function RegisterPage() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);

  const [me, setMe] = useState<User | null | undefined>(undefined);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setMe(u ?? null));
    return () => unsub();
  }, []);

  const onLogoutToRegister = async () => {
    await signOut(auth);
    setMe(null);
  };

  const onRegister = async (e: FormEvent) => {
    e.preventDefault();
    setErr(null);

    if (!agree) return setErr("Bạn cần đồng ý Điều khoản & Chính sách.");
    if (password !== confirm) return setErr("Mật khẩu nhập lại không khớp.");
    if (password.length < 6) return setErr("Mật khẩu tối thiểu 6 ký tự.");

    setLoading(true);
    try {
      // 1) Tạo tài khoản (Firebase sẽ tự đăng nhập)
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      // 2) Cập nhật tên hiển thị (tuỳ chọn)
      if (displayName.trim()) {
        await updateProfile(cred.user, { displayName: displayName.trim() });
      }

      // 3) ĐĂNG XUẤT NGAY → chuyển sang trang Đăng nhập
      await signOut(auth);
      router.replace("/auth/login");
    } catch (e: any) {
      console.error("REGISTER ERROR:", e?.code, e?.message);
      setErr(formatError(e?.code));
    } finally {
      setLoading(false);
    }
  };

  if (me === undefined) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <div className="animate-pulse text-sm text-slate-500">Đang tải…</div>
      </div>
    );
  }

  if (me) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-indigo-50 to-violet-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
        <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl place-items-center px-4">
          <main className="w-full max-w-md rounded-2xl border border-white/50 bg-white/80 p-8 text-center shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/60">
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-500 text-white shadow">
              ℹ️
            </div>
            <h1 className="text-xl font-bold">Bạn đang đăng nhập</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Hiện tại bạn đang đăng nhập bằng <b>{me.email}</b>.
              <br />Muốn tạo tài khoản mới? Hãy đăng xuất trước.
            </p>
            <div className="mt-4 grid gap-2">
              <button
                onClick={onLogoutToRegister}
                className="w-full rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
              >
                Đăng xuất & tạo tài khoản mới
              </button>
              <Link
                href="/profile"
                className="w-full rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-900/50"
              >
                Về trang cá nhân
              </Link>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-indigo-50 to-violet-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl place-items-center px-4">
        <main className="w-full max-w-md rounded-2xl border border-white/50 bg-white/70 p-8 shadow-[0_10px_40px_rgba(2,132,199,.15)] backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/60">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-500 text-white shadow">
              LC
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              Đăng ký
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Tạo tài khoản mới ✨</p>
          </div>

          <form onSubmit={onRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Tên hiển thị (tuỳ chọn)
              </label>
              <input
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white/80 p-3 text-sm shadow-sm outline-none placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900/60"
                placeholder="Lio"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>

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

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Mật khẩu
              </label>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Nhập lại mật khẩu
              </label>
              <PasswordInput
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                autoComplete="new-password"
              />
            </div>

            <label className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
              <input
                type="checkbox"
                className="mt-0.5"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              Tôi đồng ý với{" "}
              <Link href="/terms" className="text-sky-600 underline">Điều khoản</Link> &{" "}
              <Link href="/privacy" className="text-sky-600 underline">Chính sách</Link>.
            </label>

            <button
              type="submit"
              disabled={loading}
              className="h-10 w-full rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 px-4 text-sm font-semibold text-white shadow-md transition hover:brightness-110 disabled:opacity-60"
            >
              {loading ? "Đang tạo tài khoản..." : "Đăng ký"}
            </button>

            {err && (
              <p className="mt-2 rounded-lg bg-rose-50/70 p-2 text-center text-sm font-medium text-rose-700 dark:bg-rose-950/30 dark:text-rose-300">
                {err}
              </p>
            )}
          </form>

          <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
            Đã có tài khoản?{" "}
            <Link href="/auth/login" className="font-semibold text-sky-700 hover:underline dark:text-sky-300">
              Đăng nhập
            </Link>
          </p>
        </main>
      </div>
    </div>
  );
}

function formatError(code?: string) {
  switch (code) {
    case "auth/email-already-in-use": return "Email này đã được sử dụng.";
    case "auth/invalid-email": return "Email không hợp lệ.";
    case "auth/weak-password": return "Mật khẩu quá yếu (tối thiểu 6 ký tự).";
    case "auth/operation-not-allowed": return "Provider chưa được bật trong Firebase.";
    case "auth/network-request-failed": return "Lỗi mạng hoặc extension đang chặn kết nối.";
    case "auth/invalid-api-key": return "API key chưa nạp đúng từ .env.local.";
    default: return "Đăng ký thất bại. Vui lòng thử lại.";
  }
}
