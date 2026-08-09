"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { useState, type ReactNode } from "react";

function ToasterWrapper() {
  const { language } = useLanguage();
  return <Toaster richColors position={language.dir === "rtl" ? "top-left" : "top-right"} />;
}

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            retry: 1,
          },
        },
      })
  );

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <LanguageProvider>
            {children}
            <ToasterWrapper />
          </LanguageProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
