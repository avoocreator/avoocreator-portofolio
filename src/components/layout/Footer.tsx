import { useEffect, useState } from 'react'
import { socialLinks } from '../../data/social'
import { scrollToId } from '../../lib/utils'

export function Footer() {
  const year = new Date().getFullYear()
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const formatted = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      setTime(`${formatted} — Jawa Timur, ID`)
    }
    tick()
    const id = setInterval(tick, 30000)
    return () => clearInterval(id)
  }, [])

  return (
    <footer className="border-t border-ink/10 dark:border-cream/10">
      <div className="container-page py-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display font-extrabold text-lg text-ink dark:text-cream">
            Avoo<span className="text-accent-orange">.</span>Creator
          </p>
          <p className="mt-1 text-sm text-ink-muted dark:text-cream/50">
            Ide yang dibangun jadi sesuatu yang nyata.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              data-hover
              className="text-ink-muted dark:text-cream/50 hover:text-accent-orange dark:hover:text-accent-teal-bright transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            data-hover
            onClick={() => scrollToId('home')}
            className="text-ink-muted dark:text-cream/50 hover:text-accent-orange dark:hover:text-accent-teal-bright transition-colors"
          >
            Kembali ke atas
          </button>
        </div>
      </div>

      <div className="container-page pb-8 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between text-xs text-ink-muted dark:text-cream/40">
        <p>&copy; {year} Avoo Creator. Semua hak dilindungi.</p>
        <p className="font-mono">{time || 'Designed and built by Avian'}</p>
      </div>
    </footer>
  )
}
