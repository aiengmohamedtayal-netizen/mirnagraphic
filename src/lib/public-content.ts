import "server-only";

import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { projects, siteSettings } from "@/db/schema";
import { HOME_PUBLISHED_KEY, type HomeContent, normalizeHomeContent } from "@/lib/cms";

export type HomeCmsContent = HomeContent;
export type PublicProject = {
  id: string;
  name: { ar: string; en: string };
  excerpt: { ar?: string; en?: string } | null;
  industry: { ar?: string; en?: string } | null;
};

export async function getHomeCmsContent(): Promise<HomeCmsContent | null> {
  if (!process.env.DATABASE_URL) return null;
  try {
    const row = (await db.select({ value: siteSettings.value }).from(siteSettings).where(eq(siteSettings.key, HOME_PUBLISHED_KEY)).limit(1))[0];
    return row?.value ? normalizeHomeContent(row.value) : null;
  } catch {
    return null;
  }
}

export async function getPublishedProjects(): Promise<PublicProject[]> {
  if (!process.env.DATABASE_URL) return [];
  try {
    return await db
      .select({ id: projects.id, name: projects.name, excerpt: projects.excerpt, industry: projects.industry })
      .from(projects)
      .where(eq(projects.status, "published"))
      .orderBy(asc(projects.sortOrder), asc(projects.createdAt))
      .limit(6);
  } catch {
    return [];
  }
}
