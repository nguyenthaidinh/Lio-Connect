"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";

export default function NavbarUser() {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null); // 👈 thêm state role
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Subscribe auth state + lấy custom claims (role)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const tokenResult = await u.getIdTokenResult(true);
        setRole((tokenResult.claims.role as string) ?? null);
      } else {
        setRole(null);
      }
    });
    return () => unsub();
  }, []);

  // Click outside để đóng dropdown
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // UI khi chưa đăng nhập
  if (!user) {
    return (
      <Link
        href="/auth/login"
        className="rounded-xl bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700"
      >
        Đăng nhập
      </Link>
    );
  }

  // Avatar fallback
  const avatar =
    user.photoURL ||
    `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${encodeURIComponent(
      user.displayName || user.email || "User",
    )}`;

  const onLogout = async () => {
    await signOut(auth);
    setOpen(false);
    router.push("/auth/login");
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 p-0.5 shadow-sm hover:shadow dark:border-slate-700 dark:bg-slate-900/60"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <img
          src={avatar}
          alt="avatar"
          className="h-8 w-8 rounded-full object-cover"
        />
        {/* badge nhỏ hiện chỉ khi là admin */}
        {role === "admin" && (
          <span className="hidden rounded-full bg-amber-500/15 px-2 py-[2px] text-[11px] font-semibold text-amber-600 sm:inline">
            Admin
          </span>
        )}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white/95 shadow-lg backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/90"
        >
          {/* Header */}
          <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-900 dark:text-slate-100">
                  {user.displayName || "Người dùng"}
                </div>
                <div className="truncate text-xs text-slate-500 dark:text-slate-400">
                  {user.email}
                </div>
              </div>
              {role === "admin" && (
                <span className="ml-2 rounded-full bg-amber-500/15 px-2 py-[2px] text-[10px] font-semibold uppercase tracking-wide text-amber-600">
                  Admin
                </span>
              )}
            </div>
          </div>

          {/* Items */}
          <nav className="p-1 text-sm">
            {/* 👉 chỉ ADMIN mới thấy mục này */}
            {role === "admin" && (
              <MenuItem href="/admin" icon={<AdminIcon />}>
                Khu vực quản trị
              </MenuItem>
            )}

            <MenuItem href="/profile" icon={<UserIcon />}>
              Trang cá nhân
            </MenuItem>
            <MenuItem href="/yeu-thich" icon={<BookmarkIcon />}>
              Các tin đã yêu thích
            </MenuItem>
            <MenuItem href="/lich-su" icon={<UsersClockIcon />}>
              Lịch sử hoạt động
            </MenuItem>

            <div className="my-1 h-px bg-slate-100 dark:bg-slate-800" />

            <button
              onClick={onLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20"
            >
              <LogoutIcon />
              Đăng xuất
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}

/* ---- Small subcomponents/icons ---- */

function MenuItem({
  href,
  icon,
  children,
}: {
  href: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800/60"
    >
      {icon}
      <span className="font-medium">{children}</span>
    </Link>
  );
}

function AdminIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2 4 5v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V5l-8-3Zm0 2.18L18 6.1v4.9c0 4.04-2.64 7.82-6 9.16-3.36-1.34-6-5.12-6-9.16V6.1l6-1.92Zm0 2.82a3 3 0 1 0 3 3 3.003 3.003 0 0 0-3-3Z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5Z" />
    </svg>
  );
}
function BookmarkIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 2h12a1 1 0 0 1 1 1v18l-7-4-7 4V3a1 1 0 0 1 1-1Z" />
    </svg>
  );
}
function UsersClockIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 11a4 4 0 1 1 3.999-4A3.999 3.999 0 0 1 8 11Zm8-2a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm0 2c-2.673 0-8 1.337-8 4v2h8v-2a5.935 5.935 0 0 1 1.17-3.5A10.2 10.2 0 0 0 16 11Zm-8 2c-2.673 0-8 1.337-8 4v2h6v-2a5.935 5.935 0 0 1 1.17-3.5A10.2 10.2 0 0 0 8 13Zm9 0a6 6 0 1 1-6 6h2a4 4 0 1 0 4-4v2l-3-3 3-3Z" />
    </svg>
  );
}
function LogoutIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5v-2H5V5h5V3Zm9.707 8.293-3-3-1.414 1.414L16.586 11H11v2h5.586l-1.293 1.293 1.414 1.414 3-3a1 1 0 0 0 0-1.414Z" />
    </svg>
  );
}
