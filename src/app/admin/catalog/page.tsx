"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, FilePlus2, Loader2, Save, Trash2 } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";

type CatalogType = "services" | "capabilities" | "projects";
type Locale = "ar" | "en";
type Localized = { ar: string; en: string };
type Item = {
  id: string;
  slug: string;
  name: Localized;
  summary: Localized | null;
  description: Localized | null;
  industry?: Localized | null;
  sortOrder: number;
  status: "draft" | "published" | "archived";
};
type FormItem = Omit<Item, "id">;

const empty = (): FormItem => ({
  slug: "",
  name: { ar: "", en: "" },
  summary: { ar: "", en: "" },
  description: { ar: "", en: "" },
  industry: { ar: "", en: "" },
  sortOrder: 0,
  status: "draft",
});

function text(value: Localized | null | undefined, locale: Locale) {
  return value?.[locale] ?? value?.en ?? value?.ar ?? "";
}

export default function CatalogPage() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  const [type, setType] = useState<CatalogType>("services");
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState<FormItem | Item>(empty());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const labels = useMemo<Record<CatalogType, string>>(() => isArabic
    ? { services: "الخدمات", capabilities: "القدرات", projects: "المشروعات" }
    : { services: "Services", capabilities: "Capabilities", projects: "Projects" }, [isArabic]);

  const copy = isArabic ? {
    eyebrow: "محتوى الموقع",
    title: "الكتالوج",
    description: "أضف وعدّل ما يظهر في أقسام الخدمات والقدرات والمشروعات. المسودة لا تظهر للزوار حتى تختار النشر.",
    newItem: "عنصر جديد",
    records: "السجلات",
    noRecords: "لا توجد سجلات بعد",
    noRecordsDetail: "أنشئ أول سجل حقيقي ليظهر في الموقع بعد نشره.",
    editor: "محرر المحتوى",
    create: "إنشاء",
    edit: "تعديل",
    slug: "الرابط المختصر",
    sortOrder: "الترتيب",
    name: "الاسم",
    summary: "الملخص",
    descriptionField: "الوصف",
    industry: "القطاع",
    workflow: "حالة النشر",
    draft: "مسودة",
    published: "منشور",
    saveDraft: "حفظ المسودة",
    publish: "حفظ ونشر",
    delete: "حذف السجل",
    saved: "تم حفظ السجل بنجاح.",
    deleted: "تم حذف السجل.",
    loading: "جارٍ تحميل السجلات…",
    required: "أدخل الرابط المختصر واسماً بالعربية أو الإنجليزية.",
    deleteConfirm: "هل تريد حذف هذا السجل نهائياً؟",
    source: "المصدر: Neon CMS",
  } : {
    eyebrow: "Website content",
    title: "Catalog",
    description: "Create and edit the services, capabilities, and projects that appear on the public website. Drafts stay private until published.",
    newItem: "New item",
    records: "Records",
    noRecords: "No records yet",
    noRecordsDetail: "Create the first real record to make it available on the public website after publishing.",
    editor: "Content editor",
    create: "Create",
    edit: "Edit",
    slug: "URL slug",
    sortOrder: "Sort order",
    name: "Name",
    summary: "Summary",
    descriptionField: "Description",
    industry: "Industry",
    workflow: "Publishing status",
    draft: "Draft",
    published: "Published",
    saveDraft: "Save draft",
    publish: "Save & publish",
    delete: "Delete record",
    saved: "Record saved successfully.",
    deleted: "Record deleted.",
    loading: "Loading records…",
    required: "Enter a slug and a name in Arabic or English.",
    deleteConfirm: "Delete this record permanently?",
    source: "Source: Neon CMS",
  };

  async function loadRecords(selectedType = type) {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/cms/catalog?type=${selectedType}`, { cache: "no-store" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Unable to load records.");
      setItems(result.items ?? []);
    } catch (loadError) {
      setItems([]);
      setError(loadError instanceof Error ? loadError.message : "Unable to load records.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let active = true;
    async function initialLoad() {
      try {
        const response = await fetch(`/api/cms/catalog?type=${type}`, { cache: "no-store" });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error ?? "Unable to load records.");
        if (active) setItems(result.items ?? []);
      } catch (loadError) {
        if (active) {
          setItems([]);
          setError(loadError instanceof Error ? loadError.message : "Unable to load records.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }
    void initialLoad();
    return () => { active = false; };
  }, [type]);

  function switchType(nextType: CatalogType) {
    setType(nextType);
    setForm(empty());
    setMessage("");
    setError("");
  }

  function updateLocalized(group: "name" | "summary" | "description" | "industry", language: Locale, value: string) {
    setForm((current) => ({ ...current, [group]: { ...(current[group] ?? { ar: "", en: "" }), [language]: value } }));
  }

  function updateField(field: "slug" | "sortOrder" | "status", value: string) {
    setForm((current) => ({ ...current, [field]: field === "sortOrder" ? Number(value) : value } as FormItem | Item));
  }

  function startNew() {
    setForm(empty());
    setMessage("");
    setError("");
  }

  async function save(status: "draft" | "published") {
    const payload = { ...form, type, status };
    if (!payload.slug.trim() || (!payload.name.ar.trim() && !payload.name.en.trim())) {
      setError(copy.required);
      return;
    }
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const response = await fetch("/api/cms/catalog", {
        method: "id" in form ? "PATCH" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify("id" in form ? { ...payload, id: form.id } : payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Unable to save record.");
      setForm(result.item);
      setMessage(status === "published" ? copy.publish : copy.saved);
      await loadRecords();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to save record.");
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!("id" in form) || !window.confirm(copy.deleteConfirm)) return;
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const response = await fetch("/api/cms/catalog", {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ type, id: form.id }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Unable to delete record.");
      startNew();
      setMessage(copy.deleted);
      await loadRecords();
    } catch (removeError) {
      setError(removeError instanceof Error ? removeError.message : "Unable to delete record.");
    } finally {
      setSaving(false);
    }
  }

  const fieldClass = "mt-2 w-full rounded-xl border border-[#DCE5EC] bg-white px-3.5 py-3 text-sm font-semibold text-[#1E3A50] outline-none transition focus:border-[#0F4C81] focus:ring-4 focus:ring-[#0F4C81]/10";
  const currentName = text(form.name, locale) || (isArabic ? "بدون اسم" : "Untitled");

  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0F4C81]">{copy.eyebrow}</p>
          <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-[#17344B]">{copy.title}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6F8291]">{copy.description}</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-[#DCE5EC] bg-white px-3 py-2 text-xs font-bold text-[#617586]"><span className="h-2 w-2 rounded-full bg-[#54B883]" />{copy.source}</div>
      </div>

      <div className="flex flex-wrap gap-2 rounded-2xl border border-[#DCE5EC] bg-white p-2 shadow-sm">
        {(Object.keys(labels) as CatalogType[]).map((key) => <button key={key} type="button" onClick={() => switchType(key)} className={`rounded-xl px-4 py-2.5 text-sm font-black transition ${key === type ? "bg-[#0F4C81] text-white shadow-sm" : "text-[#617586] hover:bg-[#F0F5F8]"}`}>{labels[key]}</button>)}
        <button type="button" onClick={startNew} className="ms-auto inline-flex items-center gap-2 rounded-xl bg-[#E8F7F8] px-4 py-2.5 text-sm font-black text-[#087DAD] transition hover:bg-[#D9F0F3]"><FilePlus2 size={16} aria-hidden="true" />{copy.newItem}</button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(250px,0.72fr)_minmax(0,1.28fr)]">
        <section className="rounded-2xl border border-[#DCE5EC] bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3"><div><h2 className="font-black text-[#17344B]">{copy.records}</h2><p className="mt-1 text-xs text-[#8798A5]">{labels[type]}</p></div><span className="rounded-full bg-[#F0F5F8] px-2.5 py-1 text-[11px] font-black text-[#617586]">{items.length}</span></div>
          {loading ? <div className="flex items-center gap-2 py-10 text-sm font-semibold text-[#7F91A1]"><Loader2 className="animate-spin" size={16} />{copy.loading}</div> : items.length === 0 ? <div className="rounded-xl border border-dashed border-[#C8D8E2] px-4 py-10 text-center"><p className="text-sm font-black text-[#486173]">{copy.noRecords}</p><p className="mt-2 text-xs leading-5 text-[#8798A5]">{copy.noRecordsDetail}</p></div> : <div className="space-y-2">{items.map((item) => <button key={item.id} type="button" onClick={() => { setForm(structuredClone(item)); setMessage(""); setError(""); }} className={`w-full rounded-xl border p-3 text-start transition ${"id" in form && form.id === item.id ? "border-[#0F4C81] bg-[#F2F8FC]" : "border-[#E6EDF2] hover:border-[#A9C2D1]"}`}><div className="flex items-center justify-between gap-3"><strong className="truncate text-sm text-[#17344B]">{text(item.name, locale) || item.slug}</strong><span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-black ${item.status === "published" ? "bg-[#E4F5EC] text-[#347B58]" : "bg-[#FFF4D1] text-[#8B6E13]"}`}>{item.status === "published" ? copy.published : copy.draft}</span></div><span className="mt-1 block truncate text-xs text-[#7F91A1]">/{item.slug}</span></button>)}</div>}
        </section>

        <section className="rounded-2xl border border-[#DCE5EC] bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6 flex flex-col justify-between gap-3 border-b border-[#E7EEF3] pb-5 sm:flex-row sm:items-start"><div><p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0F4C81]">{copy.editor}</p><h2 className="mt-1 text-xl font-black text-[#17344B]">{"id" in form ? `${copy.edit}: ${currentName}` : `${copy.create} ${labels[type]}`}</h2></div>{"id" in form && <button type="button" onClick={() => void remove()} disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E5B4B4] px-3 py-2 text-xs font-black text-[#A23C3C] transition hover:bg-[#FFF6F6] disabled:opacity-40"><Trash2 size={14} />{copy.delete}</button>}</div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-xs font-black text-[#516576]">{copy.slug}<input value={form.slug} onChange={(event) => updateField("slug", event.target.value)} className={fieldClass} /></label>
            <label className="text-xs font-black text-[#516576]">{copy.sortOrder}<input type="number" value={form.sortOrder} onChange={(event) => updateField("sortOrder", event.target.value)} className={fieldClass} /></label>
            {(["name", "summary", "description"] as const).flatMap((field) => (["ar", "en"] as Locale[]).map((language) => <label key={`${field}-${language}`} className="text-xs font-black text-[#516576] sm:col-span-1">{copy[field === "description" ? "descriptionField" : field]} — {language.toUpperCase()}{field === "name" ? <input value={form.name[language]} onChange={(event) => updateLocalized(field, language, event.target.value)} className={fieldClass} dir={language === "ar" ? "rtl" : "ltr"} /> : <textarea value={form[field]?.[language] ?? ""} onChange={(event) => updateLocalized(field, language, event.target.value)} className={`${fieldClass} min-h-28 resize-y`} dir={language === "ar" ? "rtl" : "ltr"} />}</label>))}
            {type === "projects" && (["ar", "en"] as Locale[]).map((language) => <label key={`industry-${language}`} className="text-xs font-black text-[#516576]">{copy.industry} — {language.toUpperCase()}<input value={form.industry?.[language] ?? ""} onChange={(event) => updateLocalized("industry", language, event.target.value)} className={fieldClass} dir={language === "ar" ? "rtl" : "ltr"} /></label>)}
          </div>
          <div className="mt-6 flex flex-col gap-3 border-t border-[#E7EEF3] pt-5 sm:flex-row sm:items-center sm:justify-between"><div className="min-h-5 text-xs font-bold" aria-live="polite">{error ? <span className="text-[#A23C3C]">{error}</span> : <span className="text-[#347B58]">{message}</span>}</div><div className="flex flex-wrap gap-2"><button type="button" onClick={() => void save("draft")} disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0F4C81] px-4 py-3 text-sm font-black text-[#0F4C81] transition hover:bg-[#F0F6FA] disabled:opacity-50"><Save size={15} />{copy.saveDraft}</button><button type="button" onClick={() => void save("published")} disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F4C81] px-4 py-3 text-sm font-black text-white shadow-sm transition hover:bg-[#0A3A63] disabled:opacity-50"><Check size={15} />{copy.publish}</button></div></div>
        </section>
      </div>
    </section>
  );
}
