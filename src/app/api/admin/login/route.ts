import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseConfigured } from "@/lib/db";
import { findAdmin, setSessionCookie, verifyPassword } from "@/lib/auth";
import { ensureSeeded } from "@/lib/seed";
import { clearHits, clientIp, isRateLimited, recordHit } from "@/lib/rate-limit";

// Maks. 8 percobaan gagal per IP dalam 10 menit.
const LOGIN_LIMIT = 8;
const LOGIN_WINDOW_MS = 10 * 60 * 1000;

const loginSchema = z.object({
  username: z.string().min(1).max(60),
  password: z.string().min(1).max(200),
});

export async function POST(req: NextRequest) {
  try {
    if (!supabaseConfigured) {
      return NextResponse.json({ ok: false, error: "DB_NOT_CONFIGURED" }, { status: 503 });
    }
    const rlKey = `login:${clientIp(req.headers)}`;
    if (isRateLimited(rlKey, LOGIN_LIMIT, LOGIN_WINDOW_MS)) {
      return NextResponse.json(
        { ok: false, error: "RATE_LIMITED" },
        { status: 429, headers: { "Retry-After": String(LOGIN_WINDOW_MS / 1000) } }
      );
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
      recordHit(rlKey, LOGIN_WINDOW_MS);
      return NextResponse.json({ ok: false, error: "INVALID" }, { status: 401 });
    }
    clearHits(rlKey);
    await setSessionCookie(user.username);
    return NextResponse.json({ ok: true, username: user.username });
  } catch {
    return NextResponse.json({ ok: false, error: "SERVER" }, { status: 500 });
  }
}
