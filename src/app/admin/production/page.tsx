"use client";

import { Factory, Gauge, ShieldCheck } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { productionOrders } from "@/data/admin/mock-data";
import { PageIntro, ProgressBar, StatusBadge, SurfaceHeader } from "@/components/admin/AdminUi";

const stageLabel: Record<string, string> = { prepress: "Pre-press", printing: "Printing", finishing: "Finishing", quality: "Quality control", ready: "Ready to ship" };
const stageTone: Record<string, "blue" | "green" | "amber" | "slate"> = { prepress: "slate", printing: "blue", finishing: "amber", quality: "green", ready: "green" };

export default function ProductionPage() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  return (
    <div>
      <PageIntro eyebrow={isArabic ? "أرضية المصنع" : "Factory floor"} title={isArabic ? "الإنتاج" : "Production"} description={isArabic ? "راقب أوامر التشغيل عبر مراحل التصنيع مع إشارات الجودة والاستعداد للتسليم." : "Monitor work orders across manufacturing stages with quality and delivery readiness signals."} />
      <div className="mb-6 grid gap-4 sm:grid-cols-3"><div className="admin-surface p-5"><div className="flex items-center gap-2 text-[#0F4C81]"><Factory size={17} aria-hidden="true" /><span className="text-xs font-black">Active work orders</span></div><p className="mt-3 text-2xl font-black text-[#1E3A50]">18</p><p className="mt-1 text-[11px] text-[#8293A0]">4 lines currently running</p></div><div className="admin-surface p-5"><div className="flex items-center gap-2 text-[#347B58]"><ShieldCheck size={17} aria-hidden="true" /><span className="text-xs font-black">Quality pass rate</span></div><p className="mt-3 text-2xl font-black text-[#1E3A50]">99.1%</p><p className="mt-1 text-[11px] text-[#8293A0]">Based on demo inspection events</p></div><div className="admin-surface p-5"><div className="flex items-center gap-2 text-[#967619]"><Gauge size={17} aria-hidden="true" /><span className="text-xs font-black">Capacity utilization</span></div><p className="mt-3 text-2xl font-black text-[#1E3A50]">78%</p><p className="mt-1 text-[11px] text-[#8293A0]">Within planned weekly range</p></div></div>
      <section className="admin-surface p-5 sm:p-6"><SurfaceHeader title={isArabic ? "أوامر التشغيل الحالية" : "Current work orders"} detail={`${productionOrders.length} ${isArabic ? "أوامر معروضة" : "orders shown from the demo queue"}`} /><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Order</th><th>Project</th><th>Line</th><th>Stage</th><th>Progress</th><th>Quantity</th><th>Quality</th></tr></thead><tbody>{productionOrders.map((order) => <tr key={order.id}><td><strong>{order.id}</strong><span className="mt-1 block text-[11px] text-[#8798A5]">Due {order.due}</span></td><td><strong>{order.project}</strong></td><td>{order.line}</td><td><StatusBadge label={stageLabel[order.stage]} tone={stageTone[order.stage]} /></td><td className="min-w-[150px]"><div className="flex items-center gap-2"><ProgressBar value={order.progress} /><span className="text-[11px] font-black text-[#1E3A50]">{order.progress}%</span></div></td><td>{order.quantity}</td><td><StatusBadge label={order.quality === "passed" ? "Passed" : order.quality === "monitor" ? "Monitor" : "Pending"} tone={order.quality === "passed" ? "green" : order.quality === "monitor" ? "amber" : "slate"} /></td></tr>)}</tbody></table></div><p className="mt-4 text-[11px] leading-5 text-[#8796A2]">Production statuses are illustrative and not connected to machine telemetry.</p></section>
    </div>
  );
}
