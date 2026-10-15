import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseConfigured } from "@/lib/db";
import { findAdmin, setSessionCookie, verifyPassword } from "@/lib/auth";
import { ensureSeeded } from "@/lib/seed";

const loginSchema = z.object({
  username: z.string().min(1).max(60),
  password: z.string().min(1).max(200),
});

export async function POST(req: NextRequest) {
  try {
    if (!supabaseConfigured) {
      return NextResponse.json({ ok: false, error: "DB_NOT_CONFIGURED" }, { status: 503 });
    }
    await ensureSeeded();
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "VALIDATION" }, { status: 400 });
    }
    const { username, password } = parsed.data;
    const user = await findAdmin(username.trim().toLowerCase());
    if (!user || !verifyPassword(password, user.password_hash)) {
      return NextResponse.json({ ok: false, error: "INVALID" }, { status: 401 });
    }
    await setSessionCookie(user.username);
    return NextResponse.json({ ok: true, username: user.username });
  } catch {
    return NextResponse.json({ ok: false, error: "SERVER" }, { status: 500 });
  }
}
