"use client";

import { CheckCircle2, Target, Lightbulb, MessageSquare, type LucideIcon } from "lucide-react";
import { useLang } from "@/i18n/LangProvider";
import { aboutContent } from "@/data/about";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";

const valueIcons: Record<string, LucideIcon> = {
  "check-circle": CheckCircle2,
  target: Target,
  lightbulb: Lightbulb,
  message: MessageSquare,
};

/** Grid nilai kerja + fakta singkat */
export function ValuesAndFacts() {
  const { lang, dict } = useLang();

  return (
    <section className="py-16 sm:py-20" aria-label="Nilai dan fakta">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 grid gap-12">
        {/* Nilai kerja */}
        <div>
          <SectionHeading kicker={dict.tentang.nilaiLabel} title={
            lang === "id" ? "Empat prinsip yang memandu" : "Four principles that guide me"
          } />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {aboutContent.values.map((v, i) => {
              const Icon = valueIcons[v.icon] ?? Target;
              return (
                <Reveal key={i} delay={0.07 * i}>
                  <TiltCard className="h-full">
                    <div className="card-editorial group h-full p-6">
                      <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 text-teal dark:text-teal-bright transition-transform group-hover:scale-110">
                        <Icon size={20} />
                      </span>
                      <h3 className="font-display font-bold tracking-tight">{v.title[lang]}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {v.description[lang]}
                      </p>
                    </div>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Fakta singkat */}
        <div>
          <SectionHeading
            kicker={dict.tentang.faktaLabel}
            title={lang === "id" ? "Enam hal ringkas tentang saya" : "Six quick things about me"}
          />
          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {aboutContent.facts.map((f, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <div className="flex h-full flex-col gap-1 bg-card p-5">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                    {f.label[lang]}
                  </span>
                  <span className="font-medium">{f.value[lang]}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
