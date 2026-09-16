import { motion } from 'framer-motion'
import { experienceItems } from '../../data/experience'
import { SectionHeading } from '../ui/SectionHeading'
import { cn } from '../../lib/utils'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
}

export function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 border-t border-ink/10 dark:border-cream/10">
      <div className="container-page">
        <SectionHeading
          index="05"
          tag="Perjalanan"
          title="Perjalanan"
          description="Beberapa titik yang membentuk cara aku bekerja sekarang."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative border-l border-ink/15 dark:border-cream/15 ml-2"
        >
          {experienceItems.map((exp, i) => (
            <motion.div key={`${exp.title}-${i}`} variants={item} className="relative pl-8 pb-12 last:pb-0">
              <span
                className={cn(
                  'absolute -left-[5px] top-1.5 h-[9px] w-[9px] rounded-full',
                  exp.highlight ? 'bg-accent-orange' : 'bg-ink/30 dark:bg-cream/30'
                )}
              />
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="index-label text-sm text-accent-orange">{exp.year}</span>
                <span className="font-mono text-xs uppercase tracking-wide text-ink-muted dark:text-cream/40">
                  {exp.category}
                </span>
              </div>
              <h3 className="mt-2 font-display font-bold text-lg sm:text-xl text-ink dark:text-cream">
                {exp.title}
              </h3>
              <p className="mt-1 text-sm text-ink-muted dark:text-cream/55">{exp.role}</p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted dark:text-cream/60">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
