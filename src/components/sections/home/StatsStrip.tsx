"use client";

import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { useLang } from "@/i18n/LangProvider";
import { tx } from "@/i18n/types";
import { site } from "@/data/site";

/** Strip statistik dengan counter animasi */
export function StatsStrip({ className }: { className?: string }) {
  const { lang, dict } = useLang();
  return (
    <section className={className} aria-label={dict.layanan.statLabel}>
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-border bg-border">
          {site.stats.map((s, i) => (
            <div key={i} className="bg-card p-6 sm:p-8 flex flex-col gap-1.5">
              <Reveal y={16} delay={i * 0.08}>
                <span className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight">
                  <Counter value={s.value} suffix={s.suffix} className="tabular-nums" />
                </span>
              </Reveal>
              <span className="text-sm text-muted-foreground">{tx(s.label, lang)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
