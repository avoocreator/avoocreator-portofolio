import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Copy, Mail } from 'lucide-react'
import { contact, socialLinks } from '../../data/social'
import { Mascot } from '../mascot/Mascot'
import { SectionHeading } from '../ui/SectionHeading'

export function Contact() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API may be unavailable; the mailto button still works.
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 border-t border-ink/10 dark:border-cream/10">
      <div className="container-page">
        <SectionHeading index="07" tag="Kontak" title="Kontak" className="mb-10 md:mb-12" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center"
        >
          <div className="md:col-span-8">
            <h3 className="font-display font-extrabold text-4xl sm:text-5xl leading-[1.05] text-ink dark:text-cream">
              Punya ide yang layak dibangun?
              <br />
              Ayo jadikan itu nyata.
            </h3>
            <p className="mt-6 max-w-lg text-base sm:text-lg text-ink-muted dark:text-cream/60 leading-relaxed">
              Baik untuk proyek sekolah, kompetisi, atau eksperimen pribadi, aku terbuka untuk ngobrol.
              Kirim email langsung atau salin alamatnya di bawah.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${contact.email}`}
                data-hover
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium bg-ink text-paper dark:bg-cream dark:text-void border border-ink dark:border-cream hover:bg-accent-orange hover:border-accent-orange dark:hover:bg-accent-teal-bright dark:hover:border-accent-teal-bright dark:hover:text-void transition-colors"
              >
                <Mail size={16} />
                {contact.email}
              </a>
              <button
                onClick={handleCopy}
                data-hover
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium border border-ink/25 dark:border-cream/25 text-ink dark:text-cream hover:border-ink dark:hover:border-cream transition-colors"
                aria-label="Salin alamat email"
              >
                {copied ? <Check size={16} className="text-accent-teal" /> : <Copy size={16} />}
                {copied ? 'Tersalin' : 'Salin email'}
              </button>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-ink/10 dark:border-cream/10 pt-6">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  data-hover
                  className="text-sm text-ink-muted dark:text-cream/55 hover:text-accent-orange dark:hover:text-accent-teal-bright transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-4 hidden md:flex justify-end">
            <Mascot variant="curious" className="w-64 lg:w-80" animate />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
