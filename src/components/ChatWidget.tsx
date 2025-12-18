"use client";
import { useState } from "react";

type Msg = { from: "user" | "bot"; text: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "bot", text: "Xin chào! Mình là trợ lý Lio Connect. Bạn cần tư vấn gì?" },
  ]);
  const [inp, setInp] = useState("");

  const send = (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = inp.trim();
    if (!text) return;
    setMsgs((m) => [...m, { from: "user", text }]);
    setInp("");
    setTimeout(() => {
      setMsgs((m) => [
        ...m,
        {
          from: "bot",
          text:
            "Mình đã ghi nhận. Nếu tình huống nghiêm trọng, hãy báo ngay cho GVCN/Phòng CT HSSV. Xem mục Học tập > Góc luật để biết quyền & cách báo cáo.",
        },
      ]);
    }, 400);
  };

  return (
    <>
      {/* Nút mở – góc phải */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-xl ring-2 ring-white/50 hover:from-sky-600 hover:to-indigo-700"
          aria-label="Mở tư vấn"
          title="Tư vấn Chatbot"
        >
          {/* icon bong bóng */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M21 12c0 3.866-3.806 7-8.5 7-.878 0-1.721-.108-2.5-.309L5 20l1.42-3.293C5.53 15.593 5 13.858 5 12 5 8.134 8.806 5 13.5 5S21 8.134 21 12Z" className="fill-white/95" />
            <circle cx="11" cy="12" r="1.5" className="fill-indigo-600" />
            <circle cx="15" cy="12" r="1.5" className="fill-indigo-600" />
          </svg>
        </button>
      )}

      {/* Hộp chat */}
      {open && (
        <div className="fixed bottom-5 right-5 z-50 w-80 overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-center justify-between border-b border-sky-100 bg-gradient-to-r from-sky-50 to-indigo-50 px-3 py-2 text-sm font-semibold dark:border-slate-800 dark:from-slate-900 dark:to-slate-900">
            Tư vấn Chatbot
            <button onClick={() => setOpen(false)} className="rounded-md px-2 py-1 hover:bg-slate-200/50 dark:hover:bg-slate-800">✕</button>
          </div>
          <div className="max-h-80 space-y-2 overflow-y-auto p-3 text-[13px]">
            {msgs.map((m, i) => (
              <div key={i} className={m.from === "user" ? "text-right" : "text-left"}>
                <span
                  className={[
                    "inline-block rounded-xl px-3 py-2",
                    m.from === "user"
                      ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white"
                      : "bg-slate-100 dark:bg-slate-800",
                  ].join(" ")}
                >
                  {m.text}
                </span>
              </div>
            ))}
          </div>
          <form onSubmit={send} className="flex gap-2 border-t border-sky-100 p-2 dark:border-slate-800">
            <input
              value={inp}
              onChange={(e) => setInp(e.target.value)}
              placeholder="Nhập nội dung…"
              className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-300 dark:border-slate-700 dark:bg-slate-950"
            />
            <button className="rounded-lg bg-sky-600 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-700">
              Gửi
            </button>
          </form>
        </div>
      )}
    </>
  );
}
