export interface ExpertiseGroup {
  id: string
  title: string
  description: string
}

export const expertiseGroups: ExpertiseGroup[] = [
  {
    id: 'development',
    title: 'Web Development',
    description: 'Membangun antarmuka dan sistem yang jalan, bukan sekadar mockup.',
  },
  {
    id: 'design',
    title: 'Visual Design',
    description: 'Menerjemahkan ide jadi visual yang punya sistem, bukan tempelan.',
  },
  {
    id: 'creative-tech',
    title: 'Creative Technology',
    description: 'Menyambungkan kode dengan perangkat fisik dan interaksi nyata.',
  },
  {
    id: 'research',
    title: 'Research & Problem Solving',
    description: 'Mikir terstruktur sebelum membangun, biar hasilnya nggak asal jalan.',
  },
]