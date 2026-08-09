"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { LanguageToggle } from "@/components/shared/LanguageToggle";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { useTranslation } from "@/config/i18n";

export function Header() {
  const { logout } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <header className="flex h-14 items-center justify-between gap-2 border-b bg-background px-4 md:px-6">
      <div>
        <div className="hidden md:block">
          <Breadcrumb />
        </div>
      </div>
      <div className="flex items-center gap-1">
        <LanguageToggle />
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon" className="rounded-full" />
            }
          >
            <User className="size-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48" align="end">
            <DropdownMenuItem onClick={() => router.push("/profile")}>
              <User className="ltr:mr-2 rtl:ml-2 size-4" />
              {t("nav.profile")}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="ltr:mr-2 rtl:ml-2 size-4" />
              {t("nav.logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
