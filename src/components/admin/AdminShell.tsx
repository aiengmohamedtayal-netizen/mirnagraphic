"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  BarChart3,
  Bell,
  Boxes,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  ExternalLink,
  Factory,
  LayoutDashboard,
  Menu,
  PackageOpen,
  Search,
  Settings,
  Users,
  FilePenLine,
  Image,
  SearchCheck,
  UserCog,
  X,
} from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { adminDictionary } from "@/data/admin/dictionary";

const navigation = [
  { key: "dashboard", href: "/admin", icon: LayoutDashboard },
  { key: "quoteRequests", href: "/admin/quote-requests", icon: ClipboardList },
  { key: "projects", href: "/admin/projects", icon: Boxes },
  { key: "production", href: "/admin/production", icon: Factory },
  { key: "inventory", href: "/admin/inventory", icon: PackageOpen },
  { key: "clients", href: "/admin/clients", icon: Users },
  { key: "reports", href: "/admin/reports", icon: BarChart3 },
  { key: "settings", href: "/admin/settings", icon: Settings },
  { key: "content", href: "/admin/content", icon: FilePenLine },
  { key: "catalog", href: "/admin/catalog", icon: Boxes },
  { key: "media", href: "/admin/media", icon: Image },
  { key: "seo", href: "/admin/seo", icon: SearchCheck },
  { key: "users", href: "/admin/users", icon: UserCog },
] as const;

type AdminShellProps = {
  children: ReactNode;
  title?: string;
  description?: string;
};

export default function AdminShell({ children, title, description }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { locale, setLocale, dir } = useLocale();
  const copy = adminDictionary[locale];
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isRtl = dir === "rtl";

  return (
    <div className="admin-shell min-h-screen bg-[#F3F6F9] text-[#1E293B]" dir={dir}>
      <aside
        className={`admin-sidebar fixed inset-y-0 z-50 flex w-[286px] flex-col border-[#DCE5EC] bg-[#102F49] px-4 py-5 text-white shadow-[0_18px_60px_rgba(15,76,129,0.18)] transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : isRtl ? "translate-x-full" : "-translate-x-full"
        } ${isRtl ? "right-0 border-l" : "left-0 border-r"}`}
        aria-label="Admin navigation"
      >
        <div className="flex items-center justify-between gap-3 px-2">
          <Link href="/admin" className="group flex min-w-0 items-center gap-3 rounded-xl px-2 py-1 focus-visible:outline-white" onClick={() => setSidebarOpen(false)}>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37] text-lg font-black tracking-[-0.08em] text-[#102F49] shadow-[0_8px_20px_rgba(212,175,55,0.22)]" aria-hidden="true">MG</span>
            <span className="min-w-0">
              <span className="block truncate text-[10px] font-semibold uppercase tracking-[0.18em] text-[#BBD0DF]">{copy.brandKicker}</span>
              <span className="block truncate text-base font-bold tracking-[-0.02em]">{copy.brandTitle}</span>
            </span>
          </Link>
          <button type="button" className="admin-icon-button text-[#BBD0DF] hover:bg-white/10 hover:text-white lg:hidden" onClick={() => setSidebarOpen(false)} aria-label={copy.common.close}>
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="mt-10 px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#7FA0B7]">Workspace</div>
        <nav className="mt-3 flex-1 space-y-1" aria-label="Primary">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = item.key === "dashboard" ? pathname === "/admin" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`admin-nav-item group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors ${active ? "bg-white text-[#102F49] shadow-[0_8px_20px_rgba(0,0,0,0.12)]" : "text-[#C7D7E2] hover:bg-white/10 hover:text-white"}`}
              >
                <Icon size={18} strokeWidth={active ? 2.4 : 1.9} aria-hidden="true" />
                <span className="flex-1">{copy.nav[item.key]}</span>
                {active && (isRtl ? <ChevronLeft size={15} aria-hidden="true" /> : <ChevronRight size={15} aria-hidden="true" />)}
              </Link>
            );
          })}
        </nav>

        <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-3">
          <div className="flex items-start gap-3">
            <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#76C69B] shadow-[0_0_0_4px_rgba(118,198,155,0.12)]" aria-hidden="true" />
            <div>
              <p className="text-xs font-bold text-white">Authenticated workspace</p>
              <p className="mt-1 text-[11px] leading-5 text-[#A9C0CF]">Live CMS controls are protected by session.</p>
            </div>
          </div>
        </div>
        <Link href="/" className="mt-3 flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-xs font-bold text-[#BBD0DF] transition-colors hover:bg-white/10 hover:text-white" onClick={() => setSidebarOpen(false)}>
          <ExternalLink size={15} aria-hidden="true" />
          {copy.nav.publicSite}
        </Link>
        <button type="button" className="mt-1 flex w-full items-center justify-center rounded-xl px-3 py-2 text-xs font-bold text-[#BBD0DF] transition-colors hover:bg-white/10 hover:text-white" onClick={async () => { await fetch("/api/auth/logout", { method: "POST" }); router.replace("/admin/login"); router.refresh(); }}>Sign out</button>
      </aside>

      {sidebarOpen && <button type="button" aria-label={copy.common.close} className="fixed inset-0 z-40 bg-[#061724]/60 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className={`min-h-screen min-w-0 overflow-x-hidden ${isRtl ? "lg:pr-[286px]" : "lg:pl-[286px]"}`} dir={dir}>
        <header className="sticky top-0 z-30 border-b border-[#DCE5EC]/90 bg-[#F3F6F9]/90 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-10" dir={dir}>
          <div className="mx-auto flex max-w-[1540px] items-center gap-3">
            <button type="button" className="admin-icon-button border border-[#DCE5EC] bg-white text-[#0F4C81] lg:hidden" onClick={() => setSidebarOpen(true)} aria-label={copy.common.menu} aria-expanded={sidebarOpen}>
              <Menu size={19} aria-hidden="true" />
            </button>
            <div className="relative hidden max-w-[330px] flex-1 md:block">
              <Search className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-[#7F91A1] ${isRtl ? "right-3.5" : "left-3.5"}`} size={17} aria-hidden="true" />
              <label htmlFor="admin-search" className="sr-only">{copy.common.search}</label>
              <input id="admin-search" type="search" placeholder={copy.common.search} className={`h-11 w-full rounded-xl border border-[#DCE5EC] bg-white text-sm text-[#1E293B] shadow-sm outline-none transition focus:border-[#0F4C81] focus:ring-4 focus:ring-[#0F4C81]/10 ${isRtl ? "pr-10 pl-4" : "pl-10 pr-4"}`} />
            </div>
            <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
              <span className="hidden rounded-full border border-[#D4AF37]/30 bg-[#FFF9E8] px-3 py-1.5 text-[11px] font-bold text-[#8B6E13] sm:inline-flex">{copy.dashboard.liveData}</span>
              <button type="button" className="admin-icon-button border border-[#DCE5EC] bg-white text-[#516576]" aria-label={copy.common.notifications}>
                <Bell size={17} aria-hidden="true" />
                <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#D4AF37]" aria-hidden="true" />
              </button>
              <div className="hidden h-8 w-px bg-[#DCE5EC] sm:block" aria-hidden="true" />
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#DCEAF4] text-xs font-black text-[#0F4C81]" aria-hidden="true">OP</span>
                <div className="hidden leading-tight sm:block">
                  <p className="text-xs font-bold text-[#1E293B]">Mirna CMS</p>
                  <p className="text-[10px] text-[#7F91A1]">Authenticated session</p>
                </div>
              </div>
              <button type="button" className="rounded-lg border border-[#DCE5EC] bg-white px-2.5 py-2 text-[11px] font-bold text-[#0F4C81] transition hover:border-[#0F4C81] focus-visible:outline-[#0F4C81]" onClick={() => setLocale(locale === "en" ? "ar" : "en")} aria-label={locale === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"}>
                {locale === "en" ? "ع" : "EN"}
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1540px] px-4 py-7 sm:px-6 lg:px-10 lg:py-10" dir={dir}>
          {(title || description) && (
            <div className="mb-7">
              {title && <h1 className="text-2xl font-extrabold tracking-[-0.04em] text-[#17344B] sm:text-3xl">{title}</h1>}
              {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6F8291]">{description}</p>}
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
