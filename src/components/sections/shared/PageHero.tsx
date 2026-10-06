"use client";

import { useLang } from "@/i18n/LangProvider";
import { Reveal } from "@/components/ui/Reveal";
import { tx, type L } from "@/i18n/types";

/** Pembuka halaman generik: kicker + judul besar + sub */
export function PageHero({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: string;
  sub?: string | L;
}) {
  const { lang } = useLang();
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-12">
      <div className="absolute inset-0 grid-lines opacity-50" aria-hidden="true" />
      <div className="absolute -top-16 right-[15%] h-56 w-56 glow-orange rounded-full" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6">
        <Reveal y={14} blur={false}>
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            <span className="h-px w-8 bg-accent/60" aria-hidden="true" />
            {kicker}
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-4 max-w-3xl font-display font-extrabold tracking-tight leading-[1.05] text-4xl sm:text-5xl lg:text-6xl">
            {title}
            <span className="text-accent">.</span>
          </h1>
        </Reveal>
        {sub && (
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-2xl text-muted-foreground leading-relaxed">
              {typeof sub === "string" ? sub : tx(sub, lang)}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
