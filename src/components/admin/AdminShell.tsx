"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FilePenLine,
  Image,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  UsersRound,
  X,
} from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { adminDictionary } from "@/data/admin/dictionary";
import AIAssistant from "@/components/ai/AIAssistant";

const navigation = [
  {
    section: "website",
    items: [
      { key: "dashboard", href: "/admin", icon: LayoutDashboard },
      { key: "content", href: "/admin/content", icon: FilePenLine },
      { key: "catalog", href: "/admin/catalog", icon: SlidersHorizontal },
      { key: "media", href: "/admin/media", icon: Image },
      { key: "seo", href: "/admin/seo", icon: Search },
    ],
  },
  {
    section: "management",
    items: [
      { key: "users", href: "/admin/users", icon: UsersRound },
      { key: "settings", href: "/admin/settings", icon: Settings2 },
    ],
  },
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

  if (pathname.startsWith("/admin/login")) {
    return <div className="admin-login-route" dir={dir}>{children}</div>;
  }

  async function signOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="admin-shell min-h-screen bg-[#F4F7FA] text-[#172C3E]" dir={dir}>
      <aside
        className={`admin-sidebar fixed inset-y-0 z-50 flex w-[292px] flex-col border-[#163D57] bg-[#061B2B] px-4 py-5 text-white shadow-[0_18px_60px_rgba(4,25,42,0.28)] transition-transform duration-200 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : isRtl ? "translate-x-full" : "-translate-x-full"} ${isRtl ? "right-0 border-l" : "left-0 border-r"}`}
        aria-label={locale === "ar" ? "تنقل لوحة التحكم" : "Admin navigation"}
      >
        <div className="flex items-center justify-between gap-3 px-2">
          <Link href="/admin" className="group flex min-w-0 items-center gap-3 rounded-2xl px-2 py-1 focus-visible:outline-white" onClick={() => setSidebarOpen(false)}>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F4C542] to-[#D99A1D] text-lg font-black tracking-[-0.08em] text-[#061B2B] shadow-[0_10px_22px_rgba(244,197,66,0.2)]" aria-hidden="true">MG</span>
            <span className="min-w-0">
              <span className="block truncate text-[10px] font-bold uppercase tracking-[0.18em] text-[#8DB0C4]">{copy.brandKicker}</span>
              <span className="block truncate text-[17px] font-extrabold tracking-[-0.03em] text-white">{copy.brandTitle}</span>
            </span>
          </Link>
          <button type="button" className="admin-icon-button text-[#A8C0D0] hover:bg-white/10 hover:text-white lg:hidden" onClick={() => setSidebarOpen(false)} aria-label={copy.common.close}>
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="px-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#6E91A8]">{copy.nav.websiteSection}</p>
          <nav className="mt-3 space-y-1.5" aria-label={copy.nav.websiteSection}>
            {navigation[0].items.map((item) => {
              const Icon = item.icon;
              const active = item.key === "dashboard" ? pathname === "/admin" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-extrabold transition ${active ? "bg-gradient-to-r from-[#11B8D4] to-[#087DAD] text-white shadow-[0_10px_24px_rgba(17,184,212,0.2)]" : "text-[#C4D5DF] hover:bg-white/[0.08] hover:text-white"}`}
                >
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${active ? "bg-white/15 text-[#FFD44F]" : "bg-[#102F45] text-[#F4C542]"}`}><Icon size={17} strokeWidth={active ? 2.5 : 2} aria-hidden="true" /></span>
                  <span className="flex-1">{copy.nav[item.key]}</span>
                  {active && (isRtl ? <ChevronLeft size={15} aria-hidden="true" /> : <ChevronRight size={15} aria-hidden="true" />)}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-7 border-t border-white/10 pt-6">
          <p className="px-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#6E91A8]">{copy.nav.managementSection}</p>
          <nav className="mt-3 space-y-1.5" aria-label={copy.nav.managementSection}>
            {navigation[1].items.map((item) => {
              const Icon = item.icon;
              const active = pathname.startsWith(item.href);
              return (
                <Link key={item.key} href={item.href} onClick={() => setSidebarOpen(false)} aria-current={active ? "page" : undefined} className={`group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-extrabold transition ${active ? "bg-gradient-to-r from-[#11B8D4] to-[#087DAD] text-white shadow-[0_10px_24px_rgba(17,184,212,0.2)]" : "text-[#C4D5DF] hover:bg-white/[0.08] hover:text-white"}`}>
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${active ? "bg-white/15 text-[#FFD44F]" : "bg-[#102F45] text-[#F4C542]"}`}><Icon size={17} strokeWidth={active ? 2.5 : 2} aria-hidden="true" /></span>
                  <span className="flex-1">{copy.nav[item.key]}</span>
                  {active && (isRtl ? <ChevronLeft size={15} aria-hidden="true" /> : <ChevronRight size={15} aria-hidden="true" />)}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto space-y-2 pt-6">
          <div className="rounded-2xl border border-[#1F4A63] bg-[#0B2A40] p-3.5">
            <div className="flex items-start gap-3">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#6ED49A] shadow-[0_0_0_4px_rgba(110,212,154,0.12)]" aria-hidden="true" />
              <div>
                <p className="text-xs font-extrabold text-white">{copy.nav.liveWorkspace}</p>
                <p className="mt-1 text-[11px] leading-5 text-[#9BB8C9]">{copy.nav.liveWorkspaceDetail}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-[#1F4A63] bg-[#0B2A40] p-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#16435C] text-xs font-black text-[#FFD44F]">MG</span>
            <div className="min-w-0 flex-1"><p className="truncate text-xs font-extrabold text-white">Mirna CMS</p><p className="truncate text-[10px] text-[#9BB8C9]">{copy.nav.authenticated}</p></div>
            <ShieldCheck size={16} className="text-[#6ED49A]" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Link href="/" className="flex items-center justify-center gap-2 rounded-xl px-2 py-2.5 text-[11px] font-extrabold text-[#B8CDD9] transition hover:bg-white/10 hover:text-white" onClick={() => setSidebarOpen(false)}><ExternalLink size={14} aria-hidden="true" />{copy.nav.publicSite}</Link>
            <button type="button" className="flex items-center justify-center gap-2 rounded-xl px-2 py-2.5 text-[11px] font-extrabold text-[#B8CDD9] transition hover:bg-white/10 hover:text-white" onClick={() => void signOut()}><LogOut size={14} aria-hidden="true" />{copy.nav.signOut}</button>
          </div>
        </div>
      </aside>

      {sidebarOpen && <button type="button" aria-label={copy.common.close} className="fixed inset-0 z-40 bg-[#061724]/70 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className={`min-h-screen min-w-0 overflow-x-hidden ${isRtl ? "lg:pr-[292px]" : "lg:pl-[292px]"}`} dir={dir}>
        <header className="sticky top-0 z-30 border-b border-[#DDE8EF]/90 bg-[#F4F7FA]/90 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-10" dir={dir}>
          <div className="mx-auto flex max-w-[1540px] items-center gap-3">
            <button type="button" className="admin-icon-button border border-[#DCE5EC] bg-white text-[#0F4C81] lg:hidden" onClick={() => setSidebarOpen(true)} aria-label={copy.common.menu} aria-expanded={sidebarOpen}><Menu size={19} aria-hidden="true" /></button>
            <div className="hidden flex-1 items-center gap-2 md:flex"><span className="h-2 w-2 rounded-full bg-[#10A7C8]" aria-hidden="true" /><span className="text-xs font-extrabold text-[#587184]">{copy.nav.controlCenter}</span></div>
            <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
              <Link href="/admin/content" className="hidden rounded-xl bg-[#E5F7FA] px-3 py-2 text-[11px] font-black text-[#087DAD] transition hover:bg-[#D4F0F5] sm:inline-flex">{copy.nav.quickEdit}</Link>
              <div className="hidden h-8 w-px bg-[#DCE5EC] sm:block" aria-hidden="true" />
              <div className="flex items-center gap-2"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#DDF3F6] text-xs font-black text-[#087DAD]">MG</span><div className="hidden leading-tight sm:block"><p className="text-xs font-extrabold text-[#1E3A50]">Mirna CMS</p><p className="text-[10px] text-[#7F91A1]">{copy.nav.authenticated}</p></div></div>
              <button type="button" className="rounded-xl border border-[#DCE5EC] bg-white px-2.5 py-2 text-[11px] font-black text-[#0F4C81] transition hover:border-[#0F4C81]" onClick={() => setLocale(locale === "en" ? "ar" : "en")} aria-label={locale === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"}>{locale === "en" ? "ع" : "EN"}</button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1540px] px-4 py-7 sm:px-6 lg:px-10 lg:py-10" dir={dir}>
          {(title || description) && <div className="mb-7"><h1 className="text-2xl font-extrabold tracking-[-0.04em] text-[#17344B] sm:text-3xl">{title}</h1>{description && <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6F8291]">{description}</p>}</div>}
          {children}
        </main>
        <AIAssistant mode="admin" />
      </div>
    </div>
  );
}
