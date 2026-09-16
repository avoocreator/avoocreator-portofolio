import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../../data/projects'
import { Tag } from '../ui/Tag'
import { SectionHeading } from '../ui/SectionHeading'
import { cn } from '../../lib/utils'

const statusStyles: Record<string, string> = {
  Selesai: 'text-accent-teal',
  Berjalan: 'text-accent-orange',
  Riset: 'text-ink-muted dark:text-cream/50',
  Konsep: 'text-ink-muted dark:text-cream/40',
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
}

export function Projects() {
  const categories = useMemo(() => ['Semua', ...Array.from(new Set(projects.map((p) => p.category)))], [])
  const [active, setActive] = useState('Semua')
  const [view, setView] = useState<'bento' | 'list'>('bento')

  const filtered = active === 'Semua' ? projects : projects.filter((p) => p.category === active)

  return (
    <section id="projects" className="py-24 md:py-32 border-t border-ink/10 dark:border-cream/10">
      <div className="container-page">
        <SectionHeading
          index="04"
          tag="Proyek"
          title="Proyek Terpilih"
          description="Sebagian proyek yang sedang atau sudah aku kerjakan. Sebagian sudah jadi, sebagian masih konsep."
        />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 -mt-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                data-hover
                onClick={() => setActive(category)}
                className={cn(
                  'px-3 py-1.5 text-xs font-mono border transition-colors',
                  active === category
                    ? 'border-ink dark:border-cream text-ink dark:text-cream'
                    : 'border-ink/15 dark:border-cream/15 text-ink-muted dark:text-cream/50 hover:border-ink/40 dark:hover:border-cream/40'
                )}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="flex gap-2 font-mono text-xs">
            {(['bento', 'list'] as const).map((v) => (
              <button
                key={v}
                data-hover
                onClick={() => setView(v)}
                className={cn(
                  'px-3 py-1.5 border capitalize transition-colors',
                  view === v
                    ? 'bg-ink text-paper border-ink dark:bg-cream dark:text-void dark:border-cream'
                    : 'border-ink/15 dark:border-cream/15 text-ink-muted dark:text-cream/50'
                )}
              >
                {v === 'bento' ? 'Grid' : 'List'}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {view === 'bento' ? (
            <motion.div
              key="bento"
              variants={container}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink/10 dark:bg-cream/10 border border-ink/10 dark:border-cream/10"
            >
              {filtered.map((project) => (
                <motion.article
                  key={project.number}
                  variants={item}
                  data-hover
                  className="group relative bg-paper dark:bg-void p-8 flex flex-col justify-between min-h-[280px] overflow-hidden"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <span className="index-label text-sm text-ink-muted dark:text-cream/35">{project.number}</span>
                      <span className={cn('font-mono text-xs', statusStyles[project.status])}>{project.status}</span>
                    </div>

                    <h3 className="mt-6 font-display font-bold text-xl sm:text-2xl text-ink dark:text-cream leading-snug">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-xs font-mono text-accent-orange">{project.category}</p>
                    <p className="mt-4 text-sm leading-relaxed text-ink-muted dark:text-cream/60 max-w-md">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-end justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        data-hover
                        aria-label={`Buka ${project.title}`}
                        className="flex h-9 w-9 shrink-0 items-center justify-center border border-ink/15 dark:border-cream/15 text-ink dark:text-cream group-hover:border-accent-orange group-hover:text-accent-orange dark:group-hover:border-accent-teal-bright dark:group-hover:text-accent-teal-bright transition-colors"
                      >
                        <ArrowUpRight size={16} />
                      </a>
                    ) : (
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-dashed border-ink/10 dark:border-cream/10 text-ink-muted/40">
                        <ArrowUpRight size={16} />
                      </span>
                    )}
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              variants={container}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0 }}
              className="flex flex-col border-t border-ink/10 dark:border-cream/10"
            >
              {filtered.map((project) => (
                <motion.div
                  key={project.number}
                  variants={item}
                  data-hover
                  className="group grid grid-cols-1 md:grid-cols-[0.5fr_2fr_2fr_1.2fr] gap-3 md:gap-6 items-center py-6 border-b border-ink/10 dark:border-cream/10"
                >
                  <span className="index-label text-sm text-ink-muted dark:text-cream/40">{project.number}</span>
                  <div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-ink dark:text-cream transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-accent-orange dark:group-hover:text-accent-teal-bright">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-accent-orange mt-1">{project.category}</p>
                  </div>
                  <p className="text-sm text-ink-muted dark:text-cream/60 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 md:justify-end">
                    {project.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
