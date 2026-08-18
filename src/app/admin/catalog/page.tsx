"use client";

import { useEffect, useState } from "react";

type CatalogType = "services" | "capabilities" | "projects";
type Locale = "ar" | "en";
type LocaleText = { ar: string; en: string };
type Item = { id: string; slug: string; name: LocaleText; summary: LocaleText | null; description: LocaleText | null; industry?: LocaleText | null; sortOrder: number; status: "draft" | "published" | "archived" };
type FormItem = Omit<Item, "id">;

const labels: Record<CatalogType, string> = { services: "Services", capabilities: "Capabilities", projects: "Projects" };
const empty = (): FormItem => ({ slug: "", name: { ar: "", en: "" }, summary: { ar: "", en: "" }, description: { ar: "", en: "" }, industry: { ar: "", en: "" }, sortOrder: 0, status: "draft" });

export default function CatalogPage() {
  const [type, setType] = useState<CatalogType>("services");
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState<FormItem | Item>(empty());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    void fetch(`/api/cms/catalog?type=${type}`, { cache: "no-store" })
      .then(async (response) => ({ ok: response.ok, result: await response.json() }))
      .then(({ ok, result }) => setItems(ok ? result.items : []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [type]);

  function newItem() { setForm(empty()); setMessage(""); }
  function selectItem(item: Item) { setForm(structuredClone(item)); setMessage(""); }
  function updateLocalized(group: "name" | "summary" | "description" | "industry", locale: Locale, value: string) {
    setForm((current) => ({ ...current, [group]: { ...(current[group] ?? { ar: "", en: "" }), [locale]: value } }));
  }
  function updateSimple(key: "slug" | "sortOrder" | "status", value: string) {
    setForm((current) => ({ ...current, [key]: key === "sortOrder" ? Number(value) : value } as FormItem | Item));
  }
  async function reload() {
    const response = await fetch(`/api/cms/catalog?type=${type}`, { cache: "no-store" });
    const result = await response.json();
    setItems(response.ok ? result.items : []);
  }
  async function save() {
    setSaving(true); setMessage("");
    const response = await fetch("/api/cms/catalog", { method: "id" in form ? "PATCH" : "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...form, type }) });
    const result = await response.json();
    if (!response.ok) setMessage(result.error ?? "Unable to save record.");
    else { setForm(result.item); setMessage(`${labels[type]} saved as ${result.item.status}.`); await reload(); }
    setSaving(false);
  }
  async function remove() {
    if (!("id" in form) || !window.confirm("Delete this record?")) return;
    const response = await fetch("/api/cms/catalog", { method: "DELETE", headers: { "content-type": "application/json" }, body: JSON.stringify({ type, id: form.id }) });
    if (response.ok) { newItem(); setMessage("Record deleted."); await reload(); } else setMessage("Only an Admin can delete records.");
  }

  const localizedFields: Array<"name" | "summary" | "description"> = ["name", "summary", "description"];
  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0F4C81]">CONTENT CATALOG</p><h1 className="mt-2 text-3xl font-extrabold text-[#17344B]">Manage structured site content</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-[#6F8291]">Editors can save drafts. Publishers and Admins can publish. All changes are stored in Neon.</p></div>
        <div className="flex flex-wrap gap-2">{(Object.keys(labels) as CatalogType[]).map((key) => <button key={key} type="button" onClick={() => { setType(key); newItem(); }} className={`rounded-xl px-4 py-2 text-sm font-bold ${key === type ? "bg-[#0F4C81] text-white" : "border border-[#DCE5EC] bg-white text-[#516576]"}`}>{labels[key]}</button>)}</div>
      </div>
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-2xl border border-[#DCE5EC] bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between"><h2 className="font-bold text-[#17344B]">{labels[type]}</h2><button type="button" onClick={newItem} className="rounded-lg bg-[#E8F1F8] px-3 py-2 text-xs font-bold text-[#0F4C81]">New item</button></div>
          {loading ? <p className="py-8 text-sm text-[#7F91A1]">Loading catalog…</p> : items.length === 0 ? <p className="py-8 text-sm text-[#7F91A1]">No records yet.</p> : <div className="space-y-2">{items.map((item) => <button key={item.id} type="button" onClick={() => selectItem(item)} className={`w-full rounded-xl border p-3 text-left ${"id" in form && form.id === item.id ? "border-[#0F4C81] bg-[#F4F8FB]" : "border-[#E7EEF3]"}`}><div className="flex items-center justify-between gap-3"><strong className="truncate text-sm text-[#17344B]">{item.name.en || item.name.ar || item.slug}</strong><span className="rounded-full bg-[#FFF5D6] px-2 py-1 text-[10px] font-bold text-[#8B6E13]">{item.status}</span></div><span className="mt-1 block truncate text-xs text-[#7F91A1]">/{item.slug}</span></button>)}</div>}
        </div>
        <div className="rounded-2xl border border-[#DCE5EC] bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-start justify-between gap-3"><div><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0F4C81]">BILINGUAL RECORD</p><h2 className="mt-1 text-xl font-extrabold text-[#17344B]">{"id" in form ? "Edit" : "Create"} {labels[type].slice(0, -1)}</h2></div><button type="button" onClick={() => void remove()} disabled={!('id' in form)} className="rounded-lg border border-[#E5B4B4] px-3 py-2 text-xs font-bold text-[#A23C3C] disabled:opacity-40">Delete</button></div>
          <div className="grid gap-4 sm:grid-cols-2"><label className="text-xs font-bold text-[#516576]">Slug<input value={form.slug} onChange={(e) => updateSimple("slug", e.target.value)} className="admin-field mt-1" /></label><label className="text-xs font-bold text-[#516576]">Sort order<input type="number" value={form.sortOrder} onChange={(e) => updateSimple("sortOrder", e.target.value)} className="admin-field mt-1" /></label>
            {localizedFields.flatMap((field) => (["ar", "en"] as Locale[]).map((locale) => <label key={`${field}-${locale}`} className="text-xs font-bold text-[#516576]">{field} — {locale.toUpperCase()}{field === "name" ? <input value={form.name[locale]} onChange={(e) => updateLocalized(field, locale, e.target.value)} className="admin-field mt-1" dir={locale === "ar" ? "rtl" : "ltr"} /> : <textarea value={form[field]?.[locale] ?? ""} onChange={(e) => updateLocalized(field, locale, e.target.value)} className="admin-field mt-1 min-h-24" dir={locale === "ar" ? "rtl" : "ltr"} />}</label>))}
            {type === "projects" && (["ar", "en"] as Locale[]).map((locale) => <label key={`industry-${locale}`} className="text-xs font-bold text-[#516576]">Industry — {locale.toUpperCase()}<input value={form.industry?.[locale] ?? ""} onChange={(e) => updateLocalized("industry", locale, e.target.value)} className="admin-field mt-1" dir={locale === "ar" ? "rtl" : "ltr"} /></label>)}
            <label className="text-xs font-bold text-[#516576]">Workflow<select value={form.status} onChange={(e) => updateSimple("status", e.target.value)} className="admin-field mt-1"><option value="draft">Draft</option><option value="published">Published</option></select></label>
          </div>
          <div className="mt-5 flex items-center justify-between gap-3"><p className="text-xs text-[#6F8291]">{message}</p><button type="button" onClick={() => void save()} disabled={saving} className="rounded-xl bg-[#0F4C81] px-5 py-3 text-sm font-bold text-white disabled:opacity-50">{saving ? "Saving…" : "Save record"}</button></div>
        </div>
      </div>
    </section>
  );
}
