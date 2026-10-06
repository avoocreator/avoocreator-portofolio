import type { L } from "@/i18n/types";

export interface FaqItem {
  q: L
  a: L
}

export const faqItems: FaqItem[] = [
  {
    q: { id: "Berapa lama pengerjaan satu proyek?", en: "How long does one project take?" },
    a: {
      id: "Tergantung skala. Desain grafis biasanya 1–7 hari, landing page 1–2 minggu, dan website dengan sistem bisa 3–4 minggu. Estimasi pasti diberikan setelah brief dibahas — dan selalu diusahakan lebih cepat dari janji.",
      en: "It depends on scale. Graphic design usually takes 1–7 days, a landing page 1–2 weeks, and a website with a system 3–4 weeks. A precise estimate is given after we discuss the brief — and I always aim to beat it.",
    },
  },
  {
    q: { id: "Bagaimana skema harganya?", en: "How does pricing work?" },
    a: {
      id: "Harga mengikuti kebutuhan dan kompleksitas. Setelah brief masuk, kamu dapat penawaran tetap sebelum pengerjaan dimulai — tanpa biaya tersembunyi. Untuk proyek kecil, pembayaran bisa full di akhir; proyek besar pakai pola DP 50%.",
      en: "Pricing follows needs and complexity. Once your brief arrives, you get a fixed quote before work starts — no hidden fees. Small projects can be paid fully at the end; larger ones use a 50% down payment.",
    },
  },
  {
    q: { id: "Bisa revisi kalau hasilnya belum cocok?", en: "Can I request revisions if it doesn't fit?" },
    a: {
      id: "Bisa. Setiap layanan sudah termasuk 2–3 putaran revisi normal (bukan redesign total). Komunikasi selama pengerjaan juga terbuka, jadi arah hasilnya bisa dikoreksi di tengah jalan sebelum terlalu jauh.",
      en: "Yes. Every service includes 2–3 rounds of normal revisions (not a full redesign). Communication stays open during the work, so direction can be corrected halfway before it goes too far.",
    },
  },
  {
    q: { id: "Apakah bisa konsultasi dulu sebelum memesan?", en: "Can I consult before ordering?" },
    a: {
      id: "Sangat bisa — malah dianjurkan. Ceritakan kebutuhanmu lewat form pemesanan atau langsung chat WhatsApp. Konsultasi awal gratis, termasuk rekomendasi pendekatan yang paling masuk akal untuk masalahmu.",
      en: "Absolutely — it's even encouraged. Tell me what you need through the order form or a direct WhatsApp chat. The initial consultation is free, including recommendations on the most sensible approach for your problem.",
    },
  },
  {
    q: { id: "Apa saja yang saya terima di akhir proyek?", en: "What do I receive at the end of a project?" },
    a: {
      id: "Hasil akhir sesuai layanan (file sumber yang bisa diedit, kode yang terdokumentasi, atau website yang sudah tayang) plus panduan singkat cara pakai dan update. Tidak ada file yang disandera — milikmu sepenuhnya.",
      en: "The final deliverable for your service (editable source files, documented code, or a live website) plus a short usage guide and handover. No file hostage-taking — it's all yours.",
    },
  },
  {
    q: { id: "Bekerja dengan sekolah/organisasi bisa?", en: "Can you work with schools/organizations?" },
    a: {
      id: "Bisa dan sudah terbiasa — sebagian besar proyek justru untuk kebutuhan sekolah, organisasi, dan komunitas. Bisa beradaptasi dengan alur persuratan dan kebutuhan laporan kalau diperlukan.",
      en: "Yes, and I'm used to it — most projects are actually for schools, organizations, and communities. I can adapt to formal paperwork and reporting needs when required.",
    },
  },
];
