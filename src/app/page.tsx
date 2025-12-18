// src/app/page.tsx — Home (server component)
// Layout đã có Navbar/Footer/ChatWidget. Chủ đạo: xanh da trời nhạt.

import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "../components/NewsletterForm";
import AuthCTA from "../components/AuthCTA";
import { pickFeaturedVideo } from "./video/homeFeatured";

/* ==== Small helpers ===================================================== */
function Band({ children }: { children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-sky-100 bg-gradient-to-r from-sky-50 via-indigo-50 to-violet-50 p-6 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      {children}
    </section>
  );
}

function Card({
  title,
  desc,
  href,
  hue = "sky",
}: {
  title: string;
  desc: string;
  href: string;
  hue?: "sky" | "indigo" | "emerald" | "violet";
}) {
  const color = {
    sky: "border-sky-100 hover:bg-sky-50/70",
    indigo: "border-indigo-100 hover:bg-indigo-50/70",
    emerald: "border-emerald-100 hover:bg-emerald-50/70",
    violet: "border-violet-100 hover:bg-violet-50/70",
  }[hue];

  return (
    <Link
      href={href}
      className={`rounded-2xl border bg-white/80 p-4 shadow-sm transition ${color} dark:bg-slate-950/60 dark:border-slate-800 dark:hover:bg-slate-900`}
      aria-label={`${title} – xem chi tiết`}
    >
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{desc}</p>
      <div className="mt-2 text-sm font-semibold text-sky-700 dark:text-sky-300">
        Xem chi tiết →
      </div>
    </Link>
  );
}

/* ==== PAGE ============================================================== */
export default function Home() {
  // ✅ Video nổi bật lấy từ data.ts (không cần thumb-video.jpg)
  const featured = pickFeaturedVideo({ random: false }); // đổi true nếu muốn random mỗi lần refresh

  return (
    <div className="space-y-14">
      {/* === HERO ======================================= */}
      <Band>
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-2 md:grid-cols-2">
          {/* Left copy */}
          <div className="space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-200/70 bg-white/70 px-3 py-1 text-xs font-semibold text-sky-700 shadow-sm backdrop-blur-sm dark:bg-slate-950/40">
              <span className="h-2 w-2 rounded-full bg-sky-400" />
              Lio Connect • Chia sẻ để thấu hiểu, kết nối để thay đổi
            </span>

            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-slate-100">
              Ngăn chặn bạo lực hôm nay{" "}
              <span className="bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
                Gieo mầm tương lai ngày mai
              </span>
            </h1>

            <p className="text-slate-700 dark:text-slate-300 md:text-lg">
              Nơi kết nối tri thức và sẻ chia, giúp học sinh, giáo viên và phụ
              huynh cùng nhận biết, phòng tránh và xử lý bạo lực học đường. Chung
              tay xây dựng môi trường học đường an toàn, đầy yêu thương và tôn
              trọng.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/kienthuc"
                className="rounded-2xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-sky-200 transition hover:-translate-y-0.5 hover:bg-sky-700 dark:shadow-none"
              >
                Bắt đầu học
              </Link>
              <Link
                href="/mini-game"
                className="rounded-2xl border border-sky-200/70 px-5 py-2.5 text-sm font-semibold text-sky-800 transition hover:bg-sky-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
              >
                Chơi mini game
              </Link>
              <Link
                href="/tro-chuyen"
                className="rounded-2xl border border-indigo-200/70 px-5 py-2.5 text-sm font-semibold text-indigo-800 transition hover:bg-indigo-50 dark:border-slate-700 dark:text-slate-200"
              >
                Vào thảo luận
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 text-center text-sm">
              {[
                ["18+", "Bài học"],
                ["9", "Mini game"],
                ["Realtime", "Thảo luận"],
              ].map(([n, t]) => (
                <div
                  key={t}
                  className="rounded-2xl border border-sky-100/70 bg-white/80 p-3 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/60"
                >
                  <div className="text-2xl font-extrabold text-sky-700 dark:text-sky-300">
                    {n}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">{t}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right banner */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-sky-100/70 bg-white/60 p-2 shadow-[0_10px_30px_rgba(2,132,199,.15)] ring-1 ring-sky-200/50 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/40 dark:ring-slate-800">
              {/* blobs */}
              <div className="pointer-events-none absolute -left-14 -top-16 h-44 w-44 rounded-full bg-sky-200/50 blur-3xl dark:bg-sky-500/10" />
              <div className="pointer-events-none absolute -right-12 -bottom-16 h-56 w-56 rounded-full bg-indigo-200/50 blur-3xl dark:bg-indigo-500/10" />

              {/* banner (Unsplash) */}
              <div className="relative z-10">
                <Image
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80"
                  alt="Lio Connect banner"
                  width={1200}
                  height={800}
                  className="h-auto w-full rounded-2xl object-cover"
                  priority
                />
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/20 via-transparent to-indigo-50/30 dark:from-slate-950/20 dark:to-slate-900/30" />
              </div>
            </div>

            {/* outer glow */}
            <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[28px] bg-[radial-gradient(400px_200px_at_80%_20%,rgba(59,130,246,0.15),transparent),radial-gradient(300px_180px_at_20%_80%,rgba(99,102,241,0.12),transparent)]" />
          </div>
        </div>
      </Band>

      {/* HÀNG 1: Tin tức | Video */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-sky-100 bg-white/80 p-5 shadow-sm dark:bg-slate-950/60 dark:border-slate-800">
          <header className="mb-3">
            <h2 className="text-xl font-bold text-sky-800 dark:text-sky-300">
              Tin tức & câu chuyện
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Cập nhật góc nhìn thực tế trong & ngoài lớp.
            </p>
          </header>
          <ul className="space-y-3 text-sm">
            {[
              "‘Một lời trêu đùa’ – ranh giới mong manh giữa vui và tổn thương",
              "5 bước báo cáo khi chứng kiến BLHĐ (poster tải nhanh)",
              "Dấu hiệu con bị cô lập & cách đồng hành của phụ huynh",
              "Case study: giải quyết xung đột nhóm chat lớp",
            ].map((t, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl border border-sky-100 bg-sky-50/50 p-3 hover:bg-sky-50 dark:border-slate-800 dark:bg-slate-900/40"
              >
                <span className="mt-0.5 h-2 w-2 rounded-full bg-sky-500" />
                <div className="min-w-0">
                  <p className="font-medium">{t}</p>
                  <p className="text-slate-500 dark:text-slate-400">
                    Đọc nhanh • 3–5 phút
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-right">
            <Link
              href="/kienthuc"
              className="text-sm font-semibold text-sky-700 hover:underline dark:text-sky-300"
            >
              Xem tất cả →
            </Link>
          </div>
        </section>

        {/* ✅ VIDEO NỔI BẬT: thumbnail thật từ YouTube */}
        <section className="rounded-2xl border border-indigo-100 bg-white/80 p-5 shadow-sm dark:bg-slate-950/60 dark:border-slate-800">
          <header className="mb-3">
            <h2 className="text-xl font-bold text-indigo-800 dark:text-indigo-300">
              Video nổi bật
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Xem tình huống – trả lời 3 câu hỏi.
            </p>
          </header>

          {featured && (
            <Link
              href={`/video?v=${featured.id}`}
              className="group relative block overflow-hidden rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-sky-50 p-0 dark:border-slate-800 dark:from-slate-900 dark:to-slate-900"
              aria-label="Xem video nổi bật"
            >
              <div className="aspect-video w-full">
                <img
                  src={`https://img.youtube.com/vi/${featured.youtubeId}/hqdefault.jpg`}
                  alt={featured.title}
                  className="h-full w-full object-cover opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
              </div>

              <div className="pointer-events-none absolute inset-0 grid place-items-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-white/90 shadow-xl ring-1 ring-black/5 transition group-hover:scale-105">
                  ▶
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <div className="line-clamp-2 text-xs font-semibold text-white">
                  {featured.title}
                </div>
                <div className="mt-1 text-[11px] text-white/80">
                  {featured.category} • {featured.source}
                </div>
              </div>
            </Link>
          )}

          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            {["Nhận biết BLHĐ?", "Ứng xử khi bị trêu ác ý", "Bảo vệ danh dự online"].map(
              (q) => (
                <span
                  key={q}
                  className="rounded-full border border-indigo-200 px-2 py-1 dark:border-slate-700"
                >
                  {q}
                </span>
              )
            )}
          </div>
          <div className="mt-3">
            <Link
              href="/video"
              className="rounded-lg border border-indigo-200 px-3 py-2 text-sm font-semibold text-indigo-800 hover:bg-indigo-50 dark:border-slate-700 dark:text-slate-200"
            >
              Xem thêm video
            </Link>
          </div>
        </section>
      </div>

      {/* HÀNG 2: Thảo luận | Mini game | Góc luật */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card
          title="Thảo luận ẩn danh"
          desc="Đặt câu hỏi, chia sẻ—bộ lọc từ khoá & báo cáo nội dung giúp môi trường an toàn."
          href="/tro-chuyen"
          hue="indigo"
        />
        <Card
          title="Mini game luyện nhanh"
          desc="Quiz, đúng/sai, kéo-thả. Tính điểm & huy hiệu – ôn tập sau mỗi bài."
          href="/mini-game"
          hue="emerald"
        />
        <Card
          title="Góc luật & quyền"
          desc="Hiểu đúng quy định, biết quyền & trách nhiệm — cách báo cáo, hỗ trợ học đường."
          href="/kienthuc"
          hue="violet"
        />
      </div>

      {/* CHỦ ĐỀ NỔI BẬT */}
      <section className="rounded-2xl border border-sky-100 bg-white/80 p-6 shadow-sm dark:bg-slate-950/60 dark:border-slate-800">
        <h2 className="mb-4 text-xl font-bold text-sky-800 dark:text-sky-300">
          Chủ đề nổi bật
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Nhận biết bạo lực tinh thần", "Dấu hiệu & cách ứng xử khéo léo."],
            ["An toàn trên mạng xã hội", "Bảo vệ danh dự, dữ liệu & quyền riêng tư."],
            ["Bạn bè tôn trọng khác biệt", "Không kỳ thị – không gọi biệt danh ác ý."],
            ["Khi thấy bạn bị cô lập", "Cách hỗ trợ tế nhị & hiệu quả."],
            ["Báo cáo & tìm trợ giúp", "Người liên hệ, kênh báo cáo, mẫu đơn."],
            ["Phụ huynh đồng hành", "Gợi ý trao đổi nhẹ nhàng với con."],
          ].map(([t, d], i) => (
            <Link
              key={i}
              href="/kienthuc"
              className="rounded-2xl border border-sky-100 bg-sky-50/40 p-4 hover:bg-sky-50 dark:border-slate-800 dark:bg-slate-900/40"
            >
              <div className="text-sm font-semibold">{t}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">{d}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* BỘ CÔNG CỤ AN TOÀN */}
      <Band>
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-4">
          {[
            ["Checklist xử lý nhanh", "4 bước khi gặp bạo lực / chứng kiến."],
            ["Mẫu báo cáo", "Tải nhanh mẫu ghi nhận sự việc."],
            ["Đường dây nóng", "Liên hệ GVCN / Phòng CT HSSV / Tổng đài."],
            ["Tài liệu cho phụ huynh", "Bộ gợi ý đối thoại & lộ trình đồng hành."],
          ].map(([t, d]) => (
            <div
              key={t}
              className="rounded-2xl border border-emerald-100 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/60"
            >
              <div className="text-base font-semibold">{t}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">{d}</div>
              <div className="mt-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                Tải / xem →
              </div>
            </div>
          ))}
        </div>
      </Band>

      {/* CÂU CHUYỆN TÍCH CỰC */}
      <section className="rounded-2xl border border-rose-100 bg-white/80 p-6 shadow-sm dark:bg-slate-950/60 dark:border-slate-800">
        <h2 className="mb-4 text-xl font-bold text-rose-700 dark:text-rose-300">
          Câu chuyện tích cực
        </h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            ["Lớp 10A dừng biệt danh ác ý", "Sau 2 tuần truyền thông, lớp dừng hẳn việc trêu ác ý."],
            ["CLB ‘Bạn là bạn’", "Mỗi tháng 1 buổi chia sẻ – hỗ trợ bạn gặp khó khăn."],
            ["Tổ tư vấn ẩn danh", "Phòng tư vấn trực tuyến giúp 06 bạn giải tỏa áp lực."],
          ].map(([t, d]) => (
            <div
              key={t}
              className="rounded-2xl border border-rose-100 bg-rose-50/40 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/40"
            >
              <div className="font-semibold">{t}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">{d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ĐỐI TÁC / NGUỒN THAM KHẢO */}
      <section className="rounded-2xl border border-slate-100 bg-white/80 p-6 shadow-sm dark:bg-slate-950/60 dark:border-slate-800">
        <h2 className="mb-4 text-xl font-bold">Đối tác & nguồn tham khảo</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {["UNICEF", "MOET", "WHO", "Cyber Safety"].map((n) => (
            <div
              key={n}
              className="grid h-16 place-items-center rounded-xl border border-slate-100 bg-slate-50/60 text-sm font-semibold dark:border-slate-800 dark:bg-slate-900/40"
            >
              {n}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Câu hỏi thường gặp</h2>
        {[
          [
            "BLHĐ gồm những dạng nào?",
            "Thể chất, tinh thần, online; ví dụ: cô lập, đặt biệt danh ác ý, phát tán thông tin sai, đe doạ trên mạng…",
          ],
          [
            "Khi bị trêu ác ý nên làm gì?",
            "Giữ bình tĩnh, tránh đáp trả tương tự; ghi nhận bằng chứng; báo ngay GVCN/nhà trường; tìm người hỗ trợ tin cậy.",
          ],
          [
            "Ai có thể vào thảo luận ẩn danh?",
            "Học sinh, phụ huynh, giáo viên đều có thể — nội dung được kiểm duyệt & có bộ lọc từ khoá nhạy cảm.",
          ],
        ].map(([q, a]) => (
          <details
            key={q}
            className="group rounded-2xl border bg-white/80 p-4 open:bg-white shadow-sm dark:bg-slate-950/60 dark:border-slate-800"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold">
              {q}
              <span className="text-xl transition group-open:rotate-180">⌄</span>
            </summary>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{a}</p>
          </details>
        ))}
      </section>

      {/* Newsletter (Client component) */}
      <section className="rounded-2xl border border-violet-100 bg-gradient-to-r from-violet-50 to-sky-50 p-6 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:to-slate-900">
        <div className="mx-auto grid max-w-5xl items-center gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold text-violet-800 dark:text-violet-300">
              Nhận bản tin Lio Connect
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Cập nhật bài học, mini game, video mới mỗi tuần.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>

      {/* CTA cuối */}
      <section className="rounded-2xl border border-sky-100 bg-sky-50 p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
        <h3 className="text-2xl font-bold text-sky-900 dark:text-sky-200">
          Sẵn sàng cùng Lio Connect?
        </h3>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
          Đăng nhập để lưu tiến độ, tích huy hiệu và tham gia bảng xếp hạng.
        </p>
        <div className="mt-4 flex justify-center gap-3">
          <Link
            href="/auth/login"
            className="rounded-2xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-700"
          >
            Đăng nhập
          </Link>
          <Link
            href="/kienthuc"
            className="rounded-2xl border border-sky-200 px-4 py-2.5 text-sm font-semibold text-sky-800 hover:bg-sky-50 dark:border-slate-700 dark:text-slate-200"
          >
            Xem bài học
          </Link>
        </div>
      </section>
    </div>
  );
}
