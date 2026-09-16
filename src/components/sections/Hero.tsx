import { motion, type Variants } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { Mascot } from '../mascot/Mascot'
import { Marquee } from '../ui/Marquee'
import { DailyQuote } from '../ui/DailyQuote'
import { scrollToId } from '../../lib/utils'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const roles = ['Developer', 'Graphic Designer', 'Creative Technologist', 'Pelajar SMA']

export function Hero() {
  const reducedMotion = usePrefersReducedMotion()

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 18 },
    show: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
    }),
  }

  const lineReveal: Variants = {
    hidden: { y: reducedMotion ? 0 : '110%' },
    show: (delay: number) => ({
      y: 0,
      transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
    }),
  }

  return (
    <section id="home" className="relative pt-32 pb-16 md:pt-40 md:pb-0 overflow-hidden">
      <div className="container-page grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 items-center">
        <motion.div initial="hidden" animate="show" className="md:col-span-6 relative z-10">
          <motion.p custom={0} variants={fadeUp} className="index-label text-sm text-accent-orange mb-5">
            Avoo Creator — Portfolio Personal
          </motion.p>

          <h1 className="font-display font-black leading-[0.95] tracking-tight text-ink dark:text-cream">
            <span className="block overflow-hidden">
              <motion.span custom={0.08} variants={lineReveal} className="block text-6xl sm:text-7xl lg:text-8xl">
                Avian
              </motion.span>
            </span>
            <span className="block overflow-hidden mt-1">
              <motion.span
                custom={0.2}
                variants={lineReveal}
                className="block text-4xl sm:text-5xl lg:text-6xl text-accent-orange"
              >
                as Avoo Creator
              </motion.span>
            </span>
          </h1>

          <motion.div custom={0.36} variants={fadeUp}>
            <DailyQuote className="mt-7" />
          </motion.div>

          <motion.div custom={0.46} variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-4">
            <button
              data-hover
              onClick={() => scrollToId('projects')}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium bg-ink text-paper dark:bg-cream dark:text-void border border-ink dark:border-cream hover:bg-accent-orange hover:border-accent-orange dark:hover:bg-accent-teal-bright dark:hover:border-accent-teal-bright dark:hover:text-void transition-colors"
            >
              Lihat Proyek
              <ArrowUpRight size={16} />
            </button>
            <button
              data-hover
              onClick={() => scrollToId('contact')}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium border border-ink/25 dark:border-cream/25 text-ink dark:text-cream hover:border-ink dark:hover:border-cream transition-colors"
            >
              Hubungi Saya
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-6 relative flex justify-center md:justify-end"
        >
          <div className="relative w-72 sm:w-96 md:w-full md:max-w-lg lg:max-w-xl aspect-square">
            {/* shadow statis di belakang — tidak ikut animasi, jadi tidak bikin lag */}
            <div
              aria-hidden
              className="absolute inset-x-10 bottom-6 h-10 rounded-full bg-ink/10 dark:bg-black/30 blur-2xl"
            />
            <motion.div
              aria-hidden
              className="absolute inset-8 border border-ink/15 dark:border-cream/15"
              style={{ rotate: 6 }}
              animate={reducedMotion ? undefined : { rotate: 366 }}
              transition={reducedMotion ? undefined : { duration: 36, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              aria-hidden
              className="absolute inset-8 border border-accent-orange/40"
              style={{ rotate: -3 }}
              animate={reducedMotion ? undefined : { rotate: -363 }}
              transition={reducedMotion ? undefined : { duration: 44, repeat: Infinity, ease: 'linear' }}
            />
            <Mascot variant="point" priority className="relative h-full w-full" />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-14 md:mt-16"
      >
        <Marquee items={roles} />
      </motion.div>

      <div className="hidden md:flex justify-center py-6">
        <button
          data-hover
          onClick={() => scrollToId('about')}
          aria-label="Scroll ke bagian tentang"
          className="flex items-center justify-center h-10 w-10 border border-ink/15 dark:border-cream/15 text-ink-muted dark:text-cream/50 hover:text-accent-orange hover:border-accent-orange transition-colors"
        >
          <ArrowDown size={16} className={reducedMotion ? '' : 'animate-bounce'} />
        </button>
      </div>
    </section>
  )
}