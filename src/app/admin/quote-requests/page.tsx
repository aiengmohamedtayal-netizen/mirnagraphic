"use client";

import { ClipboardList } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { EmptyState, PageIntro } from "@/components/admin/AdminUi";

export default function QuoteRequestsPage() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  return (
    <div>
      <PageIntro eyebrow={isArabic ? "المبيعات والهندسة" : "Sales engineering"} title={isArabic ? "طلبات التسعير" : "Quote requests"} description={isArabic ? "تظهر هنا الطلبات الواردة من مصدر حقيقي فقط." : "Only inbound requests from a connected, verified source appear here."} />
      <section className="admin-surface p-5 sm:p-6">
        <EmptyState
          title={isArabic ? "لا توجد طلبات تسعير حقيقية" : "No live quote requests"}
          description={isArabic ? "لا يحتوي CMS الحالي على جدول لطلبات التسعير أو نموذج استقبال مرتبط به. تم حذف كل الطلبات التجريبية وأزرار التصدير الوهمية." : "The current CMS has no quote-request table or connected intake form. All sample requests and placeholder export controls have been removed."}
          action={<span className="inline-flex items-center gap-2 rounded-xl border border-[#DCE5EC] bg-white px-4 py-3 text-xs font-black text-[#496476]"><ClipboardList size={15} aria-hidden="true" /> {isArabic ? "بانتظار تكامل الطلبات" : "Quote intake integration pending"}</span>}
        />
      </section>
    </div>
  );
}
