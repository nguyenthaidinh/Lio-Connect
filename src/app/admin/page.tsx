"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import MakeMeAdminButton from "./MakeMeAdmin";

type UserRow = {
  uid: string;
  email?: string | null;
  displayName?: string | null;
  provider: string;
  role: "admin" | "user";
  disabled: boolean;
  creationTime?: string | null;
  lastSignInTime?: string | null;
};

export default function AdminPage() {
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [firstLoad, setFirstLoad] = useState(true);

  const router = useRouter();

  // ✅ Chỉ redirect nếu CHƯA đăng nhập. Non-admin thì KHÔNG redirect.
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) return router.replace("/auth/login");
      const t = await u.getIdTokenResult(true);
      setToken(t.token);
      setIsAdmin(t.claims.role === "admin");
      setReady(true);
    });
    return () => unsub();
  }, [router]);

  const fetchUsers = async (opts?: { reset?: boolean; tokenPage?: string | null }) => {
    if (!token) return;
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (opts?.tokenPage) params.set("nextPageToken", opts.tokenPage);
      params.set("limit", "50");

      const res = await fetch(`/api/admin/list-users?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Fetch users failed");

      const newUsers: UserRow[] = data.users;
      setUsers((prev) => (opts?.reset ? newUsers : [...prev, ...newUsers]));
      setNextPageToken(data.nextPageToken || null);
    } catch (e: any) {
      console.error(e);
      alert(e.message || "Không tải được danh sách users");
    } finally {
      setLoading(false);
      setFirstLoad(false);
    }
  };

  useEffect(() => {
    if (ready && isAdmin && firstLoad) fetchUsers({ reset: true, tokenPage: null });
  }, [ready, isAdmin, firstLoad]);

  const filtered = useMemo(() => users, [users]);

  const changeRole = async (uid: string, role: "admin" | "user") => {
    if (!token) return;
    try {
      const res = await fetch("/api/admin/set-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ uid, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Set role failed");
      setUsers((arr) => arr.map((u) => (u.uid === uid ? { ...u, role } : u)));
    } catch (e: any) {
      console.error(e);
      alert(e.message || "Không đổi được quyền");
    }
  };

  const deleteUser = async (uid: string) => {
    if (!token) return;
    if (!confirm("Xoá user này? Hành động không thể hoàn tác.")) return;
    try {
      const res = await fetch("/api/admin/delete-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ uid }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Delete user failed");
      setUsers((arr) => arr.filter((u) => u.uid !== uid));
    } catch (e: any) {
      console.error(e);
      alert(e.message || "Không xoá được user");
    }
  };

  if (!ready) {
    return <div className="min-h-screen grid place-items-center">Đang kiểm tra quyền quản trị…</div>;
  }

  // 👉 Nếu đã đăng nhập nhưng CHƯA là admin: hiện nút bootstrap ngay tại đây
  if (isAdmin === false) {
    return (
      <div className="min-h-screen grid place-items-center px-4">
        <div className="max-w-md w-full rounded-2xl border bg-white p-6 shadow">
          <h1 className="text-lg font-bold mb-2">Bạn chưa là admin</h1>
          <p className="text-sm text-slate-600 mb-4">
            Bấm nút bên dưới để gán quyền admin cho tài khoản đang đăng nhập.
          </p>
          <MakeMeAdminButton />
          <p className="mt-4 text-xs text-slate-500">
            Sau khi gán quyền thành công, hãy refresh trang này (hoặc đăng xuất rồi đăng nhập lại).
          </p>
        </div>
      </div>
    );
  }

  // ✅ ĐÃ là admin → hiển thị dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-violet-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-50">Bảng điều khiển Admin</h1>
            <p className="text-sm text-slate-600">Quản lý người dùng, quyền hạn và nội dung.</p>
          </div>
          <div className="flex gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Tìm theo email / tên"
              className="rounded-xl border px-3 py-2 text-sm shadow-sm"
            />
            <button
              onClick={() => fetchUsers({ reset: true, tokenPage: null })}
              className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-sky-700"
            >
              Tìm
            </button>
          </div>
        </header>

        <main className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 text-slate-900 shadow-lg">
          <h2 className="mb-3 text-lg font-bold">Người dùng</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b bg-white/60">
                  <th className="px-3 py-2 text-left">User</th>
                  <th className="px-3 py-2 text-left">Provider</th>
                  <th className="px-3 py-2 text-left">Role</th>
                  <th className="px-3 py-2 text-left">Tạo lúc</th>
                  <th className="px-3 py-2 text-left">Đăng nhập gần nhất</th>
                  <th className="px-3 py-2 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.uid} className="border-b last:border-0">
                    <td className="px-3 py-2">
                      <div className="font-medium">{u.displayName || "—"}</div>
                      <div className="text-slate-500">{u.email || "—"}</div>
                    </td>
                    <td className="px-3 py-2">{u.provider}</td>
                    <td className="px-3 py-2">
                      <span
                        className={
                          u.role === "admin"
                            ? "rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700"
                            : "rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700"
                        }
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="px-3 py-2">{u.creationTime ? new Date(u.creationTime).toLocaleString() : "—"}</td>
                    <td className="px-3 py-2">{u.lastSignInTime ? new Date(u.lastSignInTime).toLocaleString() : "—"}</td>
                    <td className="px-3 py-2 text-right">
                      {u.role === "admin" ? (
                        <button
                          onClick={() => changeRole(u.uid, "user")}
                          className="mr-2 rounded-xl border px-3 py-1.5 text-xs font-semibold hover:bg-gray-50"
                        >
                          Hạ quyền
                        </button>
                      ) : (
                        <button
                          onClick={() => changeRole(u.uid, "admin")}
                          className="mr-2 rounded-xl bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-600"
                        >
                          Set admin
                        </button>
                      )}
                      <button
                        onClick={() => deleteUser(u.uid)}
                        className="rounded-xl bg-rose-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-600"
                      >
                        Xoá
                      </button>
                    </td>
                  </tr>
                ))}
                {!loading && filtered.length === 0 && (
                  <tr>
                    <td className="px-3 py-6 text-center text-slate-500" colSpan={6}>
                      Không có người dùng nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-xs text-slate-500">{loading ? "Đang tải..." : " "}</div>
            <div className="flex gap-2">
              <button
                disabled={!nextPageToken || loading}
                onClick={() => fetchUsers({ tokenPage: nextPageToken!, reset: false })}
                className="rounded-xl border px-3 py-1.5 text-sm font-semibold hover:bg-gray-50 disabled:opacity-50"
              >
                Tải thêm
              </button>
              <button
                onClick={() => fetchUsers({ reset: true, tokenPage: null })}
                className="rounded-xl border px-3 py-1.5 text-sm font-semibold hover:bg-gray-50"
              >
                Làm mới
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
