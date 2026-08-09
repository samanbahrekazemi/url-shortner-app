import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "ShortLink - URL Shortener",
  description: "A modern URL shortening service",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className="h-full antialiased" style={{ fontFamily: "Geomini, sans-serif" }}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Geomini:wght@400..700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Estedad:wght@400..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
