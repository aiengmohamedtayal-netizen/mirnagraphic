import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

const localizedText = (name: string) => jsonb(name).$type<{ ar: string; en: string }>().notNull();
const localizedOptionalText = (name: string) => jsonb(name).$type<{ ar?: string; en?: string }>();

export const userRoleEnum = pgEnum("user_role", ["admin", "editor", "publisher"]);
export const contentStatusEnum = pgEnum("content_status", ["draft", "published", "archived"]);
export const sectionTypeEnum = pgEnum("section_type", [
  "hero",
  "rich_text",
  "services_grid",
  "capabilities_grid",
  "portfolio_grid",
  "cta",
  "contact",
]);

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
};

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: varchar("email", { length: 320 }).notNull(),
    displayName: varchar("display_name", { length: 160 }).notNull(),
    passwordHash: text("password_hash").notNull(),
    role: userRoleEnum("role").default("editor").notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    ...timestamps,
  },
  (table) => [uniqueIndex("users_email_unique").on(table.email)],
);

export const authSessions = pgTable(
  "auth_sessions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    tokenHash: varchar("token_hash", { length: 128 }).notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    lastSeenAt: timestamp("last_seen_at", { withTimezone: true }).defaultNow().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("auth_sessions_token_hash_unique").on(table.tokenHash),
    index("auth_sessions_user_id_idx").on(table.userId),
    index("auth_sessions_expires_at_idx").on(table.expiresAt),
  ],
);

export const pages = pgTable(
  "pages",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    slug: varchar("slug", { length: 160 }).notNull(),
    title: localizedText("title"),
    description: localizedOptionalText("description"),
    status: contentStatusEnum("status").default("draft").notNull(),
    ...timestamps,
  },
  (table) => [uniqueIndex("pages_slug_unique").on(table.slug)],
);

export const pageSections = pgTable(
  "page_sections",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    pageId: uuid("page_id")
      .notNull()
      .references(() => pages.id, { onDelete: "cascade" }),
    type: sectionTypeEnum("type").notNull(),
    sortOrder: integer("sort_order").notNull(),
    isEnabled: boolean("is_enabled").default(true).notNull(),
    configuration: jsonb("configuration").$type<Record<string, unknown>>().notNull(),
    ...timestamps,
  },
  (table) => [
    index("page_sections_page_id_idx").on(table.pageId),
    uniqueIndex("page_sections_page_order_unique").on(table.pageId, table.sortOrder),
  ],
);

export const services = pgTable(
  "services",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    slug: varchar("slug", { length: 160 }).notNull(),
    name: localizedText("name"),
    summary: localizedOptionalText("summary"),
    description: localizedOptionalText("description"),
    iconName: varchar("icon_name", { length: 80 }),
    sortOrder: integer("sort_order").default(0).notNull(),
    status: contentStatusEnum("status").default("draft").notNull(),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("services_slug_unique").on(table.slug),
    index("services_status_order_idx").on(table.status, table.sortOrder),
  ],
);

export const capabilities = pgTable(
  "capabilities",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    slug: varchar("slug", { length: 160 }).notNull(),
    name: localizedText("name"),
    summary: localizedOptionalText("summary"),
    description: localizedOptionalText("description"),
    sortOrder: integer("sort_order").default(0).notNull(),
    status: contentStatusEnum("status").default("draft").notNull(),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("capabilities_slug_unique").on(table.slug),
    index("capabilities_status_order_idx").on(table.status, table.sortOrder),
  ],
);

export const projects = pgTable(
  "projects",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    slug: varchar("slug", { length: 160 }).notNull(),
    name: localizedText("name"),
    excerpt: localizedOptionalText("excerpt"),
    description: localizedOptionalText("description"),
    industry: localizedOptionalText("industry"),
    status: contentStatusEnum("status").default("draft").notNull(),
    sortOrder: integer("sort_order").default(0).notNull(),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("projects_slug_unique").on(table.slug),
    index("projects_status_order_idx").on(table.status, table.sortOrder),
  ],
);

export const projectCaseStudies = pgTable(
  "project_case_studies",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    content: localizedOptionalText("content"),
    metrics: jsonb("metrics").$type<Array<{ label: { ar: string; en: string }; value: string }>>(),
    status: contentStatusEnum("status").default("draft").notNull(),
    ...timestamps,
  },
  (table) => [uniqueIndex("project_case_studies_project_unique").on(table.projectId)],
);

export const mediaAssets = pgTable(
  "media_assets",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    storageKey: varchar("storage_key", { length: 512 }).notNull(),
    publicUrl: varchar("public_url", { length: 1024 }).notNull(),
    mimeType: varchar("mime_type", { length: 120 }).notNull(),
    fileName: varchar("file_name", { length: 255 }).notNull(),
    fileSizeBytes: integer("file_size_bytes").notNull(),
    width: integer("width"),
    height: integer("height"),
    altText: localizedOptionalText("alt_text"),
    metadata: jsonb("metadata").$type<Record<string, unknown>>(),
    createdBy: uuid("created_by").references(() => users.id, { onDelete: "set null" }),
    ...timestamps,
  },
  (table) => [uniqueIndex("media_assets_storage_key_unique").on(table.storageKey)],
);

export const seoMetadata = pgTable(
  "seo_metadata",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    entityType: varchar("entity_type", { length: 80 }).notNull(),
    entityId: uuid("entity_id").notNull(),
    title: localizedOptionalText("title"),
    description: localizedOptionalText("description"),
    canonical: varchar("canonical", { length: 1024 }),
    ogTitle: localizedOptionalText("og_title"),
    ogDescription: localizedOptionalText("og_description"),
    ogImageMediaId: uuid("og_image_media_id").references(() => mediaAssets.id, { onDelete: "set null" }),
    robotsIndex: boolean("robots_index").default(true).notNull(),
    robotsFollow: boolean("robots_follow").default(true).notNull(),
    includeInSitemap: boolean("include_in_sitemap").default(true).notNull(),
    ...timestamps,
  },
  (table) => [uniqueIndex("seo_metadata_entity_unique").on(table.entityType, table.entityId)],
);

export const revisions = pgTable(
  "revisions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    entityType: varchar("entity_type", { length: 80 }).notNull(),
    entityId: uuid("entity_id").notNull(),
    version: integer("version").notNull(),
    status: contentStatusEnum("status").notNull(),
    snapshot: jsonb("snapshot").$type<Record<string, unknown>>().notNull(),
    createdBy: uuid("created_by")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("revisions_entity_version_unique").on(table.entityType, table.entityId, table.version),
    index("revisions_entity_idx").on(table.entityType, table.entityId),
  ],
);

export const publications = pgTable(
  "publications",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    entityType: varchar("entity_type", { length: 80 }).notNull(),
    entityId: uuid("entity_id").notNull(),
    revisionId: uuid("revision_id")
      .notNull()
      .references(() => revisions.id, { onDelete: "restrict" }),
    publishedBy: uuid("published_by")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    publishedAt: timestamp("published_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [index("publications_entity_idx").on(table.entityType, table.entityId)],
);

export const auditLogs = pgTable(
  "audit_logs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    actorId: uuid("actor_id").references(() => users.id, { onDelete: "set null" }),
    action: varchar("action", { length: 100 }).notNull(),
    entityType: varchar("entity_type", { length: 80 }).notNull(),
    entityId: uuid("entity_id"),
    metadata: jsonb("metadata").$type<Record<string, unknown>>(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [index("audit_logs_entity_idx").on(table.entityType, table.entityId)],
);

export const siteSettings = pgTable(
  "site_settings",
  {
    key: varchar("key", { length: 160 }).primaryKey(),
    value: jsonb("value").$type<Record<string, unknown>>().notNull(),
    updatedBy: uuid("updated_by").references(() => users.id, { onDelete: "set null" }),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
);

export const cmsSchema = {
  users,
  authSessions,
  pages,
  pageSections,
  services,
  capabilities,
  projects,
  projectCaseStudies,
  mediaAssets,
  seoMetadata,
  revisions,
  publications,
  auditLogs,
  siteSettings,
};
