import type { LucideIcon } from 'lucide-react'

interface SoftwareIconProps {
  name: string
  icon: LucideIcon
}

export function SoftwareIcon({ name, icon: Icon }: SoftwareIconProps) {
  return (
    <div
      data-hover
      className="group relative flex flex-col items-center gap-2.5 py-5 px-2 border border-ink/10 dark:border-cream/10 hover:border-ink/25 dark:hover:border-cream/25 transition-colors overflow-hidden"
    >
      <div className="relative h-7 w-7">
        {/*icon selalu tampil*/}
        <Icon className="absolute inset-0 h-7 w-7 text-ink-muted/35 dark:text-cream/25" strokeWidth={1.5} />
        {/*icon wipe*/}
        <div className="absolute inset-0 overflow-hidden w-0 group-hover:w-full transition-[width] duration-500 ease-out">
          <Icon className="h-7 w-7 text-accent-orange dark:text-accent-teal-bright" strokeWidth={1.5} />
        </div>
      </div>

      <span className="text-[0.65rem] font-mono text-center leading-tight text-ink-muted dark:text-cream/45 group-hover:text-ink dark:group-hover:text-cream transition-colors">
        {name}
      </span>

      {/*progress bar*/}
      <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent-orange dark:bg-accent-teal-bright group-hover:w-full transition-[width] duration-500 ease-out" />
    </div>
  )
}