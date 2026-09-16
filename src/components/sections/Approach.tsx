import { motion } from 'framer-motion'
import { SectionHeading } from '../ui/SectionHeading'

const steps = [
  {
    n: '01',
    title: 'Pahami',
    desc: 'Setiap proyek dimulai dari masalahnya, bukan dari tools-nya. Apa yang perlu bekerja, buat siapa, dan kenapa itu penting.',
  },
  {
    n: '02',
    title: 'Rancang & Bangun',
    desc: 'Bergerak di kode dan visual secara bersamaan, biar bentuk dan fungsi tumbuh bareng, bukan yang satu ngejar yang lain.',
  },
  {
    n: '03',
    title: 'Rapikan',
    desc: 'Memangkas yang tidak perlu. 10% terakhir, spacing, animasi, edge case, biasanya di situ letak sebagian besar usahanya.',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

export function Approach() {
  return (
    <section id="approach" className="py-24 md:py-32 border-t border-ink/10 dark:border-cream/10">
      <div className="container-page">
        <SectionHeading index="03" tag="Cara Kerja" title="Bagaimana Avian bekerja" />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {steps.map((step) => (
            <motion.div
              key={step.n}
              variants={item}
              data-hover
              className="border border-ink/12 dark:border-cream/12 p-8 flex flex-col justify-between min-h-[240px] hover:border-accent-orange dark:hover:border-accent-teal-bright transition-colors duration-300"
            >
              <span className="font-display font-black text-5xl text-accent-orange">{step.n}</span>
              <div className="mt-8">
                <h3 className="font-display font-bold text-2xl tracking-tight text-ink dark:text-cream mb-3">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-muted dark:text-cream/60">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
