// src/app/kienthuc/BlhdArticleList.tsx
"use client";

import { blhdArticles, type BlhdArticle } from "./data";

export default function BlhdArticleList() {
  const caseArticles = blhdArticles.filter((a) => a.category === "Vụ việc");
  const analyticArticles = blhdArticles.filter(
    (a) => a.category === "Phân tích",
  );

  return (
    <section className="space-y-8">
      <ArticleSection
        title="Tin tức & vụ việc điển hình"
        subtitle="Các vụ việc bạo lực học đường đã được báo chí phản ánh, giúp nhìn rõ mức độ nghiêm trọng của vấn đề."
        articles={caseArticles}
      />

      <ArticleSection
        title="Phân tích, hướng dẫn & kỹ năng"
        subtitle="Các bài viết phân tích nguyên nhân, hậu quả và gợi ý biện pháp phòng tránh bạo lực học đường."
        articles={analyticArticles}
      />
    </section>
  );
}

function ArticleSection({
  title,
  subtitle,
  articles,
}: {
  title: string;
  subtitle: string;
  articles: BlhdArticle[];
}) {
  return (
    <div className="space-y-3">
      <header className="space-y-1">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">
          {title}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {subtitle}
        </p>
      </header>

      {/* 2 bài / hàng từ md trở lên */}
      <div className="grid gap-3 md:grid-cols-2">
        {articles.map((art) => (
          <ArticleCard key={art.id} art={art} />
        ))}
      </div>
    </div>
  );
}

function ArticleCard({ art }: { art: BlhdArticle }) {
  const favicon = `https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(
    art.url,
  )}`;

  const preview = `https://image.thum.io/get/width/600/crop/400/${encodeURIComponent(
    art.url,
  )}`;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-sky-500 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      {/* Khung ảnh */}
      <div className="relative h-40 w-full overflow-hidden rounded-t-2xl bg-gradient-to-br from-sky-500 via-indigo-500 to-violet-500">
        {/* Nếu thum.io load được → hiện ảnh; nếu fail → onError ẩn img, vẫn còn gradient */}
        <img
          src={preview}
          alt={art.title}
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />

        <img
          src={favicon}
          alt={art.source}
          className="absolute bottom-2 right-2 h-6 w-6 rounded-full bg-white/90 p-1 shadow"
        />
        <span className="absolute left-2 bottom-2 rounded-full bg-black/55 px-2 py-0.5 text-[11px] font-semibold text-white">
          {art.category}
        </span>
      </div>

      {/* Nội dung */}
      <div className="flex flex-1 flex-col justify-between p-3 sm:p-4">
        <div>
          <div className="mb-1 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span className="font-semibold">{art.source}</span>
            {art.year && <span>{art.year}</span>}
          </div>
          <h3 className="text-sm font-semibold leading-snug sm:text-base">
            {art.title}
          </h3>
        </div>

        <div className="mt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          {/* bỏ line-clamp để không bị cắt chữ phía dưới */}
          <span>
            Liên kết ngoài – nội dung chi tiết xem trên trang gốc.
          </span>
          <a
            href={art.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 whitespace-nowrap rounded-full border border-slate-300 px-3 py-1 text-[11px] font-semibold text-slate-700 hover:border-sky-500 hover:text-sky-600 dark:border-slate-600 dark:text-slate-100 dark:hover:border-sky-400 dark:hover:text-sky-300"
          >
            Xem bài gốc
          </a>
        </div>
      </div>
    </article>
  );
}
