"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type MediaItem = { id: string; storageKey: string; publicUrl: string; mimeType: string; fileName: string; fileSizeBytes: number; width: number | null; height: number | null; altText: { ar?: string; en?: string } | null; createdAt: string };
type FormState = { publicUrl: string; storageKey: string; fileName: string; mimeType: string; fileSizeBytes: string; altAr: string; altEn: string };
const blank: FormState = { publicUrl: "", storageKey: "", fileName: "", mimeType: "image/jpeg", fileSizeBytes: "0", altAr: "", altEn: "" };

export default function MediaPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [form, setForm] = useState<FormState>(blank);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [storageMode, setStorageMode] = useState("external-url");
  const [saving, setSaving] = useState(false);

  async function load(value = query) {
    const response = await fetch(`/api/cms/media?q=${encodeURIComponent(value)}`, { cache: "no-store" });
    const result = await response.json();
    if (response.ok) { setItems(result.items ?? []); setStorageMode(result.storage?.mode ?? "external-url"); }
    else setMessage(result.error ?? "Unable to load media.");
  }
  useEffect(() => {
    let active = true;
    fetch("/api/cms/media", { cache: "no-store" })
      .then((response) => response.json().then((result) => ({ response, result })))
      .then(({ response, result }) => {
        if (!active) return;
        if (response.ok) { setItems(result.items ?? []); setStorageMode(result.storage?.mode ?? "external-url"); }
        else setMessage(result.error ?? "Unable to load media.");
      })
      .catch(() => { if (active) setMessage("Unable to load media."); });
    return () => { active = false; };
  }, []);
  async function addAsset() {
    setSaving(true); setMessage("");
    const response = await fetch("/api/cms/media", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ publicUrl: form.publicUrl, storageKey: form.storageKey || undefined, fileName: form.fileName, mimeType: form.mimeType, fileSizeBytes: Number(form.fileSizeBytes) || 0, altText: { ar: form.altAr, en: form.altEn } }) });
    const result = await response.json();
    if (response.ok) { setForm(blank); setMessage("Asset metadata saved in Neon."); await load(); } else setMessage(result.error ?? "Unable to save asset.");
    setSaving(false);
  }
  async function remove(id: string) {
    if (!window.confirm("Delete this media record? The object itself is not deleted by this metadata action.")) return;
    const response = await fetch("/api/cms/media", { method: "DELETE", headers: { "content-type": "application/json" }, body: JSON.stringify({ id }) });
    setMessage(response.ok ? "Media record deleted." : "Only an Admin can delete media records.");
    if (response.ok) await load();
  }
  return <section className="space-y-6"><div><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0F4C81]">ASSET MANAGEMENT</p><h1 className="mt-2 text-3xl font-extrabold text-[#17344B]">Media library</h1><p className="mt-2 max-w-3xl text-sm leading-6 text-[#6F8291]">Manage object-storage assets and their bilingual metadata. Current storage mode: <strong>{storageMode}</strong>.</p></div><div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]"><div className="rounded-2xl border border-[#DCE5EC] bg-white p-4 shadow-sm"><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><h2 className="font-bold text-[#17344B]">Library ({items.length})</h2><input value={query} onChange={(e) => { setQuery(e.target.value); void load(e.target.value); }} className="admin-field max-w-xs" placeholder="Search file name or key" /></div><div className="mt-4 grid gap-3 sm:grid-cols-2">{items.map((item) => <article key={item.id} className="overflow-hidden rounded-xl border border-[#E7EEF3] bg-[#FBFCFD]"><div className="aspect-video bg-[#EDF3F7]">{item.mimeType.startsWith("image/") ? <Image src={item.publicUrl} alt={item.altText?.en ?? item.fileName} width={640} height={360} unoptimized className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-xs font-bold text-[#7F91A1]">{item.mimeType}</div>}</div><div className="p-3"><p className="truncate text-sm font-bold text-[#17344B]">{item.fileName}</p><p className="mt-1 truncate text-xs text-[#7F91A1]">{item.storageKey}</p><button type="button" onClick={() => void remove(item.id)} className="mt-3 rounded-lg border border-[#E5B4B4] px-3 py-2 text-xs font-bold text-[#A23C3C]">Delete record</button></div></article>)}{items.length === 0 && <p className="py-8 text-sm text-[#7F91A1]">No assets found.</p>}</div></div><div className="rounded-2xl border border-[#DCE5EC] bg-white p-5 shadow-sm"><h2 className="text-xl font-extrabold text-[#17344B]">Register object-storage asset</h2><p className="mt-2 text-xs leading-5 text-[#7F91A1]">Paste the public URL returned by your object storage. The database stores metadata only; credentials never enter the browser.</p><div className="mt-5 space-y-4"><label className="block text-xs font-bold text-[#516576]">Public URL<input value={form.publicUrl} onChange={(e) => setForm({ ...form, publicUrl: e.target.value })} className="admin-field mt-1" placeholder="https://cdn.example.com/asset.jpg" /></label><label className="block text-xs font-bold text-[#516576]">File name<input value={form.fileName} onChange={(e) => setForm({ ...form, fileName: e.target.value })} className="admin-field mt-1" placeholder="hero-packaging.jpg" /></label><label className="block text-xs font-bold text-[#516576]">Storage key<input value={form.storageKey} onChange={(e) => setForm({ ...form, storageKey: e.target.value })} className="admin-field mt-1" placeholder="media/hero-packaging.jpg" /></label><div className="grid gap-4 sm:grid-cols-2"><label className="block text-xs font-bold text-[#516576]">MIME type<input value={form.mimeType} onChange={(e) => setForm({ ...form, mimeType: e.target.value })} className="admin-field mt-1" /></label><label className="block text-xs font-bold text-[#516576]">Size bytes<input type="number" value={form.fileSizeBytes} onChange={(e) => setForm({ ...form, fileSizeBytes: e.target.value })} className="admin-field mt-1" /></label></div><div className="grid gap-4 sm:grid-cols-2"><label className="block text-xs font-bold text-[#516576]">Alt text — AR<textarea value={form.altAr} onChange={(e) => setForm({ ...form, altAr: e.target.value })} className="admin-field mt-1 min-h-20" dir="rtl" /></label><label className="block text-xs font-bold text-[#516576]">Alt text — EN<textarea value={form.altEn} onChange={(e) => setForm({ ...form, altEn: e.target.value })} className="admin-field mt-1 min-h-20" /></label></div><button type="button" onClick={() => void addAsset()} disabled={saving} className="rounded-xl bg-[#0F4C81] px-5 py-3 text-sm font-bold text-white disabled:opacity-50">{saving ? "Saving…" : "Save asset metadata"}</button><p className="text-xs text-[#6F8291]">{message}</p></div></div></div></section>;
}
