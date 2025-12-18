// src/components/Navbar.tsx
import Link from "next/link";
import NavbarUser from "./NavbarUser";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-sky-100/70 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        {/* Logo + brand */}
        <Link href="/" className="flex items-center gap-2 font-extrabold text-sky-700 dark:text-sky-300">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-sky-600 text-white">L</span>
          <span className="text-slate-900 dark:text-slate-100">Lio Connect</span>
        </Link>

        {/* Nav links (giữa) */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-700 dark:text-slate-300">
          <Link className="hover:text-sky-700 dark:hover:text-sky-300" href="/">Trang chủ</Link>
          <Link className="hover:text-sky-700 dark:hover:text-sky-300" href="/kienthuc">Học tập</Link>
          <Link className="hover:text-sky-700 dark:hover:text-sky-300" href="/mini-game">Mini game</Link>
          <Link className="hover:text-sky-700 dark:hover:text-sky-300" href="/game-2d">Game BLHD</Link>
          <Link className="hover:text-sky-700 dark:hover:text-sky-300" href="/video">Video</Link>
          <Link className="hover:text-sky-700 dark:hover:text-sky-300" href="/thao-luan">Thảo luận</Link>
        </nav>

        {/* Khu vực phải: Avatar / Đăng nhập */}
        <div className="flex items-center gap-3">
          {/* Nếu có nút dark-mode của bạn thì đặt ở đây */}
          <NavbarUser /> {/* 👈 hiện nút Đăng nhập khi chưa login; hiện avatar + menu khi đã login */}
        </div>
      </div>
    </header>
  );
}
