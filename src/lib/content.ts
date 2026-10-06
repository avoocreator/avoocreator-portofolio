/**
 * Lapisan konten: coba Strapi dulu → kalau tidak tersedia pakai data bawaan.
 * Semua getter aman dipanggil di server component; situs TIDAK PERNAH kosong.
 */
import {
  strapiCollectionBothLocales,
  strapiFetch,
  strapiConfigured,
  fieldOf,
  biField,
  jsonField,
} from "./strapi";
import { projects as seedProjects, projectStatusLabels, type Project, type ProjectStatusKey } from "@/data/projects";
import { services as seedServices, type Service } from "@/data/services";
import { expertiseGroups as seedExpertise, type ExpertiseGroup } from "@/data/expertise";
import { experienceItems as seedExperience, type ExperienceItem } from "@/data/experience";
import { participationCategories as seedParticipation, type ParticipationCategory } from "@/data/participation";
import { faqItems as seedFaq, type FaqItem } from "@/data/faq";
import { site as seedSite } from "@/data/site";

const PROJECT_STATUS_KEYS = Object.keys(projectStatusLabels) as ProjectStatusKey[];

export async function getProjects(): Promise<Project[]> {
  if (!strapiConfigured()) return seedProjects;
  try {
    const rows = await strapiCollectionBothLocales("projects");
    if (!rows.length) return seedProjects;
    return rows.map((row, i) => {
      const fId = fieldOf(row.id);
      const fEn = fieldOf(row.en);
      const statusRaw = String(fId.status ?? "konsep").toLowerCase() as ProjectStatusKey;
      return {
        number: String(fId.number ?? String(i + 1).padStart(2, "0")),
        title: biField(fId, fEn, "title") ?? seedProjects[0].title,
        category: biField(fId, fEn, "category") ?? seedProjects[0].category,
        description: biField(fId, fEn, "description") ?? seedProjects[0].description,
        tags: jsonField<string[]>(fId.tags, []),
        status: PROJECT_STATUS_KEYS.includes(statusRaw) ? statusRaw : "konsep",
        year: fId.year ? String(fId.year) : undefined,
        link: fId.link ? String(fId.link) : undefined,
      };
    });
  } catch {
    return seedProjects;
  }
}

export async function getServices(): Promise<Service[]> {
  if (!strapiConfigured()) return seedServices;
  try {
    const rows = await strapiCollectionBothLocales("services");
    if (!rows.length) return seedServices;
    return rows.map((row, i) => {
      const fId = fieldOf(row.id);
      const fEn = fieldOf(row.en);
      const seed = seedServices[i % seedServices.length];
      return {
        number: String(fId.number ?? String(i + 1).padStart(2, "0")),
        slug: String(fId.slug ?? seed.slug),
        title: biField(fId, fEn, "title") ?? seed.title,
        description: biField(fId, fEn, "description") ?? seed.description,
        outputs: jsonField<{ id: string; en: string }[]>(fId.outputs, seed.outputs),
        icon: String(fId.icon ?? seed.icon),
        duration: biField(fId, fEn, "duration") ?? seed.duration,
      };
    });
  } catch {
    return seedServices;
  }
}

export async function getExpertise(): Promise<ExpertiseGroup[]> {
  if (!strapiConfigured()) return seedExpertise;
  try {
    const rows = await strapiCollectionBothLocales("expertise-groups");
    if (!rows.length) return seedExpertise;
    return rows.map((row, i) => {
      const fId = fieldOf(row.id);
      const fEn = fieldOf(row.en);
      const seed = seedExpertise[i % seedExpertise.length];
      return {
        id: String(fId.group_id ?? fId.groupId ?? seed.id),
        title: biField(fId, fEn, "title") ?? seed.title,
        description: biField(fId, fEn, "description") ?? seed.description,
        longDescription: biField(fId, fEn, "long_description") ?? seed.longDescription,
        skills: jsonField(fId.skills, seed.skills),
        tools: jsonField<string[]>(fId.tools, seed.tools),
      };
    });
  } catch {
    return seedExpertise;
  }
}

export async function getExperience(): Promise<ExperienceItem[]> {
  if (!strapiConfigured()) return seedExperience;
  try {
    const rows = await strapiCollectionBothLocales("experience-items");
    if (!rows.length) return seedExperience;
    return rows.map((row, i) => {
      const fId = fieldOf(row.id);
      const fEn = fieldOf(row.en);
      const seed = seedExperience[i % seedExperience.length];
      return {
        year: String(fId.year ?? seed.year),
        title: biField(fId, fEn, "title") ?? seed.title,
        role: biField(fId, fEn, "role") ?? seed.role,
        description: biField(fId, fEn, "description") ?? seed.description,
        category: biField(fId, fEn, "category") ?? seed.category,
        highlight: Boolean(fId.highlight) || undefined,
      };
    });
  } catch {
    return seedExperience;
  }
}

export async function getParticipation(): Promise<ParticipationCategory[]> {
  if (!strapiConfigured()) return seedParticipation;
  try {
    const rows = await strapiCollectionBothLocales("participation-categories");
    if (!rows.length) return seedParticipation;
    return rows.map((row, i) => {
      const fId = fieldOf(row.id);
      const fEn = fieldOf(row.en);
      const seed = seedParticipation[i % seedParticipation.length];
      const seedItem = seed.items[0];
      return {
        id: String(fId.cat_id ?? seed.id),
        number: String(fId.number ?? seed.number),
        title: biField(fId, fEn, "title") ?? seed.title,
        description: biField(fId, fEn, "description") ?? seed.description,
        items: jsonField(fId.items, []).map((it: Record<string, unknown>, j: number) => ({
          id: String(it.id ?? `item-${j}`),
          title:
            typeof it.title_id === "object" && it.title_id
              ? (it.title_id as { id: string; en: string })
              : typeof it.title === "object" && it.title
                ? (it.title as { id: string; en: string })
                : seedItem.title,
          role:
            typeof it.role === "object" && it.role
              ? (it.role as { id: string; en: string })
              : undefined,
          description:
            typeof it.description === "object" && it.description
              ? (it.description as { id: string; en: string })
              : seedItem.description,
          link: it.link ? String(it.link) : undefined,
          featured: Boolean(it.featured) || undefined,
        })),
      };
    });
  } catch {
    return seedParticipation;
  }
}

export async function getFaq(): Promise<FaqItem[]> {
  if (!strapiConfigured()) return seedFaq;
  try {
    const rows = await strapiCollectionBothLocales("faqs");
    if (!rows.length) return seedFaq;
    return rows.map((row, i) => {
      const fId = fieldOf(row.id);
      const fEn = fieldOf(row.en);
      const seed = seedFaq[i % seedFaq.length];
      return {
        q: biField(fId, fEn, "question") ?? seed.q,
        a: biField(fId, fEn, "answer") ?? seed.a,
      };
    });
  } catch {
    return seedFaq;
  }
}

export interface SiteSettings {
  whatsapp: string;
  email: string;
  tagline: { id: string; en: string };
  location: { id: string; en: string };
  availability: { id: string; en: string };
  socials: { label: string; href: string; handle?: string }[];
  stats: { value: number; suffix: string; label: { id: string; en: string } }[];
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const fallback: SiteSettings = {
    whatsapp: seedSite.whatsapp,
    email: seedSite.email,
    tagline: seedSite.tagline,
    location: seedSite.location,
    availability: seedSite.availability,
    socials: seedSite.socials,
    stats: seedSite.stats,
  };
  if (!strapiConfigured()) return fallback;
  try {
    const [idJson, enJson] = await Promise.all([
      strapiFetch<{ data?: Record<string, Record<string, unknown>> | Record<string, Record<string, unknown>>[] }>(
        "/site-setting?locale=id",
        { timeoutMs: 5000 }
      ),
      strapiFetch<{ data?: Record<string, Record<string, unknown>> | Record<string, Record<string, unknown>>[] }>(
        "/site-setting?locale=en",
        { timeoutMs: 5000 }
      ),
    ]);
    const pick = (j: typeof idJson) =>
      Array.isArray(j?.data) ? fieldOf(j.data[0] as never) : fieldOf(j?.data as never);
    const fId = pick(idJson);
    const fEn = pick(enJson);
    if (!Object.keys(fId).length && !Object.keys(fEn).length) return fallback;
    return {
      whatsapp: String(fId.whatsapp ?? fallback.whatsapp),
      email: String(fId.email ?? fallback.email),
      tagline: biField(fId, fEn, "tagline") ?? fallback.tagline,
      location: biField(fId, fEn, "location") ?? fallback.location,
      availability: biField(fId, fEn, "availability") ?? fallback.availability,
      socials: jsonField(fId.socials, fallback.socials),
      stats: jsonField(fId.stats, fallback.stats),
    };
  } catch {
    return fallback;
  }
}
