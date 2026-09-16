import { useEffect, useState } from 'react'
import { quotes, type Quote } from '../../data/quotes'
import { cn } from '../../lib/utils'

const QUOTE_API_URL = 'https://quoteslate.vercel.app/api/quotes/random?count=50'
const RELEVANT_TAGS = ['technology', 'science', 'education', 'knowledge', 'learning', 'intelligence', 'innovation']
const STORAGE_KEY = 'avoo-daily-quote'

type Source = 'local' | 'api'

interface ApiQuote {
  quote: string
  author: string
  tags?: string[]
}

function todayKey() {
  return new Date().toISOString().slice(0, 10) 
}

function getLocalFallback(): Quote {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86400000)
  return quotes[dayOfYear % quotes.length]
}

function getInitialState(): { quote: Quote; source: Source; cacheHit: boolean } {
  try {
    const cachedRaw = localStorage.getItem(STORAGE_KEY)
    if (cachedRaw) {
      const cached = JSON.parse(cachedRaw)
      if (cached.date === todayKey() && cached.quote && cached.author) {
        return {
          quote: { quote: cached.quote, author: cached.author },
          source: cached.source === 'api' ? 'api' : 'local',
          cacheHit: true,
        }
      }
    }
  } catch {
  }
  return { quote: getLocalFallback(), source: 'local', cacheHit: false }
}

async function fetchFromApi(): Promise<Quote | null> {
  try {
    const res = await fetch(QUOTE_API_URL)
    if (!res.ok) return null
    const data: ApiQuote[] = await res.json()
    if (!Array.isArray(data) || data.length === 0) return null

    const relevant = data.filter((q) => q.tags?.some((t) => RELEVANT_TAGS.includes(t.toLowerCase())))
    const pool = relevant.length > 0 ? relevant : data
    const pick = pool[Math.floor(Math.random() * pool.length)]
    return { quote: pick.quote, author: pick.author }
  } catch {
    return null
  }
}

export function DailyQuote({ className }: { className?: string }) {
  const [initial] = useState(getInitialState)
  const [quote, setQuote] = useState(initial.quote)
  const [source, setSource] = useState<Source>(initial.source)

  useEffect(() => {
    if (initial.cacheHit) return
    let cancelled = false

    fetchFromApi().then((result) => {
      if (cancelled) return
      const final = result ?? getLocalFallback()
      const finalSource: Source = result ? 'api' : 'local'
      setQuote(final)
      setSource(finalSource)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: todayKey(), ...final, source: finalSource }))
      } catch {
      }
    })

    return () => {
      cancelled = true
    }
  }, [initial.cacheHit])

  return (
    <blockquote className={cn('max-w-md', className)}>
      <span className="block font-mono text-xs uppercase tracking-widest text-ink-muted dark:text-cream/40 mb-2">
        Kutipan hari ini
      </span>
      <p className="text-lg leading-relaxed text-ink-muted dark:text-cream/65">&ldquo;{quote.quote}&rdquo;</p>
      <footer className="mt-2 flex flex-wrap items-baseline gap-x-2 text-sm font-mono text-accent-orange">
        <span>— {quote.author}</span>
        {source === 'api' && (
          <span className="text-[0.65rem] text-ink-muted/50 dark:text-cream/30 normal-case">
            via QuoteSlate API
          </span>
        )}
      </footer>
    </blockquote>
  )
}