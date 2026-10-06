"use client";

import { useLang } from "@/i18n/LangProvider";
import { tools } from "@/data/tools";
import { Marquee } from "@/components/ui/Marquee";
import { ToolLogo } from "@/components/ui/ToolLogo";

/** Marquee semua perangkat dengan logo asli */
export function ToolsMarquee() {
  const { dict } = useLang();
  return (
    <section className="py-14" aria-label={dict.keahlian.marqueeLabel}>
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <p className="mb-6 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {dict.keahlian.marqueeLabel}
        </p>
      </div>
      <div className="relative">
        <Marquee slow>
          {tools.map((t) => (
            <span
              key={t.key}
              className="mx-3 flex items-center gap-2.5 rounded-full border border-border bg-card px-4 py-2.5"
            >
              <ToolLogo toolKey={t.key} className="!border-0 !bg-transparent !p-0 shadow-none [&>span]:h-5 [&>span]:w-5" />
              <span className="text-sm font-medium whitespace-nowrap">{t.name}</span>
            </span>
          ))}
        </Marquee>
        {/* Fade tepi */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" aria-hidden="true" />
      </div>
    </section>
  );
}
