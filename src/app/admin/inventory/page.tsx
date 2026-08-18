"use client";

import { PackageOpen } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { EmptyState, PageIntro } from "@/components/admin/AdminUi";

export default function InventoryPage() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  return (
    <div>
      <PageIntro eyebrow={isArabic ? "المواد والخامات" : "Materials control"} title={isArabic ? "المخزون" : "Inventory"} description={isArabic ? "لا تعرض هذه الصفحة أي أرصدة قبل ربط مصدر مخزون حقيقي." : "No inventory figures are shown until a verified inventory source is connected."} />
      <section className="admin-surface p-5 sm:p-6">
        <EmptyState
          title={isArabic ? "لا توجد بيانات مخزون حقيقية" : "No live inventory data"}
          description={isArabic ? "قاعدة CMS الحالية لا تحتوي على جدول مخزون. ستظهر الأرصدة والتنبيهات بعد ربط نظام المخزون الفعلي." : "The current CMS database has no inventory table. Quantities and alerts will appear after the real inventory system is connected."}
          action={<span className="inline-flex items-center gap-2 rounded-xl border border-[#DCE5EC] bg-white px-4 py-3 text-xs font-black text-[#496476]"><PackageOpen size={15} aria-hidden="true" /> {isArabic ? "بانتظار تكامل المخزون" : "Inventory integration pending"}</span>}
        />
      </section>
    </div>
  );
}
