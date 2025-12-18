import { Suspense } from "react";
import VideoClient from "./VideoClient";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
          <div className="text-slate-600 dark:text-slate-300">Đang tải…</div>
        </div>
      }
    >
      <VideoClient />
    </Suspense>
  );
}
