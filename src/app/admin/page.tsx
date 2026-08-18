"use client";

import Link from "next/link";
import { ArrowUpRight, Boxes, Database, Layers3, PackageSearch } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocale } from "@/context/LocaleContext";
import { adminDictionary } from "@/data/admin/dictionary";
import { EmptyState, KpiCard, PageIntro, SurfaceHeader } from "@/components/admin/AdminUi";

type CatalogItem = { id: string; slug: string; status: "draft" | "published" | "archived"; name: { ar?: string; en?: string } };

export default function AdminDashboardPage() {
  const { locale } = useLocale();
  const copy = adminDictionary[locale];
  const [projects, setProjects] = useState<CatalogItem[]>([]);
  const [services, setServices] = useState<CatalogItem[]>([]);
  const [capabilities, setCapabilities] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all(["projects", "services", "capabilities"].map((type) => fetch(`/api/cms/catalog?type=${type}`).then((response) => response.ok ? response.json() as Promise<{ items?: CatalogItem[] }> : { items: [] })))
      .then(([projectsData, servicesData, capabilitiesData]) => { setProjects(projectsData.items ?? []); setServices(servicesData.items ?? []); setCapabilities(capabilitiesData.items ?? []); })
      .finally(() => setLoading(false));
  }, []);

  const liveCount = (items: CatalogItem[]) => items.filter((item) => item.status === "published").length;

  return (
    <div>
      <PageIntro eyebrow={copy.dashboard.eyebrow} title={copy.dashboard.title} description={locale === "ar" ? "ملخص حيّ لمحتوى CMS الموجود في Neon. لا توجد أرقام تشغيلية افتراضية في هذه اللوحة." : "A live summary of CMS content stored in Neon. No fabricated operational figures are shown here."} action={<Link href="/admin/catalog" className="inline-flex items-center gap-2 rounded-xl bg-[#0F4C81] px-4 py-3 text-xs font-black text-white shadow-[0_10px_20px_rgba(15,76,129,0.16)] transition hover:bg-[#0A3A63]"><ArrowUpRight size={15} aria-hidden="true" /> {locale === "ar" ? "إدارة المحتوى" : "Manage content"}</Link>} />
      <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label={locale === "ar" ? "المشاريع المنشورة" : "Published projects"} value={loading ? "—" : String(liveCount(projects))} detail={locale === "ar" ? "من قاعدة CMS الحقيقية" : "From the live CMS database"} trend="Live" tone="blue" />
        <KpiCard label={locale === "ar" ? "الخدمات المنشورة" : "Published services"} value={loading ? "—" : String(liveCount(services))} detail={locale === "ar" ? "محتوى عام منشور" : "Published public content"} trend="Live" tone="green" />
        <KpiCard label={locale === "ar" ? "القدرات المنشورة" : "Published capabilities"} value={loading ? "—" : String(liveCount(capabilities))} detail={locale === "ar" ? "محتوى عام منشور" : "Published public content"} trend="Live" tone="gold" />
        <KpiCard label={locale === "ar" ? "كل سجلات الكتالوج" : "All catalog records"} value={loading ? "—" : String(projects.length + services.length + capabilities.length)} detail={locale === "ar" ? "مسودات ومنشور وأرشيف" : "Draft, published, and archived"} trend="Live" tone="amber" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.8fr)]">
        <section className="admin-surface p-5 sm:p-6">
          <SurfaceHeader title={locale === "ar" ? "المشاريع الحديثة" : "Recent projects"} detail={locale === "ar" ? "بيانات مباشرة من Neon" : "Live records from Neon"} action={<Link href="/admin/projects" className="text-xs font-black text-[#0F4C81] hover:underline">{copy.common.viewAll}</Link>} />
          {loading ? <p className="py-10 text-center text-xs font-bold text-[#8293A0]">{locale === "ar" ? "جارٍ تحميل البيانات…" : "Loading live data…"}</p> : projects.length === 0 ? <EmptyState title={locale === "ar" ? "لا توجد مشاريع بعد" : "No projects yet"} description={locale === "ar" ? "أضف أول مشروع من صفحة الكتالوج ليظهر هنا." : "Create the first project from the catalog page to see it here."} action={<Link href="/admin/catalog" className="inline-flex rounded-xl bg-[#0F4C81] px-4 py-3 text-xs font-black text-white">{locale === "ar" ? "فتح الكتالوج" : "Open catalog"}</Link>} /> : <div className="space-y-3">{projects.slice(0, 6).map((project) => <div key={project.id} className="flex items-center justify-between gap-4 rounded-xl border border-[#E6EDF2] bg-[#FBFDFE] p-4"><div className="flex min-w-0 items-center gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF3FA] text-[#0F4C81]"><Boxes size={16} aria-hidden="true" /></span><div className="min-w-0"><p className="truncate text-sm font-extrabold text-[#1E3A50]">{project.name[locale] ?? project.name.en ?? project.name.ar ?? project.slug}</p><p className="mt-1 truncate text-[11px] text-[#8798A5]">{project.slug}</p></div></div><span className="shrink-0 rounded-full bg-[#F0F4F7] px-2 py-1 text-[10px] font-black text-[#617586]">{project.status}</span></div>)}</div>}
        </section>

        <section className="admin-surface p-5 sm:p-6">
          <SurfaceHeader title={locale === "ar" ? "حالة النظام" : "System status"} detail={locale === "ar" ? "مصادر البيانات الحالية" : "Current data sources"} />
          <div className="space-y-3"><div className="flex items-center justify-between rounded-xl border border-[#E6EDF2] p-4"><span className="flex items-center gap-2 text-xs font-bold text-[#617586]"><Database size={15} className="text-[#0F4C81]" aria-hidden="true" /> Neon CMS</span><span className="text-[10px] font-black text-[#347B58]">Connected</span></div><div className="flex items-center justify-between rounded-xl border border-[#E6EDF2] p-4"><span className="flex items-center gap-2 text-xs font-bold text-[#617586]"><Layers3 size={15} className="text-[#0F4C81]" aria-hidden="true" /> {locale === "ar" ? "الكتالوج" : "Catalog"}</span><span className="text-[10px] font-black text-[#347B58]">Live</span></div><div className="flex items-center justify-between rounded-xl border border-[#E6EDF2] p-4"><span className="flex items-center gap-2 text-xs font-bold text-[#617586]"><PackageSearch size={15} className="text-[#A75D2B]" aria-hidden="true" /> {locale === "ar" ? "العمليات" : "Operations"}</span><span className="text-[10px] font-black text-[#A75D2B]">{locale === "ar" ? "غير موصول" : "Not connected"}</span></div></div>
          <p className="mt-5 text-[11px] leading-5 text-[#8796A2]">{locale === "ar" ? "تم تعطيل كل البيانات التشغيلية التجريبية. صفحات العمليات تعرض حالات واضحة حتى يتم ربط مصادرها الحقيقية." : "All demo operational data is disabled. Operations pages show explicit empty states until their real sources are connected."}</p>
        </section>
      </div>
    </div>
  );
}
