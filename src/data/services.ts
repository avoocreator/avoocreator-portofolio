import type { L } from "@/i18n/types";

export interface Service {
  number: string
  slug: string
  title: L
  description: L
  outputs: L[]
  icon: string // lucide icon key, dipetakan di komponen
  duration?: L
}

export const services: Service[] = [
  {
    number: "01",
    slug: "website-development",
    title: { id: "Pengembangan Website", en: "Website Development" },
    description: {
      id: "Bangun website dari nol — landing page, portfolio, atau sistem sederhana yang siap dipakai dan mudah dikembangkan.",
      en: "Build a website from scratch — landing pages, portfolios, or simple systems that are ready to use and easy to extend.",
    },
    outputs: [
      { id: "Frontend responsif semua perangkat", en: "Responsive frontend on all devices" },
      { id: "Struktur kode rapi & terdokumentasi", en: "Clean, documented code structure" },
      { id: "Siap dikembangkan ke backend", en: "Ready to extend with a backend" },
      { id: "Deploy ke hosting pilihanmu", en: "Deployed to your preferred hosting" },
    ],
    icon: "code",
    duration: { id: "1–4 minggu", en: "1–4 weeks" },
  },
  {
    number: "02",
    slug: "ui-ux-design",
    title: { id: "Desain UI/UX", en: "UI/UX Design" },
    description: {
      id: "Rancang alur dan tampilan yang masuk akal buat pengguna, bukan cuma cantik di mockup.",
      en: "Design flows and looks that make sense for users — not just pretty mockups.",
    },
    outputs: [
      { id: "Wireframe & prototype interaktif", en: "Wireframes & interactive prototype" },
      { id: "Design system dasar", en: "Basic design system" },
      { id: "Handoff siap untuk development", en: "Developer-ready handoff" },
      { id: "Rekomendasi perbaikan alur", en: "Flow improvement recommendations" },
    ],
    icon: "pen",
    duration: { id: "3–10 hari", en: "3–10 days" },
  },
  {
    number: "03",
    slug: "graphic-design",
    title: { id: "Desain Grafis", en: "Graphic Design" },
    description: {
      id: "Aset visual untuk kebutuhan digital — dari sosial media sampai materi presentasi, konsisten dengan identitasmu.",
      en: "Visual assets for digital needs — from social media to presentation materials, consistent with your identity.",
    },
    outputs: [
      { id: "Visual sosial media (feed & story)", en: "Social media visuals (feed & story)" },
      { id: "Poster & materi cetak", en: "Posters & print materials" },
      { id: "Ikon & ilustrasi sederhana", en: "Icons & simple illustrations" },
      { id: "File sumber yang bisa diedit", en: "Editable source files" },
    ],
    icon: "palette",
    duration: { id: "1–7 hari", en: "1–7 days" },
  },
  {
    number: "04",
    slug: "presentation-design",
    title: { id: "Desain Presentasi", en: "Presentation Design" },
    description: {
      id: "Slide yang enak dilihat dan enak dipresentasikan — untuk lomba, riset, atau pitching bisnis.",
      en: "Slides that look good and present well — for competitions, research, or business pitching.",
    },
    outputs: [
      { id: "Deck presentasi siap pakai", en: "Ready-to-use slide deck" },
      { id: "Struktur cerita yang jelas", en: "Clear narrative structure" },
      { id: "Template siap edit", en: "Editable templates" },
      { id: "Tips penyampaian singkat", en: "Quick delivery tips" },
    ],
    icon: "presentation",
    duration: { id: "2–6 hari", en: "2–6 days" },
  },
  {
    number: "05",
    slug: "branding-support",
    title: { id: "Dukungan Branding", en: "Branding Support" },
    description: {
      id: "Bantu bentuk identitas visual awal — logo sederhana, palet warna, dan panduan dasar penggunaannya.",
      en: "Shape your initial visual identity — a simple logo, color palette, and basic usage guidelines.",
    },
    outputs: [
      { id: "Logo & wordmark", en: "Logo & wordmark" },
      { id: "Palet warna & tipografi", en: "Color palette & typography" },
      { id: "Panduan penggunaan dasar", en: "Basic usage guidelines" },
      { id: "File siap untuk digital & cetak", en: "Files ready for digital & print" },
    ],
    icon: "sparkles",
    duration: { id: "5–10 hari", en: "5–10 days" },
  },
  {
    number: "06",
    slug: "interactive-prototype",
    title: { id: "Prototipe Interaktif", en: "Interactive Prototype" },
    description: {
      id: "Prototipe interaktif untuk menguji ide sebelum dibangun penuh — web atau perangkat IoT sederhana.",
      en: "Interactive prototypes to test ideas before full builds — web or simple IoT devices.",
    },
    outputs: [
      { id: "Prototype klik-jalan", en: "Clickable working prototype" },
      { id: "Demo perangkat sederhana", en: "Simple device demo" },
      { id: "Dokumentasi cara pakai", en: "Usage documentation" },
      { id: "Rekomendasi langkah lanjut", en: "Next-step recommendations" },
    ],
    icon: "cpu",
    duration: { id: "1–3 minggu", en: "1–3 weeks" },
  },
];
