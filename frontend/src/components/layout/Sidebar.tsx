"use client";

import { useAuth } from "@/contexts/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Link2,
  User,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ChevronUp,
  BookOpen,
  PanelLeft,
  Github,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { siteConfig } from "@/config/site.config";
import { useTranslation } from "@/config/i18n";

const navItems = [
  { href: "/", key: "nav.dashboard" as const, icon: LayoutDashboard },
  { href: "/urls", key: "nav.myUrls" as const, icon: Link2 },
];

const externalLinks = [
  { href: `${siteConfig.apiUrl}/doc`, key: "nav.documentation" as const, icon: BookOpen },
  { href: "https://github.com/samanbahrekazemi/url-shortner-app", key: "nav.github" as const, icon: Github },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sidebar-collapsed") === "true";
    }
    return false;
  });
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", String(collapsed));
  }, [collapsed]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768 && collapsed) {
        setCollapsed(false);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [collapsed]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <>
      <button
        className={cn("fixed top-4 start-4 z-50 md:hidden", mobileOpen && "hidden")}
        onClick={() => setMobileOpen(true)}
        aria-label={t("aria.openMenu")}
      >
        <Menu className="size-6" />
      </button>

      <aside
        className={cn(
          "fixed inset-y-0 z-40 flex flex-col bg-background transition-all duration-300 md:relative border-e border-e-border",
          "start-0",
          collapsed ? "w-16" : "w-64",
          mobileOpen
            ? "translate-x-0"
            : "max-md:-translate-x-full rtl:max-md:translate-x-full md:translate-x-0"
        )}
      >
        <div className={cn("flex h-14 items-center border-b", collapsed ? "justify-center px-0" : "justify-between px-6")}>
          {collapsed ? (
            <ExternalLink className="size-5" />
          ) : (
            <>
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <ExternalLink className="size-5" />
                {siteConfig.name}
              </Link>
              <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="flex items-center justify-center rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground max-md:hidden"
                    title={t("aria.collapseSidebar")}
                  >
                    <PanelLeft className="size-5 rtl:scale-x-[-1]" />
                  </button>
                <button
                  className="md:hidden"
                  onClick={() => setMobileOpen(false)}
                  aria-label={t("aria.closeMenu")}
                >
                  <X className="size-5" />
                </button>
              </div>
            </>
          )}
          {collapsed && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="absolute top-3 flex items-center justify-center rounded-full border bg-background p-1.5 text-muted-foreground shadow-xs transition-colors hover:bg-muted hover:text-foreground max-md:hidden -end-3.5"
              title={t("aria.expandSidebar")}
            >
              <PanelLeft className="size-4 rtl:scale-x-[-1]" />
            </button>
          )}
        </div>

        <nav className={cn("flex-1 space-y-1", collapsed ? "p-2" : "p-4")}>
          {navItems.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center rounded-lg text-sm font-medium transition-colors",
                  collapsed ? "justify-center size-9" : "gap-3 px-3 py-2",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                title={collapsed ? t(item.key) : undefined}
              >
                <item.icon className="size-4 shrink-0" />
                {!collapsed && t(item.key)}
              </Link>
            );
          })}
          {!collapsed && (
            <div className="pt-2">
              <p className="px-3 pb-1 text-xs font-medium text-muted-foreground">{t("nav.resources")}</p>
              {externalLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <item.icon className="size-4" />
                  {t(item.key)}
                  <ExternalLink className="ms-auto size-3" />
                </a>
              ))}
            </div>
          )}
        </nav>

        <div className={cn("border-t", collapsed ? "p-2" : "p-3")}>
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className={cn(
                "flex w-full items-center rounded-xl transition-colors hover:bg-muted",
                collapsed
                  ? "justify-center p-2"
                  : "gap-3 border bg-card p-3 text-start text-sm shadow-xs"
              )}
              title={collapsed ? t("aria.userMenu") : undefined}
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                {user?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2) || "U"}
              </div>
              {!collapsed && (
                <>
                  <div className="min-w-0 flex-1 truncate">
                    <p className="font-medium truncate">{user?.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  </div>
                  <ChevronUp className={`size-4 shrink-0 text-muted-foreground transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                </>
              )}
            </button>

            {userMenuOpen && (
              <div
                className={cn(
                  "overflow-hidden rounded-xl border bg-popover shadow-lg w-56",
                  collapsed
                    ? "absolute top-0 start-full ms-2"
                    : "absolute bottom-0 start-full ms-2"
                )}
              >
                {collapsed && (
                  <div className="px-3 py-2.5">
                    <p className="text-sm font-medium truncate">{user?.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  </div>
                )}
                {collapsed && <div className="h-px bg-border" />}
                  <Link
                    href="/profile"
                    onClick={() => { setUserMenuOpen(false); setMobileOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    <User className="size-4" />
                    {t("nav.profile")}
                  </Link>
                  <div className="h-px bg-border" />
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-muted"
                  >
                    <LogOut className="size-4" />
                    {t("nav.logout")}
                  </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 opacity-50 transition-opacity duration-300 md:hidden"
          onClick={() => setMobileOpen(false)}
          role="presentation"
          aria-hidden="true"
        />
      )}
    </>
  );
}
