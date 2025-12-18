"use client";

export default function DialogueBox({
  speaker,
  text,
  onNext,
  showNextButton,
  canClickToNext,
}: {
  speaker: string;
  text: string;
  onNext: () => void;
  showNextButton: boolean;
  canClickToNext: boolean;
}) {
  return (
    <div className="rounded-3xl border border-white/16 bg-gradient-to-b from-black/70 to-black/55 backdrop-blur-md shadow-2xl p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs sm:text-sm text-white/80 font-medium">
          {speaker}
        </div>

        {showNextButton && (
          <button
            onClick={onNext}
            className="
              rounded-xl px-4 py-2 text-sm font-semibold
              bg-white text-black
              hover:translate-y-[-1px] active:translate-y-[0px]
              transition shadow-lg shadow-black/30
            "
          >
            Tiếp →
          </button>
        )}
      </div>

      <div
        className={`mt-2 text-base sm:text-lg text-white leading-relaxed ${
          canClickToNext ? "cursor-pointer" : "cursor-default"
        }`}
        onClick={canClickToNext ? onNext : undefined}
        title={canClickToNext ? "Click để tiếp" : undefined}
        style={{ whiteSpace: "pre-line" }}
      >
        {text}
      </div>
    </div>
  );
}
