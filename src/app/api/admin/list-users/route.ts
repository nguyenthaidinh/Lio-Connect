import { NextRequest, NextResponse } from "next/server";
import { admin } from "@/lib/firebaseAdmin";
import { requireAdmin } from "../utils/auth";

export const runtime = "nodejs"; // Admin SDK cần Node runtime

type UserOut = {
  uid: string;
  email?: string | null;
  displayName?: string | null;
  disabled: boolean;
  provider: string;
  role: "admin" | "user";
  creationTime?: string | null;
  lastSignInTime?: string | null;
};

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (auth instanceof Response) return auth; // not authorized

  const url = new URL(req.url);
  const nextPageToken = url.searchParams.get("nextPageToken") || undefined;
  const q = (url.searchParams.get("q") || "").trim().toLowerCase();

  const limitParam = url.searchParams.get("limit");
  const limit = Math.min(Math.max(parseInt(limitParam || "50", 10), 1), 1000);

  try {
    const result = await admin.auth().listUsers(limit, nextPageToken);

    const users: UserOut[] = result.users
      .map((u) => ({
        uid: u.uid,
        email: u.email,
        displayName: u.displayName,
        disabled: u.disabled,
        provider: u.providerData[0]?.providerId || "password",
        role: ((u.customClaims as any)?.role as "admin" | "user") || "user",
        creationTime: u.metadata.creationTime,
        lastSignInTime: u.metadata.lastSignInTime,
      }))
      .filter((u) =>
        q
          ? (u.email || "").toLowerCase().includes(q) ||
            (u.displayName || "").toLowerCase().includes(q)
          : true
      );

    return NextResponse.json({
      users,
      nextPageToken: result.pageToken ?? null,
    });
  } catch (e: any) {
    console.error("LIST USERS ERROR:", e);
    return NextResponse.json(
      { error: "Failed to list users" },
      { status: 500 }
    );
  }
}
