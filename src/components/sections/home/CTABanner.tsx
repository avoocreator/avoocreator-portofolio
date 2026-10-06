"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LangProvider";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Mascot } from "@/components/mascot/Mascot";
import { useOrderModal } from "@/components/order/OrderModalProvider";

/** Banner CTA besar sebelum footer */
export function CTABanner() {
  const { lang, dict } = useLang();
  const { open } = useOrderModal();

  return (
    <section className="py-20 sm:py-28" aria-label="Ajakan memesan">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-ink dark:bg-void-surface text-cream dark:text-cream px-6 py-14 sm:px-12 sm:py-20">
            {/* Dekorasi */}
            <div className="absolute inset-0 grid-lines opacity-[0.15] invert dark:opacity-20" aria-hidden="true" />
            <div className="absolute -top-20 -right-10 h-64 w-64 rounded-full bg-accent/30 blur-3xl animate-pulse-soft" aria-hidden="true" />
            <Mascot
              variant="point"
              className="absolute -bottom-6 right-4 w-40 sm:w-52 opacity-90 hidden md:block"
            />

            <div className="relative max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-orange-bright mb-4">
                {dict.common.tersedia}
              </p>
              <h2 className="font-display font-extrabold tracking-tight text-3xl sm:text-5xl leading-[1.05]">
                {dict.home.ctaTitle}
              </h2>
              <p className="mt-4 text-cream/70 dark:text-cream/60 leading-relaxed max-w-lg">
                {dict.home.ctaSub}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <MagneticButton>
                  <button
                    onClick={() => open()}
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5"
                  >
                    {dict.common.pesanSekarang}
                    <ArrowUpRight size={16} />
                  </button>
                </MagneticButton>
                <Link
                  href="/kontak"
                  className="inline-flex items-center gap-1.5 rounded-full border border-cream/25 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-cream/10"
                >
                  {dict.common.hubungiSaya}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
