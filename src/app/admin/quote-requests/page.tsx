"use client";

import { Download, Filter, Search } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { quoteRequests } from "@/data/admin/mock-data";
import { PageIntro, StatusBadge, SurfaceHeader } from "@/components/admin/AdminUi";

const statusLabel: Record<string, string> = { new: "New", review: "In review", quoted: "Quoted", closed: "Closed" };
const statusTone: Record<string, "blue" | "green" | "amber" | "slate"> = { new: "blue", review: "amber", quoted: "green", closed: "slate" };

export default function QuoteRequestsPage() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  return (
    <div>
      <PageIntro eyebrow={isArabic ? "المبيعات والهندسة" : "Sales engineering"} title={isArabic ? "طلبات التسعير" : "Quote requests"} description={isArabic ? "راجع الطلبات الواردة وحدد الأولويات قبل تحويلها إلى مشروعات إنتاج." : "Review inbound packaging briefs and prioritize the requests moving toward production."} />
      <section className="admin-surface p-5 sm:p-6">
        <SurfaceHeader title={isArabic ? "كل الطلبات" : "All requests"} detail={`${quoteRequests.length} ${isArabic ? "طلبات في مساحة العمل التجريبية" : "requests in the demo workspace"}`} action={<button type="button" className="inline-flex items-center gap-2 rounded-xl border border-[#DCE5EC] bg-white px-3 py-2 text-xs font-black text-[#496476] hover:border-[#0F4C81] hover:text-[#0F4C81]"><Download size={14} aria-hidden="true" /> Export view</button>} />
        <div className="mb-5 flex flex-col gap-3 rounded-xl border border-[#E6EDF2] bg-[#F8FBFD] p-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-sm"><Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8A9AA6]" size={16} aria-hidden="true" /><label htmlFor="quote-search" className="sr-only">Search quote requests</label><input id="quote-search" type="search" placeholder="Search by request or client" className="h-10 w-full rounded-lg border border-[#DCE5EC] bg-white pl-9 pr-3 text-xs outline-none focus:border-[#0F4C81] focus:ring-4 focus:ring-[#0F4C81]/10" /></div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#6D8090]"><Filter size={14} aria-hidden="true" /> <span>Showing active workspace data</span></div>
        </div>
        <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Request</th><th>Client</th><th>Packaging type</th><th>Volume</th><th>Received</th><th>Owner</th><th>Status</th></tr></thead><tbody>{quoteRequests.map((quote) => <tr key={quote.id}><td><strong className="block">{quote.id}</strong><span className="text-[11px] text-[#8A99A5]">Brief ready</span></td><td><strong>{quote.client}</strong></td><td>{quote.type}</td><td>{quote.volume}</td><td>{quote.received}</td><td>{quote.owner}</td><td><StatusBadge label={statusLabel[quote.status]} tone={statusTone[quote.status]} /></td></tr>)}</tbody></table></div>
        <p className="mt-4 text-[11px] leading-5 text-[#8796A2]">This is a UI-only MVP. Search and export controls are visual placeholders until a data source is connected.</p>
      </section>
    </div>
  );
}
