export interface ExpertiseGroup {
  id: string
  title: string
  description: string
  skills: string[]
}

export const expertiseGroups: ExpertiseGroup[] = [
  {
    id: 'development',
    title: 'Development',
    description: 'Membangun antarmuka dan sistem yang jalan, bukan sekadar mockup.',
    skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Python', 'C++', 'Apps Script'],
  },
  {
    id: 'design',
    title: 'Design',
    description: 'Menerjemahkan ide jadi visual yang punya sistem, bukan tempelan.',
    skills: ['UI/UX', 'Graphic Design', 'Branding', 'Visual System', 'Presentation Design'],
  },
  {
    id: 'creative-tech',
    title: 'Creative Technology',
    description: 'Menyambungkan kode dengan perangkat fisik dan interaksi nyata.',
    skills: ['IoT', 'Arduino', 'Electronics', 'Interactive Web', 'Prototyping'],
  },
  {
    id: 'research',
    title: 'Research & Problem Solving',
    description: 'Mikir terstruktur sebelum membangun, biar hasilnya nggak asal jalan.',
    skills: ['Scientific Writing', 'Data Interpretation', 'Project Planning', 'Research Presentation'],
  },
]
