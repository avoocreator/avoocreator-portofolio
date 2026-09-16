import { cn } from '../../lib/utils'

export function Tag({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center border border-ink/15 dark:border-cream/15 px-2.5 py-1 text-xs font-mono text-ink-muted dark:text-cream/60',
        className
      )}
    >
      {children}
    </span>
  )
}
