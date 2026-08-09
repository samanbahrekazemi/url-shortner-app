"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Fragment } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/config/i18n";

const LABEL_MAP: Record<string, "nav.myUrls" | "action.edit" | "nav.profile"> = {
  urls: "nav.myUrls",
  edit: "action.edit",
  profile: "nav.profile",
};

export function Breadcrumb() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const { t } = useTranslation();
  const ChevronIcon = language.dir === "rtl" ? ChevronLeft : ChevronRight;
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return (
      <nav className="flex items-center gap-1 text-sm">
        <span className="font-medium text-foreground">{t("nav.dashboard")}</span>
      </nav>
    );
  }

  return (
    <nav className="flex items-center gap-1 text-sm">
      <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
        {t("nav.dashboard")}
      </Link>
      {segments.map((segment, i) => {
        const href = "/" + segments.slice(0, i + 1).join("/");
        const isLast = i === segments.length - 1;
        return (
          <Fragment key={href}>
            <ChevronIcon className="size-3.5 shrink-0 text-muted-foreground" />
            {isLast ? (
              <span className="font-medium text-foreground">{t(LABEL_MAP[segment] || ("nav.dashboard" as const))}</span>
            ) : (
              <Link href={href} className="text-muted-foreground hover:text-foreground transition-colors">
                {t(LABEL_MAP[segment] || ("nav.dashboard" as const))}
              </Link>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
