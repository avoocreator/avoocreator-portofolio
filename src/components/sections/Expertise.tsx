import { motion } from 'framer-motion'
import { expertiseGroups } from '../../data/expertise'
import { softwareByCategory } from '../../data/software'
import { SoftwareIcon } from '../ui/SoftwareIcon'
import { SectionHeading } from '../ui/SectionHeading'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
}

export function Expertise() {
  return (
    <section id="expertise" className="py-24 md:py-32 border-t border-ink/10 dark:border-cream/10">
      <div className="container-page">
        <SectionHeading
          index="02"
          tag="Kemampuan"
          title="Yang bisa aku kerjakan"
          description="Empat bidang yang saling mengisi. Kadang jalan sendiri sendiri, kadang bertemu dalam satu proyek yang sama."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-ink/10 dark:bg-cream/10 border border-ink/10 dark:border-cream/10"
        >
          {expertiseGroups.map((group) => (
            <motion.div key={group.id} variants={item} className="relative bg-paper dark:bg-void p-8 overflow-hidden">
              <span className="absolute -right-3 -top-3 font-display font-black text-6xl text-ink/[0.05] dark:text-cream/[0.06] select-none">
                {group.id === 'development' && '01'}
                {group.id === 'design' && '02'}
                {group.id === 'creative-tech' && '03'}
                {group.id === 'research' && '04'}
              </span>
              <h3 className="relative font-display font-bold text-xl text-ink dark:text-cream">{group.title}</h3>
              <p className="relative mt-2 text-sm text-ink-muted dark:text-cream/55 leading-relaxed max-w-sm">
                {group.description}
              </p>
              <div className="relative mt-6 grid grid-cols-4 gap-px bg-ink/10 dark:bg-cream/10 border border-ink/10 dark:border-cream/10">
                {softwareByCategory[group.id]?.map((sw) => (
                  <SoftwareIcon key={sw.name} name={sw.name} icon={sw.icon} />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}