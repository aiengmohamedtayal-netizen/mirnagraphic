"use client";

import { Mail, Search, Users } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { clients } from "@/data/admin/mock-data";
import { PageIntro, SurfaceHeader } from "@/components/admin/AdminUi";

export default function ClientsPage() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  return (
    <div>
      <PageIntro eyebrow={isArabic ? "علاقات الأعمال" : "Business relationships"} title={isArabic ? "العملاء" : "Clients"} description={isArabic ? "سجل تشغيلي للشركات التي تعتمد على Mirna في حلول التغليف عالية الجودة." : "A focused B2B view of the companies building packaging programs with Mirna Graphic."} action={<button type="button" className="inline-flex items-center gap-2 rounded-xl bg-[#0F4C81] px-4 py-3 text-xs font-black text-white shadow-[0_10px_20px_rgba(15,76,129,0.14)]"><Users size={15} aria-hidden="true" /> Add client</button>} />
      <section className="admin-surface p-5 sm:p-6"><SurfaceHeader title={isArabic ? "حسابات العملاء" : "Client accounts"} detail={`${clients.length} ${isArabic ? "شركات في مساحة العمل التجريبية" : "companies in the demo workspace"}`} /><div className="mb-5 relative max-w-sm"><Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8A9AA6]" size={15} aria-hidden="true" /><label htmlFor="clients-search" className="sr-only">Search client accounts</label><input id="clients-search" type="search" placeholder="Search client accounts" className="h-10 w-full rounded-lg border border-[#DCE5EC] bg-white pl-9 pr-3 text-xs outline-none focus:border-[#0F4C81] focus:ring-4 focus:ring-[#0F4C81]/10" /></div><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Client</th><th>Sector</th><th>Projects</th><th>Primary contact</th><th>Last activity</th></tr></thead><tbody>{clients.map((client) => <tr key={client.id}><td><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF3FA] text-xs font-black text-[#0F4C81]">{client.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span><div><strong className="block">{client.name}</strong><span className="text-[11px] text-[#8798A5]">{client.id}</span></div></div></td><td>{client.sector}</td><td><strong>{client.projects}</strong> active/closed</td><td><a href={`mailto:${client.contact}`} className="inline-flex items-center gap-1 text-xs font-bold text-[#0F4C81] hover:underline"><Mail size={13} aria-hidden="true" /> {client.contact}</a></td><td>{client.lastActivity}</td></tr>)}</tbody></table></div><p className="mt-4 text-[11px] leading-5 text-[#8796A2]">Client records are mock content. Contact links are the only live browser action in this MVP.</p></section>
    </div>
  );
}
