import { NextRequest, NextResponse } from "next/server";
import { admin } from "@/lib/firebaseAdmin";
import { requireAdmin } from "../utils/auth";

export const runtime = "nodejs";

type Body = {
  uid: string;
  role: "admin" | "user";
};

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (auth instanceof Response) return auth;

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { uid, role } = body || {};
  if (!uid || !["admin", "user"].includes(role as string)) {
    return NextResponse.json(
      { error: "Missing uid or invalid role" },
      { status: 400 }
    );
  }

  try {
    const user = await admin.auth().getUser(uid);
    const currentClaims = (user.customClaims || {}) as Record<string, any>;

    await admin.auth().setCustomUserClaims(uid, { ...currentClaims, role });
    // Buộc client refresh token để nhận claim mới
    await admin.auth().revokeRefreshTokens(uid);

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("SET ROLE ERROR:", e);
    return NextResponse.json({ error: "Failed to set role" }, { status: 500 });
  }
}
