export interface Service {
  number: string
  title: string
  description: string
  outputs: string[]
}

export const services: Service[] = [
  {
    number: '01',
    title: 'Website Development',
    description: 'Bangun website dari nol — landing page, portfolio, atau sistem sederhana yang siap dipakai.',
    outputs: ['Frontend responsif', 'Struktur kode rapi', 'Siap dikembangkan ke backend'],
  },
  {
    number: '02',
    title: 'UI/UX Design',
    description: 'Rancang alur dan tampilan yang masuk akal buat pengguna, bukan cuma cantik di mockup.',
    outputs: ['Wireframe & prototype', 'Design system dasar', 'Handoff ke development'],
  },
  {
    number: '03',
    title: 'Graphic Design',
    description: 'Aset visual untuk kebutuhan digital — dari sosial media sampai materi presentasi.',
    outputs: ['Visual sosial media', 'Poster & materi cetak', 'Ikon & ilustrasi sederhana'],
  },
  {
    number: '04',
    title: 'Presentation Design',
    description: 'Slide yang enak dilihat dan enak dipresentasikan, untuk lomba, riset, atau pitching.',
    outputs: ['Deck presentasi', 'Struktur cerita', 'Template siap edit'],
  },
  {
    number: '05',
    title: 'Branding Support',
    description: 'Bantu bentuk identitas visual awal — logo sederhana, palet warna, dan panduan dasar.',
    outputs: ['Logo & wordmark', 'Palet warna', 'Panduan penggunaan dasar'],
  },
  {
    number: '06',
    title: 'Interactive Prototype',
    description: 'Prototipe interaktif untuk menguji ide sebelum dibangun penuh — web atau perangkat IoT sederhana.',
    outputs: ['Prototype klik-jalan', 'Demo perangkat sederhana', 'Dokumentasi cara pakai'],
  },
]
