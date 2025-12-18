// src/app/api/admin/bootstrap/route.ts
import { NextRequest, NextResponse } from "next/server";
import { admin } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    // 1) Đọc body an toàn (có thể rỗng)
    let uidFromBody: string | undefined;
    try {
      const body = await req.json().catch(() => ({}));
      uidFromBody = body?.uid;
    } catch {
      uidFromBody = undefined;
    }

    // 2) Nếu không có uid trong body, thử lấy từ ID token
    let uid = uidFromBody;
    if (!uid) {
      const authHeader = req.headers.get("authorization") || req.headers.get("Authorization");
      const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : undefined;
      if (!token) {
        return NextResponse.json(
          { error: "Missing uid or Authorization Bearer <ID_TOKEN>" },
          { status: 400 }
        );
      }
      const decoded = await admin.auth().verifyIdToken(token);
      uid = decoded.uid;
    }

    // 3) Lấy claims hiện tại, set role=admin
    const user = await admin.auth().getUser(uid!);
    const current = (user.customClaims || {}) as Record<string, any>;

    await admin.auth().setCustomUserClaims(uid!, { ...current, role: "admin" });
    await admin.auth().revokeRefreshTokens(uid!);

    return NextResponse.json({ ok: true, uid, role: "admin" });
  } catch (e: any) {
    console.error("BOOTSTRAP ADMIN ERROR:", e);
    return NextResponse.json(
      { error: e?.message || "Failed to set admin" },
      { status: 500 }
    );
  }
}
