"use client";

import { useParams, useRouter } from "next/navigation";
import { useUrlStats, useUpdateUrl } from "@/lib/hooks/useUrls";
import { URLForm } from "@/components/urls/URLForm";
import { Skeleton } from "@/components/ui/skeleton";
import type { UpdateUrlFormData } from "@/lib/validations/url.schema";
import { useTranslation } from "@/config/i18n";

export default function EditUrlPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.id as string;
  const { data: stats, isLoading } = useUrlStats(slug);
  const updateUrl = useUpdateUrl();
  const { t } = useTranslation();

  async function onSubmit(data: UpdateUrlFormData) {
    await updateUrl.mutateAsync({ slug, data: { original_url: data.original_url } });
    router.push(`/urls/${slug}`);
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-lg space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("urlEdit.heading")}</h1>
        <p className="text-muted-foreground">{t("urlEdit.description", { slug })}</p>
      </div>
      <URLForm
        onSubmit={onSubmit}
        isSubmitting={updateUrl.isPending}
        defaultValues={{ original_url: stats?.original_url || "" }}
      />
    </div>
  );
}
