import type { L } from "@/i18n/types";

/** Konten halaman Tentang */
export const aboutContent = {
  /** Paragraf pembuka halaman tentang */
  intro: [
    {
      id: "Halo, saya Avian, kreator di balik Avoo Creator. Saya tertarik pada web development, desain grafis, dan berbagai hal seputar teknologi. Awalnya, semua berangkat dari rasa penasaran tentang bagaimana desain dan kode bisa bekerja sama untuk mengubah sebuah ide menjadi sesuatu yang nyata.",
      en: "Hi, I'm Avian, the creator behind Avoo Creator. I'm fascinated by web development, graphic design, and all things tech. It all started with curiosity about how design and code can work together to turn an idea into something real.",
    },
    {
      id: "Saya paling suka belajar dengan mencoba langsung. Dari membangun website, mengerjakan proyek desain, hingga bereksperimen dengan robotika di divisi R&D, ada banyak hal yang saya pelajari dari setiap prosesnya. Terkadang berhasil, terkadang harus mengulang dari awal, tetapi justru di situ saya menemukan hal-hal baru.",
      en: "I learn best by getting my hands dirty. From building websites and taking on design projects to experimenting with robotics in the R&D division, there is so much I pick up from every process. Sometimes it works on the first try, sometimes I have to start over from scratch, but that's precisely where I discover new things.",
    },
    {
      id: "Bagi saya, membuat sesuatu bukan cuma soal bagaimana hasilnya terlihat, tetapi juga bagaimana cara kerjanya dan seberapa berguna hasilnya bagi orang lain. Saya ingin terus membuat karya yang bukan hanya menarik secara visual, tetapi juga punya tujuan dan benar-benar bisa digunakan.",
      en: "To me, creating isn't just about how things look, but how they work and how useful they are to others. I want to keep crafting work that isn't just visually engaging, but purposeful and truly usable.",
    },
  ] as L[],

  /** Nilai kerja */
  values: [
    {
      icon: "layers",
      title: { id: "Fungsionalitas di Prioritas Utama", en: "Functionality as Top Priority" },
      description: {
        id: "Setiap fitur harus memiliki tujuan dan berjalan sesuai kebutuhan. Alur interaksi, validasi input, penanganan error, dan konsistensi perilaku menjadi bagian dari implementasi.",
        en: "Every feature must serve a purpose and perform to expectations. Interaction flows, input validation, error handling, and behavioral consistency are core parts of the implementation.",
      },
    },
    {
      icon: "layout",
      title: { id: "Konsistensi UI dan UX", en: "UI & UX Consistency" },
      description: {
        id: "Tipografi, spacing, hierarki visual, dan komponen mengikuti sistem desain yang konsisten. Layout dirancang responsif agar tetap optimal di berbagai ukuran layar dan perangkat.",
        en: "Typography, spacing, visual hierarchy, and components follow a cohesive design system. Layouts are built responsive to stay optimal across all screen sizes and devices.",
      },
    },
    {
      icon: "zap",
      title: { id: "Performa dan Efisiensi", en: "Performance & Efficiency" },
      description: {
        id: "Struktur kode, strategi rendering, pemuatan aset, dan pengelolaan state diperhatikan untuk menjaga performa. Implementasi diupayakan tetap efisien, mudah dipelihara, dan tidak menambah kompleksitas yang tidak diperlukan.",
        en: "Code structure, rendering strategies, asset delivery, and state management are tuned to preserve performance. Implementations stay clean, maintainable, and free of unnecessary complexity.",
      },
    },
    {
      icon: "refresh",
      title: { id: "Pengujian dan Iterasi", en: "Testing & Iteration" },
      description: {
        id: "Setiap perubahan perlu divalidasi melalui pengujian fungsional, pemeriksaan responsivitas, dan debugging. Temuan dari proses pengujian digunakan untuk memperbaiki stabilitas, mengurangi regresi, dan meningkatkan kualitas implementasi.",
        en: "Every change is validated through functional testing, responsiveness checks, and debugging. Findings from testing strengthen stability, prevent regressions, and elevate overall build quality.",
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
      id: "Teknologi memberi kita cara untuk membangun. Kreativitas memberi kita alasan untuk menciptakannya.",
      en: "Technology gives us the means to build. Creativity gives us the reason to create.",
    },
    author: "Avian",
  },
};
