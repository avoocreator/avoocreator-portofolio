"use client";

import { useLang } from "@/i18n/LangProvider";
import { approachSteps } from "@/data/approach";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Langkah cara kerja 01–04 */
export function ApproachSteps() {
  const { lang, dict } = useLang();

  return (
    <section className="py-16 sm:py-20 bg-muted/30 border-y border-border" aria-label="Cara kerja">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <SectionHeading
          kicker={dict.keahlian.caraLabel}
          title={dict.keahlian.caraSub}
          align="center"
          className="items-center text-center"
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {approachSteps.map((step, i) => (
            <Reveal key={step.number} delay={0.08 * i}>
              <div className="group relative h-full rounded-2xl border border-border bg-card p-6 transition-all hover:border-accent/50 hover:-translate-y-1">
                <span className="font-display text-5xl font-extrabold tracking-tight text-outline opacity-40 transition-opacity group-hover:opacity-100">
                  {step.number}
                </span>
                <h3 className="mt-4 font-display font-bold text-lg tracking-tight">
                  {step.title[lang]}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {step.description[lang]}
                </p>
                {step.duration && (
                  <span className="mt-4 inline-block rounded-full bg-accent/10 px-3 py-1 font-mono text-[11px] text-accent">
                    {step.duration[lang]}
                  </span>
                )}
                {i < approachSteps.length - 1 && (
                  <span
                    className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-border lg:block"
                    aria-hidden="true"
                  >
                    →
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
