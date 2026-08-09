export type LanguageCode = "en" | "fa";

export interface LanguageConfig {
  code: LanguageCode;
  label: string;
  dir: "ltr" | "rtl";
  font: string;
  googleFontsUrl: string;
}

export const languages: Record<LanguageCode, LanguageConfig> = {
  en: {
    code: "en",
    label: "English",
    dir: "ltr",
    font: "Geomini, sans-serif",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Geomini:wght@400..700&display=swap",
  },
  fa: {
    code: "fa",
    label: "فارسی",
    dir: "rtl",
    font: "Estedad, sans-serif",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Estedad:wght@400..700&display=swap",
  },
};

export const defaultLanguage: LanguageCode = "en";
