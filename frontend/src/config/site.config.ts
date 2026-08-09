export const siteConfig = {
  name: "ShortLink",
  description: "A modern URL shortener",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5030",
};

export function getApiBaseUrl(version: "v1" | "v2" = "v1"): string {
  return `${siteConfig.apiUrl}/api/${version}`;
}
