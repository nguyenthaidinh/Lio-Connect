"use client";

type StageAction =
  | { type: "bg"; value: string }
  | { type: "sfx"; value: string }
  | { type: "show"; who: string; emotion?: string };

type StoryAssets = {
  backgrounds?: Record<string, string>;
  characters?: Record<string, Record<string, string>>;
};

type CastItem = {
  who: string;
  emotion?: string;
  isActive?: boolean; // người đang nói
};

const UI_SAFE_BOTTOM = 220; // chỉnh lên/xuống nếu đè thoại
const SAFE_GAP = 10;

function pickBgUrl(assets: StoryAssets | undefined, bgValue: string | undefined) {
  if (!bgValue) return undefined;
  if (bgValue.startsWith("/")) return bgValue;
  return assets?.backgrounds?.[bgValue];
}

function pickCharUrl(assets: StoryAssets | undefined, who: string, emotion?: string) {
  const map = assets?.characters?.[who];
  if (!map) return undefined;
  if (emotion && map[emotion]) return map[emotion];
  if (map["neutral"]) return map["neutral"];
  return Object.values(map)[0];
}

// ✅ slots theo số lượng người (phần trăm màn hình)
function getSlots(n: number): number[] {
  if (n <= 1) return [50];
  if (n === 2) return [25, 75];
  if (n === 3) return [18, 50, 82];
  return [12, 37, 63, 88]; // n>=4 => lấy 4 slot (Stage sẽ giới hạn cast)
}

function widthByCount(n: number) {
  // ✅ càng đông thì mỗi người nhỏ lại, tránh tràn
  if (n <= 1) return "clamp(260px, 26vw, 460px)";
  if (n === 2) return "clamp(230px, 23vw, 400px)";
  if (n === 3) return "clamp(190px, 19vw, 330px)";
  return "clamp(160px, 16vw, 280px)";
}

export default function Stage({
  stage,
  assets,
  cast,
  getDisplayName,
}: {
  stage: StageAction[];
  assets?: StoryAssets;
  cast: CastItem[]; // ✅ multi-cast
  getDisplayName?: (who: string) => string;
}) {
  const bgValue = [...stage].reverse().find((a) => a.type === "bg")?.value;
  const bgUrl = pickBgUrl(assets, bgValue);

  const sfx = [...stage].reverse().find((a) => a.type === "sfx")?.value;

  const maxH = `calc(100% - ${UI_SAFE_BOTTOM + SAFE_GAP}px)`;

  const n = cast.length;
  const slots = getSlots(n);
  const w = widthByCount(n);

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 shadow-lg min-h-[640px] sm:min-h-[680px]">
      {/* BG */}
      <div className="absolute inset-0">
        {bgUrl ? (
          <img src={bgUrl} alt={bgValue ?? "bg"} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-black/30" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/5" />
      </div>

      {/* Characters */}
      {cast.map((c, idx) => {
        const url = pickCharUrl(assets, c.who, c.emotion);
        if (!url) return null;

        const x = slots[Math.min(idx, slots.length - 1)];
        const isActive = !!c.isActive;

        return (
          <div
            key={c.who} // ✅ ổn định, tránh “ma ảnh”
            className="absolute pointer-events-none select-none"
            style={{
              left: `${x}%`,
              transform: "translateX(-50%)",
              bottom: UI_SAFE_BOTTOM + SAFE_GAP,
              width: w,
              maxHeight: maxH,
              zIndex: 20 + idx,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* Name tag chỉ cho người đang nói */}
            {isActive && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 rounded-2xl border border-white/12 bg-black/55 px-3 py-1 text-xs font-semibold text-white/95 backdrop-blur-md shadow">
                {getDisplayName ? getDisplayName(c.who) : c.who}
              </div>
            )}

            <img
              src={url}
              alt={`${c.who}-${c.emotion ?? "neutral"}`}
              className="w-full h-auto transition-all duration-250 ease-out"
              style={{
                maxHeight: maxH,
                opacity: isActive ? 1 : 0.72, // ✅ người không nói vẫn rõ, chỉ nhạt nhẹ
                transform: isActive ? "translateY(0px)" : "translateY(3px)",
                filter:
                  "drop-shadow(0 22px 34px rgba(0,0,0,0.55)) drop-shadow(0 0 10px rgba(255,255,255,0.06))",
              }}
            />
          </div>
        );
      })}

      {/* SFX */}
      {sfx && (
        <div className="absolute right-5 top-5 rounded-2xl border border-white/12 bg-black/45 px-4 py-2 text-sm font-semibold backdrop-blur-md">
          {sfx}
        </div>
      )}
    </section>
  );
}
