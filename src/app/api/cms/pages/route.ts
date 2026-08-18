import { and, asc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/db";
import { auditLogs, pageSections, pages } from "@/db/schema";
import { requireRole } from "@/lib/auth";

const sectionTypes = ["hero", "rich_text", "services_grid", "capabilities_grid", "portfolio_grid", "cta", "contact"] as const;
type SectionType = (typeof sectionTypes)[number];

function errorResponse(error: unknown) {
  if (error instanceof Error && error.message === "AUTH_REQUIRED") return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  if (error instanceof Error && error.message === "FORBIDDEN") return NextResponse.json({ error: "Insufficient permissions." }, { status: 403 });
  return NextResponse.json({ error: "Unexpected server error." }, { status: 500 });
}
function validSectionType(value: unknown): value is SectionType { return typeof value === "string" && sectionTypes.includes(value as SectionType); }

async function pagePayload() {
  const rows = await db.select().from(pages).orderBy(asc(pages.slug)).limit(100);
  const sections = await db.select().from(pageSections).orderBy(asc(pageSections.sortOrder)).limit(500);
  return rows.map((page) => ({ ...page, sections: sections.filter((section) => section.pageId === page.id) }));
}

export async function GET() {
  try { await requireRole(["admin", "editor", "publisher"]); return NextResponse.json({ items: await pagePayload(), sectionTypes }); }
  catch (error) { return errorResponse(error); }
}

export async function POST(request: Request) {
  try {
    const user = await requireRole(["admin", "editor", "publisher"]);
    const body = await request.json() as { slug?: string; title?: { ar?: string; en?: string }; description?: { ar?: string; en?: string }; status?: "draft" | "published"; sections?: Array<{ type?: string; isEnabled?: boolean; configuration?: Record<string, unknown> }> };
    const slug = body.slug?.trim().toLowerCase();
    if (!slug || !body.title?.ar?.trim() || !body.title?.en?.trim()) return NextResponse.json({ error: "Slug and bilingual title are required." }, { status: 400 });
    if (body.status === "published" && user.role === "editor") return NextResponse.json({ error: "Editors can only save drafts." }, { status: 403 });
    const [page] = await db.insert(pages).values({ slug, title: { ar: body.title.ar, en: body.title.en }, description: body.description ?? null, status: body.status === "published" ? "published" : "draft" }).returning();
    const sections = (body.sections ?? []).filter((section) => validSectionType(section.type)).map((section, index) => ({ pageId: page.id, type: section.type as SectionType, sortOrder: index, isEnabled: section.isEnabled !== false, configuration: section.configuration ?? {} }));
    if (sections.length) await db.insert(pageSections).values(sections);
    await db.insert(auditLogs).values({ actorId: user.id, action: "page.create", entityType: "page", entityId: page.id, metadata: { slug: page.slug, status: page.status } });
    return NextResponse.json({ item: (await pagePayload()).find((item) => item.id === page.id) }, { status: 201 });
  } catch (error) { return errorResponse(error); }
}

export async function PUT(request: Request) {
  try {
    const user = await requireRole(["admin", "editor", "publisher"]);
    const body = await request.json() as { id?: string; slug?: string; title?: { ar?: string; en?: string }; description?: { ar?: string; en?: string }; status?: "draft" | "published"; sections?: Array<{ type?: string; isEnabled?: boolean; configuration?: Record<string, unknown> }> };
    if (!body.id || !body.slug?.trim() || !body.title?.ar?.trim() || !body.title?.en?.trim()) return NextResponse.json({ error: "Page id, slug, and bilingual title are required." }, { status: 400 });
    if (body.status === "published" && user.role === "editor") return NextResponse.json({ error: "Editors can only save drafts." }, { status: 403 });
    const [page] = await db.update(pages).set({ slug: body.slug.trim().toLowerCase(), title: { ar: body.title.ar, en: body.title.en }, description: body.description ?? null, status: body.status === "published" ? "published" : "draft", updatedAt: new Date() }).where(eq(pages.id, body.id)).returning();
    if (!page) return NextResponse.json({ error: "Page not found." }, { status: 404 });
    await db.delete(pageSections).where(eq(pageSections.pageId, page.id));
    const sections = (body.sections ?? []).filter((section) => validSectionType(section.type)).map((section, index) => ({ pageId: page.id, type: section.type as SectionType, sortOrder: index, isEnabled: section.isEnabled !== false, configuration: section.configuration ?? {} }));
    if (sections.length) await db.insert(pageSections).values(sections);
    await db.insert(auditLogs).values({ actorId: user.id, action: "page.update", entityType: "page", entityId: page.id, metadata: { slug: page.slug, status: page.status, sectionCount: sections.length } });
    return NextResponse.json({ item: (await pagePayload()).find((item) => item.id === page.id) });
  } catch (error) { return errorResponse(error); }
}

export async function DELETE(request: Request) {
  try {
    const user = await requireRole(["admin"]);
    const body = await request.json() as { id?: string };
    if (!body.id) return NextResponse.json({ error: "Page id is required." }, { status: 400 });
    const [page] = await db.delete(pages).where(and(eq(pages.id, body.id))).returning();
    if (!page) return NextResponse.json({ error: "Page not found." }, { status: 404 });
    await db.insert(auditLogs).values({ actorId: user.id, action: "page.delete", entityType: "page", entityId: page.id, metadata: { slug: page.slug } });
    return NextResponse.json({ ok: true });
  } catch (error) { return errorResponse(error); }
}
