"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { siteConfig } from "@/config/site.config";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

export default function RedirectPage() {
  const params = useParams();
  const shortCode = params.shortCode as string;

  useEffect(() => {
    window.location.href = `${siteConfig.apiUrl}/${shortCode}`;
  }, [shortCode]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size={32} />
        <p className="text-muted-foreground">Redirecting you...</p>
      </div>
    </div>
  );
}
