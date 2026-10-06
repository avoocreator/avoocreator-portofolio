import type { L } from "@/i18n/types";

export interface ExperienceItem {
  year: string
  title: L
  role: L
  description: L
  category: { id: string; en: string }
  highlight?: boolean
}

export const experienceItems: ExperienceItem[] = [
  {
    year: "2026",
    title: { id: "JHIC 2.0 — Web Development", en: "JHIC 2.0 — Web Development" },
    role: {
      id: "Frontend Developer, Tim Utusan Afumado",
      en: "Frontend Developer, Afumado Team",
    },
    description: {
      id: "Mengembangkan website profil SMAN 1 Kraksaan untuk babak Kick Off & Preliminary — dari prototipe Figma sampai frontend Next.js yang benar-benar jalan, lengkap dengan dashboard admin dan analitik.",
      en: "Built the SMAN 1 Kraksaan profile website for the Kick Off & Preliminary rounds — from a Figma prototype to a fully working Next.js frontend, complete with an admin dashboard and analytics.",
    },
    category: { id: "Kompetisi", en: "Competition" },
    highlight: true,
  },
  {
    year: "2026",
    title: { id: "Matura Robo Tech", en: "Matura Robo Tech" },
    role: { id: "Anggota Divisi R&D", en: "R&D Division Member" },
    description: {
      id: "Ikut riset dan pengembangan di divisi R&D — dari eksperimen elektronik sampai dokumentasi teknis yang bisa diikuti anggota lain.",
      en: "Joining research & development in the R&D division — from electronics experiments to technical documentation other members can follow.",
    },
    category: { id: "Robotika", en: "Robotics" },
  },
  {
    year: "2025",
    title: { id: "Mulai Avoo Creator", en: "Started Avoo Creator" },
    role: {
      id: "Developer & Graphic Designer",
      en: "Developer & Graphic Designer",
    },
    description: {
      id: "Membangun brand personal sebagai ruang eksperimen desain dan development di luar tugas sekolah — tempat semua proyek nyeleneh dicoba.",
      en: "Built a personal brand as a design & development playground outside school assignments — where every odd idea gets tried.",
    },
    category: { id: "Eksperimen Personal", en: "Personal Experiments" },
  },
];
