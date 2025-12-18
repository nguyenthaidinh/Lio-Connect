"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Stage from "./Stage";
import DialogueBox from "./DialogueBox";
import ChoiceList from "./ChoiceList";

import { auth } from "@/lib/firebase";
import { submitGameRun } from "@/services/gameLeaderboard";
import EndingLeaderboard from "@/components/game/EndingLeaderboard";

type StageAction =
  | { type: "bg"; value: string }
  | { type: "sfx"; value: string }
  | { type: "show"; who: string; pos?: "left" | "right" | "center"; emotion?: string };

type Line = {
  who: string;
  text: string;
  position?: "left" | "right" | "center";
  emotion?: string;
};

type Choice = {
  label: string;
  next: string;
  effects?: Record<string, number>;
  feedback?: string;
};

type Scene = {
  id: string;
  title?: string;
  isEnding?: boolean;
  stage?: StageAction[];
  lines: Line[];
  choices?: Choice[];
  lesson?: string[];
};

type Story = {
  id: string; // ✅ dùng làm gameId cho BXH
  title: string;
  start: string;
  characters?: Record<string, { name: string }>;
  stats?: Record<string, number>;
  assets?: any;
  scenes: Scene[];
};

type CastItem = {
  who: string;
  emotion?: string;
  isActive?: boolean;
};

function buildCast(lines: Line[], lineIdx: number, maxCast = 4): CastItem[] {
  const order: string[] = [];
  const latestEmotion = new Map<string, string | undefined>();

  for (let i = 0; i <= lineIdx; i++) {
    const l = lines[i];
    if (!l?.who || l.who === "narr") continue;

    const idx = order.indexOf(l.who);
    if (idx >= 0) order.splice(idx, 1);
    order.push(l.who);

    latestEmotion.set(l.who, l.emotion);

    while (order.length > maxCast) order.shift();
  }

  const activeWho =
    lines[lineIdx]?.who && lines[lineIdx].who !== "narr"
      ? lines[lineIdx].who
      : undefined;

  return order.map((who) => ({
    who,
    emotion: latestEmotion.get(who),
    isActive: who === activeWho,
  }));
}

export default function StoryPlayer({ story }: { story: Story }) {
  const sceneMap = useMemo(
    () => new Map(story.scenes.map((s) => [s.id, s])),
    [story.scenes]
  );

  const [sceneId, setSceneId] = useState(story.start);
  const [stats, setStats] = useState<Record<string, number>>(story.stats ?? {});
  const [lineIdx, setLineIdx] = useState(0);

  // ✅ chống submit lặp
  const submittedRef = useRef<string | null>(null);

  // ✅ đo thời gian chơi (optional)
  const startTimeRef = useRef<number>(Date.now());

  const scene = sceneMap.get(sceneId);

  useEffect(() => {
    setLineIdx(0);
  }, [sceneId]);

  const getName = (key: string) => story.characters?.[key]?.name ?? key;

  if (!scene) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white/80">
          Không tìm thấy scene: <b className="text-white">{sceneId}</b>
        </div>
      </main>
    );
  }

  const currentLine = scene.lines[lineIdx];
  const isLastLine = lineIdx >= scene.lines.length - 1;

  const canShowChoices =
    !scene.isEnding && isLastLine && (scene.choices?.length ?? 0) > 0;
  const showNextButton = !scene.isEnding && !isLastLine && !canShowChoices;
  const canClickToNext = !scene.isEnding && !canShowChoices && !isLastLine;

  const nextLine = () => {
    if (!isLastLine) setLineIdx((x) => x + 1);
  };

  const choose = (c: Choice) => {
    if (c.effects) {
      setStats((prev) => {
        const next = { ...prev };
        for (const k in c.effects) {
          const v = c.effects[k];
          next[k] = (next[k] ?? 0) + v;
        }
        return next;
      });
    }
    setSceneId(c.next);
  };

  const restart = () => {
    setSceneId(story.start);
    setStats(story.stats ?? {});
    setLineIdx(0);
    submittedRef.current = null; // ✅ cho phép submit lại run mới
    startTimeRef.current = Date.now();
  };

  const cast = useMemo(
    () => buildCast(scene.lines, lineIdx, 4),
    [scene.lines, lineIdx]
  );

  // ✅ tính điểm (Lio có thể thay công thức)
  const computeScore = () => {
    const base = Object.values(stats ?? {}).reduce((a, b) => a + b, 0);
    const endingBonus = scene.isEnding ? 10 : 0;
    return base + endingBonus;
  };

  // ✅ SUBMIT BXH KHI KẾT THÚC
  useEffect(() => {
    if (!scene.isEnding) return;

    const user = auth.currentUser;
    if (!user?.uid) return;

    // key run để tránh submit lặp (ending scene id + stats snapshot)
    const submitKey = `${story.id}::${scene.id}::${JSON.stringify(stats ?? {})}`;
    if (submittedRef.current === submitKey) return;
    submittedRef.current = submitKey;

    const score = computeScore();
    const durationMs = Date.now() - startTimeRef.current;

    submitGameRun({
      gameId: story.id,
      uid: user.uid,
      displayName: user.displayName ?? "Player",
      photoURL: user.photoURL ?? undefined,
      score,
      meta: {
        endingId: scene.id,
        stats,
        durationMs,
      },
    }).catch((e) => {
      console.error("submitGameRun error:", e);
    });
    // ✅ deps có stats + story.id để submit đúng theo kết quả
  }, [scene.isEnding, scene.id, story.id, stats]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-3">
        <div className="text-xs text-white/60">Game xử lý tình huống</div>

        <div className="flex items-end justify-between gap-3">
          <h1 className="text-2xl font-semibold">{story.title}</h1>

          <div className="hidden sm:flex flex-wrap justify-end gap-2 text-xs">
            {Object.entries(stats).map(([k, v]) => (
              <span
                key={k}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1"
              >
                {k}: <b className="text-white">{v}</b>
              </span>
            ))}
          </div>
        </div>

        {scene.title && <div className="mt-1 text-sm text-white/70">{scene.title}</div>}
      </div>

      <div className="relative">
        <Stage
          stage={scene.stage ?? []}
          assets={story.assets}
          cast={cast}
          getDisplayName={getName}
        />

        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          {!scene.isEnding ? (
            <>
              <DialogueBox
                speaker={currentLine ? getName(currentLine.who) : ""}
                text={currentLine ? currentLine.text : ""}
                onNext={nextLine}
                showNextButton={showNextButton}
                canClickToNext={canClickToNext}
              />

              {canShowChoices && (
                <ChoiceList choices={scene.choices ?? []} onChoose={choose} />
              )}
            </>
          ) : (
            <>
              <DialogueBox
                speaker="Bài học rút ra"
                text={(scene.lesson ?? []).map((x) => `• ${x}`).join("\n")}
                onNext={restart}
                showNextButton={true}
                canClickToNext={true}
              />

              {/* ✅ BXH hiện ngay khi kết thúc */}
              <EndingLeaderboard gameId={story.id} />
            </>
          )}
        </div>
      </div>
    </main>
  );
}
