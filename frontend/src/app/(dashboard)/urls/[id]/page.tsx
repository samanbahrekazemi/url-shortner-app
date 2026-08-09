"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useUrlStats } from "@/lib/hooks/useUrls";
import { URLStats } from "@/components/urls/URLStats";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Pencil, ArrowLeft, Trash2 } from "lucide-react";
import { useDeleteUrl } from "@/lib/hooks/useUrls";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useTranslation } from "@/config/i18n";

export default function UrlDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.id as string;
  const { data: stats, isLoading } = useUrlStats(slug);
  const deleteUrl = useDeleteUrl();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { t } = useTranslation();

  async function handleDelete() {
    await deleteUrl.mutateAsync(slug);
    toast.success(t("toast.urlDeleted"));
    router.push("/urls");
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/urls")}>
            <ArrowLeft className="size-4" />
          </Button>
           <h1 className="text-2xl font-bold tracking-tight">{t("urlDetail.heading")}</h1>
         </div>
         <div className="flex gap-2">
           <Button variant="outline" onClick={() => router.push(`/urls/${slug}/edit`)}>
             <Pencil className="mr-2 size-4" />
             {t("action.edit")}
           </Button>
           <Button variant="destructive" onClick={() => setDeleteOpen(true)}>
             <Trash2 className="mr-2 size-4" />
             {t("action.delete")}
           </Button>
        </div>
      </div>

      <URLStats stats={stats} isLoading={isLoading} />

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("dialog.deleteTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("dialog.deleteDescription", { slug })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteOpen(false)}>{t("action.cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              {t("action.delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
