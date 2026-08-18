import { and, desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/db";
import { auditLogs, mediaAssets } from "@/db/schema";
import { requireRole } from "@/lib/auth";

function errorResponse(error: unknown) {
  if (error instanceof Error && error.message === "AUTH_REQUIRED") return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  if (error instanceof Error && error.message === "FORBIDDEN") return NextResponse.json({ error: "Insufficient permissions." }, { status: 403 });
  return NextResponse.json({ error: "Unexpected server error." }, { status: 500 });
}

export async function GET(request: Request) {
  try {
    await requireRole(["admin", "editor", "publisher"]);
    const url = new URL(request.url);
    const query = url.searchParams.get("q")?.trim().toLowerCase();
    const rows = await db.select().from(mediaAssets).orderBy(desc(mediaAssets.createdAt)).limit(100);
    const items = query ? rows.filter((item) => `${item.fileName} ${item.mimeType} ${item.storageKey}`.toLowerCase().includes(query)) : rows;
    return NextResponse.json({ items, storage: { mode: process.env.R2_BUCKET ? "r2" : "external-url", configured: Boolean(process.env.R2_BUCKET) } });
  } catch (error) { return errorResponse(error); }
}

export async function POST(request: Request) {
  try {
    const user = await requireRole(["admin", "editor", "publisher"]);
    const body = await request.json() as { publicUrl?: string; storageKey?: string; fileName?: string; mimeType?: string; fileSizeBytes?: number; width?: number | null; height?: number | null; altText?: { ar?: string; en?: string } };
    if (!body.publicUrl || !/^https?:\/\//i.test(body.publicUrl) || !body.fileName || !body.mimeType) return NextResponse.json({ error: "A valid public URL, file name, and MIME type are required." }, { status: 400 });
    const storageKey = body.storageKey?.trim() || `external/${crypto.randomUUID()}-${body.fileName.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
    const existing = await db.select({ id: mediaAssets.id }).from(mediaAssets).where(eq(mediaAssets.storageKey, storageKey)).limit(1);
    if (existing.length) return NextResponse.json({ error: "Storage key already exists." }, { status: 409 });
    const [item] = await db.insert(mediaAssets).values({ storageKey, publicUrl: body.publicUrl, fileName: body.fileName, mimeType: body.mimeType, fileSizeBytes: Math.max(0, Math.floor(body.fileSizeBytes ?? 0)), width: body.width ?? null, height: body.height ?? null, altText: body.altText ?? null, metadata: { source: process.env.R2_BUCKET ? "r2" : "external-url" }, createdBy: user.id }).returning();
    await db.insert(auditLogs).values({ actorId: user.id, action: "media.create", entityType: "media_asset", entityId: item.id, metadata: { fileName: item.fileName, storageKey: item.storageKey } });
    return NextResponse.json({ item }, { status: 201 });
  } catch (error) { return errorResponse(error); }
}

export async function DELETE(request: Request) {
  try {
    const user = await requireRole(["admin"]);
    const body = await request.json() as { id?: string };
    if (!body.id) return NextResponse.json({ error: "Media asset id is required." }, { status: 400 });
    const [item] = await db.select().from(mediaAssets).where(eq(mediaAssets.id, body.id)).limit(1);
    if (!item) return NextResponse.json({ error: "Media asset not found." }, { status: 404 });
    await db.delete(mediaAssets).where(and(eq(mediaAssets.id, item.id)));
    await db.insert(auditLogs).values({ actorId: user.id, action: "media.delete", entityType: "media_asset", entityId: item.id, metadata: { storageKey: item.storageKey } });
    return NextResponse.json({ ok: true });
  } catch (error) { return errorResponse(error); }
}
