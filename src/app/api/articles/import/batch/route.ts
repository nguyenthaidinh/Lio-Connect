// app/api/articles/import/batch/route.ts
import { NextResponse } from "next/server";
import { verifyBearer, assertRole } from "@/lib/auth-server";

/**
 * Gọi tuần tự /api/articles/import cho từng URL
 * Trả về mảng results: { id/slug } hoặc { error, url }
 */
export async function POST(req: Request) {
  try {
    const decoded = await verifyBearer(
      req.headers.get("authorization") || undefined,
    );
    await assertRole(decoded, ["editor", "admin"]);

    const { urls, categories = ["tin-tuc"], tags = [] } = await req.json();

    if (!Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { error: "'urls' must be a non-empty array" },
        { status: 400 },
      );
    }

    const base = new URL(req.url);
    const single = `${base.origin}/api/articles/import`;
    const auth = req.headers.get("authorization") || "";

    const results: any[] = [];
    for (const url of urls) {
      try {
        const res = await fetch(single, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: auth,
          },
          body: JSON.stringify({ url, categories, tags }),
        });
        const json = await res.json();
        if (!res.ok) {
          results.push({ error: json?.error || "failed", url });
        } else {
          results.push(json);
        }
      } catch (err: any) {
        results.push({ error: err?.message || "fetch error", url });
      }
    }

    return NextResponse.json({ results }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Batch import failed" },
      { status: 400 },
    );
  }
}

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
