// src/app/video/homeFeatured.ts
import { blhdVideos, featuredVideoId, type BlhdVideo } from "./data";

/**
 * pick video nổi bật từ data.ts
 * - random=false: dùng featuredVideoId
 * - random=true: random ổn định theo ngày (để không đổi mỗi lần F5)
 */
export function pickFeaturedVideo(opts?: { random?: boolean }): BlhdVideo | null {
  const random = opts?.random ?? false;
  if (!blhdVideos?.length) return null;

  // ưu tiên video featured cố định
  const fixed = blhdVideos.find((v) => v.id === featuredVideoId) ?? blhdVideos[0];

  if (!random) return fixed;

  // ✅ random ổn định theo ngày: cùng 1 ngày sẽ ra 1 video
  const today = new Date();
  const seed = Number(
    `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(
      today.getDate()
    ).padStart(2, "0")}`
  );

  const idx = seed % blhdVideos.length;
  return blhdVideos[idx] ?? fixed;
}
