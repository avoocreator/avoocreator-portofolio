import { projects } from "./projects";
import { services } from "./services";
import { expertiseGroups } from "./expertise";
import { experienceItems } from "./experience";
import { faqItems } from "./faq";
import { participationCategories, type ParticipationCategory } from "./participation";
import type { L } from "@/i18n/types";

/**
 * Agregat semua data seed bawaan. Dipakai oleh lapisan seed database
 * dan sebagai fallback saat tabel masih kosong — situs tidak pernah blank.
 */
export {
  projects,
  services,
  expertiseGroups,
  experienceItems,
  faqItems,
  participationCategories,
};

/**
 * Partisipasi versi seed (snapshot): kategori "Proyek" digenerate dari data
 * proyek bawaan saat ini. Setelah tersimpan di database, datanya berdiri
 * sendiri dan bisa diedit bebas lewat /admin.
 */
export function participationSeedFromProjects(): ParticipationCategory[] {
  return participationCategories.map((c) =>
    c.id === "proyek"
      ? {
          ...c,
          items: projects.map((p, i) => ({
            id: `proj-${p.number}`,
            title: p.title,
            role: p.category,
            description: p.description,
            link: p.link,
            featured: i < 3,
          })),
        }
      : c
  );
}

export type { L };
