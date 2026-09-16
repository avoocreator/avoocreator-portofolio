export type ProjectStatus = 'Selesai' | 'Berjalan' | 'Riset' | 'Konsep'

export interface Project {
  number: string
  title: string
  category: string
  description: string
  tags: string[]
  status: ProjectStatus
  link?: string // kosongkan jika belum ada link publik
}

export const projects: Project[] = [
  {
    number: '01',
    title: 'SMAN 1 Kraksaan — Digital Ecosystem',
    category: 'Web Development',
    description:
      'Redesign total website sekolah untuk kompetisi JHIC 2.0: dari profil statis jadi ekosistem digital dengan admin dashboard, analytics, dan AI assistant terintegrasi.',
    tags: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Recharts'],
    status: 'Berjalan',
    link: 'https://github.com/avoocreator/sman1kraksaan-web',
  },
  {
    number: '02',
    title: 'Matura Robo Tech',
    category: 'Creative Technology',
    description:
      'Kontribusi di divisi R&D — eksplorasi robotika dan sistem interaktif, dari prototipe elektronik sampai dokumentasi teknis.',
    tags: ['IoT', 'Arduino', 'R&D'],
    status: 'Berjalan',
  },
  {
    number: '03',
    title: 'Avoo Creator Portfolio',
    category: 'Web Development',
    description:
      'Website yang sedang kamu lihat ini — dibangun dari nol dengan React, Tailwind, dan maskot asli sebagai identitas visual utama.',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    status: 'Selesai',
  },
  {
    number: '04',
    title: 'Verba — English Vocabulary Bank',
    category: 'Web Development',
    // PLACEHOLDER — lengkapi deskripsi setelah project ini didefinisikan lebih detail
    description:
      'Bank kosakata Bahasa Inggris interaktif untuk latihan mandiri, dirancang agar terasa ringan dipakai sehari-hari.',
    tags: ['JavaScript', 'UI/UX'],
    status: 'Konsep',
  },
  {
    number: '05',
    title: 'Cash Management Web App',
    category: 'Web Development',
    // PLACEHOLDER — lengkapi deskripsi setelah scope final
    description: 'Aplikasi pencatatan dan pemantauan arus kas sederhana untuk kebutuhan organisasi kecil.',
    tags: ['React', 'TypeScript'],
    status: 'Konsep',
  },
  {
    number: '06',
    title: 'IoT Monitoring Project',
    category: 'Creative Technology',
    // PLACEHOLDER — lengkapi setelah spesifikasi sensor & dashboard final
    description: 'Sistem pemantauan berbasis sensor dengan dashboard real-time, eksperimen menyambungkan hardware ke web.',
    tags: ['IoT', 'Arduino', 'Data'],
    status: 'Riset',
  },
]
