import { Moon, Sun } from 'lucide-react'
import type { Theme } from '../../hooks/useTheme'

export function ThemeToggle({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'}
      aria-pressed={isDark}
      className="relative flex h-9 w-9 items-center justify-center border border-ink/15 dark:border-cream/15 text-ink dark:text-cream hover:border-ink/40 dark:hover:border-cream/40 transition-colors"
    >
      {isDark ? <Sun size={16} strokeWidth={2} /> : <Moon size={16} strokeWidth={2} />}
    </button>
  )
}
