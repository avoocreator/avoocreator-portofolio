import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { participationCategories } from '../../data/participation'
import { SectionHeading } from '../ui/SectionHeading'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const COMMAND = 'ls -la partisipasi/'

function useTypewriter(text: string, start: boolean, speed = 28) {
  const [output, setOutput] = useState(start ? '' : text)

  useEffect(() => {
    if (!start) return
    let i = 0
    const id = setInterval(() => {
      i += 1
      setOutput(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [start, text, speed])

  return output
}

function DirectoryRow({ category }: { category: (typeof participationCategories)[number] }) {
  const [open, setOpen] = useState(false)
  const preview = category.items.filter((item) => item.featured).slice(0, 3)
  const slug = `${category.number}-${category.id}`

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <Link
        to={`/partisipasi/${category.id}`}
        data-hover
        className="group flex items-center gap-3 py-2 px-2 -mx-2 hover:bg-ink/[0.06] dark:hover:bg-cream/[0.06] transition-colors"
      >
        <span className="text-accent-teal dark:text-accent-teal-bright/70 select-none">drwxr-xr-x</span>
        <span className="text-ink dark:text-cream group-hover:text-accent-orange transition-colors">{slug}/</span>
        <span className="flex-1 border-b border-dashed border-ink/15 dark:border-cream/10 mx-2 translate-y-[2px]" />
        <span className="text-ink-muted dark:text-cream/40 text-xs sm:text-sm">{category.items.length} item</span>
        <span className="text-ink-muted/60 dark:text-cream/30 group-hover:text-accent-orange group-hover:translate-x-0.5 transition-all">
          →
        </span>
      </Link>

      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden pl-8"
      >
        <div className="py-1.5 space-y-1">
          {preview.map((item) => (
            <p key={item.id} className="text-ink-muted dark:text-cream/55 text-xs sm:text-sm">
              <span className="text-ink-muted/50 dark:text-cream/25">→</span> {item.title}
            </p>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export function Participation() {
  const reducedMotion = usePrefersReducedMotion()
  const panelRef = useRef<HTMLDivElement>(null)
  const inView = useInView(panelRef, { once: true, amount: 0.4 })
  const typed = useTypewriter(COMMAND, inView && !reducedMotion)
  const doneTyping = reducedMotion || typed.length === COMMAND.length

  return (
    <section id="participation" className="py-24 md:py-32 border-t border-ink/10 dark:border-cream/10">
      <div className="container-page">
        <SectionHeading
          index="03"
          tag="Partisipasi"
          title="Jejak keterlibatan"
          description="Organisasi, kompetisi, dan proyek yang pernah dijalani. Arahkan kursor ke tiap folder buat intip isinya, klik untuk lihat detail lengkap."
        />

        <div ref={panelRef} className="border-2 border-ink dark:border-cream max-w-3xl">
          {/* title bar */}
          <div className="flex items-center gap-2 border-b-2 border-ink dark:border-cream bg-ink/[0.04] dark:bg-cream/[0.04] px-4 h-9">
            <span className="h-2.5 w-2.5 bg-accent-orange" />
            <span className="h-2.5 w-2.5 bg-accent-teal dark:bg-accent-teal-bright" />
            <span className="h-2.5 w-2.5 bg-ink/20 dark:bg-cream/20" />
            <span className="ml-2 font-mono text-xs text-ink-muted dark:text-cream/60">
              avian@avoocreator — partisipasi
            </span>
          </div>

          {/* body */}
          <div className="bg-paper dark:bg-void px-5 py-6 sm:px-8 sm:py-8 font-mono text-sm sm:text-base">
            <p className="text-ink dark:text-cream/85">
              <span className="text-accent-teal dark:text-accent-teal-bright">avian@avoocreator</span>
              <span className="text-ink-muted dark:text-cream/40">:~$</span> {typed}
              {!doneTyping && (
                <span className="terminal-cursor inline-block w-2 h-4 bg-ink/70 dark:bg-cream/70 ml-0.5 align-middle" />
              )}
            </p>

            {doneTyping && (
              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-4 space-y-1"
              >
                {participationCategories.map((category) => (
                  <DirectoryRow key={category.id} category={category} />
                ))}

                <p className="pt-3 text-ink dark:text-cream/85">
                  <span className="text-accent-teal dark:text-accent-teal-bright">avian@avoocreator</span>
                  <span className="text-ink-muted dark:text-cream/40">:~$</span>{' '}
                  <span className="terminal-cursor inline-block w-2 h-4 bg-ink/70 dark:bg-cream/70 align-middle" />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}