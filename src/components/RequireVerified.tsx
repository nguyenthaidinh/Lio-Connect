"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function RequireVerified({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return router.replace("/auth/login");
      await user.reload();
      if (!user.emailVerified) return router.replace("/auth/verify-required");
      setReady(true);
    });
    return () => unsub();
  }, [router]);

  if (!ready) return null; // hoặc trả về Loader
  return <>{children}</>;
}
