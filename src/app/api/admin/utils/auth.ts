import { NextRequest, NextResponse } from "next/server";
import { admin } from "@/lib/firebaseAdmin";

export type AdminDecoded = {
  uid: string;
  role?: string;
  email?: string;
  // giữ toàn bộ decoded phòng cần thêm
  decoded: admin.auth.DecodedIdToken;
};

/**
 * Lấy Bearer token từ header Authorization.
 */
function getBearerToken(req: NextRequest): string | null {
  const h = req.headers.get("authorization") || "";
  if (!h.toLowerCase().startsWith("bearer ")) return null;
  return h.slice(7).trim();
}

/**
 * Bắt buộc user phải đăng nhập và có custom claim role === 'admin'.
 * Trả về:
 *  - AdminDecoded nếu hợp lệ
 *  - NextResponse (401/403) nếu không hợp lệ
 */
export async function requireAdmin(
  req: NextRequest
): Promise<AdminDecoded | NextResponse> {
  const token = getBearerToken(req);
  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized: missing Bearer token" },
      { status: 401 }
    );
  }

  try {
    const decoded = await admin.auth().verifyIdToken(token, true);
    const role = (decoded as any).role as string | undefined;

    if (role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden: admin role required" },
        { status: 403 }
      );
    }

    return {
      uid: decoded.uid,
      role,
      email: decoded.email,
      decoded,
    };
  } catch (e: any) {
    return NextResponse.json(
      { error: "Unauthorized: invalid or expired token" },
      { status: 401 }
    );
  }
}
