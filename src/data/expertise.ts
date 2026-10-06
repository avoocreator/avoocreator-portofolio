import type { L } from "@/i18n/types";

/** Key tool merujuk ke src/data/tools.ts */
export interface Skill {
  name: string
  level: number // 0–100
}

export interface ExpertiseGroup {
  id: string
  title: L
  description: L
  longDescription: L
  skills: Skill[]
  tools: string[]
}

export const expertiseGroups: ExpertiseGroup[] = [
  {
    id: "development",
    title: { id: "Web Development", en: "Web Development" },
    description: {
      id: "Membangun antarmuka dan sistem yang jalan, bukan sekadar mockup.",
      en: "Building interfaces and systems that actually run — not just mockups.",
    },
    longDescription: {
      id: "Dari landing page sampai aplikasi web dengan dashboard — ditulis dengan struktur kode rapi, responsif di semua layar, dan siap dikembangkan lebih lanjut. Spesialis di ekosistem React/Next.js dengan animasi yang halus tapi tidak mengganggu.",
      en: "From landing pages to web apps with dashboards — written with clean code structure, responsive on every screen, and ready to grow further. Specialized in the React/Next.js ecosystem with smooth but non-intrusive animations.",
    },
    skills: [
      { name: "React & Next.js", level: 82 },
      { name: "TypeScript", level: 76 },
      { name: "Tailwind CSS", level: 88 },
      { name: "UI Implementation", level: 80 },
    ],
    tools: ["vscode", "github", "git", "nextdotjs", "react", "typescript", "tailwindcss", "vercel"],
  },
  {
    id: "design",
    title: { id: "Visual Design", en: "Visual Design" },
    description: {
      id: "Menerjemahkan ide jadi visual yang punya sistem, bukan tempelan.",
      en: "Turning ideas into visuals with a system — not sticker-on aesthetics.",
    },
    longDescription: {
      id: "Mulai dari graphic design untuk sosial media sampai identitas visual yang konsisten. Setiap desain dibangun di atas grid, tipografi, dan palet yang punya alasan — bukan asal cantik. Terbiasa bekerja dari brief kasar sampai final file yang siap pakai.",
      en: "From social media graphics to consistent visual identity. Every design is built on a grid, typography, and a palette with a reason behind it — not just decoration. Comfortable working from rough briefs to ready-to-use final files.",
    },
    skills: [
      { name: "Graphic Design", level: 90 },
      { name: "Layout & Typography", level: 84 },
      { name: "Branding Dasar", level: 74 },
      { name: "Social Media Kit", level: 86 },
    ],
    tools: ["figma", "photoshop", "illustrator", "canva", "framer"],
  },
  {
    id: "creative-tech",
    title: { id: "Teknologi Kreatif", en: "Creative Technology" },
    description: {
      id: "Menyambungkan kode dengan perangkat fisik dan interaksi nyata.",
      en: "Connecting code with physical devices and real-world interaction.",
    },
    longDescription: {
      id: "Eksperimen di persimpangan hardware dan software: prototipe IoT, sensor, dan instalasi interaktif. Di divisi R&D robotika, terbiasa menerjemahkan ide jadi rangkaian, kode, dan dokumentasi yang bisa diulang orang lain.",
      en: "Experiments at the intersection of hardware and software: IoT prototypes, sensors, and interactive installations. In the robotics R&D division, used to translating ideas into circuits, code, and documentation others can reproduce.",
    },
    skills: [
      { name: "Prototyping IoT", level: 70 },
      { name: "Arduino & Elektronik", level: 72 },
      { name: "Integrasi Sensor", level: 64 },
    ],
    tools: ["arduino", "raspberrypi", "espressif", "platformio"],
  },
  {
    id: "research",
    title: { id: "Riset & Problem Solving", en: "Research & Problem Solving" },
    description: {
      id: "Mikir terstruktur sebelum membangun, biar hasilnya nggak asal jalan.",
      en: "Thinking in structure before building, so results don't just accidentally work.",
    },
    longDescription: {
      id: "Setiap proyek dimulai dari pertanyaan yang benar: siapa penggunanya, apa masalahnya, apa ukuran berhasilnya. Terbiasa menyusun referensi, membandingkan pendekatan, dan mendokumentasikan keputusan supaya eksperimen tidak berhenti jadi eksperimen.",
      en: "Every project starts with the right questions: who is the user, what's the problem, what does success look like. Used to compiling references, comparing approaches, and documenting decisions so experiments don't stay experiments.",
    },
    skills: [
      { name: "Technical Writing", level: 78 },
      { name: "Analisis & Validasi Ide", level: 70 },
      { name: "Dokumentasi", level: 80 },
    ],
    tools: ["googlescholar", "notion", "googlesheets", "obsidian"],
  },
];
