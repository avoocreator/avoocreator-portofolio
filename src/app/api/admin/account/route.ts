import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db, supabaseConfigured } from "@/lib/db";
import { findAdmin, hashPassword, requireAdmin, verifyPassword } from "@/lib/auth";

const accountSchema = z.object({
  currentPassword: z.string().min(1).max(200),
  newUsername: z.string().min(3).max(60).regex(/^[a-z0-9_.-]+$/).optional(),
  newPassword: z.string().min(8).max(200).optional(),
});

export async function PUT(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  if (!supabaseConfigured) {
    return NextResponse.json({ ok: false, error: "DB_NOT_CONFIGURED" }, { status: 503 });
  }
  try {
    const body = await req.json();
    const parsed = accountSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "VALIDATION" }, { status: 400 });
    }
    const { currentPassword, newUsername, newPassword } = parsed.data;

    const user = await findAdmin(admin);
    if (!user || !verifyPassword(currentPassword, user.password_hash)) {
      return NextResponse.json({ ok: false, error: "INVALID_CURRENT" }, { status: 400 });
    }

    if (newUsername && newUsername !== user.username) {
      const exists = await findAdmin(newUsername);
      if (exists) {
        return NextResponse.json({ ok: false, error: "USERNAME_TAKEN" }, { status: 400 });
      }
    }

    const { error } = await db
      .from("admin_users")
      .update({
        username: newUsername || user.username,
        password_hash: newPassword ? hashPassword(newPassword) : user.password_hash,
      })
      .eq("username", user.username);
    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "SERVER" }, { status: 500 });
  }
}
