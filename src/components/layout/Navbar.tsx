import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navItems } from '../../data/nav'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useTheme } from '../../hooks/useTheme'
import { ThemeToggle } from '../ui/ThemeToggle'
import { scrollToId, cn } from '../../lib/utils'

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeId = useActiveSection(navItems.map((item) => item.id))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const handleNavClick = (id: string) => {
    setMobileOpen(false)
    scrollToId(id)
  }

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b',
        scrolled
          ? 'bg-paper/85 dark:bg-void/85 backdrop-blur border-ink/10 dark:border-cream/10'
          : 'bg-transparent border-transparent'
      )}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <button
          data-hover
          onClick={() => handleNavClick('home')}
          className="font-display font-extrabold tracking-tight text-lg text-ink dark:text-cream"
        >
          Avoo<span className="text-accent-orange">.</span>Creator
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item, i) => (
            <button
              key={item.id}
              data-hover
              onClick={() => handleNavClick(item.id)}
              className={cn(
                'relative px-3 py-2 text-sm transition-colors',
                activeId === item.id
                  ? 'text-ink dark:text-cream'
                  : 'text-ink-muted dark:text-cream/50 hover:text-ink dark:hover:text-cream'
              )}
            >
              <span className="font-mono text-xs text-accent-orange mr-1.5 opacity-70">
                {String(i + 1).padStart(2, '0')}
              </span>
              {item.label}
              {activeId === item.id && (
                <span className="absolute left-3 right-3 -bottom-[1px] h-[2px] bg-accent-orange" />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <button
            data-hover
            onClick={() => handleNavClick('contact')}
            className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium border border-ink dark:border-cream text-ink dark:text-cream hover:bg-ink hover:text-paper dark:hover:bg-cream dark:hover:text-void transition-colors"
          >
            Hubungi Saya
          </button>
          <button
            data-hover
            className="md:hidden flex h-9 w-9 items-center justify-center border border-ink/15 dark:border-cream/15 text-ink dark:text-cream"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-ink/10 dark:border-cream/10 bg-paper dark:bg-void">
          <nav className="container-page flex flex-col py-4">
            {navItems.map((item, i) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  'text-left py-3 text-base border-b border-ink/8 dark:border-cream/8 last:border-0 flex items-center gap-2',
                  activeId === item.id ? 'text-accent-orange font-medium' : 'text-ink dark:text-cream'
                )}
              >
                <span className="font-mono text-xs opacity-60">{String(i + 1).padStart(2, '0')}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
