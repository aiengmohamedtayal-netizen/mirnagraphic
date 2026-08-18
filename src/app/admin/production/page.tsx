"use client";

import { Factory } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { EmptyState, PageIntro } from "@/components/admin/AdminUi";

export default function ProductionPage() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  return (
    <div>
      <PageIntro eyebrow={isArabic ? "أرضية المصنع" : "Factory floor"} title={isArabic ? "الإنتاج" : "Production"} description={isArabic ? "لا تظهر أوامر التشغيل قبل ربط نظام إنتاج فعلي." : "Work orders remain hidden until a verified production system is connected."} />
      <section className="admin-surface p-5 sm:p-6">
        <EmptyState
          title={isArabic ? "لا توجد أوامر إنتاج حقيقية" : "No live production orders"}
          description={isArabic ? "قاعدة CMS الحالية لا تحتوي على أوامر تشغيل أو بيانات خطوط أو فحوصات جودة. تم حذف كل المؤشرات التجريبية من الواجهة." : "The current CMS database contains no work orders, line telemetry, or quality events. All illustrative production metrics have been removed."}
          action={<span className="inline-flex items-center gap-2 rounded-xl border border-[#DCE5EC] bg-white px-4 py-3 text-xs font-black text-[#496476]"><Factory size={15} aria-hidden="true" /> {isArabic ? "بانتظار تكامل الإنتاج" : "Production integration pending"}</span>}
        />
      </section>
    </div>
  );
}
