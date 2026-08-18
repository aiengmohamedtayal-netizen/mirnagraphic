"use client";

import { BarChart3 } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { EmptyState, PageIntro } from "@/components/admin/AdminUi";

export default function ReportsPage() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  return (
    <div>
      <PageIntro eyebrow={isArabic ? "قراءة الأداء" : "Performance review"} title={isArabic ? "التقارير" : "Reports"} description={isArabic ? "لا تُعرض مؤشرات أو رسوم إلا بعد توفر بيانات تشغيلية حقيقية." : "Charts and operating indicators appear only after verified operational data is available."} />
      <section className="admin-surface p-5 sm:p-6">
        <EmptyState
          title={isArabic ? "لا توجد بيانات لإنشاء التقارير" : "No reportable data yet"}
          description={isArabic ? "لا توجد حالياً جداول تشغيل أو إنتاج أو مخزون يمكن بناء تقارير موثوقة منها. تم حذف النسب والرسوم التجريبية بالكامل." : "There are currently no connected operational, production, or inventory tables from which reliable reports can be generated. All sample ratios and charts have been removed."}
          action={<span className="inline-flex items-center gap-2 rounded-xl border border-[#DCE5EC] bg-white px-4 py-3 text-xs font-black text-[#496476]"><BarChart3 size={15} aria-hidden="true" /> {isArabic ? "بانتظار بيانات تشغيلية" : "Awaiting operational data"}</span>}
        />
      </section>
    </div>
  );
}
