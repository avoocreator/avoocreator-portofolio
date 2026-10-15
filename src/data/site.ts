import type { L } from "@/i18n/types";

export interface SocialLink {
  label: string;
  href: string;
  handle?: string;
}

/**
 * PENGATURAN SITUS — sumber utama saat Strapi belum tersambung.
 * Diganti lewat Strapi (single type "site-setting") atau edit file ini.
 */
export const site = {
  brand: "Avoo Creator",
  owner: "Avian",
  tagline: {
    id: "Developer & graphic designer yang membangun hal yang jalan — bukan sekadar tampil bagus.",
    en: "Developer & graphic designer building things that run — not just look good.",
  } as L,
  /** PLACEHOLDER — ganti dengan nomor WhatsApp asli (format internasional tanpa +) */
  whatsapp: "6281234567890",
  /** PLACEHOLDER — ganti dengan email asli */
  email: "hello@avoocreator.dev",
  location: { id: "Jawa Timur, Indonesia", en: "East Java, Indonesia" } as L,
  availability: {
    id: "Terbuka untuk proyek baru",
    en: "Open for new projects",
  } as L,
  socials: [
    { label: "GitHub", href: "https://github.com/avoocreator", handle: "@avoocreator" },
    // PLACEHOLDER — ganti dengan link asli
    { label: "Instagram", href: "https://instagram.com/avoocreator", handle: "@avoocreator" },
    { label: "LinkedIn", href: "https://linkedin.com/in/avoocreator", handle: "Avoo Creator" },
  ] as SocialLink[],
  stats: [
    { value: 6, suffix: "+", label: { id: "Proyek dikerjakan", en: "Projects worked on" } as L },
    { value: 4, suffix: "", label: { id: "Bidang keahlian", en: "Expertise areas" } as L },
    { value: 15, suffix: "+", label: { id: "Perangkat dikuasai", en: "Tools mastered" } as L },
    { value: 100, suffix: "%", label: { id: "Proyek selesai serah terima", en: "Projects delivered" } as L },
  ],
};
