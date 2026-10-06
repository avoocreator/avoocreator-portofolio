import type { L } from "@/i18n/types";

export type ProjectStatusKey = "selesai" | "berjalan" | "riset" | "konsep";

export const projectStatusLabels: Record<ProjectStatusKey, L> = {
  selesai: { id: "Selesai", en: "Completed" },
  berjalan: { id: "Berjalan", en: "Ongoing" },
  riset: { id: "Riset", en: "Research" },
  konsep: { id: "Konsep", en: "Concept" },
};

export interface Project {
  number: string
  title: L
  category: L
  description: L
  tags: string[]
  status: ProjectStatusKey
  year?: string
  link?: string
}

export const projects: Project[] = [
  {
    number: "01",
    title: { id: "SMAN 1 Kraksaan — Ekosistem Digital", en: "SMAN 1 Kraksaan — Digital Ecosystem" },
    category: { id: "Pengembangan Web", en: "Web Development" },
    description: {
      id: "Redesign total website sekolah untuk kompetisi JHIC 2.0: dari profil statis menjadi ekosistem digital dengan dashboard admin, analitik, dan asisten AI terintegrasi.",
      en: "A complete school website redesign for the JHIC 2.0 competition: turning a static profile site into a digital ecosystem with an admin dashboard, analytics, and an integrated AI assistant.",
    },
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "Recharts"],
    status: "berjalan",
    year: "2026",
    link: "https://github.com/avoocreator/sman1kraksaan-web",
  },
  {
    number: "02",
    title: { id: "Matura Robo Tech", en: "Matura Robo Tech" },
    category: { id: "Teknologi Kreatif", en: "Creative Technology" },
    description: {
      id: "Kontribusi di divisi R&D — eksplorasi robotika dan sistem interaktif, dari prototipe elektronik sampai dokumentasi teknis yang rapi.",
      en: "Contributing in the R&D division — exploring robotics and interactive systems, from electronic prototypes to clean technical documentation.",
    },
    tags: ["IoT", "Arduino", "R&D"],
    status: "berjalan",
    year: "2026",
  },
  {
    number: "03",
    title: { id: "Avoo Creator Portfolio", en: "Avoo Creator Portfolio" },
    category: { id: "Pengembangan Web", en: "Web Development" },
    description: {
      id: "Website yang sedang kamu lihat ini — dibangun dengan Next.js, Tailwind, dan maskot orisinal sebagai identitas visual utama, lengkap dengan CMS & form pemesanan.",
      en: "The site you're looking at — built with Next.js, Tailwind, and an original mascot as the main visual identity, complete with a CMS & order form.",
    },
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    status: "selesai",
    year: "2026",
  },
  {
    number: "04",
    title: { id: "Verba — Bank Kosakata Inggris", en: "Verba — English Vocabulary Bank" },
    category: { id: "Pengembangan Web", en: "Web Development" },
    description: {
      id: "Bank kosakata Bahasa Inggris interaktif untuk latihan mandiri — dirancang agar terasa ringan dipakai sehari-hari, dengan sistem pengulangan cerdas dan progres yang terlacak.",
      en: "An interactive English vocabulary bank for self-practice — designed to feel light for daily use, with smart repetition and trackable progress.",
    },
    tags: ["JavaScript", "UI/UX"],
    status: "konsep",
    year: "2026",
  },
  {
    number: "05",
    title: { id: "Aplikasi Web Manajemen Kas", en: "Cash Management Web App" },
    category: { id: "Pengembangan Web", en: "Web Development" },
    description: {
      id: "Aplikasi pencatatan dan pemantauan arus kas sederhana untuk kebutuhan organisasi kecil — laporan otomatis, kategori fleksibel, dan ringkasan yang mudah dibaca.",
      en: "A simple cash-flow recording and monitoring app for small organizations — automatic reports, flexible categories, and easy-to-read summaries.",
    },
    tags: ["React", "TypeScript"],
    status: "konsep",
    year: "2026",
  },
  {
    number: "06",
    title: { id: "Proyek Monitoring IoT", en: "IoT Monitoring Project" },
    category: { id: "Teknologi Kreatif", en: "Creative Technology" },
    description: {
      id: "Sistem pemantauan berbasis sensor dengan dashboard real-time — eksperimen menyambungkan perangkat keras ke web, dari wiring sampai visualisasi data.",
      en: "A sensor-based monitoring system with a real-time dashboard — an experiment in connecting hardware to the web, from wiring to data visualization.",
    },
    tags: ["IoT", "Arduino", "Data"],
    status: "riset",
    year: "2026",
  },
];

export const projectCategories = (locale: "id" | "en") =>
  Array.from(new Set(projects.map((p) => p.category[locale])));
