import { projects } from './projects'

export interface ParticipationItem {
  id: string
  title: string
  role?: string
  description: string
  link?: string
  // featured = ditampilkan di preview folder saat hover.
  // Sisanya cuma muncul di halaman detail. Nantinya ini yang diatur lewat admin.
  featured?: boolean
}

export interface ParticipationCategory {
  id: 'organisasi' | 'kompetisi' | 'proyek'
  number: string
  title: string
  description: string
  items: ParticipationItem[]
}

export const participationCategories: ParticipationCategory[] = [
  {
    id: 'organisasi',
    number: '01',
    title: 'Organisasi',
    description: 'Komunitas dan organisasi sekolah yang diikuti.',
    items: [
      {
        id: 'mrt',
        title: 'Matura Robo Tech',
        role: 'Anggota Divisi R&D',
        description: 'Riset dan pengembangan di bidang robotika serta sistem interaktif.',
        featured: true,
      },
      {
        id: 'ecc',
        title: 'ECC',
        role: 'Anggota',
        // PLACEHOLDER — lengkapi deskripsi & role sebenarnya
        description: 'Komunitas percakapan Bahasa Inggris di sekolah.',
        featured: true,
      },
      {
        id: 'nihongo',
        title: 'Nihongo Club',
        role: 'Anggota',
        // PLACEHOLDER — lengkapi deskripsi & role sebenarnya
        description: 'Komunitas belajar dan latihan Bahasa Jepang.',
        featured: true,
      },
    ],
  },
  {
    id: 'kompetisi',
    number: '02',
    title: 'Kompetisi',
    description: 'Lomba dan kompetisi yang pernah diikuti.',
    items: [
      {
        id: 'jhic',
        title: 'JHIC 2.0 2026',
        role: 'Web Development — Tim Utusan Afumado',
        description: 'Kompetisi pengembangan website untuk SMAN 1 Kraksaan, babak Kick Off & Preliminary.',
        link: 'https://github.com/avoocreator/sman1kraksaan-web',
        featured: true,
      },
      // PLACEHOLDER — tambahkan kompetisi lain di sini
    ],
  },
  {
    id: 'proyek',
    number: '03',
    title: 'Proyek',
    description: 'Proyek pribadi maupun tim, dari yang sudah jadi sampai yang masih konsep.',
    // Ambil langsung dari data/projects.ts biar gak dobel-input.
    items: projects.map((p, i) => ({
      id: p.number,
      title: p.title,
      role: p.category,
      description: p.description,
      link: p.link,
      featured: i < 3,
    })),
  },
]

export function getParticipationCategory(id: string | undefined) {
  return participationCategories.find((c) => c.id === id)
}