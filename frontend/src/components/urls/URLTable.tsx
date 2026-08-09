"use client";

import { useState, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TableSkeleton } from "@/components/shared/SkeletonLoader";
import { formatDateTime } from "@/lib/utils/date.utils";
import { copyToClipboard } from "@/lib/utils/copy.utils";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Copy,
  ExternalLink,
  BarChart3,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import type { PaginatedResponse, UrlListItemResponse } from "@/lib/api/types/url.types";
import { useTranslation } from "@/config/i18n";
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

type SortConfig = {
  field: string;
  order: "asc" | "desc";
};

interface URLTableProps {
  data: PaginatedResponse<UrlListItemResponse> | undefined;
  isLoading: boolean;
  sort: string;
  order: "asc" | "desc";
  onSortChange: (field: string) => void;
  page: number;
  onPageChange: (page: number) => void;
  onDelete: (slug: string) => void;
  isDeleting: boolean;
}

const COLUMNS = [
  { field: "slug", labelKey: "urls.colShortUrl", sortable: true },
  { field: "original_url", labelKey: "urls.colOriginalUrl", sortable: true, className: "max-w-[300px]" },
  { field: "click_count", labelKey: "urls.colClicks", sortable: true, className: "w-20" },
  { field: "created_at", labelKey: "urls.colCreated", sortable: true, className: "w-40" },
  { field: "actions", labelKey: "", sortable: false, className: "w-[180px] text-end" },
];

export function URLTable({
  data,
  isLoading,
  sort,
  order,
  onSortChange,
  page,
  onPageChange,
  onDelete,
  isDeleting,
}: URLTableProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const allSelected = data?.items.length ? selected.size === data.items.length : false;

  function toggleAll() {
    if (!data?.items) return;
    setSelected((prev) =>
      prev.size === data.items.length ? new Set() : new Set(data.items.map((u) => u.id))
    );
  }

  function toggleOne(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const handleCopy = useCallback(async (slug: string) => {
    const shortUrl = `${window.location.origin}/${slug}`;
    const ok = await copyToClipboard(shortUrl);
    if (ok) toast.success(t("toast.copiedClipboard"));
    else toast.error(t("toast.copyFailed"));
  }, []);

  function handleSort(field: string) {
    onSortChange(field);
  }

  function getSortIcon(field: string) {
    if (sort !== field) return <ArrowUpDown className="size-3.5 opacity-40" />;
    return order === "asc" ? <ArrowUp className="size-3.5" /> : <ArrowDown className="size-3.5" />;
  }

  if (isLoading) return <TableSkeleton />;

  if (!data?.items.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-muted-foreground">{t("urls.empty")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  className="size-4 rounded border-input accent-primary"
                />
              </TableHead>
              {COLUMNS.map((col) => (
                <TableHead key={col.field} className={col.className}>
                  {col.sortable ? (
                    <button
                      onClick={() => handleSort(col.field)}
                      className="inline-flex items-center gap-1 whitespace-nowrap text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground"
                    >
                      {t(col.labelKey as Parameters<typeof t>[0])}
                      {getSortIcon(col.field)}
                    </button>
                  ) : (
                    col.labelKey ? t(col.labelKey as Parameters<typeof t>[0]) : ""
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.items.map((url) => (
              <TableRow
                key={url.id}
                className="cursor-pointer"
                onClick={() => router.push(`/urls/${url.slug}`)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selected.has(url.id)}
                    onChange={() => toggleOne(url.id)}
                    className="size-4 rounded border-input accent-primary"
                  />
                </TableCell>
                <TableCell>
                  <span className="font-mono text-sm font-medium">{url.slug}</span>
                </TableCell>
                <TableCell className="max-w-[300px] truncate text-muted-foreground">
                  {url.original_url}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{url.click_count}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground whitespace-nowrap">
                  {formatDateTime(url.created_at)}
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-1">
                     <Button variant="ghost" size="icon" onClick={() => handleCopy(url.slug)} title={t("title.copy")}>
                      <Copy className="size-4" />
                    </Button>
                    <a href={`/${url.slug}`} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon" title={t("title.open")}>
                        <ExternalLink className="size-4" />
                      </Button>
                    </a>
                      <Button variant="ghost" size="icon" onClick={() => router.push(`/urls/${url.slug}`)} title={t("title.stats")}>
                      <BarChart3 className="size-4" />
                    </Button>
                      <Button variant="ghost" size="icon" onClick={() => router.push(`/urls/${url.slug}/edit`)} title={t("title.edit")}>
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteTarget(url.slug)}
                      title={t("title.delete")}
                    >
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <p>
          {selected.size > 0
            ? t("urls.selectedRows", { count: selected.size, total: data.items.length })
            : t("urls.results", { count: data.filtered_count })}
        </p>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon-sm" disabled={page <= 1} onClick={() => onPageChange(1)} title="First page">
            <ChevronsLeft className="size-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" disabled={!data.has_previous} onClick={() => onPageChange(page - 1)} title="Previous page">
            <ChevronLeft className="size-4" />
          </Button>
          <span className="mx-2 min-w-[80px] text-center text-sm">
            Page {data.page} of {data.total_pages}
          </span>
          <Button variant="ghost" size="icon-sm" disabled={!data.has_next} onClick={() => onPageChange(page + 1)} title="Next page">
            <ChevronRight className="size-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" disabled={page >= data.total_pages} onClick={() => onPageChange(data.total_pages)} title="Last page">
            <ChevronsRight className="size-4" />
          </Button>
        </div>
      </div>

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("dialog.deleteTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("dialog.deleteDescription", { slug: deleteTarget ?? "" })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteTarget(null)}>{t("action.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteTarget) {
                  onDelete(deleteTarget);
                  setDeleteTarget(null);
                }
              }}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {t("action.delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
