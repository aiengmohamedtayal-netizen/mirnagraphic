"use client";

import { PackageOpen, RefreshCw, TriangleAlert } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { inventoryItems } from "@/data/admin/mock-data";
import { PageIntro, ProgressBar, StatusBadge, SurfaceHeader } from "@/components/admin/AdminUi";

export default function InventoryPage() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  return (
    <div>
      <PageIntro eyebrow={isArabic ? "المواد والخامات" : "Materials control"} title={isArabic ? "المخزون" : "Inventory"} description={isArabic ? "راقب الخامات التي تحافظ على استمرارية خطوط الطباعة والتشطيب والتجميع." : "Keep the board, finishing, and consumables picture clear before it affects production."} action={<button type="button" className="inline-flex items-center gap-2 rounded-xl border border-[#DCE5EC] bg-white px-4 py-3 text-xs font-black text-[#496476] hover:border-[#0F4C81] hover:text-[#0F4C81]"><RefreshCw size={15} aria-hidden="true" /> Refresh view</button>} />
      <div className="mb-6 rounded-2xl border border-[#F0D9A1] bg-[#FFF9E9] p-4 sm:p-5"><div className="flex items-start gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F9E8B9] text-[#967619]"><TriangleAlert size={17} aria-hidden="true" /></span><div><p className="text-sm font-extrabold text-[#6E5718]">3 materials need attention</p><p className="mt-1 text-xs leading-5 text-[#8B752F]">Soft-touch laminate is below the preferred threshold. This alert is mock data for the MVP.</p></div></div></div>
      <section className="admin-surface p-5 sm:p-6"><SurfaceHeader title={isArabic ? "مراقبة المواد" : "Material watchlist"} detail={`${inventoryItems.length} ${isArabic ? "خامات في العرض التجريبي" : "materials in the demo view"}`} /><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Material</th><th>Category</th><th>Available</th><th>Stock level</th><th>Status</th><th>Updated</th></tr></thead><tbody>{inventoryItems.map((item) => <tr key={item.id}><td><div className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF3FA] text-[#0F4C81]"><PackageOpen size={15} aria-hidden="true" /></span><div><strong className="block">{item.name}</strong><span className="text-[11px] text-[#8798A5]">{item.id}</span></div></div></td><td>{item.category}</td><td><strong>{item.stock}</strong></td><td className="min-w-[150px]"><div className="flex items-center gap-2"><ProgressBar value={item.level} color={item.status === "critical" ? "#A64D48" : item.status === "watch" ? "#D4AF37" : "#4F8A70"} /><span className="text-[11px] font-black text-[#1E3A50]">{item.level}%</span></div></td><td><StatusBadge label={item.status === "healthy" ? "Healthy" : item.status === "watch" ? "Watch" : "Critical"} tone={item.status === "healthy" ? "green" : item.status === "watch" ? "amber" : "red"} /></td><td>{item.updated}</td></tr>)}</tbody></table></div></section>
    </div>
  );
}
