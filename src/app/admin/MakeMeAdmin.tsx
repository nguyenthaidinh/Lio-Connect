"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";

export default function MakeMeAdminButton() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const handleClick = async () => {
    try {
      setLoading(true);
      setMsg(null);

      const user = auth.currentUser;
      if (!user) { setMsg("❌ Bạn chưa đăng nhập."); return; }

      const idToken = await user.getIdToken(true);

      const res = await fetch("/api/admin/bootstrap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({}),
      });

      let data: any;
      try { data = await res.json(); }
      catch { data = { error: await res.text() }; }

      if (!res.ok) { setMsg(`❌ ${data?.error || "Bootstrap failed"}`); return; }

      await user.getIdToken(true);
      setMsg("✅ Bạn đã trở thành ADMIN. Refresh trang để dùng quyền admin.");
    } catch (e: any) {
      setMsg(`❌ ${e?.message || e}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-xl max-w-md space-y-2">
      <button
        onClick={handleClick}
        disabled={loading}
        className="px-4 py-2 rounded-lg border bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Đang gán quyền…" : "Make me admin"}
      </button>
      {msg && <p className="text-sm whitespace-pre-wrap">{msg}</p>}
    </div>
  );
}
    