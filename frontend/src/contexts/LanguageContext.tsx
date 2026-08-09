"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { languages, defaultLanguage, type LanguageCode, type LanguageConfig } from "@/config/language.config";

interface LanguageContextValue {
  language: LanguageConfig;
  setLanguage: (code: LanguageCode) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [languageCode, setLanguageCode] = useState<LanguageCode>(defaultLanguage);

  useEffect(() => {
    const stored = localStorage.getItem("language") as LanguageCode | null;
    if (stored && languages[stored]) {
      setLanguageCode(stored);
    }
  }, []);

  const applyLanguage = useCallback((code: LanguageCode) => {
    const config = languages[code];
    const html = document.documentElement;

    html.setAttribute("lang", code);
    html.setAttribute("dir", config.dir);
    html.style.setProperty("--font-family", config.font);

    localStorage.setItem("language", code);
  }, []);

  useEffect(() => {
    applyLanguage(languageCode);
  }, [languageCode, applyLanguage]);

  const setLanguage = useCallback((code: LanguageCode) => {
    setLanguageCode(code);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageCode((prev) => (prev === "en" ? "fa" : "en"));
  }, []);

  return (
    <LanguageContext.Provider value={{ language: languages[languageCode], setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}
