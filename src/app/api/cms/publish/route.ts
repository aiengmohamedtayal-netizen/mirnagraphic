import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/db";
import { auditLogs, publications, revisions, siteSettings } from "@/db/schema";
import { getHomeDraft, getLatestHomeRevision, HOME_ENTITY_ID, HOME_ENTITY_TYPE, HOME_PUBLISHED_KEY } from "@/lib/cms";
import { requireRole } from "@/lib/auth";

export async function POST() {
  try {
    const user = await requireRole(["admin", "publisher"]);
    const revision = await getLatestHomeRevision();
    if (!revision || revision.status !== "draft") return NextResponse.json({ error: "Save a draft before publishing." }, { status: 409 });
    const draft = await getHomeDraft();
    const published = (await db.insert(siteSettings).values({ key: HOME_PUBLISHED_KEY, value: draft, updatedBy: user.id }).onConflictDoUpdate({ target: siteSettings.key, set: { value: draft, updatedBy: user.id, updatedAt: new Date() } }).returning())[0];
    await db.update(revisions).set({ status: "published" }).where(eq(revisions.id, revision.id));
    const publication = (await db.insert(publications).values({ entityType: HOME_ENTITY_TYPE, entityId: HOME_ENTITY_ID, revisionId: revision.id, publishedBy: user.id }).returning())[0];
    await db.insert(auditLogs).values({ actorId: user.id, action: "content.published", entityType: HOME_ENTITY_TYPE, entityId: HOME_ENTITY_ID, metadata: { revisionId: revision.id, version: revision.version } });
    return NextResponse.json({ ok: true, publishedAt: publication.publishedAt, revision: { id: revision.id, version: revision.version }, value: published.value });
  } catch (error) {
    const status = error instanceof Error && error.message === "AUTH_REQUIRED" ? 401 : error instanceof Error && error.message === "FORBIDDEN" ? 403 : 500;
    return NextResponse.json({ error: "Unable to publish content." }, { status });
  }
}
