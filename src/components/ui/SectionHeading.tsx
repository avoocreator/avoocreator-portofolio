import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface SectionHeadingProps {
  index?: string
  tag?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({ index, tag, title, description, align = 'left', className }: SectionHeadingProps) {
  return (
    <div className={cn('mb-12 md:mb-16', className)}>
      <div
        className={cn(
          'flex flex-wrap items-end justify-between gap-4 pb-5 border-b border-ink/12 dark:border-cream/12',
          align === 'center' && 'justify-center text-center'
        )}
      >
        <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-ink dark:text-cream">
          {title}
        </h2>
        {(index || tag) && (
          <span className="font-mono text-xs border border-ink/20 dark:border-cream/20 rounded-full px-3 py-1.5 text-ink-muted dark:text-cream/55 whitespace-nowrap">
            {index}
            {index && tag && ' — '}
            {tag}
          </span>
        )}
      </div>
      {description && (
        <p
          className={cn(
            'mt-5 max-w-xl text-ink-muted dark:text-cream/60 text-base leading-relaxed',
            align === 'center' && 'mx-auto'
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
