import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { HOME_PUBLISHED_KEY, type HomeContent } from "@/lib/cms";

export type HomeCmsContent = HomeContent;

export async function getHomeCmsContent(): Promise<HomeCmsContent | null> {
  if (!process.env.DATABASE_URL) return null;
  try {
    const row = (await db.select({ value: siteSettings.value }).from(siteSettings).where(eq(siteSettings.key, HOME_PUBLISHED_KEY)).limit(1))[0];
    return (row?.value as HomeCmsContent | undefined) ?? null;
  } catch {
    return null;
  }
}
