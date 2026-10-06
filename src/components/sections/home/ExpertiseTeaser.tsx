"use client";

import Link from "next/link";
import { ArrowUpRight, Code2, Palette, Cpu, BookOpen, type LucideIcon } from "lucide-react";
import { useLang } from "@/i18n/LangProvider";
import { tx } from "@/i18n/types";
import type { ExpertiseGroup } from "@/data/expertise";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons: Record<string, LucideIcon> = {
  development: Code2,
  design: Palette,
  "creative-tech": Cpu,
  research: BookOpen,
};

export function ExpertiseTeaser({ groups }: { groups: ExpertiseGroup[] }) {
  const { lang, dict } = useLang();

  return (
    <section className="py-20 sm:py-24 bg-muted/30 border-y border-border" aria-label="Keahlian">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="flex items-end justify-between gap-6 mb-10">
          <SectionHeading kicker={dict.home.expertiseKicker} title={dict.home.expertiseTitle} />
          <Reveal delay={0.2} className="hidden md:block shrink-0">
            <Link
              href="/keahlian"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:gap-2.5 transition-all"
            >
              {dict.common.lihatSemua}
              <ArrowUpRight size={15} />
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((g, i) => {
            const Icon = icons[g.id] ?? Code2;
            return (
              <Reveal key={g.id} delay={0.07 * i}>
                <Link href="/keahlian" className="card-editorial group block h-full p-6">
                  <div className="flex items-center justify-between mb-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform group-hover:scale-110 group-hover:rotate-3">
                      <Icon size={20} />
                    </span>
                    <span className="font-mono text-xs text-muted-foreground/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg tracking-tight mb-1.5">
                    {tx(g.title, lang)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tx(g.description, lang)}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-accent opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                    {dict.common.selengkapnya}
                    <ArrowUpRight size={12} />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
