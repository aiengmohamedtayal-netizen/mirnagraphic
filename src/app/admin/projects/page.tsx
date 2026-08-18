"use client";

import { Boxes, CalendarDays, Search } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { projects } from "@/data/admin/mock-data";
import { FilterPill, PageIntro, ProgressBar, StatusBadge, SurfaceHeader } from "@/components/admin/AdminUi";

export default function ProjectsPage() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  return (
    <div>
      <PageIntro eyebrow={isArabic ? "محفظة العملاء" : "Client portfolio"} title={isArabic ? "المشروعات" : "Projects"} description={isArabic ? "تابع رحلة كل مشروع من العينة الأولى إلى جاهزية التسليم." : "Track every packaging engagement from first sample to delivery readiness."} action={<button type="button" className="inline-flex items-center gap-2 rounded-xl bg-[#0F4C81] px-4 py-3 text-xs font-black text-white shadow-[0_10px_20px_rgba(15,76,129,0.14)]"><Boxes size={15} aria-hidden="true" /> New project</button>} />
      <section className="admin-surface p-5 sm:p-6">
        <SurfaceHeader title={isArabic ? "لوحة المشروعات" : "Project board"} detail={`${projects.length} ${isArabic ? "مشروعات في المساحة التجريبية" : "projects in the demo workspace"}`} />
        <div className="mb-5 flex flex-col gap-3 border-b border-[#E8EEF2] pb-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap gap-2"><FilterPill active>All projects</FilterPill><FilterPill>Active</FilterPill><FilterPill>At risk</FilterPill><FilterPill>Delivered</FilterPill></div>
          <div className="relative w-full max-w-xs"><Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8A9AA6]" size={15} aria-hidden="true" /><label htmlFor="projects-search" className="sr-only">Search projects</label><input id="projects-search" type="search" placeholder="Search projects" className="h-10 w-full rounded-lg border border-[#DCE5EC] bg-white pl-9 pr-3 text-xs outline-none focus:border-[#0F4C81] focus:ring-4 focus:ring-[#0F4C81]/10" /></div>
        </div>
        <div className="grid gap-4 xl:grid-cols-2">{projects.map((project) => <article key={project.id} className="rounded-2xl border border-[#E6EDF2] bg-[#FBFDFE] p-4 transition hover:border-[#BFD2DF] hover:bg-white"><div className="flex items-start justify-between gap-3"><div className="flex min-w-0 items-start gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF3FA] text-[#0F4C81]"><Boxes size={18} aria-hidden="true" /></span><div className="min-w-0"><p className="truncate text-sm font-extrabold text-[#1E3A50]">{project.name}</p><p className="mt-1 truncate text-xs text-[#8293A0]">{project.client} · {project.id}</p></div></div><StatusBadge label={project.status === "active" ? "Active" : project.status === "review" ? "Review" : project.status === "blocked" ? "Blocked" : "Delivered"} tone={project.status === "active" ? "blue" : project.status === "review" ? "amber" : project.status === "blocked" ? "red" : "green"} /></div><div className="mt-5 flex items-center justify-between text-xs"><span className="font-bold text-[#6D8090]">{project.stage}</span><span className="font-black text-[#1E3A50]">{project.progress}%</span></div><div className="mt-2"><ProgressBar value={project.progress} color={project.status === "blocked" ? "#A64D48" : "#0F4C81"} /></div><div className="mt-4 flex items-center gap-2 text-[11px] font-bold text-[#8797A3]"><CalendarDays size={14} aria-hidden="true" /> Due {project.due}</div></article>)}</div>
        <p className="mt-5 text-[11px] leading-5 text-[#8796A2]">Create, edit, and filtering actions are intentionally UI-only in this MVP; project persistence belongs to the integration phase.</p>
      </section>
    </div>
  );
}
