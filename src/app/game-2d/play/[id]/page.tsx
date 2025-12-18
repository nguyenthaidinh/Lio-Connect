// src/app/game-2d/play/[id]/page.tsx
import StoryPlayer from "@/components/story/StoryPlayer";

type StageAction =
  | { type: "bg"; value: string }
  | { type: "sfx"; value: string }
  | { type: "show"; who: string; pos?: "left" | "right" | "center"; emotion?: string };

// ✅ Auto map sprite theo folder public/vn/chars/{who}/{who}_{emotion}.png
function buildAssetsFromPublic() {
  const characters: Record<string, Record<string, string>> = {};
  const people = ["nam", "lan", "minh", "hung", "sensei"];

  const emotions = [
    "neutral",
    "talk",
    "worried",
    "sad",
    "angry",
    "smirk",
    "surprise",
    "scared",
    "cry",
    "helpless",
    "hesitate",
    "concerned",
    "confused",
  ];

  for (const p of people) {
    characters[p] = {};
    for (const e of emotions) {
      characters[p][e] = `/vn/chars/${p}/${p}_${e}.png`;
    }
  }

  return { characters };
}

function normalizeStory(raw: any) {
  const assets = raw.assets ?? buildAssetsFromPublic();

  const scenes = (raw.scenes ?? []).map((s: any) => {
    // 1) stage: bg + show theo line có position/emotion
    const stage: StageAction[] = [];

    // bg trong JSON của Lio là URL (/vn/bg/xxx.jpg) -> giữ luôn
    if (s.bg) stage.push({ type: "bg", value: s.bg });

    // show: lấy trạng thái cuối của mỗi nhân vật trong scene
    const lastShow = new Map<string, Extract<StageAction, { type: "show" }>>();
    for (const l of s.lines ?? []) {
      const who = l.speaker ?? l.who;
      const pos = l.position;
      const emotion = l.emotion;
      if (who && pos) lastShow.set(who, { type: "show", who, pos, emotion });
    }
    stage.push(...Array.from(lastShow.values()));

    // 2) lines: speaker -> who
    const lines = (s.lines ?? []).map((l: any) => ({
      who: l.speaker ?? l.who,
      text: l.text ?? "",
    }));

    // 3) choices: text -> label, effects.stats -> flat effects (Record<string, number>)
    let choices = (s.choices ?? []).map((c: any) => ({
      label: c.text ?? c.label ?? "Chọn",
      next: c.next,
      effects: c.effects?.stats ?? (c.effects && typeof c.effects === "object" ? c.effects : undefined),
      feedback: c.feedback,
    }));

    // 4) nếu scene có next (không có choices) -> tạo choice "Tiếp →"
    if ((!choices || choices.length === 0) && s.next) {
      choices = [{ label: "Tiếp →", next: s.next }];
    }

    return {
      id: s.id,
      title: s.title,
      isEnding: !!s.end,
      stage,
      lines,
      choices: choices.length ? choices : undefined,
      lesson: s.lesson,
    };
  });

  return {
    id: raw.id,
    title: raw.title,
    start: raw.start,
    characters: raw.characters,
    stats: raw.state?.stats ?? raw.stats ?? {},
    assets,
    scenes,
  };
}

export default async function PlayStoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // ✅ Fetch từ public/stories
  const res = await fetch(`http://localhost:3000/stories/${id}.json`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-lg font-semibold">Không tìm thấy story</div>
          <div className="mt-2 text-sm text-white/70">
            Không load được: <b>/stories/{id}.json</b>
          </div>
          <div className="mt-4 text-sm text-white/60">
            Kiểm tra file trong <code className="text-white">public/stories</code> và đường dẫn URL.
          </div>
        </div>
      </main>
    );
  }

  const raw = await res.json();
  const story = normalizeStory(raw);

  return <StoryPlayer story={story} />;
}
