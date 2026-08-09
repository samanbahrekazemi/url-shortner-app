"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { useDashboardStats } from "@/lib/hooks/useUrls";
import { CreateUrlDialog } from "@/components/urls/CreateUrlDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsSkeleton } from "@/components/shared/SkeletonLoader";
import { CountUp } from "@/components/shared/CountUp";
import { URLCard } from "@/components/urls/URLCard";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Link2, MousePointerClick, ExternalLink, PlusCircle, ArrowUpRight } from "lucide-react";
import { useTranslation } from "@/config/i18n";

export default function Home() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const { data: stats, isLoading } = useDashboardStats();
  const [createOpen, setCreateOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, authLoading, router]);

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner size={32} />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 p-4 md:p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold tracking-tight">{t("dashboard.heading")}</h1>
              <Button onClick={() => setCreateOpen(true)}>
                <PlusCircle className="mr-2 size-4" />
                {t("action.createUrl")}
                <ArrowUpRight className="ml-1 size-3.5" />
              </Button>
            </div>

            {isLoading ? <StatsSkeleton /> : (
              <>
                <div className="flex gap-3 overflow-x-auto md:grid md:grid-cols-3 md:overflow-visible pb-1">
                  <Card className="min-w-[140px] shrink-0 md:min-w-0">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 px-3 py-3 md:px-6 md:py-4">
                      <CardTitle className="text-xs font-medium text-muted-foreground md:text-sm">{t("dashboard.totalUrls")}</CardTitle>
                      <Link2 className="size-3.5 text-muted-foreground md:size-4" />
                    </CardHeader>
                    <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                      <p className="text-2xl font-bold md:text-3xl"><CountUp value={stats?.total_urls ?? 0} /></p>
                    </CardContent>
                  </Card>
                  <Card className="min-w-[140px] shrink-0 md:min-w-0">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 px-3 py-3 md:px-6 md:py-4">
                      <CardTitle className="text-xs font-medium text-muted-foreground md:text-sm">{t("dashboard.totalClicks")}</CardTitle>
                      <MousePointerClick className="size-3.5 text-muted-foreground md:size-4" />
                    </CardHeader>
                    <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                      <p className="text-2xl font-bold md:text-3xl"><CountUp value={stats?.total_clicks ?? 0} /></p>
                    </CardContent>
                  </Card>
                  <Card className="min-w-[140px] shrink-0 md:min-w-0">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 px-3 py-3 md:px-6 md:py-4">
                      <CardTitle className="text-xs font-medium text-muted-foreground md:text-sm">{t("dashboard.activeUrls")}</CardTitle>
                      <ExternalLink className="size-3.5 text-muted-foreground md:size-4" />
                    </CardHeader>
                    <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                      <p className="text-2xl font-bold md:text-3xl"><CountUp value={stats?.active_urls ?? 0} /></p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>{t("dashboard.recentUrls")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {stats?.recent_urls?.length ? (
                      <div className="space-y-2">
                        {stats.recent_urls.map((url) => (
                          <URLCard key={url.id} url={url} />
                        ))}
                      </div>
                    ) : (
                      <div className="py-8 text-center text-muted-foreground">
                        <p>{t("dashboard.noUrls")}</p>
                        <Button variant="outline" className="mt-2" onClick={() => setCreateOpen(true)}>
                          {t("dashboard.createFirstUrl")}
                          <ArrowUpRight className="ml-1 size-3.5" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </main>
      </div>

      <CreateUrlDialog open={createOpen} onClose={() => setCreateOpen(false)} />
    </div>
  );
}
