"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUrlSchema, type CreateUrlFormData } from "@/lib/validations/url.schema";
import { useCreateUrl } from "@/lib/hooks/useUrls";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Link2, X, Check, Copy, ExternalLink, ChevronDown, ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import type { CreateUrlResponse } from "@/lib/api/types/url.types";
import { useTranslation, type TranslationKey } from "@/config/i18n";

type TFn = (key: TranslationKey, vars?: Record<string, string | number>) => string;

interface CreateUrlDialogProps {
  open: boolean;
  onClose: () => void;
}

export function CreateUrlDialog({ open, onClose }: CreateUrlDialogProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const createUrl = useCreateUrl();
  const [result, setResult] = useState<CreateUrlResponse | null>(null);
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const prevOpen = useRef(open);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUrlFormData>({
    resolver: zodResolver(createUrlSchema),
    defaultValues: { original_url: "", algorithm: "v1" },
  });

  useEffect(() => {
    if (open && !prevOpen.current) {
      setMounted(true);
      requestAnimationFrame(() => setVisible(true));
    } else if (!open && prevOpen.current) {
      setVisible(false);
    }
    prevOpen.current = open;
  }, [open]);

  useEffect(() => {
    if (!visible && mounted && !open) {
      const timer = setTimeout(() => {
        setMounted(false);
        setResult(null);
        setCopied(false);
        reset();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [visible, mounted, open, reset]);

  const handleEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    if (mounted) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [mounted, handleEsc]);

  async function onSubmit(data: CreateUrlFormData) {
    const res = await createUrl.mutateAsync({
      original_url: data.original_url,
      algorithm: data.algorithm,
    });
    setResult(res);
    router.refresh();
  }

  function handleClose() {
    onClose();
  }

  function handleCopy(url: string) {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!mounted) return null;

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-150 ${visible ? "opacity-100" : "opacity-0"}`}
        onClick={handleClose}
      />

      <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center md:p-4" onClick={handleClose}>
        <div
          className={`flex max-h-[85vh] w-full max-w-lg flex-col rounded-t-xl border bg-background p-6 shadow-lg transition-all duration-150 md:max-h-[90vh] md:rounded-xl ${
            visible
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-4 md:translate-y-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ChevronDown className="size-4 text-muted-foreground md:hidden" />
              <h2 className="text-lg font-semibold">{result ? t("dialog.createdTitle") : t("dialog.createTitle")}</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="size-4" />
            </Button>
          </div>
          <div className="p-1 overflow-y-auto">
            {result ? (
              <ResultView result={result} onCopy={handleCopy} copied={copied} t={t} />
            ) : (
              <FormContent
                register={register}
                errors={errors}
                onSubmit={handleSubmit(onSubmit)}
                isPending={createUrl.isPending}
                t={t}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function ResultView({
  result,
  onCopy,
  copied,
  t,
}: {
  result: CreateUrlResponse;
  onCopy: (url: string) => void;
  copied: boolean;
  t: TFn;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 rounded-lg border bg-muted/30 p-3">
        <Check className="size-5 shrink-0 text-emerald-500" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{result.short_url}</p>
          <p className="truncate text-xs text-muted-foreground">/{result.slug}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1 gap-2"
          onClick={() => onCopy(result.short_url)}
        >
           {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          {copied ? t("action.copied") : t("action.copy")}
        </Button>
        <a
          href={result.short_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-sm font-medium whitespace-nowrap transition-all outline-none select-none hover:bg-muted hover:text-foreground"
        >
          <ExternalLink className="size-4" />
        </a>
      </div>
    </div>
  );
}

function FormContent({
  register,
  errors,
  onSubmit,
  isPending,
  t,
}: {
  register: ReturnType<typeof useForm<CreateUrlFormData>>["register"];
  errors: ReturnType<typeof useForm<CreateUrlFormData>>["formState"]["errors"];
  onSubmit: () => void;
  isPending: boolean;
  t: TFn;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="dialog-url">{t("form.longUrl")}</Label>
        <div className="relative">
          <Link2 className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input id="dialog-url" type="url" placeholder={t("form.longUrlPlaceholder")} className="ps-9" {...register("original_url")} />
        </div>
        {errors.original_url && <p className="text-xs text-destructive">{errors.original_url.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>{t("form.algorithm")}</Label>
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <input id="algo-v1" type="radio" value="v1" defaultChecked className="peer sr-only" {...register("algorithm")} />
            <span className="pointer-events-none absolute end-2.5 top-2.5 z-10 flex size-4 items-center justify-center rounded-full border border-input text-transparent peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground">
              <Check className="size-3" />
            </span>
            <label
              htmlFor="algo-v1"
              className="flex cursor-pointer flex-col gap-1 rounded-lg border border-input bg-background p-3 text-sm peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary"
            >
              <span className="font-medium">{t("form.base62")}</span>
              <span className="text-xs text-muted-foreground">{t("form.base62Desc")}</span>
            </label>
          </div>
          <div className="relative">
            <input id="algo-v2" type="radio" value="v2" className="peer sr-only" {...register("algorithm")} />
            <span className="pointer-events-none absolute end-2.5 top-2.5 z-10 flex size-4 items-center justify-center rounded-full border border-input text-transparent peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground">
              <Check className="size-3" />
            </span>
            <label
              htmlFor="algo-v2"
              className="flex cursor-pointer flex-col gap-1 rounded-lg border border-input bg-background p-3 text-sm peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary"
            >
              <span className="font-medium">{t("form.xor")}</span>
              <span className="text-xs text-muted-foreground">{t("form.xorDesc")}</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? <LoadingSpinner size={16} /> : <>{t("dialog.createTitle")} <ArrowUpRight className="size-4" /></>}
        </Button>
      </div>
    </form>
  );
}
