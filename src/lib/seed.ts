import "server-only";
import { db, supabaseConfigured, ZERO_UUID } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import {
  projects as seedProjects,
  services as seedServices,
  expertiseGroups as seedExpertise,
  experienceItems as seedExperience,
  faqItems as seedFaq,
} from "@/data/all-seeds";
import { site as seedSite } from "@/data/site";
import { aboutContent as seedAbout } from "@/data/about";
import { approachSteps as seedApproach } from "@/data/approach";
import { participationSeedFromProjects } from "@/data/all-seeds";

const SEED_FLAG = "_seeded_v1";

export type SeedResult = { ok: true } | { ok: false; reason: "not-configured" | "db-error" };

/** Cek tabel kosong tanpa mengambil data (count via header). */
async function tableIsEmpty(table: string): Promise<boolean> {
  const { count, error } = await db
    .from(table)
    .select("id", { count: "exact", head: true });
  if (error) throw new Error(`${table}: ${error.message}`);
  return (count ?? 0) === 0;
}

/**
 * Isi database Supabase dengan data awal (dari src/data) jika belum pernah
 * di-seed. Idempotent: kalau flag sudah ada, tidak melakukan apa-apa.
 * Data admin default: username "admin", password "avoo2026".
 *
 * TIDAK PERNAH melempar error — selalu kembalikan status supaya halaman
 * admin bisa menampilkan panduan setup dengan rapi.
 */
export async function ensureSeeded(): Promise<SeedResult> {
  if (!supabaseConfigured) return { ok: false, reason: "not-configured" };

  try {
    const { data: flag, error: flagErr } = await db
      .from("settings")
      .select("value")
      .eq("key", SEED_FLAG)
      .maybeSingle();
    if (flagErr) throw new Error(flagErr.message);
    if (flag) return { ok: true };

    // --- Proyek ---
    if (await tableIsEmpty("projects")) {
      const { error } = await db.from("projects").insert(
        seedProjects.map((p, i) => ({
          number: p.number,
          title: p.title,
          category: p.category,
          description: p.description,
          tags: p.tags,
          status: p.status,
          year: p.year ?? null,
          link: p.link ?? null,
          sort_order: i,
        }))
      );
      if (error) throw new Error(`projects: ${error.message}`);
    }

    // --- Layanan ---
    if (await tableIsEmpty("services")) {
      const { error } = await db.from("services").insert(
        seedServices.map((s, i) => ({
          number: s.number,
          slug: s.slug,
          title: s.title,
          description: s.description,
          outputs: s.outputs,
          icon: s.icon,
          duration: s.duration ?? null,
          sort_order: i,
        }))
      );
      if (error) throw new Error(`services: ${error.message}`);
    }

    // --- Keahlian ---
    if (await tableIsEmpty("expertise_groups")) {
      const { error } = await db.from("expertise_groups").insert(
        seedExpertise.map((g, i) => ({
          group_id: g.id,
          title: g.title,
          description: g.description,
          long_description: g.longDescription,
          skills: g.skills,
          tools: g.tools,
          sort_order: i,
        }))
      );
      if (error) throw new Error(`expertise_groups: ${error.message}`);
    }

    // --- Pengalaman ---
    if (await tableIsEmpty("experience_items")) {
      const { error } = await db.from("experience_items").insert(
        seedExperience.map((e, i) => ({
          year: e.year,
          title: e.title,
          role: e.role,
          description: e.description,
          category: e.category,
          highlight: Boolean(e.highlight),
          sort_order: i,
        }))
      );
      if (error) throw new Error(`experience_items: ${error.message}`);
    }

    // --- Partisipasi ---
    if (await tableIsEmpty("participation_categories")) {
      const cats = participationSeedFromProjects();
      const { error } = await db.from("participation_categories").insert(
        cats.map((c, i) => ({
          cat_id: c.id,
          number: c.number,
          title: c.title,
          description: c.description,
          items: c.items,
          sort_order: i,
        }))
      );
      if (error) throw new Error(`participation_categories: ${error.message}`);
    }

    // --- FAQ ---
    if (await tableIsEmpty("faq_items")) {
      const { error } = await db.from("faq_items").insert(
        seedFaq.map((f, i) => ({
          q: f.q,
          a: f.a,
          sort_order: i,
        }))
      );
      if (error) throw new Error(`faq_items: ${error.message}`);
    }

    // --- Tentang ---
    const { data: aboutRow } = await db
      .from("about_content")
      .select("id")
      .eq("id", "about")
      .maybeSingle();
    if (!aboutRow) {
      const { error } = await db.from("about_content").insert({
        id: "about",
        intro: seedAbout.intro,
        values_json: seedAbout.values,
        facts: seedAbout.facts,
        quote_text: seedAbout.quote.text,
        quote_author: seedAbout.quote.author,
        photo_url: "",
        photo_alt: { id: "", en: "" },
      });
      if (error) throw new Error(`about_content: ${error.message}`);
    }

    // --- Pengaturan situs ---
    const SITE_KEY = "site";
    const { data: siteRow } = await db
      .from("settings")
      .select("key")
      .eq("key", SITE_KEY)
      .maybeSingle();
    if (!siteRow) {
      const { error } = await db.from("settings").insert({
        key: SITE_KEY,
        value: {
          brand: seedSite.brand,
          owner: seedSite.owner,
          tagline: seedSite.tagline,
          whatsapp: seedSite.whatsapp,
          email: seedSite.email,
          location: seedSite.location,
          availability: seedSite.availability,
          socials: seedSite.socials,
          stats: seedSite.stats,
          roles: [
            "Web Developer",
            "Graphic Designer",
            "Creative Technologist",
            "UI/UX Enthusiast",
          ],
        },
      });
      if (error) throw new Error(`settings(site): ${error.message}`);
    }

    // --- Langkah kerja (cara kerja) ---
    const APPROACH_KEY = "approach";
    const { data: approachRow } = await db
      .from("settings")
      .select("key")
      .eq("key", APPROACH_KEY)
      .maybeSingle();
    if (!approachRow) {
      const { error } = await db
        .from("settings")
        .insert({ key: APPROACH_KEY, value: seedApproach });
      if (error) throw new Error(`settings(approach): ${error.message}`);
    }

    // --- Akun admin default ---
    if (await tableIsEmpty("admin_users")) {
      const { error } = await db.from("admin_users").insert({
        username: "admin",
        password_hash: hashPassword("avoo2026"),
      });
      if (error) throw new Error(`admin_users: ${error.message}`);
    }

    // --- Tandai sudah di-seed ---
    await db.from("settings").upsert(
      { key: SEED_FLAG, value: new Date().toISOString() },
      { onConflict: "key" }
    );

    return { ok: true };
  } catch {
    return { ok: false, reason: "db-error" };
  }
}

/** Hapus semua row pada tabel koleksi (dipakai pola full-list-replace admin). */
export async function clearTable(table: string): Promise<void> {
  const { error } = await db.from(table).delete().neq("id", ZERO_UUID);
  if (error) throw new Error(`${table}: ${error.message}`);
}
