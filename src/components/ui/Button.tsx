import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/utils'

type Variant = 'primary' | 'ghost' | 'outline'

interface SharedProps {
  variant?: Variant
  icon?: ReactNode
  children: ReactNode
}

const base =
  'inline-flex items-center gap-2 px-5 py-3 text-sm font-medium border transition-colors duration-200 focus-visible:outline-offset-2'

const variants: Record<Variant, string> = {
  primary:
    'bg-ink text-paper border-ink hover:bg-accent-orange hover:border-accent-orange dark:bg-cream dark:text-void dark:border-cream dark:hover:bg-accent-orange-bright dark:hover:border-accent-orange-bright dark:hover:text-void',
  outline:
    'bg-transparent text-ink border-ink/25 hover:border-ink dark:text-cream dark:border-cream/25 dark:hover:border-cream',
  ghost:
    'bg-transparent text-ink border-transparent hover:border-ink/25 dark:text-cream dark:hover:border-cream/25',
}

type ButtonProps = SharedProps & ButtonHTMLAttributes<HTMLButtonElement>
type LinkProps = SharedProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', icon, children, className, ...props }, ref) => (
    <button ref={ref} className={cn(base, variants[variant], className)} {...props}>
      {children}
      {icon}
    </button>
  )
)
Button.displayName = 'Button'

export function LinkButton({ variant = 'primary', icon, children, className, href, ...props }: LinkProps) {
  return (
    <a href={href} className={cn(base, variants[variant], className)} {...props}>
      {children}
      {icon}
    </a>
  )
}
