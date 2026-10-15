/**
 * Lapisan konten: baca dari Supabase dulu → kalau tabel masih
 * kosong / bermasalah, pakai data bawaan dari src/data.
 * Semua getter aman dipanggil di server component; situs TIDAK PERNAH kosong.
 */
import {
  projects as seedProjects,
  projectStatusLabels,
  type Project,
  type ProjectStatusKey,
} from "@/data/projects";
import { services as seedServices, type Service } from "@/data/services";
import { expertiseGroups as seedExpertise, type ExpertiseGroup } from "@/data/expertise";
import { experienceItems as seedExperience, type ExperienceItem } from "@/data/experience";
import {
  type ParticipationCategory,
  type ParticipationItem,
} from "@/data/participation";
import { participationSeedFromProjects } from "@/data/all-seeds";
import { faqItems as seedFaq, type FaqItem } from "@/data/faq";
import { site as seedSite } from "@/data/site";
import { aboutContent as seedAbout } from "@/data/about";
import { approachSteps as seedApproach, type ApproachStep } from "@/data/approach";
import { db } from "@/lib/db";
import { normalizeToolRefs } from "@/lib/tools";
import type { L } from "@/i18n/types";

const PROJECT_STATUS_KEYS = Object.keys(projectStatusLabels) as ProjectStatusKey[];

/* ---------- util ---------- */
function parse<T>(json: unknown, fallback: T): T {
  if (json == null) return fallback;
  return json as T;
}

/* ================= PROYEK ================= */

export async function getProjects(): Promise<Project[]> {
  try {
    const { data: rows, error } = await db
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("number", { ascending: true });
    if (error) throw new Error(error.message);
    if (!rows?.length) return seedProjects;
    return rows.map((r) => ({
      number: r.number,
      title: parse<L>(r.title, seedProjects[0].title),
      category: parse<L>(r.category, seedProjects[0].category),
      description: parse<L>(r.description, seedProjects[0].description),
      tags: parse<string[]>(r.tags, []),
      status: (PROJECT_STATUS_KEYS.includes(r.status as ProjectStatusKey)
        ? r.status
        : "konsep") as ProjectStatusKey,
      year: r.year ?? undefined,
      link: r.link ?? undefined,
    }));
  } catch {
    return seedProjects;
  }
}

/* ================= LAYANAN ================= */

export async function getServices(): Promise<Service[]> {
  try {
    const { data: rows, error } = await db
      .from("services")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw new Error(error.message);
    if (!rows?.length) return seedServices;
    return rows.map((r, i) => {
      const seed = seedServices[i % seedServices.length];
      return {
        number: r.number,
        slug: r.slug,
        title: parse<L>(r.title, seed.title),
        description: parse<L>(r.description, seed.description),
        outputs: parse<L[]>(r.outputs, seed.outputs),
        icon: r.icon || seed.icon,
        duration: r.duration ? parse<L>(r.duration, seed.duration!) : undefined,
      };
    });
  } catch {
    return seedServices;
  }
}

/* ================= KEAHLIAN ================= */

export async function getExpertise(): Promise<ExpertiseGroup[]> {
  try {
    const { data: rows, error } = await db
      .from("expertise_groups")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw new Error(error.message);
    if (!rows?.length) return seedExpertise;
    return rows.map((r, i) => {
      const seed = seedExpertise[i % seedExpertise.length];
      return {
        id: r.group_id,
        title: parse<L>(r.title, seed.title),
        description: parse<L>(r.description, seed.description),
        longDescription: parse<L>(r.long_description, seed.longDescription),
        skills: parse<{ name: string; level: number }[]>(r.skills, seed.skills),
        tools: normalizeToolRefs(r.tools, seed.tools),
      };
    });
  } catch {
    return seedExpertise;
  }
}

/* ================= PENGALAMAN ================= */

export async function getExperience(): Promise<ExperienceItem[]> {
  try {
    const { data: rows, error } = await db
      .from("experience_items")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw new Error(error.message);
    if (!rows?.length) return seedExperience;
    return rows.map((r, i) => {
      const seed = seedExperience[i % seedExperience.length];
      return {
        year: r.year,
        title: parse<L>(r.title, seed.title),
        role: parse<L>(r.role, seed.role),
        description: parse<L>(r.description, seed.description),
        category: parse<{ id: string; en: string }>(r.category, seed.category),
        highlight: r.highlight || undefined,
      };
    });
  } catch {
    return seedExperience;
  }
}

/* ================= PARTISIPASI ================= */

export async function getParticipation(): Promise<ParticipationCategory[]> {
  try {
    const { data: rows, error } = await db
      .from("participation_categories")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw new Error(error.message);
    if (!rows?.length) return participationSeedFromProjects();
    const seedCats = participationSeedFromProjects();
    return rows.map((r, i) => {
      const seed = seedCats[i % seedCats.length] ?? seedCats[0];
      const items = parse<ParticipationItem[]>(r.items, seed.items);
      return {
        id: r.cat_id,
        number: r.number,
        title: parse<L>(r.title, seed.title),
        description: parse<L>(r.description, seed.description),
        items: items.map((it, j) => ({
          ...it,
          id: it.id ?? `item-${j}`,
        })),
      };
    });
  } catch {
    return participationSeedFromProjects();
  }
}

/* ================= FAQ ================= */

export async function getFaq(): Promise<FaqItem[]> {
  try {
    const { data: rows, error } = await db
      .from("faq_items")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw new Error(error.message);
    if (!rows?.length) return seedFaq;
    return rows.map((r, i) => ({
      q: parse<L>(r.q, seedFaq[i % seedFaq.length].q),
      a: parse<L>(r.a, seedFaq[i % seedFaq.length].a),
    }));
  } catch {
    return seedFaq;
  }
}

/* ================= TENTANG ================= */

export interface AboutContentData {
  photoUrl: string;
  photoAlt: L;
  intro: L[];
  values: { icon: string; title: L; description: L }[];
  facts: { label: L; value: L }[];
  quote: { text: L; author: string };
}

export async function getAbout(): Promise<AboutContentData> {
  const fallback: AboutContentData = {
    photoUrl: "",
    photoAlt: { id: "", en: "" },
    intro: seedAbout.intro,
    values: seedAbout.values,
    facts: seedAbout.facts,
    quote: seedAbout.quote,
  };
  try {
    const { data: row, error } = await db
      .from("about_content")
      .select("*")
      .eq("id", "about")
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) return fallback;
    return {
      photoUrl: row.photo_url || "",
      photoAlt: parse<L>(row.photo_alt, fallback.photoAlt),
      intro: parse<L[]>(row.intro, fallback.intro),
      values: parse(row.values_json, fallback.values),
      facts: parse(row.facts, fallback.facts),
      quote: {
        text: parse<L>(row.quote_text, fallback.quote.text),
        author: row.quote_author || fallback.quote.author,
      },
    };
  } catch {
    return fallback;
  }
}

/* ================= LANGKAH KERJA ================= */

export async function getApproach(): Promise<ApproachStep[]> {
  try {
    const { data: row, error } = await db
      .from("settings")
      .select("value")
      .eq("key", "approach")
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row?.value) return seedApproach;
    const steps = parse<ApproachStep[]>(row.value, seedApproach);
    return steps.length ? steps : seedApproach;
  } catch {
    return seedApproach;
  }
}

/* ================= PENGATURAN SITUS ================= */

export interface SiteSettings {
  brand: string;
  owner: string;
  whatsapp: string;
  email: string;
  tagline: L;
  location: L;
  availability: L;
  socials: { label: string; href: string; handle?: string }[];
  stats: { value: number; suffix: string; label: L }[];
  /** Peran di hero beranda (string biasa) */
  roles: string[];
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const fallback: SiteSettings = {
    brand: seedSite.brand,
    owner: seedSite.owner,
    whatsapp: seedSite.whatsapp,
    email: seedSite.email,
    tagline: seedSite.tagline,
    location: seedSite.location,
    availability: seedSite.availability,
    socials: seedSite.socials,
    stats: seedSite.stats,
    roles: ["Web Developer", "Graphic Designer", "Creative Technologist", "UI/UX Enthusiast"],
  };
  try {
    const { data: row, error } = await db
      .from("settings")
      .select("value")
      .eq("key", "site")
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row?.value) return fallback;
    const v = parse<Partial<SiteSettings>>(row.value, {});
    return {
      brand: v.brand || fallback.brand,
      owner: v.owner || fallback.owner,
      whatsapp: v.whatsapp || fallback.whatsapp,
      email: v.email || fallback.email,
      tagline: v.tagline ?? fallback.tagline,
      location: v.location ?? fallback.location,
      availability: v.availability ?? fallback.availability,
      socials: v.socials?.length ? v.socials : fallback.socials,
      stats: v.stats?.length ? v.stats : fallback.stats,
      roles: v.roles?.length ? v.roles : fallback.roles,
    };
  } catch {
    return fallback;
  }
}
