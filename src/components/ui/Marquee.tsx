import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

export function Marquee({ items }: { items: string[] }) {
  const reducedMotion = usePrefersReducedMotion()
  const loop = [...items, ...items]

  return (
    <div className="relative border-y border-ink dark:border-cream bg-ink dark:bg-cream py-4 overflow-hidden">
      <div
        className={
          reducedMotion
            ? 'flex flex-wrap gap-x-8 gap-y-2 px-6 justify-center'
            : 'flex w-max whitespace-nowrap animate-marquee will-change-transform'
        }
      >
        {(reducedMotion ? items : loop).map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-display font-bold text-2xl sm:text-3xl uppercase tracking-tight text-paper dark:text-void px-6 inline-flex items-center gap-6 shrink-0"
          >
            {item}
            <span className="text-accent-orange-bright text-base">&#9670;</span>
          </span>
        ))}
      </div>
    </div>
  )
}
