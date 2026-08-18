import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { adminCredentialsConfigured, createSession, hashPassword, verifyPassword } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; password?: string };
    const email = body.email?.trim().toLowerCase();
    const password = body.password ?? "";

    if (!email || !password || !adminCredentialsConfigured()) {
      return NextResponse.json({ error: "Admin credentials are not configured." }, { status: 503 });
    }

    const configuredEmail = process.env.ADMIN_EMAIL!.trim().toLowerCase();
    const configuredPassword = process.env.ADMIN_PASSWORD!;
    let user = (await db.select().from(users).where(eq(users.email, email)).limit(1))[0];

    if (!user && email === configuredEmail && password === configuredPassword) {
      user = (await db.insert(users).values({
        email,
        displayName: "Mirna Administrator",
        passwordHash: hashPassword(password),
        role: "admin",
        isActive: true,
      }).returning())[0];
    }

    if (!user || !user.isActive || !verifyPassword(password, user.passwordHash)) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    await createSession(user.id);
    return NextResponse.json({ ok: true, user: { email: user.email, displayName: user.displayName, role: user.role } });
  } catch (error) {
    console.error("Admin login failed", error);
    return NextResponse.json({ error: "Unable to sign in right now." }, { status: 500 });
  }
}
