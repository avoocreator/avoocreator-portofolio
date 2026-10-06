import { projects, type Project } from "./projects";
import type { L } from "@/i18n/types";

export interface ParticipationItem {
  id: string
  title: L
  role?: L
  description: L
  link?: string
  /** featured = ditampilkan sebagai sorotan di halaman daftar */
  featured?: boolean
}

export interface ParticipationCategory {
  id: string
  number: string
  title: L
  description: L
  items: ParticipationItem[]
}

export const participationCategories: ParticipationCategory[] = [
  {
    id: "organisasi",
    number: "01",
    title: { id: "Organisasi", en: "Organizations" },
    description: {
      id: "Komunitas dan organisasi sekolah yang diikuti.",
      en: "School communities and organizations I take part in.",
    },
    items: [
      {
        id: "mrt",
        title: { id: "Matura Robo Tech", en: "Matura Robo Tech" },
        role: { id: "Anggota Divisi R&D", en: "R&D Division Member" },
        description: {
          id: "Riset dan pengembangan di bidang robotika serta sistem interaktif — merancang, merakit, dan mendokumentasikan.",
          en: "Research and development in robotics and interactive systems — designing, assembling, and documenting.",
        },
        featured: true,
      },
      {
        id: "ecc",
        title: { id: "ECC (English Conversation Club)", en: "ECC (English Conversation Club)" },
        role: { id: "Anggota", en: "Member" },
        description: {
          id: "Komunitas latihan percakapan Bahasa Inggris — melatih keberanian bicara dan kosa kata aktif.",
          en: "An English conversation practice community — training speaking confidence and active vocabulary.",
        },
        featured: true,
      },
      {
        id: "nihongo",
        title: { id: "Nihongo Club", en: "Nihongo Club" },
        role: { id: "Anggota", en: "Member" },
        description: {
          id: "Komunitas belajar dan latihan Bahasa Jepang — dari huruf hiragana sampai percakapan sederhana.",
          en: "A Japanese language learning community — from hiragana letters to simple conversations.",
        },
        featured: true,
      },
    ],
  },
  {
    id: "kompetisi",
    number: "02",
    title: { id: "Kompetisi", en: "Competitions" },
    description: { id: "Lomba dan kompetisi yang pernah diikuti.", en: "Contests and competitions I've joined." },
    items: [
      {
        id: "jhic",
        title: { id: "JHIC 2.0 2026", en: "JHIC 2.0 2026" },
        role: {
          id: "Web Development — Tim Utusan Afumado",
          en: "Web Development — Afumado Team",
        },
        description: {
          id: "Kompetisi pengembangan website untuk SMAN 1 Kraksaan, babak Kick Off & Preliminary — bertanggung jawab di sisi frontend.",
          en: "A website development competition for SMAN 1 Kraksaan, Kick Off & Preliminary rounds — responsible for the frontend.",
        },
        link: "https://github.com/avoocreator/sman1kraksaan-web",
        featured: true,
      },
    ],
  },
  {
    id: "proyek",
    number: "03",
    title: { id: "Proyek", en: "Projects" },
    description: {
      id: "Proyek pribadi maupun tim, dari yang sudah jadi sampai yang masih konsep.",
      en: "Personal and team projects, from shipped to still-in-concept.",
    },
    items: projects.map((p: Project, i: number) => ({
      id: `proj-${p.number}`,
      title: p.title,
      role: p.category,
      description: p.description,
      link: p.link,
      featured: i < 3,
    })),
  },
];

export function getParticipationCategory(id: string | undefined) {
  return participationCategories.find((c) => c.id === id);
}
