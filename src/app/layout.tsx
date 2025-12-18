import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import ChatWidget from "../components/ChatWidget";
import { Manrope } from "next/font/google";
import { AuthProvider } from "@/hooks/useAuth"; // ⬅ THÊM DÒNG NÀY

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lio Connect",
  description: "Chia sẻ để thấu hiểu, kết nối để thay đổi.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className="h-full" suppressHydrationWarning>
      <body
        className={`${manrope.className} min-h-dvh bg-gradient-to-b from-sky-50 to-white text-slate-900 antialiased dark:from-slate-950 dark:to-slate-950 dark:text-slate-100`}
      >
        {/* Bọc toàn bộ app bằng AuthProvider */}
        <AuthProvider>
          <Navbar />
          <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>

          {/* FOOTER mới */}
          <footer className="mt-16 border-t border-sky-100 bg-white/80 dark:border-slate-800 dark:bg-slate-950/60">
            <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-extrabold text-sky-700 dark:text-sky-300">
                  <span className="grid h-7 w-7 place-items-center rounded-md bg-sky-600 text-white">
                    L
                  </span>
                  Lio Connect
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Chia sẻ để thấu hiểu, kết nối để thay đổi.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 dark:text-slate-200">Khám phá</h4>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <a className="hover:text-sky-700 dark:hover:text-sky-300" href="/hoc-tap">
                      Học tập
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-sky-700 dark:hover:text-sky-300" href="/mini-game">
                      Mini game
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-sky-700 dark:hover:text-sky-300" href="/game-2d">
                      Game BLHD
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-sky-700 dark:hover:text-sky-300" href="/video">
                      Video
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 dark:text-slate-200">Cộng đồng</h4>
                <ul className="mt-3 space-y-2 text-sm">
                  {/* Lưu ý: nếu Lio đang dùng folder /thao-luan thì sửa href cho khớp */}
                  <li>
                    <a className="hover:text-sky-700 dark:hover:text-sky-300" href="/thao-luan">
                      Thảo luận
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-sky-700 dark:hover:text-sky-300" href="/auth/login">
                      Đăng nhập
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 dark:text-slate-200">Liên hệ</h4>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    📞{" "}
                    <a
                      href="tel:039482846"
                      className="hover:text-sky-700 dark:hover:text-sky-300"
                    >
                      039482846
                    </a>
                  </li>
                  <li>
                    ✉️{" "}
                    <a
                      href="mailto:ntdinh16124@gmail.com"
                      className="hover:text-sky-700 dark:hover:text-sky-300"
                    >
                      ntdinh16124@gmail.com
                    </a>
                  </li>
                  <li>🏠 567 Lê Duẫn</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-sky-100 py-4 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
              © {new Date().getFullYear()} Lio Connect. All rights reserved.
            </div>
          </footer>

          {/* Chatbot nổi */}
          <ChatWidget />
        </AuthProvider>
      </body>
    </html>
  );
}
