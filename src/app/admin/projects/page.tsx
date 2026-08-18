"use client";

import Link from "next/link";
import { Boxes, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLocale } from "@/context/LocaleContext";
import { EmptyState, PageIntro, StatusBadge, SurfaceHeader } from "@/components/admin/AdminUi";

type Localized = { ar?: string; en?: string };
type CmsProject = { id: string; slug: string; name: Localized; excerpt?: Localized | null; industry?: Localized | null; status: "draft" | "published" | "archived"; updatedAt: string };

export default function ProjectsPage() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  const [items, setItems] = useState<CmsProject[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/cms/catalog?type=projects")
      .then(async (response) => {
        if (!response.ok) throw new Error("LOAD_FAILED");
        const data = await response.json() as { items?: CmsProject[] };
        setItems(data.items ?? []);
      })
      .catch(() => setError(isArabic ? "تعذر تحميل المشاريع الحقيقية." : "Live projects could not be loaded."))
      .finally(() => setLoading(false));
  }, [isArabic]);

  const filtered = useMemo(() => items.filter((project) => {
    const text = `${project.slug} ${project.name.ar ?? ""} ${project.name.en ?? ""}`.toLowerCase();
    return text.includes(query.toLowerCase());
  }), [items, query]);

  return (
    <div>
      <PageIntro eyebrow={isArabic ? "محتوى الموقع" : "Site content"} title={isArabic ? "المشروعات" : "Projects"} description={isArabic ? "هذه القائمة تقرأ مشاريع CMS الحقيقية من Neon، بدون أي بيانات تشغيلية افتراضية." : "This list reads real CMS projects from Neon and never fabricates operational records."} action={<Link href="/admin/catalog" className="inline-flex items-center gap-2 rounded-xl bg-[#0F4C81] px-4 py-3 text-xs font-black text-white shadow-[0_10px_20px_rgba(15,76,129,0.14)]"><Boxes size={15} aria-hidden="true" /> {isArabic ? "إدارة المحتوى" : "Manage catalog"}</Link>} />
      <section className="admin-surface p-5 sm:p-6">
        <SurfaceHeader title={isArabic ? "مشاريع CMS" : "CMS projects"} detail={`${items.length} ${isArabic ? "سجلات حقيقية" : "live database records"}`} />
        {items.length > 0 && <div className="mb-5 relative max-w-sm"><Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8A9AA6]" size={15} aria-hidden="true" /><label htmlFor="projects-search" className="sr-only">Search projects</label><input id="projects-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={isArabic ? "ابحث في المشاريع" : "Search projects"} className="h-10 w-full rounded-lg border border-[#DCE5EC] bg-white pl-9 pr-3 text-xs outline-none focus:border-[#0F4C81] focus:ring-4 focus:ring-[#0F4C81]/10" /></div>}
        {error ? <p className="rounded-xl border border-[#F0D0D0] bg-[#FFF7F7] p-4 text-xs font-bold text-[#9B4D4D]">{error}</p> : loading ? <p className="py-12 text-center text-xs font-bold text-[#8293A0]">{isArabic ? "جارٍ تحميل البيانات الحقيقية…" : "Loading live data…"}</p> : filtered.length === 0 ? <EmptyState title={isArabic ? "لا توجد مشاريع حقيقية" : "No live projects"} description={isArabic ? "أضف مشروعاً من صفحة الكتالوج ليظهر هنا." : "Create a project from the catalog page for it to appear here."} action={<Link href="/admin/catalog" className="inline-flex rounded-xl bg-[#0F4C81] px-4 py-3 text-xs font-black text-white">{isArabic ? "فتح الكتالوج" : "Open catalog"}</Link>} /> : <div className="grid gap-4 xl:grid-cols-2">{filtered.map((project) => <article key={project.id} className="rounded-2xl border border-[#E6EDF2] bg-[#FBFDFE] p-4"><div className="flex items-start justify-between gap-3"><div className="flex min-w-0 items-start gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF3FA] text-[#0F4C81]"><Boxes size={18} aria-hidden="true" /></span><div className="min-w-0"><p className="truncate text-sm font-extrabold text-[#1E3A50]">{project.name[locale] ?? project.name.en ?? project.name.ar ?? project.slug}</p><p className="mt-1 truncate text-xs text-[#8293A0]">{project.slug}</p></div></div><StatusBadge label={project.status} tone={project.status === "published" ? "green" : project.status === "draft" ? "amber" : "slate"} /></div>{(project.excerpt?.[locale] || project.industry?.[locale]) && <p className="mt-4 text-xs leading-5 text-[#6F8291]">{project.excerpt?.[locale] ?? project.industry?.[locale]}</p>}<p className="mt-4 text-[11px] font-bold text-[#8797A3]">{new Date(project.updatedAt).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-GB")}</p></article>)}</div>}
      </section>
    </div>
  );
}
