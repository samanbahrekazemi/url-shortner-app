"use client";

import { useState, useCallback } from "react";
import { useUrls, useDeleteUrl } from "@/lib/hooks/useUrls";
import { URLTable } from "@/components/urls/URLTable";
import { CreateUrlDialog } from "@/components/urls/CreateUrlDialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, PlusCircle, ArrowUpRight } from "lucide-react";
import { useTranslation } from "@/config/i18n";

export default function UrlsPage() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("created_at");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [createOpen, setCreateOpen] = useState(false);

  const { data, isLoading } = useUrls({ page, limit: 10, search, sort, order });
  const deleteUrl = useDeleteUrl();

  const handleSortChange = useCallback((field: string) => {
    setSort((prev) => {
      if (prev === field) {
        setOrder((o) => (o === "asc" ? "desc" : "asc"));
        return prev;
      }
      setOrder("desc");
      return field;
    });
    setPage(1);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">{t("urls.heading")}</h1>
        <Button onClick={() => setCreateOpen(true)}>
          <PlusCircle className="mr-2 size-4" />
          {t("action.createUrl")}
          <ArrowUpRight className="ml-1 size-3.5" />
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={t("urls.searchPlaceholder")}
          className="ps-9"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
      </div>

      <URLTable
        data={data}
        isLoading={isLoading}
        sort={sort}
        order={order}
        onSortChange={handleSortChange}
        page={page}
        onPageChange={setPage}
        onDelete={(slug) => deleteUrl.mutate(slug)}
        isDeleting={deleteUrl.isPending}
      />

      <CreateUrlDialog open={createOpen} onClose={() => setCreateOpen(false)} />
    </div>
  );
}
