import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight, CheckCircle2, CircleDashed, Clock3, Info, TriangleAlert, Database } from "lucide-react";

export function PageIntro({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description: string; action?: ReactNode }) {
  return (
    <div className="mb-7 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
      <div>
        {eyebrow && <p className="mb-2 text-[11px] font-black uppercase tracking-[0.16em] text-[#0F4C81]">{eyebrow}</p>}
        <h1 className="text-2xl font-extrabold tracking-[-0.04em] text-[#17344B] sm:text-3xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6F8291]">{description}</p>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function KpiCard({ label, value, detail, trend, tone }: { label: string; value: string; detail: string; trend: string; tone: "blue" | "gold" | "green" | "amber" }) {
  const icon = tone === "green" ? <CheckCircle2 size={17} aria-hidden="true" /> : tone === "amber" ? <TriangleAlert size={17} aria-hidden="true" /> : tone === "gold" ? <Clock3 size={17} aria-hidden="true" /> : <Info size={17} aria-hidden="true" />;
  const toneClass = { blue: "bg-[#EAF3FA] text-[#0F4C81]", gold: "bg-[#FFF8E5] text-[#967619]", green: "bg-[#ECF8F1] text-[#347B58]", amber: "bg-[#FFF1E6] text-[#A75D2B]" }[tone];
  return (
    <article className="admin-surface group p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(15,76,129,0.08)] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${toneClass}`}>{icon}</span>
        <span className={`rounded-full px-2 py-1 text-[10px] font-black ${toneClass}`}>{trend}</span>
      </div>
      <p className="mt-5 text-xs font-bold text-[#738696]">{label}</p>
      <p className="mt-1 text-3xl font-black tracking-[-0.06em] text-[#17344B]">{value}</p>
      <p className="mt-2 text-[11px] text-[#8998A4]">{detail}</p>
    </article>
  );
}

export function SurfaceHeader({ title, detail, action }: { title: string; detail?: string; action?: ReactNode }) {
  return (
    <div className="mb-5 flex items-start justify-between gap-4">
      <div>
        <h2 className="text-base font-extrabold tracking-[-0.02em] text-[#1E3A50]">{title}</h2>
        {detail && <p className="mt-1 text-xs leading-5 text-[#8293A0]">{detail}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatusBadge({ label, tone = "slate" }: { label: string; tone?: "blue" | "green" | "amber" | "red" | "slate" }) {
  return <span className={`admin-status admin-status-${tone}`}>{label}</span>;
}

export function ProgressBar({ value, color = "#0F4C81" }: { value: number; color?: string }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-[#EAF0F4]" aria-label={`${value}% complete`} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}>
      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${value}%`, backgroundColor: color }} />
    </div>
  );
}

export function Trend({ direction, children }: { direction: "up" | "down" | "flat"; children: ReactNode }) {
  const Icon = direction === "up" ? ArrowUpRight : direction === "down" ? ArrowDownRight : CircleDashed;
  const className = direction === "down" ? "text-[#347B58]" : direction === "up" ? "text-[#347B58]" : "text-[#80909D]";
  return <span className={`inline-flex items-center gap-1 text-xs font-bold ${className}`}><Icon size={14} aria-hidden="true" />{children}</span>;
}

export function FilterPill({ active, children }: { active?: boolean; children: ReactNode }) {
  return <button type="button" className={`rounded-lg border px-3 py-2 text-xs font-bold transition ${active ? "border-[#0F4C81] bg-[#0F4C81] text-white" : "border-[#DCE5EC] bg-white text-[#5E7281] hover:border-[#0F4C81] hover:text-[#0F4C81]"}`}>{children}</button>;
}

export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center rounded-2xl border border-dashed border-[#C9D9E3] bg-[#FBFDFE] px-6 py-10 text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EAF3FA] text-[#0F4C81]"><Database size={19} aria-hidden="true" /></span>
      <h3 className="mt-4 text-sm font-extrabold text-[#1E3A50]">{title}</h3>
      <p className="mt-2 max-w-md text-xs leading-5 text-[#748896]">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
