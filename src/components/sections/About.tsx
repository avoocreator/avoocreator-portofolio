import { motion } from 'framer-motion'
import { SectionHeading } from '../ui/SectionHeading'

const currently = [
  ['Status', 'Terbuka untuk kolaborasi'],
  ['Fokus', 'Web & Product Design'],
  ['Peran', 'Developer / Designer'],
  ['Lokasi', 'Jawa Timur, ID'],
  ['Belajar', 'Framework baru, terus'],
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
              Pelajar SMA yang menghabiskan waktu di antara dua dunia, menulis kode dan menata visual,
              dan tidak mau memilih salah satunya saja.
            </p>
            <p className="mt-5 max-w-lg text-ink-muted dark:text-cream/60 leading-relaxed">
              Dengan nama <b className="text-ink dark:text-cream">Avoo Creator</b>, Avian membangun tools,
              antarmuka, dan visual kecil yang mengutamakan fungsi, baru kemudian tampilan. Terbiasa
              bergerak dari masalah backend yang berat logika sampai detail visual yang sering dilewatkan
              orang lain.
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

          <motion.div
            variants={item}
            className="md:col-span-4 p-7 bg-ink dark:bg-cream text-paper dark:text-void flex flex-col justify-between min-h-[150px]"
          >
            <span className="font-display font-bold text-4xl">02</span>
            <span className="font-mono text-xs uppercase tracking-widest opacity-80">
              Disiplin utama — Dev &amp; Design
            </span>
          </motion.div>
          <motion.div
            variants={item}
            className="md:col-span-4 border border-ink/12 dark:border-cream/12 p-7 flex flex-col justify-between min-h-[150px]"
          >
            <span className="font-display font-bold text-4xl text-accent-orange">01</span>
            <span className="font-mono text-xs uppercase tracking-widest text-ink-muted dark:text-cream/45">
              Brand — Avoo Creator
            </span>
          </motion.div>
          <motion.div
            variants={item}
            className="md:col-span-4 border border-ink/12 dark:border-cream/12 p-7 flex flex-col justify-between min-h-[150px]"
          >
            <span className="font-display font-bold text-4xl text-ink dark:text-cream">SMA</span>
            <span className="font-mono text-xs uppercase tracking-widest text-ink-muted dark:text-cream/45">
              Masih berstatus pelajar penuh waktu
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
