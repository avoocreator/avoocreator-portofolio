import { motion } from 'framer-motion'
import { services } from '../../data/services'
import { SectionHeading } from '../ui/SectionHeading'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
}

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 border-t border-ink/10 dark:border-cream/10">
      <div className="container-page">
        <SectionHeading
          index="06"
          tag="Layanan"
          title="Layanan"
          description="Kalau kamu punya ide dan butuh bantuan mewujudkannya, ini yang bisa aku bantu kerjakan."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10 dark:bg-cream/10 border border-ink/10 dark:border-cream/10"
        >
          {services.map((service) => (
            <motion.div
              key={service.number}
              variants={item}
              data-hover
              className="group bg-paper dark:bg-void p-7 hover:bg-ink/[0.03] dark:hover:bg-cream/[0.03] transition-colors"
            >
              <span className="index-label text-sm text-ink-muted dark:text-cream/35">{service.number}</span>
              <h3 className="mt-4 font-display font-bold text-lg text-ink dark:text-cream">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted dark:text-cream/60">{service.description}</p>
              <ul className="mt-5 space-y-1.5">
                {service.outputs.map((output) => (
                  <li key={output} className="text-xs font-mono text-ink-muted dark:text-cream/45 flex items-center gap-2">
                    <span className="h-1 w-1 bg-accent-orange shrink-0" />
                    {output}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
