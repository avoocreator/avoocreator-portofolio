import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db, supabaseConfigured } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

const L = z.object({ id: z.string().max(4000), en: z.string().max(4000) });

const aboutSchema = z.object({
  photoUrl: z.string().max(2000),
  photoAlt: L,
  intro: z.array(L).max(10),
  values: z
    .array(
      z.object({
        icon: z.string().max(40),
        title: L,
        description: L,
      })
    )
    .max(10),
  facts: z.array(z.object({ label: L, value: L })).max(12),
  quoteText: L,
  quoteAuthor: z.string().max(120),
});

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  if (!supabaseConfigured) {
    return NextResponse.json({ ok: false, error: "DB_NOT_CONFIGURED" }, { status: 503 });
  }
  try {
    const { data: row, error } = await db
      .from("about_content")
      .select("*")
      .eq("id", "about")
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) return NextResponse.json({ ok: true, data: null });
    return NextResponse.json({
      ok: true,
      data: {
        photoUrl: row.photo_url ?? "",
        photoAlt: row.photo_alt ?? { id: "", en: "" },
        intro: row.intro,
        values: row.values_json,
        facts: row.facts,
        quoteText: row.quote_text,
        quoteAuthor: row.quote_author,
      },
    });
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
    const parsed = aboutSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "VALIDATION", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const d = parsed.data;
    const row = {
      id: "about",
      photo_url: d.photoUrl,
      photo_alt: d.photoAlt,
      intro: d.intro,
      values_json: d.values,
      facts: d.facts,
      quote_text: d.quoteText,
      quote_author: d.quoteAuthor,
    };
    const { error } = await db
      .from("about_content")
      .upsert(row, { onConflict: "id" });
    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "SERVER" }, { status: 500 });
  }
}
