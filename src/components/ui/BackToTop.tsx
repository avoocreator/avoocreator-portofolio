import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Kembali ke atas"
      className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center border border-ink/15 dark:border-cream/20 bg-paper/90 dark:bg-void/90 backdrop-blur text-ink dark:text-cream hover:border-accent-orange hover:text-accent-orange dark:hover:border-accent-teal-bright dark:hover:text-accent-teal-bright transition-colors shadow-sm"
    >
      <ArrowUp size={18} strokeWidth={2} />
    </button>
  )
}
