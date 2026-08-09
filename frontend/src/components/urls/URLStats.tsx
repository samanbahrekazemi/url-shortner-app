"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/utils/date.utils";
import { copyToClipboard } from "@/lib/utils/copy.utils";
import { ExternalLink, Copy, CalendarDays, MousePointerClick } from "lucide-react";
import { toast } from "sonner";
import { QRCodeSVG } from "qrcode.react";
import type { UrlStatsResponse } from "@/lib/api/types/url.types";
import { useTranslation } from "@/config/i18n";

interface URLStatsProps {
  stats?: UrlStatsResponse;
  isLoading: boolean;
}

export function URLStats({ stats, isLoading }: URLStatsProps) {
  const { t } = useTranslation();
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (!stats) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">{t("urlStats.notFound")}</CardContent>
      </Card>
    );
  }

  const shortUrl = `${window.location.origin}/${stats.slug}`;

  async function handleCopy() {
    const ok = await copyToClipboard(shortUrl);
    if (ok) toast.success(t("toast.copiedClipboard"));
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{t("urlStats.details")}</span>
            <Badge variant="secondary">{stats.slug}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="rounded-lg bg-muted p-3">
            <p className="text-xs text-muted-foreground">{t("urlStats.shortUrl")}</p>
            <div className="mt-1 flex items-center gap-2">
              <code className="flex-1 text-sm">{shortUrl}</code>
              <Button variant="ghost" size="icon" onClick={handleCopy}>
                <Copy className="size-4" />
              </Button>
              <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                  <ExternalLink className="size-4" />
                </Button>
              </a>
            </div>
          </div>
          <div className="rounded-lg bg-muted p-3">
            <p className="text-xs text-muted-foreground">{t("urlStats.originalUrl")}</p>
            <p className="mt-1 truncate text-sm">{stats.original_url}</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-sm">
              <MousePointerClick className="size-4 text-muted-foreground" />
              <span className="font-medium">{stats.click_count}</span>
               <span className="text-muted-foreground">{t("urlStats.clicks")}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CalendarDays className="size-4 text-muted-foreground" />
              <span>{formatDateTime(stats.created_at)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("urlStats.qrCode")}</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="rounded-lg border p-4">
            <QRCodeSVG value={shortUrl} size={180} level="M" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
