"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/utils/date.utils";
import { copyToClipboard } from "@/lib/utils/copy.utils";
import { ExternalLink, Copy, BarChart3 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import type { UrlListItemResponse } from "@/lib/api/types/url.types";
import { useTranslation } from "@/config/i18n";

interface URLCardProps {
  url: UrlListItemResponse;
}

export function URLCard({ url }: URLCardProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const shortUrl = `${window.location.origin}/${url.slug}`;

  async function handleCopy(e: React.MouseEvent) {
    e.stopPropagation();
    const ok = await copyToClipboard(shortUrl);
    if (ok) toast.success(t("action.copied"));
  }

  return (
    <Card className="hover:bg-muted/30">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base">{url.slug}</CardTitle>
            <p className="mt-1 text-xs text-muted-foreground">{url.original_url}</p>
          </div>
          <Badge variant="secondary">{t("urls.clicksCount", { count: url.click_count })}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleCopy} title={t("title.copy")}>
            <Copy className="size-4" />
          </Button>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" title={t("title.open")}>
              <ExternalLink className="size-4" />
            </Button>
          </a>
          <Button variant="ghost" size="icon" onClick={() => router.push(`/urls/${url.slug}`)} title={t("title.stats")}>
            <BarChart3 className="size-4" />
          </Button>
          <span className="ms-auto text-xs text-muted-foreground">{formatDateTime(url.created_at)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
