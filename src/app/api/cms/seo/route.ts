import { NextResponse } from "next/server";

import { db } from "@/db";
import { auditLogs, seoMetadata } from "@/db/schema";
import { requireRole } from "@/lib/auth";

function errorResponse(error: unknown) {
  const message = error instanceof Error ? error.message : "UNKNOWN";
  const status = message === "AUTH_REQUIRED" ? 401 : message === "FORBIDDEN" ? 403 : 400;
  return NextResponse.json({ error: message }, { status });
}

function optionalLocalized(value: unknown) {
  if (!value || typeof value !== "object") return { ar: "", en: "" };
  const record = value as Record<string, unknown>;
  return { ar: String(record.ar ?? ""), en: String(record.en ?? "") };
}

export async function GET() {
  try {
    await requireRole(["admin", "editor", "publisher"]);
    const rows = await db.select().from(seoMetadata).orderBy(seoMetadata.entityType, seoMetadata.entityId);
    return NextResponse.json({ items: rows });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PUT(request: Request) {
  try {
    const actor = await requireRole(["admin", "editor", "publisher"]);
    const body = await request.json();
    const entityType = String(body.entityType ?? "").trim();
    const entityId = String(body.entityId ?? "").trim();
    if (!entityType || !entityId) return NextResponse.json({ error: "entityType and entityId are required" }, { status: 400 });
    const values = {
      entityType,
      entityId,
      title: optionalLocalized(body.title),
      description: optionalLocalized(body.description),
      canonical: body.canonical ? String(body.canonical).trim() : null,
      ogTitle: optionalLocalized(body.ogTitle),
      ogDescription: optionalLocalized(body.ogDescription),
      ogImageMediaId: body.ogImageMediaId || null,
      robotsIndex: body.robotsIndex !== false,
      robotsFollow: body.robotsFollow !== false,
      includeInSitemap: body.includeInSitemap !== false,
      updatedAt: new Date(),
    };
    const [item] = await db.insert(seoMetadata).values(values).onConflictDoUpdate({ target: [seoMetadata.entityType, seoMetadata.entityId], set: values }).returning();
    await db.insert(auditLogs).values({ actorId: actor.id, action: "seo.update", entityType: "seo_metadata", entityId: item.id, metadata: { contentEntityType: entityType, contentEntityId: entityId } });
    return NextResponse.json({ item });
  } catch (error) {
    return errorResponse(error);
  }
}
