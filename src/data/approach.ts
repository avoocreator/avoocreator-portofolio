import type { L } from "@/i18n/types";

export interface ApproachStep {
  number: string
  title: L
  description: L
  duration?: L
}

/** Cara kerja — dipakai di halaman Keahlian & Layanan */
export const approachSteps: ApproachStep[] = [
  {
    number: "01",
    title: { id: "Dengar & Riset", en: "Listen & Research" },
    description: {
      id: "Mulai dari brief singkat via WhatsApp atau form. Kebutuhan dipetakan, referensi dikumpulkan, dan solusi paling masuk akal ditawarkan — bukan yang paling mahal.",
      en: "Start with a short brief via WhatsApp or the form. Needs are mapped, references collected, and the most sensible solution offered — not the most expensive one.",
    },
    duration: { id: "1–2 hari", en: "1–2 days" },
  },
  {
    number: "02",
    title: { id: "Rancang & Sepakati", en: "Design & Agree" },
    description: {
      id: "Rancangan awal (mockup, struktur, atau sketsa) dikirim untuk direview. Harga final dan tenggat disepakati hitam di atas putih sebelum eksekusi.",
      en: "An initial draft (mockup, structure, or sketch) is sent for review. Final pricing and deadline are agreed in writing before execution.",
    },
    duration: { id: "1–3 hari", en: "1–3 days" },
  },
  {
    number: "03",
    title: { id: "Bangun & Iterasi", en: "Build & Iterate" },
    description: {
      id: "Pengerjaan dengan progres yang dilaporkan berkala. Kamu bisa melihat hasil di tengah jalan dan memberi arahan sebelum jaraknya terlalu jauh.",
      en: "Work proceeds with progress reported periodically. You can see results mid-way and give direction before things drift too far.",
    },
    duration: { id: "Sesuai skala", en: "Depends on scale" },
  },
  {
    number: "04",
    title: { id: "Serah Terima Rapi", en: "Clean Handover" },
    description: {
      id: "Hasil akhir diserahkan lengkap dengan file sumber dan panduan singkat. Revisi minor setelah serah terima tetap dilayani — tidak kabur setelah transfer.",
      en: "Final results are delivered completely with source files and a short guide. Minor post-delivery revisions are still served — no vanishing after payment.",
    },
    duration: { id: "Support 2 minggu", en: "2-week support" },
  },
];
