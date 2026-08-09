import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { LanguageToggle } from "@/components/shared/LanguageToggle";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4">
      <div className="absolute ltr:right-4 rtl:left-4 top-4 flex items-center gap-1">
        <LanguageToggle />
        <ThemeToggle />
      </div>
      {children}
    </div>
  );
}
