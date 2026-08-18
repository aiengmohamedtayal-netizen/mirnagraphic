import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/db";
import { auditLogs, revisions, siteSettings } from "@/db/schema";
import { getLatestHomeRevision, getNextHomeRevisionVersion, HOME_DRAFT_KEY, HOME_ENTITY_ID, HOME_ENTITY_TYPE, defaultHome, isHomeContent } from "@/lib/cms";
import { requireRole } from "@/lib/auth";

function errorResponse(error: unknown, fallback: string) {
  const status = error instanceof Error && error.message === "AUTH_REQUIRED" ? 401 : error instanceof Error && error.message === "FORBIDDEN" ? 403 : 500;
  return NextResponse.json({ error: fallback }, { status });
}

export async function GET() {
  try {
    await requireRole(["admin", "editor", "publisher"]);
    let row = (await db.select().from(siteSettings).where(eq(siteSettings.key, HOME_DRAFT_KEY)).limit(1))[0];
    if (!row) row = (await db.insert(siteSettings).values({ key: HOME_DRAFT_KEY, value: defaultHome }).returning())[0];
    const revision = await getLatestHomeRevision();
    const published = (await db.select({ id: revisions.id, version: revisions.version, publishedAt: revisions.createdAt }).from(revisions).where(eq(revisions.entityId, HOME_ENTITY_ID)).orderBy(desc(revisions.version)).limit(1))[0];
    return NextResponse.json({ key: row.key, value: row.value, updatedAt: row.updatedAt, revision: revision ? { id: revision.id, version: revision.version, status: revision.status, createdAt: revision.createdAt } : null, latestRevision: published ?? null });
  } catch (error) {
    return errorResponse(error, "Unable to load content settings.");
  }
}

export async function PUT(request: Request) {
  try {
    const user = await requireRole(["admin", "editor", "publisher"]);
    const body = (await request.json()) as { key?: string; value?: unknown };
    if (body.key !== HOME_DRAFT_KEY || !isHomeContent(body.value)) return NextResponse.json({ error: "A valid home content payload is required." }, { status: 400 });
    const value = body.value;
    const version = await getNextHomeRevisionVersion();
    const revision = (await db.insert(revisions).values({ entityType: HOME_ENTITY_TYPE, entityId: HOME_ENTITY_ID, version, status: "draft", snapshot: value, createdBy: user.id }).returning())[0];
    const row = (await db.insert(siteSettings).values({ key: HOME_DRAFT_KEY, value, updatedBy: user.id }).onConflictDoUpdate({ target: siteSettings.key, set: { value, updatedBy: user.id, updatedAt: new Date() } }).returning())[0];
    await db.insert(auditLogs).values({ actorId: user.id, action: "content.draft_saved", entityType: HOME_ENTITY_TYPE, entityId: HOME_ENTITY_ID, metadata: { version, revisionId: revision.id } });
    return NextResponse.json({ key: row.key, value: row.value, updatedAt: row.updatedAt, revision: { id: revision.id, version: revision.version, status: revision.status, createdAt: revision.createdAt } });
  } catch (error) {
    return errorResponse(error, "Unable to save content settings.");
  }
}
