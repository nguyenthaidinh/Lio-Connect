// src/app/kienthuc/LawDocList.tsx
import { lawDocs, type LawDoc } from "./data";

export default function LawDocList() {
  return (
    <section className="space-y-3">
      <header className="space-y-1">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">
          Tài liệu học luật
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Các văn bản pháp luật và tài liệu hướng dẫn chính thức về quyền trẻ
          em, giáo dục và phòng, chống bạo lực học đường.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {lawDocs.map((doc) => (
          <LawDocCard key={doc.id} doc={doc} />
        ))}
      </div>
    </section>
  );
}

function LawDocCard({ doc }: { doc: LawDoc }) {
  return (
    <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-sky-500 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px]">
        <span className="rounded-full bg-slate-900 px-2 py-0.5 font-semibold text-slate-50 dark:bg-slate-800">
          {doc.level}
        </span>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          {doc.tag}
        </span>
        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-medium text-emerald-600 dark:text-emerald-300">
          {doc.format}
        </span>
      </div>

      <h3 className="text-sm font-semibold sm:text-base">{doc.title}</h3>
      <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300 sm:text-sm">
        {doc.description}
      </p>

      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
        <span className="line-clamp-1">Nguồn: {doc.source}</span>
        <a
          href={doc.url}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 rounded-full bg-sky-600 px-3 py-1 text-xs font-semibold text-white hover:bg-sky-700"
        >
          Mở tài liệu
        </a>
      </div>
    </article>
  );
}
