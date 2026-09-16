export interface ExperienceItem {
  year: string
  title: string
  role: string
  description: string
  category: string
  highlight?: boolean
}

export const experienceItems: ExperienceItem[] = [
  {
    year: '2026',
    title: 'JHIC 2.0 — Web Development',
    role: 'Frontend Developer, Tim Utusan Afumado',
    description:
      'Mengembangkan website profil SMAN 1 Kraksaan untuk babak Kick Off & Preliminary, dari prototipe Figma sampai frontend Next.js yang jalan.',
    category: 'Competition',
    highlight: true,
  },
  {
    year: '2026',
    title: 'Matura Robo Tech',
    role: 'Anggota R&D',
    description: 'Ikut riset dan pengembangan di divisi R&D — dari eksperimen elektronik sampai dokumentasi teknis.',
    category: 'Robotics',
  },
  {
    year: '—',
    title: 'Avoo Creator',
    role: 'Developer & Graphic Designer',
    description: 'Membangun brand personal sebagai ruang eksperimen desain dan development di luar tugas sekolah.',
    category: 'Personal Experiments',
  },
  // PLACEHOLDER — tambahkan item lain (riset, desain, organisasi) di sini
]
