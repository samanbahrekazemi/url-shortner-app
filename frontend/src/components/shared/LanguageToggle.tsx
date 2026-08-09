"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Check, Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { languages, type LanguageCode } from "@/config/language.config";
import { useTranslation } from "@/config/i18n";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon" />
        }
      >
        <Languages className="size-5" />
        <span className="sr-only">{t("aria.selectLanguage")}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        {(Object.keys(languages) as LanguageCode[]).map((code) => {
          const isActive = code === language.code;
          return (
            <DropdownMenuItem
              key={code}
              onClick={() => setLanguage(code)}
              className={isActive ? "bg-muted font-semibold rounded-md" : ""}
            >
              <Check className={`ltr:mr-2 rtl:ml-2 size-4 ${isActive ? "opacity-100" : "opacity-0"}`} />
              <span>{languages[code].label}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
