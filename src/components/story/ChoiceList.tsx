"use client";

type Choice = { label: string; next: string; effects?: Record<string, number>; feedback?: string };

export default function ChoiceList({
  choices,
  onChoose,
}: {
  choices: Choice[];
  onChoose: (c: Choice) => void;
}) {
  return (
    <div className="mt-3">
      <div className="text-xs uppercase tracking-wider text-white/70">Lựa chọn</div>

      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {choices.map((c, i) => (
          <button
            key={i}
            onClick={() => onChoose(c)}
            className="
              group text-left rounded-2xl
              border border-white/16
              bg-gradient-to-b from-black/55 to-black/35
              hover:from-black/40 hover:to-black/25
              px-4 py-3 transition
              shadow-lg shadow-black/35
              focus:outline-none focus:ring-2 focus:ring-white/25
            "
          >
            <div className="flex items-start justify-between gap-3">
              <div className="text-base font-semibold text-white group-hover:translate-x-[1px] transition">
                {c.label}
              </div>

              <div className="mt-[2px] shrink-0 rounded-xl border border-white/12 bg-white/10 px-2 py-1 text-xs text-white/80">
                →
              </div>
            </div>

            {c.feedback && <div className="mt-1 text-sm text-white/75">{c.feedback}</div>}

            {c.effects && (
              <div className="mt-2 text-xs text-white/70">
                {Object.entries(c.effects)
                  .map(([k, v]) => (
                    <span
                      key={k}
                      className="mr-2 inline-flex items-center rounded-full border border-white/12 bg-white/10 px-2 py-1"
                    >
                      {k}:{v >= 0 ? ` +${v}` : ` ${v}`}
                    </span>
                  ))}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
