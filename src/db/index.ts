import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "./schema";

function getDatabaseUrl() {
  const value = process.env.DATABASE_URL;

  if (!value) {
    throw new Error("DATABASE_URL is required for server-side database access.");
  }

  return value;
}

const sql = neon(getDatabaseUrl());

export const db = drizzle(sql, { schema });
