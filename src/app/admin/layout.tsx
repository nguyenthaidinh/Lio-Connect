import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Admin • Lio Connect",
  description: "Khu vực quản trị hệ thống giáo dục bạo lực học đường",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Thanh trên cùng dùng chung cho mọi trang /admin */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400">
              <span className="text-lg font-bold">A</span>
            </span>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                Khu vực quản trị
              </div>
              <div className="text-[11px] text-slate-400">
                Lio Connect • Admin dashboard
              </div>
            </div>
          </div>

          <Link
            href="/"
            className="rounded-full border border-slate-700 px-3 py-1 text-xs font-medium text-slate-300 hover:border-sky-500 hover:text-sky-400"
          >
            ← Về trang chính
          </Link>
        </div>
      </header>

      {/* Vùng nội dung: để AdminPage tự lo layout/gradient bên trong */}
      <main className="mx-auto max-w-6xl px-4 py-6">
        {children}
      </main>
    </div>
  );
}
