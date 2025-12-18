// src/app/kienthuc/page.tsx
import ThemeToggle from "@/components/ThemeToggle";
import LawDocList from "./LawDocList";
import BlhdArticleList from "./BlhdArticleList";
import ShareBox from "./ShareBox";

export default function StudyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-6 lg:py-10">
        {/* ===== HEADER GIỐNG CÁC BÁO ĐIỆN TỬ ===== */}
        <header className="flex flex-col gap-4 border-b border-slate-200 pb-4 dark:border-slate-800 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-300">
              Góc học tập • Bạo lực học đường
            </p>
            <h1 className="text-2xl font-extrabold leading-tight sm:text-3xl">
              Học tập &amp; Tài liệu pháp luật
            </h1>
            <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-300">
              Tổng hợp <span className="font-semibold">tài liệu luật</span>,{" "}
              <span className="font-semibold">bài viết báo chí</span> và{" "}
              <span className="font-semibold">nghiên cứu về bạo lực học đường</span>{" "}
              để phục vụ học tập, làm bài thuyết trình và tuyên truyền tại trường.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* mini-nav tới từng khu vực */}
            <nav className="hidden gap-2 text-xs font-medium text-slate-600 dark:text-slate-300 sm:flex">
              <a
                href="#law-docs"
                className="rounded-full border border-slate-200 px-3 py-1 hover:border-sky-500 hover:text-sky-600 dark:border-slate-700 dark:hover:border-sky-400 dark:hover:text-sky-300"
              >
                Tài liệu luật
              </a>
              <a
                href="#news"
                className="rounded-full border border-slate-200 px-3 py-1 hover:border-sky-500 hover:text-sky-600 dark:border-slate-700 dark:hover:border-sky-400 dark:hover:text-sky-300"
              >
                Tin tức &amp; bài báo
              </a>
            </nav>

            <ThemeToggle />
          </div>
        </header>

        {/* ===== LAYOUT 2 CỘT: MAIN + SIDEBAR ===== */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.9fr),320px]">
          {/* ==== CỘT CHÍNH: TÀI LIỆU + BÀI BÁO ==== */}
          <main className="space-y-8">
            {/* khối tài liệu luật */}
            <section
              id="law-docs"
              className="rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 sm:p-6"
            >
              <LawDocList />
            </section>

            {/* khối tin tức & bài báo */}
            <section
              id="news"
              className="rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 sm:p-6"
            >
              <BlhdArticleList />
            </section>
          </main>

          {/* ==== SIDEBAR: SHARE BOX + GỢI Ý ==== */}
          <aside className="space-y-4 lg:sticky lg:top-24 self-start">
            <ShareBox />

            <section className="rounded-2xl border border-slate-200 bg-slate-900 p-4 text-xs text-slate-100 shadow-sm dark:border-slate-800">
              <h2 className="mb-2 text-sm font-semibold">
                Gợi ý sử dụng tài liệu
              </h2>
              <ul className="list-disc space-y-1 pl-4 text-[11px] text-slate-200">
                <li>Luôn ghi rõ nguồn, ngày, năm và đường link khi trích dẫn.</li>
                <li>
                  Ưu tiên văn bản chính thức: luật, nghị định, thông tư, tài liệu
                  từ cơ quan nhà nước hoặc tạp chí khoa học.
                </li>
                <li>
                  Khi làm bài thuyết trình về BLHD, có thể kết hợp{" "}
                  <span className="font-semibold">1 tình huống báo chí</span> +
                  <span className="font-semibold"> 1 phân tích pháp lý</span> +
                  <span className="font-semibold"> 1 phần kỹ năng xử lý</span>.
                </li>
                <li>
                  Sau này có thể thêm mục: “Case thực tế”, “Kho slide”, “Mẫu
                  poster tuyên truyền”.
                </li>
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
