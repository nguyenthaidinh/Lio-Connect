import { NextRequest, NextResponse } from "next/server";
import { admin } from "@/lib/firebaseAdmin";
import { requireAdmin } from "../utils/auth";

export const runtime = "nodejs";

type Body = { uid: string };

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (auth instanceof Response) return auth;

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { uid } = body || {};
  if (!uid) {
    return NextResponse.json({ error: "Missing uid" }, { status: 400 });
  }

  try {
    await admin.auth().deleteUser(uid);

    // (Tùy chọn) dọn dữ liệu Firestore/Storage liên quan ở đây nếu bạn muốn:
    // const db = admin.firestore();
    // await db.collection("users").doc(uid).delete();

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("DELETE USER ERROR:", e);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
