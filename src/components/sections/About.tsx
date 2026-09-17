import { motion } from 'framer-motion'
import { Code2, Palette, Cpu, FlaskConical } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'

const currently = [
  ['Status', 'Pelajar SMA'],
  ['Fokus', 'Web Development, Desain, Teknologi Kreatif, Riset'],
  ['Peran', 'Developer / Designer / Creative Technologist / Researcher'],
  ['Lokasi', 'Jawa Timur, Indonesia'],
  ['Belajar', 'Frontend, Backend, UI/UX, IoT, Prototyping, Riset'],
]

const disciplines = [
  { icon: Code2, title: 'Web Development', desc: 'Membangun website dan produk digital yang fungsional serta mudah digunakan.' },
  { icon: Palette, title: 'Visual Design', desc: 'Mengolah estetika dan pengalaman pengguna melalui desain visual.' },
  { icon: Cpu, title: 'Creative Technology', desc: 'Memadukan teknologi dan kreativitas melalui IoT, robotika, otomasi, dan eksperimen.' },
  { icon: FlaskConical, title: 'Research & Problem Solving', desc: 'Menggunakan riset untuk menemukan solusi inovatif terhadap tantangan kompleks.' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
}

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 border-t border-ink/10 dark:border-cream/10">
      <div className="container-page">
        <SectionHeading index="01" tag="Tentang" title="Bukan cuma suka teknologi" />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4"
        >
          <motion.div
            variants={item}
            className="md:col-span-7 border border-ink/12 dark:border-cream/12 p-8 md:p-10 bg-ink/[0.02] dark:bg-cream/[0.02]"
          >
            <p className="font-display text-2xl md:text-3xl font-medium leading-snug tracking-tight text-ink dark:text-cream">
              Pelajar SMA yang mengeksplorasi teknologi, desain, dan riset. Senang mengubah ide menjadi karya melalui kode, visual, dan eksperimen.
            </p>
            <p className="mt-5 max-w-lg text-ink-muted dark:text-cream/60 leading-relaxed">
              Melalui <b className="text-ink dark:text-cream">Avoo Creator</b>, Saya mengeksplorasi pengembangan website, desain digital, teknologi kreatif, dan riset. Setiap proyek menjadi kesempatan untuk menguji ide, memperluas kemampuan, serta mengubah gagasan menjadi karya yang fungsional dan relevan.
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="md:col-span-5 border border-ink/12 dark:border-cream/12 p-8 md:p-10 flex flex-col justify-between"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-ink-muted dark:text-cream/45">
              Saat ini
            </span>
            <ul className="mt-5">
              {currently.map(([k, v]) => (
                <li
                  key={k}
                  className="flex justify-between font-mono text-sm py-3 border-t border-ink/10 dark:border-cream/10 first:border-t-0"
                >
                  <span className="text-ink dark:text-cream">{k}</span>
                  <span className="text-ink-muted dark:text-cream/50 text-right">{v}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={item} className="md:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {disciplines.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group border border-ink/12 dark:border-cream/12 p-6 flex flex-col gap-3 hover:border-accent-orange dark:hover:border-accent-teal-bright transition-colors"
              >
                <Icon
                  className="h-6 w-6 text-ink dark:text-cream group-hover:text-accent-orange dark:group-hover:text-accent-teal-bright transition-colors"
                  strokeWidth={1.75}
                />
                <h3 className="font-display font-bold text-base leading-snug text-ink dark:text-cream">{title}</h3>
                <p className="text-xs text-ink-muted dark:text-cream/55 leading-relaxed">{desc}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}