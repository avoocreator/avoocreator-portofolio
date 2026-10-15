import type { L } from "@/i18n/types";

/** Konten halaman Tentang */
export const aboutContent = {
  /** Paragraf pembuka halaman tentang */
  intro: [
    {
      id: "Halo! Saya Avian — siswa dari Jawa Timur yang berkecimpung di dunia web development, desain grafis, dan teknologi kreatif dengan nama panggung Avoo Creator. Semua dimulai dari rasa penasaran: kenapa sebuah desain yang bagus di layar bisa berubah jadi sesuatu yang hidup ketika diberi kode.",
      en: "Hi! I'm Avian — a student from East Java working in web development, graphic design, and creative technology under the name Avoo Creator. It all started with curiosity: why does a design that looks good on screen become something alive when you give it code.",
    },
    {
      id: "Sejak itu, saya belajar dengan cara membangun. Bukan nunggu kelas atau kursus, tapi langsung bikin: redesign website sekolah untuk kompetisi, eksperimen robotika di divisi R&D, sampai mengerjakan proyek desain untuk orang lain. Cara ini bikin setiap skill langsung teruji di dunia nyata.",
      en: "Since then, I've been learning by building. Not waiting for classes or courses — just making things: redesigning a school website for a competition, experimenting with robotics in the R&D division, and doing design work for other people. This way, every skill gets tested in the real world immediately.",
    },
    {
      id: "Prinsip saya sederhana: bangun yang jalan, bukan yang cuma bagus di mockup. Karena itu setiap proyek saya selalu diawali pertanyaan — ini dibuat untuk siapa, menyelesaikan masalah apa, dan bagaimana cara mengukur berhasilnya.",
      en: "My principle is simple: build things that run, not things that just look good in mockups. That's why every project starts with questions — who is this for, what problem does it solve, and how do we measure success.",
    },
  ] as L[],

  /** Nilai kerja */
  values: [
    {
      icon: "check-circle",
      title: { id: "Jalan dulu, baru indah", en: "Working first, pretty second" },
      description: {
        id: "Fungsionalitas selalu di depan. Desain yang cantik tapi tidak bisa dipakai itu tugas yang belum selesai.",
        en: "Functionality always comes first. A beautiful design that can't be used is an unfinished job.",
      },
    },
    {
      icon: "target",
      title: { id: "Detail itu wajib", en: "Details are mandatory" },
      description: {
        id: "Spacing, hierarki, konsistensi — hal kecil yang menentukan kesan profesional. Saya nggak berhemat di sini.",
        en: "Spacing, hierarchy, consistency — small things that define professionalism. I don't cut corners here.",
      },
    },
    {
      icon: "lightbulb",
      title: { id: "Belajar dengan membangun", en: "Learning by building" },
      description: {
        id: "Cara tercepat menguasai sesuatu adalah memakainya di proyek nyata. Setiap proyek selalu ada satu hal baru yang dicoba.",
        en: "The fastest way to master something is to use it in a real project. Every project gets one new thing tried.",
      },
    },
    {
      icon: "message",
      title: { id: "Komunikasi yang jelas", en: "Clear communication" },
      description: {
        id: "Progres dilaporkan, kendala dijelaskan, opsi diberikan. Klien tidak perlu menebak apa yang sedang dikerjakan.",
        en: "Progress reported, obstacles explained, options given. Clients never have to guess what's being worked on.",
      },
    },
  ],

  /** Fakta singkat */
  facts: [
    {
      label: { id: "Fokus utama", en: "Main focus" },
      value: { id: "Web Development & Desain", en: "Web Development & Design" },
    },
    {
      label: { id: "Bergabung di", en: "Joined in" },
      value: { id: "Matura Robo Tech (R&D)", en: "Matura Robo Tech (R&D)" },
    },
    {
      label: { id: "Sedang belajar", en: "Currently learning" },
      value: { id: "Bahasa Jepang & IoT", en: "Japanese & IoT" },
    },
    {
      label: { id: "Alat favorit", en: "Favorite tools" },
      value: { id: "Next.js, Figma, Photoshop", en: "Next.js, Figma, Photoshop" },
    },
    {
      label: { id: "Jam paling produktif", en: "Most productive hours" },
      value: { id: "Malam hari, setelah 21.00", en: "Late night, after 9 PM" },
    },
    {
      label: { id: "Ciri khas", en: "Trademark" },
      value: { id: "Maskot oranye di mana-mana", en: "An orange mascot everywhere" },
    },
  ],

  quote: {
    text: {
      id: "Kode bisa diperbaiki, desain bisa diiterasi — tapi kemauan untuk menyelesaikan hal dengan benar harus ada dari awal.",
      en: "Code can be fixed, designs can be iterated — but the will to finish things properly has to exist from the start.",
    },
    author: "Avian — Avoo Creator",
  },
};
