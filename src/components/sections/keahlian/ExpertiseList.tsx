"use client";

import { motion } from "framer-motion";
import { useLang } from "@/i18n/LangProvider";
import { tx } from "@/i18n/types";
import type { ExpertiseGroup } from "@/data/expertise";
import { Reveal } from "@/components/ui/Reveal";
import { ToolLogo } from "@/components/ui/ToolLogo";

/** Daftar kelompok keahlian dengan skill meter + logo perangkat */
export function ExpertiseList({ groups }: { groups: ExpertiseGroup[] }) {
  const { lang, dict } = useLang();

  return (
    <section className="py-12 sm:py-16" aria-label={dict.keahlian.levelLabel}>
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 grid gap-6">
        {groups.map((g, gi) => (
          <Reveal key={g.id} delay={0.04 * gi}>
            <article className="card-editorial p-6 sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-accent">
                      {String(gi + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-display font-extrabold text-2xl tracking-tight">
                      {tx(g.title, lang)}
                    </h2>
                  </div>
                  <p className="mt-2 font-medium text-foreground/80">{tx(g.description, lang)}</p>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    {tx(g.longDescription, lang)}
                  </p>
                  <div className="mt-6">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
                      {dict.keahlian.toolsLabel}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {g.tools.map((t) => (
                        <ToolLogo key={t} toolKey={t} className="!p-2" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Skill meters */}
                <div className="grid content-center gap-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {dict.keahlian.levelLabel}
                  </p>
                  {g.skills.map((s, si) => (
                    <div key={si}>
                      <div className="mb-1.5 flex items-baseline justify-between gap-2">
                        <span className="text-sm font-medium">{s.name}</span>
                        <span className="font-mono text-xs text-muted-foreground">{s.level}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${s.level}%` }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{
                            duration: 1.1,
                            delay: 0.15 + si * 0.1,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="relative h-full rounded-full bg-gradient-to-r from-accent to-orange-bright"
                        >
                          <span className="meter-shimmer absolute inset-0 rounded-full" />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
