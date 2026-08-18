import { asc, desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/db";
import { auditLogs, capabilities, projects, services } from "@/db/schema";
import { requireRole } from "@/lib/auth";

type CatalogType = "services" | "capabilities" | "projects";
const tables = { services, capabilities, projects } as const;

function isType(value: string | null): value is CatalogType {
  return value === "services" || value === "capabilities" || value === "projects";
}

function errorResponse(error: unknown) {
  const message = error instanceof Error ? error.message : "UNKNOWN";
  const status = message === "AUTH_REQUIRED" ? 401 : message === "FORBIDDEN" ? 403 : 400;
  return NextResponse.json({ error: message }, { status });
}

function localized(value: unknown, fallback = "") {
  if (!value || typeof value !== "object") return { ar: fallback, en: fallback };
  const record = value as Record<string, unknown>;
  return { ar: String(record.ar ?? fallback), en: String(record.en ?? fallback) };
}

export async function GET(request: Request) {
  try {
    await requireRole(["admin", "editor", "publisher"]);
    const type = new URL(request.url).searchParams.get("type");
    if (!isType(type)) return NextResponse.json({ error: "Invalid catalog type" }, { status: 400 });
    const rows = await db.select().from(tables[type]).orderBy(asc(tables[type].sortOrder), desc(tables[type].updatedAt));
    return NextResponse.json({ items: rows });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    const actor = await requireRole(["admin", "editor", "publisher"]);
    const body = await request.json();
    const type = body?.type as CatalogType;
    if (!isType(type)) return NextResponse.json({ error: "Invalid catalog type" }, { status: 400 });
    const status = body.status === "published" ? "published" : "draft";
    if (status === "published" && actor.role === "editor") throw new Error("FORBIDDEN");
    const values = {
      slug: String(body.slug ?? "").trim(),
      name: localized(body.name),
      summary: localized(body.summary),
      description: localized(body.description),
      sortOrder: Number.isFinite(Number(body.sortOrder)) ? Number(body.sortOrder) : 0,
      status,
      ...(type === "projects" ? { industry: localized(body.industry) } : {}),
    };
    if (!values.slug || !values.name.en && !values.name.ar) return NextResponse.json({ error: "Slug and name are required" }, { status: 400 });
    const [item] = await db.insert(tables[type]).values(values as never).returning();
    await db.insert(auditLogs).values({ actorId: actor.id, action: "catalog.create", entityType: type, entityId: item.id, metadata: { slug: item.slug, status } });
    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PATCH(request: Request) {
  try {
    const actor = await requireRole(["admin", "editor", "publisher"]);
    const body = await request.json();
    const type = body?.type as CatalogType;
    if (!isType(type) || !body.id) return NextResponse.json({ error: "Type and id are required" }, { status: 400 });
    const status = body.status === "published" ? "published" : "draft";
    if (status === "published" && actor.role === "editor") throw new Error("FORBIDDEN");
    const values = {
      slug: String(body.slug ?? "").trim(),
      name: localized(body.name),
      summary: localized(body.summary),
      description: localized(body.description),
      sortOrder: Number.isFinite(Number(body.sortOrder)) ? Number(body.sortOrder) : 0,
      status,
      updatedAt: new Date(),
      ...(type === "projects" ? { industry: localized(body.industry) } : {}),
    };
    const [item] = await db.update(tables[type]).set(values as never).where(eq(tables[type].id, body.id)).returning();
    if (!item) return NextResponse.json({ error: "Item not found" }, { status: 404 });
    await db.insert(auditLogs).values({ actorId: actor.id, action: "catalog.update", entityType: type, entityId: item.id, metadata: { slug: item.slug, status } });
    return NextResponse.json({ item });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const actor = await requireRole(["admin"]);
    const body = await request.json();
    const type = body?.type as CatalogType;
    if (!isType(type) || !body.id) return NextResponse.json({ error: "Type and id are required" }, { status: 400 });
    const [item] = await db.delete(tables[type]).where(eq(tables[type].id, body.id)).returning();
    if (!item) return NextResponse.json({ error: "Item not found" }, { status: 404 });
    await db.insert(auditLogs).values({ actorId: actor.id, action: "catalog.delete", entityType: type, entityId: item.id, metadata: { slug: item.slug } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return errorResponse(error);
  }
}
