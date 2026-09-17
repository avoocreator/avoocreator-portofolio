import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { ParticipationCategory } from '../../data/participation'

const paperShift = [
  { rotate: -7, x: -16 },
  { rotate: 0, x: 0 },
  { rotate: 7, x: 16 },
]

export function FolderCard({ category }: { category: ParticipationCategory }) {
  const preview = category.items.filter((item) => item.featured).slice(0, 3)

  return (
    <Link to={`/partisipasi/${category.id}`} data-hover className="group block">
      <motion.div initial="rest" whileHover="hover" animate="rest" className="relative h-52">
        {preview.map((item, i) => (
          <motion.div
            key={item.id}
            variants={{
              rest: { y: 0, opacity: 0 },
              hover: {
                y: -(50 + i * 14),
                opacity: 1,
                rotate: paperShift[i]?.rotate ?? 0,
                x: paperShift[i]?.x ?? 0,
                transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 },
              },
            }}
            className="absolute bottom-14 left-1/2 w-[72%] -translate-x-1/2 border border-ink/20 dark:border-cream/20 bg-paper dark:bg-void px-3 py-2.5"
            style={{ zIndex: 10 + i }}
          >
            <span className="block font-mono text-[0.65rem] leading-snug text-ink-muted dark:text-cream/60 truncate">
              {item.title}
            </span>
          </motion.div>
        ))}

        {/* tab folder */}
        <div className="absolute bottom-28 left-8 h-4 w-14 border border-b-0 border-ink dark:border-cream bg-ink dark:bg-cream" />

        {/* badan folder */}
        <div
          className="absolute bottom-0 left-0 h-28 w-full border-2 border-ink dark:border-cream bg-ink/[0.03] dark:bg-cream/[0.03] group-hover:border-accent-orange dark:group-hover:border-accent-teal-bright transition-colors duration-300"
          style={{ zIndex: 20 }}
        >
          <span className="absolute inset-0 flex items-center justify-center font-mono text-[0.65rem] text-ink-muted/50 dark:text-cream/30 group-hover:opacity-0 transition-opacity">
            hover untuk lihat isi
          </span>
        </div>
      </motion.div>

      <div className="mt-5 flex items-end justify-between border-t border-ink/10 dark:border-cream/10 pt-4">
        <div>
          <span className="index-label text-sm text-accent-orange">{category.number}</span>
          <h3 className="font-display font-bold text-xl text-ink dark:text-cream">{category.title}</h3>
        </div>
        <span className="flex items-center gap-1 font-mono text-xs text-ink-muted dark:text-cream/45 group-hover:text-accent-orange dark:group-hover:text-accent-teal-bright transition-colors">
          {category.items.length} item
          <ArrowRight size={12} />
        </span>
      </div>
    </Link>
  )
}