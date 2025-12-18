// src/app/profile/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import {
  onAuthStateChanged,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  type User,
} from "firebase/auth";

import {
  collection,
  collectionGroup,
  doc,
  getCountFromServer,
  getDoc,
  query,
  where,
} from "firebase/firestore";

import GameStatCard from "@/components/profile/GameStatCard";

type TabKey = "info" | "activity" | "settings";

type QuickStats = {
  posts: number;
  comments: number;
  likes: number;
  miniGamePoints: number;
};

const MINI_GAME_SOURCES = [
  { gameType: "quiz", topicId: "cyberbullying", title: "🧠 Quiz: Bạo lực mạng" },
  { gameType: "quiz", topicId: "school-violence", title: "🧠 Quiz: Bạo lực trong trường" },
  { gameType: "picture-guess", topicId: "catchword-blhd", title: "🖼 Đuổi hình bắt chữ" },
] as const;

/**
 * ✅ Schema đang dùng:
 * miniGameLeaderboards/{gameType}__{topicId}__{uid}
 */
function miniLbDocKey(gameType: string, topicId: string, uid: string) {
  return `${gameType}__${topicId}__${uid}`;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // UI states
  const [tab, setTab] = useState<TabKey>("info");
  const [edit, setEdit] = useState(false);

  // Editable fields
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  // Local settings
  const [dark, setDark] = useState(false);

  // ✅ Quick stats thật
  const [statsLoading, setStatsLoading] = useState(true);
  const [quick, setQuick] = useState<QuickStats>({
    posts: 0,
    comments: 0,
    likes: 0,
    miniGamePoints: 0,
  });

  const router = useRouter();

  // ===== Guard =====
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        router.replace("/auth/login");
        return;
      }

      setUser(u);
      setDisplayName(u.displayName ?? "");

      const nameForAvatar = (u.displayName ?? u.email ?? "User").trim();
      setPhotoURL(
        u.photoURL ??
          `https://ui-avatars.com/api/?name=${encodeURIComponent(nameForAvatar)}`
      );

      setLoading(false);
    });

    return () => unsub();
  }, [router]);

  // ===== Dark mode local =====
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);

    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // ===== Derived info =====
  const joinedAt = useMemo(() => {
    const t = user?.metadata?.creationTime;
    return t ? new Date(t).toLocaleDateString() : "—";
  }, [user]);

  const lastLogin = useMemo(() => {
    const t = user?.metadata?.lastSignInTime;
    return t ? new Date(t).toLocaleString() : "—";
  }, [user]);

  const onLogout = async () => {
    await signOut(auth);
    router.replace("/auth/login");
  };

  const onSave = async () => {
    if (!auth.currentUser) return;

    setSaving(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: displayName.trim() || null,
        photoURL: photoURL.trim() || null,
      });

      await auth.currentUser.reload();
      setUser(auth.currentUser);
      setEdit(false);
    } catch (e) {
      console.error("UPDATE PROFILE ERROR:", e);
      alert("Cập nhật thất bại. Thử lại sau.");
    } finally {
      setSaving(false);
    }
  };

  const onResetPassword = async () => {
    if (!user?.email) return alert("Tài khoản chưa có email hợp lệ.");
    try {
      await sendPasswordResetEmail(auth, user.email);
      alert("Đã gửi email đặt lại mật khẩu. Kiểm tra Inbox/Spam nhé!");
    } catch (e: any) {
      console.error("RESET PASSWORD ERROR:", e?.code, e?.message);
      alert("Không gửi được email đặt lại mật khẩu. Thử lại sau.");
    }
  };

  // =========================
  // ✅ QUICK STATS: DATA THẬT (DEBUG TỪNG BƯỚC)
  // =========================
  useEffect(() => {
    if (!user?.uid) return;

    let alive = true;

    (async () => {
      setStatsLoading(true);

      let postsCount = 0;
      let commentsCount = 0;
      let likesCount = 0;
      let miniGamePoints = 0;

      console.log("[Profile] uid =", user.uid);

      // 1) POSTS
      try {
        console.log("[Profile] 1) count posts...");
        const postsQ = query(
          collection(db, "posts"),
          where("authorId", "==", user.uid)
        );
        const postsCountSnap = await getCountFromServer(postsQ);
        postsCount = postsCountSnap.data().count ?? 0;
        console.log("[OK] POSTS COUNT =", postsCount);
      } catch (e) {
        console.error("COUNT POSTS DENIED:", e);
      }

      // 2) COMMENTS (collectionGroup)
      try {
        console.log("[Profile] 2) count comments...");
        const commentsQ = query(
          collectionGroup(db, "comments"),
          where("authorId", "==", user.uid)
        );
        const commentsCountSnap = await getCountFromServer(commentsQ);
        commentsCount = commentsCountSnap.data().count ?? 0;
        console.log("[OK] COMMENTS COUNT =", commentsCount);
      } catch (e) {
        console.error("COUNT COMMENTS DENIED:", e);
      }

      // 3) LIKES (collectionGroup) ✅ FIX: query theo field userId (không dùng documentId())
      try {
        console.log("[Profile] 3) count likes...");
        const likesQ = query(
          collectionGroup(db, "likes"),
          where("userId", "==", user.uid)
        );
        const likesCountSnap = await getCountFromServer(likesQ);
        likesCount = likesCountSnap.data().count ?? 0;
        console.log("[OK] LIKES COUNT =", likesCount);
      } catch (e) {
        console.error("COUNT LIKES DENIED:", e);
      }

      // 4) MINI-GAME POINTS (flat doc)
      try {
        console.log("[Profile] 4) sum miniGamePoints...");
        for (const s of MINI_GAME_SOURCES) {
          const id = miniLbDocKey(s.gameType, s.topicId, user.uid);
          console.log("[Profile] 4) read lb:", id);

          const ref = doc(db, "miniGameLeaderboards", id);
          const snap = await getDoc(ref);

          if (snap.exists()) {
            const d = snap.data() as any;
            miniGamePoints += Number(d.bestScore ?? 0);
          }
        }
        console.log("[OK] MINI GAME POINTS =", miniGamePoints);
      } catch (e) {
        console.error("READ MINIGAME LB DENIED:", e);
      }

      if (!alive) return;

      setQuick({
        posts: postsCount,
        comments: commentsCount,
        likes: likesCount,
        miniGamePoints: miniGamePoints,
      });

      if (alive) setStatsLoading(false);
    })();

    return () => {
      alive = false;
    };
  }, [user?.uid]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-slate-950">
        <p className="animate-pulse text-gray-600 dark:text-slate-300">Đang tải…</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-violet-50 px-4 py-10 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <div className="mb-6 rounded-2xl border border-white/50 bg-white/70 p-6 shadow backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/60">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="h-24 w-24 overflow-hidden rounded-full border border-sky-200 shadow">
              <img
                src={photoURL}
                alt="avatar"
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user?.displayName ?? user?.email ?? "User"
                    )}`;
                }}
              />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                {user.displayName || "Chưa có tên"}
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">{user.email}</p>

              <div className="mt-2 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                  Thành viên từ {joinedAt}
                </span>
                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">
                  Đăng nhập gần nhất {lastLogin}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleDark}
                className="rounded-xl border px-3 py-2 text-sm font-semibold hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-900/60"
              >
                {dark ? "☀️ Light" : "🌙 Dark"}
              </button>
              <button
                onClick={onLogout}
                className="rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:brightness-110"
              >
                Đăng xuất
              </button>
            </div>
          </div>

          {/* ✅ Quick stats (DB thật) */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard label="Bài viết" value={statsLoading ? "…" : String(quick.posts)} />
            <StatCard label="Bình luận" value={statsLoading ? "…" : String(quick.comments)} />
            <StatCard label="Lượt thích" value={statsLoading ? "…" : String(quick.likes)} />
            <StatCard
              label="Điểm mini-game"
              value={statsLoading ? "…" : String(quick.miniGamePoints)}
            />
          </div>

          <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
            * Bài viết/bình luận/like được đếm trực tiếp từ Firestore (posts + collectionGroup).
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-3 flex gap-2">
          <TabButton active={tab === "info"} onClick={() => setTab("info")}>
            Thông tin cá nhân
          </TabButton>
          <TabButton active={tab === "activity"} onClick={() => setTab("activity")}>
            Hoạt động
          </TabButton>
          <TabButton active={tab === "settings"} onClick={() => setTab("settings")}>
            Cài đặt
          </TabButton>
        </div>

        {/* Content */}
        <div className="rounded-2xl border border-white/50 bg-white/70 p-6 shadow backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/60">
          {tab === "info" && (
            <section className="space-y-6">
              {!edit ? (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Tên hiển thị" value={user.displayName || "Chưa có"} />
                    <Field label="Email" value={user.email || "—"} />
                    <Field label="UID" value={user.uid} />
                    <Field
                      label="Provider"
                      value={user.providerData[0]?.providerId || "password"}
                    />
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setEdit(true)}
                      className="rounded-xl border px-4 py-2.5 text-sm font-semibold hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-900/60"
                    >
                      Chỉnh sửa hồ sơ
                    </button>
                    <button
                      onClick={onResetPassword}
                      className="rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-sky-700"
                    >
                      Đổi mật khẩu (qua email)
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <EditField
                      label="Tên hiển thị"
                      value={displayName}
                      onChange={setDisplayName}
                      placeholder="Tên của bạn"
                    />
                    <EditField
                      label="Ảnh đại diện (URL)"
                      value={photoURL}
                      onChange={setPhotoURL}
                      placeholder="https://..."
                    />
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={onSave}
                      disabled={saving}
                      className="rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:brightness-110 disabled:opacity-60"
                    >
                      {saving ? "Đang lưu..." : "Lưu thay đổi"}
                    </button>

                    <button
                      onClick={() => {
                        setEdit(false);
                        setDisplayName(user.displayName ?? "");

                        const nameForAvatar = (user.displayName ?? user.email ?? "User").trim();
                        setPhotoURL(
                          user.photoURL ??
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(nameForAvatar)}`
                        );
                      }}
                      className="rounded-xl border px-4 py-2.5 text-sm font-semibold hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-900/60"
                    >
                      Huỷ
                    </button>
                  </div>
                </>
              )}
            </section>
          )}

          {tab === "activity" && (
            <section className="space-y-6">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                  BXH theo từng game
                </h3>

                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  VN dùng leaderboard riêng. Quiz/Đuổi hình đọc miniGameLeaderboards (best/plays/last).
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {/* VN (schema riêng) */}
                  <GameStatCard
                    title="🎭 VN BLHD: Những Ngã Rẽ"
                    uid={user.uid}
                    variant={{ kind: "vn", gameId: "nhung-nga-re" }}
                  />

                  {/* Mini-games (schema miniGameLeaderboards) */}
                  {MINI_GAME_SOURCES.map((s) => (
                    <GameStatCard
                      key={`${s.gameType}__${s.topicId}`}
                      title={s.title}
                      uid={user.uid}
                      variant={{ kind: "mini", gameType: s.gameType, topicId: s.topicId }}
                    />
                  ))}
                </div>

                <p className="mt-3 text-xs text-slate-500">
                  * Muốn profile “chuẩn tuyệt đối”: đảm bảo Quiz/Đuổi hình đều gọi submitMiniGameRun()
                  để update miniGameLeaderboards.
                </p>
              </div>
            </section>
          )}

          {tab === "settings" && (
            <section className="space-y-6">
              <div className="rounded-xl border p-4 dark:border-slate-700">
                <h3 className="font-semibold">Giao diện</h3>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Chế độ tối (Dark Mode)
                  </span>
                  <button
                    onClick={toggleDark}
                    className="rounded-xl border px-3 py-1.5 text-sm font-semibold hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-900/60"
                  >
                    {dark ? "Tắt" : "Bật"}
                  </button>
                </div>
              </div>

              <div className="rounded-xl border p-4 dark:border-slate-700">
                <h3 className="font-semibold">Bảo mật</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    onClick={onResetPassword}
                    className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-sky-700"
                  >
                    Gửi email đặt lại mật khẩu
                  </button>
                  <button
                    onClick={onLogout}
                    className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-rose-700"
                  >
                    Đăng xuất
                  </button>
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  (Xoá tài khoản cần re-auth, hiện chưa bật để tránh lỗi.)
                </p>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Small components ---------- */

function TabButton({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "rounded-xl px-4 py-2 text-sm font-semibold",
        active
          ? "bg-sky-600 text-white shadow"
          : "border border-slate-200 bg-white/70 hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-900/60 dark:hover:bg-slate-900",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/60 bg-white/70 p-4 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
        {value}
      </div>
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </div>
      <div className="mt-1 rounded-lg border border-slate-200 bg-white/70 p-2 text-sm dark:border-slate-700 dark:bg-slate-900/60">
        {value}
      </div>
    </div>
  );
}

function EditField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </div>
      <input
        className="mt-1 w-full rounded-xl border border-slate-200 bg-white/80 p-2 text-sm shadow-sm focus:border-sky-400 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900/60"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
