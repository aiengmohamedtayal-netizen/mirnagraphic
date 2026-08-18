"use client";

import Link from "next/link";
import { ArrowUpRight, ChevronRight, CircleAlert, Clock3, Factory, PackageSearch } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { adminDictionary } from "@/data/admin/dictionary";
import { activityFeed, adminKpis, projects, productionStages, quoteRequests } from "@/data/admin/mock-data";
import { KpiCard, PageIntro, ProgressBar, StatusBadge, SurfaceHeader } from "@/components/admin/AdminUi";

const statusLabel: Record<string, string> = { new: "New", review: "In review", quoted: "Quoted", closed: "Closed" };

export default function AdminDashboardPage() {
  const { locale } = useLocale();
  const copy = adminDictionary[locale];
  const openQuotes = quoteRequests.filter((quote) => quote.status !== "closed");

  return (
    <div>
      <PageIntro
        eyebrow={copy.dashboard.eyebrow}
        title={copy.dashboard.title}
        description={copy.dashboard.subtitle}
        action={<Link href="/admin/quote-requests" className="inline-flex items-center gap-2 rounded-xl bg-[#0F4C81] px-4 py-3 text-xs font-black text-white shadow-[0_10px_20px_rgba(15,76,129,0.16)] transition hover:bg-[#0A3A63] active:scale-[0.98]">Review quote requests <ArrowUpRight size={15} aria-hidden="true" /></Link>}
      />

      <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {adminKpis.map((kpi) => <KpiCard key={kpi.label} {...kpi} />)}
      </div>

      <div className="mb-6 grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(310px,0.85fr)]">
        <section className="admin-surface p-5 sm:p-6">
          <SurfaceHeader title={copy.dashboard.productionFlow} detail={copy.dashboard.productionFlowDetail} action={<Link href="/admin/production" className="inline-flex items-center gap-1 text-xs font-black text-[#0F4C81] hover:underline">View board <ChevronRight size={14} aria-hidden="true" /></Link>} />
          <div className="rounded-2xl bg-[#F7FAFC] p-4 sm:p-5">
            <div className="flex h-12 overflow-hidden rounded-xl" aria-label="Production flow distribution">
              {productionStages.map((stage) => <div key={stage.label} className={`${stage.color} flex items-center justify-center text-[10px] font-black text-white transition-all duration-300`} style={{ width: `${stage.value}%` }} title={`${stage.label}: ${stage.value}%`}>{stage.value >= 12 && `${stage.value}%`}</div>)}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-5">
              {productionStages.map((stage) => <div key={stage.label} className="flex items-center gap-2 text-xs"><span className={`h-2.5 w-2.5 rounded-full ${stage.color}`} aria-hidden="true" /><span className="min-w-0 flex-1 truncate text-[#6F8291]">{stage.label}</span><strong className="text-[#1E3A50]">{stage.value}</strong></div>)}
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-[#E5EDF2] p-4"><div className="flex items-center gap-2 text-[#0F4C81]"><Factory size={15} aria-hidden="true" /><span className="text-[11px] font-bold">Lines running</span></div><p className="mt-2 text-xl font-black text-[#1E3A50]">04 <span className="text-xs font-bold text-[#8293A0]">of 06</span></p></div>
            <div className="rounded-xl border border-[#E5EDF2] p-4"><div className="flex items-center gap-2 text-[#347B58]"><Clock3 size={15} aria-hidden="true" /><span className="text-[11px] font-bold">Avg. cycle time</span></div><p className="mt-2 text-xl font-black text-[#1E3A50]">3.8 <span className="text-xs font-bold text-[#8293A0]">days</span></p></div>
            <div className="rounded-xl border border-[#E5EDF2] p-4"><div className="flex items-center gap-2 text-[#967619]"><PackageSearch size={15} aria-hidden="true" /><span className="text-[11px] font-bold">Ready to ship</span></div><p className="mt-2 text-xl font-black text-[#1E3A50]">06 <span className="text-xs font-bold text-[#8293A0]">orders</span></p></div>
          </div>
        </section>

        <section className="admin-surface p-5 sm:p-6">
          <SurfaceHeader title={copy.dashboard.quotePipeline} detail={copy.dashboard.quotePipelineDetail} action={<Link href="/admin/quote-requests" className="text-xs font-black text-[#0F4C81] hover:underline">{copy.common.viewAll}</Link>} />
          <div className="space-y-5">
            {(["new", "review", "quoted", "closed"] as const).map((status) => {
              const count = quoteRequests.filter((quote) => quote.status === status).length;
              const percent = Math.round((count / quoteRequests.length) * 100);
              return <div key={status}><div className="mb-2 flex items-center justify-between gap-3"><span className="text-xs font-bold text-[#617586]">{statusLabel[status]}</span><span className="text-xs font-black text-[#1E3A50]">{count}</span></div><ProgressBar value={percent} color={status === "new" ? "#0F4C81" : status === "review" ? "#D4AF37" : status === "quoted" ? "#4F8A70" : "#A8B4C0"} /></div>;
            })}
          </div>
          <div className="mt-6 rounded-xl border border-[#DCEAF4] bg-[#F5FAFD] p-4"><p className="text-xs font-black text-[#1E3A50]">{openQuotes.length} requests need an owner</p><p className="mt-1 text-[11px] leading-5 text-[#718595]">Keep response time under 24 hours to protect the active pipeline.</p></div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
        <section className="admin-surface p-5 sm:p-6">
          <SurfaceHeader title={copy.dashboard.projects} detail={copy.dashboard.projectsDetail} action={<Link href="/admin/projects" className="text-xs font-black text-[#0F4C81] hover:underline">{copy.common.viewAll}</Link>} />
          <div className="admin-table-wrap">
            <table className="admin-table"><thead><tr><th>Project</th><th>Stage</th><th>Progress</th><th>Due</th><th>Status</th></tr></thead><tbody>
              {projects.slice(0, 4).map((project) => <tr key={project.id}><td><strong className="block">{project.name}</strong><span className="text-[11px] text-[#8798A5]">{project.client}</span></td><td>{project.stage}</td><td className="min-w-[130px]"><div className="flex items-center gap-2"><ProgressBar value={project.progress} /><span className="text-[11px] font-black text-[#1E3A50]">{project.progress}%</span></div></td><td>{project.due}</td><td><StatusBadge label={project.status === "active" ? "Active" : project.status === "review" ? "Review" : project.status === "blocked" ? "Blocked" : "Delivered"} tone={project.status === "active" ? "blue" : project.status === "review" ? "amber" : project.status === "blocked" ? "red" : "green"} /></td></tr>)}
            </tbody></table>
          </div>
        </section>

        <section className="admin-surface p-5 sm:p-6">
          <SurfaceHeader title={copy.dashboard.recentActivity} detail={copy.dashboard.recentActivityDetail} />
          <div className="space-y-5">
            {activityFeed.map((item) => <div key={item.title} className="flex gap-3"><span className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.tone === "green" ? "bg-[#ECF8F1] text-[#347B58]" : item.tone === "amber" ? "bg-[#FFF8E8] text-[#9A7417]" : "bg-[#EAF3FA] text-[#0F4C81]"}`}><span className="h-2 w-2 rounded-full bg-current" aria-hidden="true" /></span><div><p className="text-xs font-extrabold leading-5 text-[#1E3A50]">{item.title}</p><p className="mt-1 text-[11px] text-[#8394A0]">{item.detail}</p><p className="mt-1 text-[10px] font-bold text-[#A1ADB6]">{item.time}</p></div></div>)}
          </div>
          <div className="mt-6 border-t border-[#E8EEF2] pt-4"><div className="flex items-center gap-2 text-[#A75D2B]"><CircleAlert size={15} aria-hidden="true" /><p className="text-xs font-black">3 items need a decision</p></div><p className="mt-1 text-[11px] leading-5 text-[#81929F]">Inventory and delivery signals are mock alerts for this MVP.</p></div>
        </section>
      </div>
    </div>
  );
}
