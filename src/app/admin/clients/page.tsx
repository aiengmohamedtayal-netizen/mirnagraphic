"use client";

import { Users } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { EmptyState, PageIntro } from "@/components/admin/AdminUi";

export default function ClientsPage() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  return (
    <div>
      <PageIntro eyebrow={isArabic ? "علاقات الأعمال" : "Business relationships"} title={isArabic ? "العملاء" : "Clients"} description={isArabic ? "هذه المساحة جاهزة لبيانات العملاء الحقيقية فقط." : "This workspace is reserved for verified client records only."} />
      <section className="admin-surface p-5 sm:p-6">
        <EmptyState
          title={isArabic ? "لا توجد سجلات عملاء بعد" : "No client records yet"}
          description={isArabic ? "لا توجد سجلات عملاء في Neon حتى الآن. ستظهر السجلات هنا بعد إضافتها إلى مصدر البيانات الحقيقي." : "No client records are available in Neon yet. Records will appear here once they are added to the connected source."}
          action={<span className="inline-flex items-center gap-2 rounded-xl border border-[#DCE5EC] bg-white px-4 py-3 text-xs font-black text-[#496476]"><Users size={15} aria-hidden="true" /> {isArabic ? "بانتظار مصدر البيانات" : "Awaiting data source"}</span>}
        />
      </section>
    </div>
  );
}
