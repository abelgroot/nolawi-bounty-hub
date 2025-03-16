"use client";

import { Loader2 } from "lucide-react";

export default function PageLoading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col gap-1 mt-4 justify-center items-center">
        <Loader2 className="animate-spin h-8 w-8 mb-2" />
        <div className="font-semibold text-lg">Nolawi Bounty Hub</div>
        <span className="text-xs text-muted-foreground">
          Please wait while we load your data.
        </span>
      </div>
    </div>
  );
}
