import "server-only";

import { desc, eq, max } from "drizzle-orm";

import { db } from "@/db";
import { revisions, siteSettings } from "@/db/schema";

export const HOME_ENTITY_TYPE = "site_setting";
export const HOME_ENTITY_ID = "00000000-0000-4000-8000-000000000001";
export const HOME_DRAFT_KEY = "home";
export const HOME_PUBLISHED_KEY = "home_published";

export type Localized = { ar: string; en: string };
export type HomeContent = {
  hero: { eyebrow: Localized; title: Localized; description: Localized };
  cta: Localized;
};

export const defaultHome: HomeContent = {
  hero: {
    eyebrow: { ar: "تصنيع تغليف يواكب طموحك", en: "Packaging manufacturing for ambitious brands" },
    title: { ar: "نصنع التغليف الذي يحمل قيمة علامتك", en: "We manufacture packaging that carries your brand value" },
    description: { ar: "حلول تغليف B2B دقيقة من العينة إلى الإنتاج والتسليم.", en: "Precise B2B packaging solutions from sample to production and delivery." },
  },
  cta: { ar: "ابدأ مشروعك", en: "Start your project" },
};

export async function getHomeDraft() {
  const row = (await db.select().from(siteSettings).where(eq(siteSettings.key, HOME_DRAFT_KEY)).limit(1))[0];
  return row?.value ?? defaultHome;
}

export async function getHomePublished() {
  const row = (await db.select().from(siteSettings).where(eq(siteSettings.key, HOME_PUBLISHED_KEY)).limit(1))[0];
  return row?.value ?? null;
}

export async function getNextHomeRevisionVersion() {
  const row = (await db.select({ version: max(revisions.version) }).from(revisions).where(eq(revisions.entityId, HOME_ENTITY_ID)).limit(1))[0];
  return Number(row?.version ?? 0) + 1;
}

export async function getLatestHomeRevision() {
  return (await db.select().from(revisions).where(eq(revisions.entityId, HOME_ENTITY_ID)).orderBy(desc(revisions.version)).limit(1))[0] ?? null;
}

export function isHomeContent(value: unknown): value is HomeContent {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  const hero = item.hero as Record<string, unknown> | undefined;
  const cta = item.cta as Record<string, unknown> | undefined;
  const localized = (candidate: unknown) => {
    if (!candidate || typeof candidate !== "object") return false;
    const obj = candidate as Record<string, unknown>;
    return typeof obj.ar === "string" && typeof obj.en === "string";
  };
  return Boolean(hero && localized(hero.eyebrow) && localized(hero.title) && localized(hero.description) && localized(cta));
}
