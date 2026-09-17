import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { SectionHeading } from '../components/ui/SectionHeading'
import { getParticipationCategory } from '../data/participation'

export function ParticipationDetailPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const category = getParticipationCategory(categoryId)

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center container-page py-32 text-center">
          <div>
            <p className="font-display font-extrabold text-3xl text-ink dark:text-cream">Kategori tidak ditemukan</p>
            <Link
              to="/"
              data-hover
              className="mt-6 inline-flex items-center gap-2 text-sm text-accent-orange hover:underline"
            >
              <ArrowLeft size={16} />
              Kembali ke beranda
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="container-page">
          <Link
            to="/#participation"
            data-hover
            className="inline-flex items-center gap-2 text-sm text-ink-muted dark:text-cream/55 hover:text-accent-orange dark:hover:text-accent-teal-bright transition-colors mb-10"
          >
            <ArrowLeft size={16} />
            Kembali ke beranda
          </Link>

          <SectionHeading
            index={category.number}
            tag="Partisipasi"
            title={category.title}
            description={category.description}
          />

          <div className="border-t border-ink/10 dark:border-cream/10">
            {category.items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 py-7 border-b border-ink/10 dark:border-cream/10"
              >
                <div className="max-w-2xl">
                  <h3 className="font-display font-bold text-lg sm:text-xl text-ink dark:text-cream">
                    {item.title}
                  </h3>
                  {item.role && (
                    <p className="mt-1 text-xs font-mono text-accent-orange">{item.role}</p>
                  )}
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted dark:text-cream/60">
                    {item.description}
                  </p>
                </div>

                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    data-hover
                    className="shrink-0 inline-flex items-center gap-1.5 self-start px-3 py-2 text-xs font-mono border border-ink/15 dark:border-cream/15 text-ink dark:text-cream hover:border-accent-orange hover:text-accent-orange dark:hover:border-accent-teal-bright dark:hover:text-accent-teal-bright transition-colors"
                  >
                    Kunjungi
                    <ArrowUpRight size={12} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}