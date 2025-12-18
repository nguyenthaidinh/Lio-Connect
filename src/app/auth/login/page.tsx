// src/app/auth/login/page.tsx
"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getRedirectResult, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import PasswordInput from "@/components/PasswordInput";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Nếu đã đăng nhập thì đưa vào /profile luôn (KHÔNG kiểm tra emailVerified nữa)
  useEffect(() => {
    getRedirectResult(auth)
      .then((res) => {
        if (res?.user) {
          router.replace("/profile");
        }
      })
      .catch((e) => console.error("REDIRECT RESULT ERROR:", e));

    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) router.replace("/profile");
    });
    return () => unsub();
  }, [router]);

  const onLogin = async (e: FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/profile"); // ✅ chuyển thẳng profile
    } catch (e: any) {
      console.error("EMAIL LOGIN ERROR:", e?.code, e?.message);
      setErr(formatError(e?.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-indigo-50 to-violet-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl place-items-center px-4">
        <main className="w-full max-w-md rounded-2xl border border-white/50 bg-white/70 p-8 shadow-[0_10px_40px_rgba(2,132,199,.15)] backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/60">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-500 text-white shadow">
              LC
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">Đăng nhập</h1>
          </div>

          <form onSubmit={onLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold">Email</label>
              <input
                className="mt-1 w-full rounded-xl border p-3 text-sm"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">Mật khẩu</label>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <div className="mt-2 text-right">
                <Link href="/auth/forgot" className="text-xs font-semibold text-sky-700 hover:underline">
                  Quên mật khẩu?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="h-10 w-full rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 px-4 text-sm font-semibold text-white disabled:opacity-60"
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-semibold text-slate-500">hoặc</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <GoogleLoginButton
            onSuccess={() => {}}
            onError={(e: any) => setErr(formatError(e?.code))}
            className="h-10 w-full inline-flex items-center justify-center gap-2 rounded-xl border bg-white px-4 text-sm font-semibold"
          />

          {err && <p className="mt-4 rounded-lg bg-rose-50/70 p-2 text-center text-sm font-medium text-rose-700">{err}</p>}

          <p className="mt-6 text-center text-sm">
            Chưa có tài khoản?{" "}
            <Link href="/auth/register" className="font-semibold text-sky-700 hover:underline">
              Đăng ký
            </Link>
          </p>
        </main>
      </div>
    </div>
  );
}

function formatError(code?: string) {
  switch (code) {
    case "auth/invalid-email": return "Email không hợp lệ.";
    case "auth/user-not-found": return "Không tìm thấy tài khoản.";
    case "auth/wrong-password": return "Sai mật khẩu.";
    case "auth/too-many-requests": return "Bạn thử quá nhiều lần. Hãy thử lại sau.";
    default: return "Đăng nhập thất bại. Vui lòng thử lại.";
  }
}
