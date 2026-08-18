"use client";

import { useEffect, useState } from "react";

import { PageIntro, SurfaceHeader } from "@/components/admin/AdminUi";

type Localized = { ar: string; en: string };
type HomeContent = { hero: { eyebrow: Localized; title: Localized; description: Localized }; cta: Localized };
type Revision = { id: string; version: number; status: string; createdAt: string } | null;

const emptyContent: HomeContent = { hero: { eyebrow: { ar: "", en: "" }, title: { ar: "", en: "" }, description: { ar: "", en: "" } }, cta: { ar: "", en: "" } };

export default function ContentPage() {
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
      if (!response.ok) throw new Error("Unable to load content");
      const result = await response.json();
      setContent(result.value);
      setRevision(result.revision ?? null);
    } catch {
      setMessage("Unable to load content from Neon.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void fetch("/api/cms/settings", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to load content");
        return response.json();
      })
      .then((result) => {
        setContent(result.value);
        setRevision(result.revision ?? null);
      })
      .catch(() => setMessage("Unable to load content from Neon."))
      .finally(() => setLoading(false));
  }, []);

  function update(path: string[], locale: "ar" | "en", value: string) {
    setContent((current) => {
      const next = structuredClone(current);
      let cursor: Record<string, unknown> = next as unknown as Record<string, unknown>;
      for (const key of path.slice(0, -1)) cursor = cursor[key] as Record<string, unknown>;
      const leaf = path[path.length - 1];
      const field = cursor[leaf] as Localized;
      cursor[leaf] = { ...field, [locale]: value };
      return next;
    });
  }

  async function save() {
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch("/api/cms/settings", { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify({ key: "home", value: content }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Save failed");
      setRevision(result.revision);
      setMessage(`Draft saved as revision ${result.revision.version}. It is not public until published.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Save failed. Check your session and try again.");
    } finally {
      setSaving(false);
    }
  }

  async function publish() {
    setPublishing(true);
    setMessage("");
    try {
      const response = await fetch("/api/cms/publish", { method: "POST" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Publish failed");
      setRevision((current) => current ? { ...current, status: "published" } : current);
      setMessage(`Revision ${result.revision.version} is now live on the public website.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Publish failed. Publisher or Admin access is required.");
    } finally {
      setPublishing(false);
    }
  }

  if (loading) return <div className="admin-loading-card">Loading content from Neon…</div>;

  return (
    <div className="space-y-7">
      <PageIntro eyebrow="Content management" title="Control the public website" description="Edit the primary home content in Arabic and English. Drafts are versioned in Neon and never render publicly until a Publisher or Admin publishes them." action={<div className="flex flex-wrap gap-2"><button className="admin-secondary-button" onClick={() => void load()}>Refresh</button><button className="admin-primary-button" onClick={save} disabled={saving}>{saving ? "Saving…" : "Save draft"}</button><button className="admin-primary-button admin-gold-button" onClick={publish} disabled={publishing}>{publishing ? "Publishing…" : "Publish"}</button></div>} />
      {message ? <p className="admin-inline-message" role="status">{message}</p> : null}
      <div className="admin-status-strip"><span>Workflow status: <strong>{revision?.status ?? "draft"}</strong></span><span>Revision: <strong>{revision?.version ?? "—"}</strong></span><span>Public rule: <strong>published snapshot only</strong></span></div>
      <section className="admin-content-grid">
        <div className="admin-form-card">
          <SurfaceHeader title="Hero section" detail="Visible at the top of the home page" />
          {(["eyebrow", "title", "description"] as const).map((field) => (
            <div className="admin-field-group" key={field}>
              <label>{field[0].toUpperCase() + field.slice(1)} — Arabic<textarea value={content.hero[field].ar} onChange={(event) => update(["hero", field], "ar", event.target.value)} /></label>
              <label>{field[0].toUpperCase() + field.slice(1)} — English<textarea value={content.hero[field].en} onChange={(event) => update(["hero", field], "en", event.target.value)} /></label>
            </div>
          ))}
        </div>
        <div className="admin-form-card">
          <SurfaceHeader title="Primary CTA" detail="Used across the main conversion path" />
          <div className="admin-field-group"><label>Arabic<textarea value={content.cta.ar} onChange={(event) => update(["cta"], "ar", event.target.value)} /></label><label>English<textarea value={content.cta.en} onChange={(event) => update(["cta"], "en", event.target.value)} /></label></div>
          <div className="admin-note-card"><strong>Preview safety</strong><span>Save creates a draft revision. Publishing is restricted server-side to Admin and Publisher roles and updates the public snapshot atomically.</span></div>
        </div>
      </section>
    </div>
  );
}
