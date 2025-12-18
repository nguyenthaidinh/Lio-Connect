// app/api/articles/import/route.ts
import { NextRequest, NextResponse } from "next/server";
import { admin } from "@/lib/firebaseAdmin";
import { col, now } from "@/lib/firestore";
import { verifyBearer, assertRole } from "@/lib/auth-server";
import { slugify_vi } from "@/lib/slugify";

/** Trích xuất OG/meta cơ bản từ HTML (đủ dùng cho tiêu đề/mô tả/ảnh) */
function pickMeta(html: string, attr: "property" | "name", key: string) {
  const re = new RegExp(
    `<meta[^>]+${attr}=["']${key}["'][^>]+content=["']([^"']+)["']`,
    "i",
  );
  return html.match(re)?.[1];
}

async function extractOG(url: string) {
  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      // Một số trang chặn bot, dùng user-agent giống trình duyệt thật để giảm lỗi
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123 Safari/537.36",
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    },
  });

  if (!res.ok) {
    throw new Error(`Fetch failed (${res.status})`);
  }

  const html = await res.text();

  const title =
    pickMeta(html, "property", "og:title") ||
    pickMeta(html, "name", "title") ||
    pickMeta(html, "name", "twitter:title") ||
    undefined;

  const description =
    pickMeta(html, "property", "og:description") ||
    pickMeta(html, "name", "description") ||
    pickMeta(html, "name", "twitter:description") ||
    undefined;

  const image =
    pickMeta(html, "property", "og:image") ||
    pickMeta(html, "name", "twitter:image") ||
    undefined;

  const pub =
    pickMeta(html, "property", "article:published_time") || undefined;

  return { title, description, image, pub };
}

export async function POST(req: NextRequest) {
  try {
    // ===== AUTH & ROLE =====
    const bearer = req.headers.get("authorization") ?? undefined;
    const decoded = await verifyBearer(bearer);
    await assertRole(decoded, ["editor", "admin"]);

    // ===== INPUT =====
    const body = await req.json();
    const { url, categories = ["tin-tuc"], tags = [] } = body ?? {};

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'url'" },
        { status: 400 },
      );
    }

    // Chuẩn hóa URL (bắt buộc http/https)
    const safeUrl = url.startsWith("http") ? url : `https://${url}`;

    // ===== EXTRACT OG =====
    const og = await extractOG(safeUrl);

    const title = (og.title || safeUrl).trim();
    const summary =
      (og.description || "Tin liên kết ngoài.").trim().slice(0, 220);
    const slug = slugify_vi(title);

    // Tránh trùng slug
    const exists = await col
      .articles()
      .where("slug", "==", slug)
      .limit(1)
      .get();

    if (!exists.empty) {
      return NextResponse.json(
        { error: "Slug already exists", slug },
        { status: 409 },
      );
    }

    // ===== BUILD DOC =====
    const data = {
      title,
      slug,
      summary,
      content: "",
      coverUrl: og.image || null,
      categories,
      tags,
      status: "published",
      featured: false,
      publishedAt: og.pub
        ? admin.firestore.Timestamp.fromDate(new Date(og.pub))
        : now(),
      updatedAt: now(),
      metrics: { views: 0, likes: 0 },
      authorId: decoded.uid,

      isExternal: true,
      sourceUrl: safeUrl,
      sourceName: new URL(safeUrl).hostname.replace(/^www\./, ""),
      sourcePublishedAt: og.pub || null,
    };

    const doc = await col.articles().add(data as any);
    return NextResponse.json({ id: doc.id, slug }, { status: 201 });
  } catch (e: any) {
    console.error("IMPORT ARTICLE ERROR:", e);
    return NextResponse.json(
      { error: e?.message || "Import failed" },
      { status: 400 },
    );
  }
}

// (tuỳ chọn) Xử lý preflight nếu gọi từ domain khác (CORS)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "POST, OPTIONS",
      "access-control-allow-headers": "authorization, content-type",
    },
  });
}
