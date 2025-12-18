import "server-only";
import { admin } from "@/lib/firebaseAdmin";

export async function verifyBearer(bearer?: string) {
  if (!bearer?.startsWith("Bearer ")) throw new Error("Missing bearer");
  const idToken = bearer.slice("Bearer ".length).trim();
  return admin.auth().verifyIdToken(idToken);
}

export async function assertRole(decoded: admin.auth.DecodedIdToken, roles: string[]) {
  const role = (decoded as any).role ?? (decoded as any)["https://blhd/role"] ?? "user";
  if (!roles.includes(role)) throw new Error("Forbidden");
  return role as string;
}
