"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Eye, Globe2, Layers3, LockKeyhole, Save, Send, Sparkles } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { PageIntro, SurfaceHeader } from "@/components/admin/AdminUi";

type Localized = { ar: string; en: string };
type Visibility = Record<string, boolean>;
type HomeContent = {
  hero: { eyebrow: Localized; title: Localized; description: Localized };
  cta: Localized;
  sectionVisibility: Visibility;
};
type Revision = { id: string; version: number; status: string; createdAt: string } | null;

const defaultVisibility: Visibility = {
  about: true,
  trust: true,
  capabilities: true,
  manufacturing: true,
  technology: true,
  products: true,
  industries: true,
  factory: true,
  quality: true,
  projects: true,
  contact: true,
};

const sectionLabels = {
  about: { ar: "عن ميرنا", en: "About Mirna", detail: "Story, mission and vision" },
  trust: { ar: "الثقة والاعتمادات", en: "Trust & certifications", detail: "Why choose us, testimonials and certifications" },
  capabilities: { ar: "القدرات", en: "Capabilities", detail: "Production capabilities grid" },
  manufacturing: { ar: "التصنيع والتقنية", en: "Manufacturing technology", detail: "Technology and production approach" },
  technology: { ar: "مراحل العمل", en: "Process & workflow", detail: "Factory process and asset ledger" },
  products: { ar: "المنتجات", en: "Products", detail: "Packaging portfolio" },
  industries: { ar: "القطاعات", en: "Industries", detail: "Industries served" },
  factory: { ar: "المصنع", en: "Factory", detail: "Factory showcase" },
  quality: { ar: "الجودة", en: "Quality", detail: "Quality control and statistics" },
  projects: { ar: "المشروعات", en: "Latest projects", detail: "Published project highlights" },
  contact: { ar: "التواصل", en: "Contact", detail: "FAQ, inquiry form, location and CTA" },
} as const;

const emptyContent: HomeContent = {
  hero: { eyebrow: { ar: "", en: "" }, title: { ar: "", en: "" }, description: { ar: "", en: "" } },
  cta: { ar: "", en: "" },
  sectionVisibility: defaultVisibility,
};

function normalize(value: Partial<HomeContent>): HomeContent {
  return {
    hero: value.hero ?? emptyContent.hero,
    cta: value.cta ?? emptyContent.cta,
    sectionVisibility: { ...defaultVisibility, ...(value.sectionVisibility ?? {}) },
  };
}

export default function ContentPage() {
  const { locale } = useLocale();
  const [content, setContent] = useState<HomeContent>(emptyContent);
  const [revision, setRevision] = useState<Revision>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [message, setMessage] = useState("");

  async function load() {
    setLoading(true);
    try {
      const response = await fetch("/api/cms/settings", { cache: "no-store" });
      if (!response.ok) throw new Error("Unable to load content from Neon.");
      const result = await response.json();
      setContent(normalize(result.value ?? {}));
      setRevision(result.revision ?? null);
      setMessage("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to load content from Neon.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let active = true;
    async function initialLoad() {
      try {
        const response = await fetch("/api/cms/settings", { cache: "no-store" });
        if (!response.ok) throw new Error("Unable to load content from Neon.");
        const result = await response.json();
        if (!active) return;
        setContent(normalize(result.value ?? {}));
        setRevision(result.revision ?? null);
      } catch (error) {
        if (active) setMessage(error instanceof Error ? error.message : "Unable to load content from Neon.");
      } finally {
        if (active) setLoading(false);
      }
    }
    void initialLoad();
    return () => { active = false; };
  }, []);

  function update(path: string[], localeKey: "ar" | "en", value: string) {
    setContent((current) => {
      const next = structuredClone(current);
      let cursor: Record<string, unknown> = next as unknown as Record<string, unknown>;
      for (const key of path.slice(0, -1)) cursor = cursor[key] as Record<string, unknown>;
      const leaf = path[path.length - 1];
      const field = cursor[leaf] as Localized;
      cursor[leaf] = { ...field, [localeKey]: value };
      return next;
    });
  }

  function toggleSection(key: string) {
    setContent((current) => ({ ...current, sectionVisibility: { ...current.sectionVisibility, [key]: !current.sectionVisibility[key] } }));
  }

  async function save() {
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch("/api/cms/settings", { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify({ key: "home", value: content }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Save failed");
      setRevision(result.revision);
      setMessage(locale === "ar" ? `تم حفظ المسودة كمراجعة ${result.revision.version}. لن تظهر للزوار قبل النشر.` : `Draft saved as revision ${result.revision.version}. It remains private until published.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Save failed. Check your session and try again.");
    } finally { setSaving(false); }
  }

  async function publish() {
    setPublishing(true);
    setMessage("");
    try {
      const response = await fetch("/api/cms/publish", { method: "POST" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Publish failed");
      setRevision((current) => current ? { ...current, status: "published" } : current);
      setMessage(locale === "ar" ? `تم نشر المراجعة ${result.revision.version} على الموقع العام.` : `Revision ${result.revision.version} is now live on the public website.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Publish failed. Publisher or Admin access is required.");
    } finally { setPublishing(false); }
  }

  if (loading) return <div className="admin-loading-card">{locale === "ar" ? "جاري تحميل المحتوى من Neon…" : "Loading content from Neon…"}</div>;

  const currentLocale = locale === "ar" ? "ar" : "en";

  return (
    <div className="space-y-7">
      <PageIntro
        eyebrow={locale === "ar" ? "تحكم فعلي في الموقع" : "Live website control"}
        title={locale === "ar" ? "محرر الصفحة الرئيسية" : "Homepage editor"}
        description={locale === "ar" ? "عدّل النصوص، تحكم في ظهور الأقسام، ثم احفظ كمسودة وانشر عندما تكون جاهزاً. الزوار يرون النسخة المنشورة فقط." : "Edit the copy, control section visibility, save a draft, and publish when ready. Visitors only see the published snapshot."}
        action={<div className="flex flex-wrap gap-2"><Link href="/" target="_blank" className="admin-secondary-button inline-flex items-center gap-2"><Eye size={15} />{locale === "ar" ? "معاينة الموقع" : "Preview site"}</Link><button className="admin-secondary-button inline-flex items-center gap-2" onClick={() => void load()}><Globe2 size={15} />{locale === "ar" ? "تحديث" : "Refresh"}</button><button className="admin-primary-button inline-flex items-center gap-2" onClick={() => void save()} disabled={saving}><Save size={15} />{saving ? (locale === "ar" ? "جارٍ الحفظ…" : "Saving…") : (locale === "ar" ? "حفظ المسودة" : "Save draft")}</button><button className="admin-primary-button admin-gold-button inline-flex items-center gap-2" onClick={() => void publish()} disabled={publishing}><Send size={15} />{publishing ? (locale === "ar" ? "جارٍ النشر…" : "Publishing…") : (locale === "ar" ? "نشر على الموقع" : "Publish live")}</button></div>}
      />

      {message && <p className="admin-inline-message" role="status">{message}</p>}

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="admin-status-strip flex-col items-start gap-1 sm:col-span-2 sm:flex-row sm:items-center"><span>{locale === "ar" ? "الحالة الحالية" : "Current status"}: <strong>{revision?.status ?? "draft"}</strong></span><span>{locale === "ar" ? "المراجعة" : "Revision"}: <strong>{revision?.version ?? "—"}</strong></span><span>{locale === "ar" ? "المصدر" : "Source"}: <strong>Neon CMS</strong></span></div>
        <div className="flex items-center gap-3 rounded-2xl border border-[#DCE9EE] bg-[#EAF9F7] px-4 py-3 text-xs font-bold text-[#23705F]"><LockKeyhole size={17} /><span>{locale === "ar" ? "المسودة خاصة حتى تضغط نشر" : "Draft stays private until publish"}</span></div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)]">
        <section className="admin-form-card">
          <SurfaceHeader title={locale === "ar" ? "الواجهة الرئيسية" : "Hero content"} detail={locale === "ar" ? "كل حقل قابل للتحرير بالعربية والإنجليزية" : "Every field is editable in Arabic and English"} />
          {(["eyebrow", "title", "description"] as const).map((field) => (
            <div className="admin-field-group" key={field}>
              <label>{field === "eyebrow" ? (locale === "ar" ? "الشارة" : "Eyebrow") : field === "title" ? (locale === "ar" ? "العنوان الرئيسي" : "Headline") : (locale === "ar" ? "الوصف" : "Description")} — العربية<textarea value={content.hero[field].ar} onChange={(event) => update(["hero", field], "ar", event.target.value)} /></label>
              <label>{field === "eyebrow" ? "Eyebrow" : field === "title" ? "Headline" : "Description"} — English<textarea dir="ltr" value={content.hero[field].en} onChange={(event) => update(["hero", field], "en", event.target.value)} /></label>
            </div>
          ))}
          <div className="mt-5 border-t border-[#E7EEF2] pt-5"><SurfaceHeader title={locale === "ar" ? "زر الدعوة إلى الإجراء" : "Primary CTA"} detail={locale === "ar" ? "النص الظاهر في مسار بدء المشروع" : "The conversion label used for starting a project"} /><div className="admin-field-group"><label>العربية<textarea value={content.cta.ar} onChange={(event) => update(["cta"], "ar", event.target.value)} /></label><label>English<textarea dir="ltr" value={content.cta.en} onChange={(event) => update(["cta"], "en", event.target.value)} /></label></div></div>
        </section>

        <section className="admin-form-card">
          <SurfaceHeader title={locale === "ar" ? "أقسام الموقع" : "Homepage sections"} detail={locale === "ar" ? "تحكم في ظهور كل مجموعة على الموقع العام" : "Control which section groups appear publicly"} />
          <div className="space-y-2">
            {Object.entries(sectionLabels).map(([key, label]) => {
              const enabled = content.sectionVisibility[key] !== false;
              return <button type="button" key={key} onClick={() => toggleSection(key)} className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-start transition ${enabled ? "border-[#BDE8E5] bg-[#F4FCFB]" : "border-[#E5EBEF] bg-[#FAFBFC] opacity-70"}`}><span className={`relative h-6 w-11 shrink-0 rounded-full transition ${enabled ? "bg-[#0DA8B3]" : "bg-[#B8C4CB]"}`}><span className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${enabled ? "end-1" : "start-1"}`} /></span><span className="min-w-0 flex-1"><span className="block text-sm font-extrabold text-[#234257]">{label[currentLocale]}</span><span className="mt-0.5 block text-[11px] leading-4 text-[#7A8D9A]">{label.detail}</span></span><span className={`text-[10px] font-black uppercase tracking-wider ${enabled ? "text-[#1E8C79]" : "text-[#8998A2]"}`}>{enabled ? (locale === "ar" ? "ظاهر" : "On") : (locale === "ar" ? "مخفي" : "Off")}</span></button>;
            })}
          </div>
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#DDECF2] bg-[#F4FAFC] p-4 text-xs leading-5 text-[#68808E]"><Sparkles size={17} className="mt-0.5 shrink-0 text-[#0DA8B3]" /><span>{locale === "ar" ? "هذه المفاتيح تغيّر النسخة المنشورة بعد الضغط على نشر فقط. لا يتم حذف المحتوى عند إخفاء القسم." : "These switches affect the published site only after Publish. Hiding a section never deletes its content."}</span></div>
        </section>
      </div>

      <section className="admin-form-card"><SurfaceHeader title={locale === "ar" ? "ما الذي يتحكم فيه هذا المحرر؟" : "What this editor controls"} detail={locale === "ar" ? "مسار واضح من التعديل إلى النشر" : "A clear edit-to-publish path"} /><div className="grid gap-4 md:grid-cols-3"><div className="rounded-2xl bg-[#F7FAFC] p-4"><Layers3 className="text-[#0DA8B3]" size={20} /><p className="mt-3 text-sm font-extrabold text-[#234257]">{locale === "ar" ? "عدّل" : "Edit"}</p><p className="mt-1 text-xs leading-5 text-[#728694]">{locale === "ar" ? "اكتب النصوص وحدد الأقسام التي تناسب العميل." : "Write the copy and choose the sections that fit the client."}</p></div><div className="rounded-2xl bg-[#F7FAFC] p-4"><Save className="text-[#0DA8B3]" size={20} /><p className="mt-3 text-sm font-extrabold text-[#234257]">{locale === "ar" ? "احفظ" : "Save"}</p><p className="mt-1 text-xs leading-5 text-[#728694]">{locale === "ar" ? "كل حفظ ينشئ Revision في Neon ولا يغير الموقع فوراً." : "Every save creates a Neon revision without changing the live site."}</p></div><div className="rounded-2xl bg-[#F7FAFC] p-4"><Send className="text-[#0DA8B3]" size={20} /><p className="mt-3 text-sm font-extrabold text-[#234257]">{locale === "ar" ? "انشر" : "Publish"}</p><p className="mt-1 text-xs leading-5 text-[#728694]">{locale === "ar" ? "النشر متاح server-side للناشرين والمدير فقط." : "Publishing is server-enforced for Publisher and Admin roles."}</p></div></div></section>
    </div>
  );
}
