"use client";

import {
  Layers,
  Layout,
  Zap,
  RefreshCw,
  CheckCircle2,
  Target,
  Lightbulb,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";
import { useLang } from "@/i18n/LangProvider";
import type { AboutContentData } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";

const valueIcons: Record<string, LucideIcon> = {
  layers: Layers,
  layout: Layout,
  zap: Zap,
  refresh: RefreshCw,
  "check-circle": CheckCircle2,
  target: Target,
  lightbulb: Lightbulb,
  message: MessageSquare,
};

/** Nilai kerja */
export function ValuesAndFacts({ about }: { about: AboutContentData }) {
  const { lang, dict } = useLang();

  return (
    <section className="py-16 sm:py-20" aria-label="Nilai kerja">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <SectionHeading
          kicker={dict.tentang.nilaiLabel}
          title={lang === "id" ? "Empat prinsip yang memandu" : "Four principles that guide me"}
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {about.values.map((v, i) => {
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
    </section>
  );
}
