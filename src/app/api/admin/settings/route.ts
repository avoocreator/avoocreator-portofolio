import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db, supabaseConfigured } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

const L = z.object({ id: z.string().max(2000), en: z.string().max(2000) });

const settingsSchema = z.object({
  brand: z.string().min(1).max(80),
  owner: z.string().min(1).max(80),
  tagline: L,
  whatsapp: z.string().min(8).max(20),
  email: z.string().min(3).max(120),
  location: L,
  availability: L,
  socials: z
    .array(
      z.object({
        label: z.string().min(1).max(40),
        href: z.string().min(1).max(300),
        handle: z.string().max(80).optional().nullable(),
      })
    )
    .max(10),
  stats: z
    .array(
      z.object({
        value: z.number().min(0).max(100000),
        suffix: z.string().max(8),
        label: L,
      })
    )
    .max(8),
  roles: z.array(z.string().min(1).max(60)).max(8),
});

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  if (!supabaseConfigured) {
    return NextResponse.json({ ok: false, error: "DB_NOT_CONFIGURED" }, { status: 503 });
  }
  try {
    const { data: row, error } = await db
      .from("settings")
      .select("value")
      .eq("key", "site")
      .maybeSingle();
    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true, data: row?.value ?? null });
  } catch {
    return NextResponse.json({ ok: false, error: "SERVER" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  if (!supabaseConfigured) {
    return NextResponse.json({ ok: false, error: "DB_NOT_CONFIGURED" }, { status: 503 });
  }
  try {
    const body = await req.json();
    const parsed = settingsSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "VALIDATION", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const { error } = await db
      .from("settings")
      .upsert({ key: "site", value: parsed.data }, { onConflict: "key" });
    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "SERVER" }, { status: 500 });
  }
}
