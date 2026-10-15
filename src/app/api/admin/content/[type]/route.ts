import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db, supabaseConfigured, ZERO_UUID } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { normalizeToolRefs } from "@/lib/tools";

/**
 * API konten admin — pola "full list replace":
 * GET  → ambil seluruh item tipe konten (JSON sudah di-parse).
 * PUT  → simpan ulang SELURUH daftar item (create/update/delete/reorder
 *        sekaligus). Dataset portfolio berukuran kecil, jadi cara ini
 *        paling sederhana & aman.
 */

const L = z.object({ id: z.string().max(2000), en: z.string().max(2000) });

const schemas = {
  projects: z.array(
    z.object({
      number: z.string().max(10),
      title: L,
      category: L,
      description: L,
      tags: z.array(z.string().max(60)).max(20),
      status: z.enum(["selesai", "berjalan", "riset", "konsep"]),
      year: z.string().max(10).optional().nullable(),
      link: z.string().max(500).optional().nullable(),
    })
  ),
  services: z.array(
    z.object({
      number: z.string().max(10),
      slug: z.string().min(1).max(80),
      title: L,
      description: L,
      outputs: z.array(L).max(12),
      icon: z.string().max(40),
      duration: L.optional().nullable(),
    })
  ),
  expertise: z.array(
    z.object({
      groupId: z.string().min(1).max(60),
      title: L,
      description: L,
      longDescription: L,
      skills: z.array(z.object({ name: z.string().max(80), level: z.number().min(0).max(100) })).max(15),
      tools: z
        .array(
          z.union([
            z.string().max(60), // format lama: key ikon bawaan
            z.object({
              name: z.string().max(80),
              key: z.string().max(60).optional().nullable(),
              logoUrl: z.string().max(1500).optional().nullable(),
            }),
          ])
        )
        .max(30),
    })
  ),
  experience: z.array(
    z.object({
      year: z.string().max(10),
      title: L,
      role: L,
      description: L,
      category: L,
      highlight: z.boolean().optional().nullable(),
    })
  ),
  participation: z.array(
    z.object({
      catId: z.string().min(1).max(60),
      number: z.string().max(10),
      title: L,
      description: L,
      items: z.array(
        z.object({
          id: z.string().max(80),
          title: L,
          role: L.optional().nullable(),
          description: L,
          link: z.string().max(500).optional().nullable(),
          featured: z.boolean().optional().nullable(),
        })
      ).max(50),
    })
  ),
  faq: z.array(z.object({ q: L, a: L })).max(50),
  approach: z.array(
    z.object({
      number: z.string().max(10),
      title: L,
      description: L,
      duration: L.optional().nullable(),
    })
  ),
} as const;

type ContentType = keyof typeof schemas;

const tableMap = {
  projects: "projects",
  services: "services",
  expertise: "expertise_groups",
  experience: "experience_items",
  participation: "participation_categories",
  faq: "faq_items",
} as const;

function isContentType(t: string): t is ContentType {
  return t in schemas;
}

/** Serialisasi item (objek) jadi baris tabel Supabase sesuai tipe. */
function toRows(type: ContentType, items: unknown[]) {
  switch (type) {
    case "projects":
      return (items as z.infer<typeof schemas.projects>).map((it, i) => ({
        number: it.number,
        title: it.title,
        category: it.category,
        description: it.description,
        tags: it.tags ?? [],
        status: it.status,
        year: it.year || null,
        link: it.link || null,
        sort_order: i,
      }));
    case "services":
      return (items as z.infer<typeof schemas.services>).map((it, i) => ({
        number: it.number,
        slug: it.slug,
        title: it.title,
        description: it.description,
        outputs: it.outputs ?? [],
        icon: it.icon,
        duration: it.duration ?? null,
        sort_order: i,
      }));
    case "expertise":
      return (items as z.infer<typeof schemas.expertise>).map((it, i) => ({
        group_id: it.groupId,
        title: it.title,
        description: it.description,
        long_description: it.longDescription,
        skills: it.skills ?? [],
        tools: normalizeToolRefs(it.tools, []),
        sort_order: i,
      }));
    case "experience":
      return (items as z.infer<typeof schemas.experience>).map((it, i) => ({
        year: it.year,
        title: it.title,
        role: it.role,
        description: it.description,
        category: it.category,
        highlight: Boolean(it.highlight),
        sort_order: i,
      }));
    case "participation":
      return (items as z.infer<typeof schemas.participation>).map((it, i) => ({
        cat_id: it.catId,
        number: it.number,
        title: it.title,
        description: it.description,
        items: it.items ?? [],
        sort_order: i,
      }));
    case "faq":
      return (items as z.infer<typeof schemas.faq>).map((it, i) => ({
        q: it.q,
        a: it.a,
        sort_order: i,
      }));
    case "approach":
      return null; // disimpan di settings
  }
}

async function readItems(type: ContentType): Promise<unknown[]> {
  if (type === "approach") {
    const { data, error } = await db
      .from("settings")
      .select("value")
      .eq("key", "approach")
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data?.value ? (data.value as unknown[]) : [];
  }

  const { data: rows, error } = await db
    .from(tableMap[type])
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);

  switch (type) {
    case "projects":
      return (rows ?? []).map((r) => ({
        number: r.number,
        title: r.title,
        category: r.category,
        description: r.description,
        tags: r.tags,
        status: r.status,
        year: r.year,
        link: r.link,
      }));
    case "services":
      return (rows ?? []).map((r) => ({
        number: r.number,
        slug: r.slug,
        title: r.title,
        description: r.description,
        outputs: r.outputs,
        icon: r.icon,
        duration: r.duration ?? null,
      }));
    case "expertise":
      return (rows ?? []).map((r) => ({
        groupId: r.group_id,
        title: r.title,
        description: r.description,
        longDescription: r.long_description,
        skills: r.skills,
        tools: normalizeToolRefs(r.tools, []),
      }));
    case "experience":
      return (rows ?? []).map((r) => ({
        year: r.year,
        title: r.title,
        role: r.role,
        description: r.description,
        category: r.category,
        highlight: r.highlight,
      }));
    case "participation":
      return (rows ?? []).map((r) => ({
        catId: r.cat_id,
        number: r.number,
        title: r.title,
        description: r.description,
        items: r.items,
      }));
    case "faq":
      return (rows ?? []).map((r) => ({ q: r.q, a: r.a }));
  }
}

async function writeItems(type: ContentType, items: unknown[]): Promise<void> {
  if (type === "approach") {
    const { error } = await db
      .from("settings")
      .upsert({ key: "approach", value: items }, { onConflict: "key" });
    if (error) throw new Error(error.message);
    return;
  }
  const table = tableMap[type];
  const rows = toRows(type, items);
  if (!rows) return;
  // Replace-all: hapus semua lalu sisipkan ulang (dataset kecil, tanpa transaksi)
  const del = await db.from(table).delete().neq("id", ZERO_UUID);
  if (del.error) throw new Error(del.error.message);
  if (rows.length === 0) return;
  const ins = await db.from(table).insert(rows as never);
  if (ins.error) throw new Error(ins.error.message);
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  if (!supabaseConfigured) {
    return NextResponse.json({ ok: false, error: "DB_NOT_CONFIGURED" }, { status: 503 });
  }
  const { type } = await params;
  if (!isContentType(type)) {
    return NextResponse.json({ ok: false, error: "NOT_FOUND" }, { status: 404 });
  }
  try {
    const items = await readItems(type);
    return NextResponse.json({ ok: true, items });
  } catch {
    return NextResponse.json({ ok: false, error: "SERVER" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  if (!supabaseConfigured) {
    return NextResponse.json({ ok: false, error: "DB_NOT_CONFIGURED" }, { status: 503 });
  }
  const { type } = await params;
  if (!isContentType(type)) {
    return NextResponse.json({ ok: false, error: "NOT_FOUND" }, { status: 404 });
  }
  try {
    const body = await req.json();
    const parsed = schemas[type].safeParse(body.items);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "VALIDATION", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }
    await writeItems(type, parsed.data);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "SERVER" }, { status: 500 });
  }
}
