// src/components/GoogleLoginButton.tsx
"use client";

import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

export default function GoogleLoginButton({
  className = "w-full flex items-center justify-center gap-2 rounded-lg border py-2 font-medium hover:bg-gray-50 transition",
  onSuccess,
  onError,
}: {
  className?: string;
  onSuccess?: (user: any) => void;
  onError?: (e: unknown) => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await signInWithPopup(auth, googleProvider);
      onSuccess?.(res.user);
    } catch (e) {
      onError?.(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleLogin} disabled={loading} className={className}>
      <svg className="h-5 w-5" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C34.1 32 29.6 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-9 20-20 0-1.3-.1-2.3-.4-3.5z"/>
        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.4 15.2 18.8 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.5 29.3 4 24 4 16.1 4 9.3 8.3 6.3 14.7z"/>
        <path fill="#4CAF50" d="M24 44c5.4 0 10.1-1.8 13.5-4.9l-6.2-5.2C29.6 36 27 37 24 37c-5.6 0-10.1-4-11.3-9.5l-6.6 5.1C9.3 39.7 16.1 44 24 44z"/>
        <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3C34.1 32 29.6 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-9 20-20 0-1.3-.1-2.3-.4-3.5z"/>
      </svg>
      {loading ? "Đang đăng nhập..." : "Đăng nhập với Google"}
    </button>
  );
}
