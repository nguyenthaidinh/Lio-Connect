"use client";
import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert(`Đã ghi nhận: ${email}`);
    setEmail("");
  }

  return (
    <form className="flex gap-2" onSubmit={onSubmit}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-lg border border-violet-200 bg-white/80 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-300 dark:border-slate-700 dark:bg-slate-950"
        placeholder="Nhập email của bạn"
      />
      <button className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700">
        Đăng ký
      </button>
    </form>
  );
}
