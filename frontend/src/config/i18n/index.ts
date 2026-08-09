"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { en, fa, type TranslationDict, type TranslationKey } from "./translations";

export type { TranslationKey, TranslationDict } from "./translations";

const dictionaries: Record<string, TranslationDict> = { en, fa };

export function useTranslation() {
  const { language } = useLanguage();

  function t(key: TranslationKey, vars?: Record<string, string | number>): string {
    const dict = dictionaries[language.code] ?? en;
    let text = dict[key] ?? en[key] ?? key;

    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        text = text.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
      }
    }
    return text;
  }

  return { t, language };
}

const STORAGE_KEY = "language";

export function translate(key: TranslationKey, vars?: Record<string, string | number>): string {
  let languageCode = "en";
  if (typeof window !== "undefined") {
    languageCode = window.localStorage.getItem(STORAGE_KEY) || "en";
  }
  const dict = dictionaries[languageCode] ?? en;
  let text = dict[key] ?? en[key] ?? key;

  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      text = text.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
    }
  }
  return text;
}

const STATUS_ERROR_KEYS: Record<number, TranslationKey> = {
  401: "error.unauthorized",
  403: "error.forbidden",
  404: "error.notFound",
  409: "error.conflict",
  422: "error.validation",
  500: "error.server",
  502: "error.server",
  503: "error.server",
  504: "error.server",
};

export function getErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "status" in error) {
    const status = (error as { status: number }).status;
    if (status === 0) return translate("error.network");
    const key = STATUS_ERROR_KEYS[status];
    if (key) return translate(key);
  }
  return translate("error.unknown");
}
