"use client";

import Link from "next/link";
import { ArrowUpRight, Users, Trophy, FolderKanban, type LucideIcon } from "lucide-react";
import { useLang } from "@/i18n/LangProvider";
import { tx } from "@/i18n/types";
import { participationCategories } from "@/data/participation";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const catIcons: Record<string, LucideIcon> = {
  organisasi: Users,
  kompetisi: Trophy,
  proyek: FolderKanban,
};

/** Teaser partisipasi di halaman tentang */
export function PartisipasiTeaser() {
  const { lang, dict } = useLang();

  return (
    <section className="py-16 sm:py-20" aria-label="Partisipasi">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <SectionHeading
          kicker={dict.tentang.partisipasiLabel}
          title={lang === "id" ? "Aktif di luar layar" : "Active beyond the screen"}
          sub={dict.tentang.partisipasiSub}
        />

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {participationCategories.map((cat, i) => {
            const Icon = catIcons[cat.id] ?? Users;
            return (
              <Reveal key={cat.id} delay={0.07 * i}>
                <Link
                  href={`/partisipasi/${cat.id}`}
                  className="card-editorial group flex h-full flex-col p-6 transition-transform hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform group-hover:scale-110">
                      <Icon size={20} />
                    </span>
                    <span className="font-mono text-xs text-muted-foreground/60">{cat.number}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg tracking-tight">
                    {tx(cat.title, lang)}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed flex-1">
                    {tx(cat.description, lang)}
                  </p>
                  <p className="mt-3 font-mono text-xs text-muted-foreground">
                    {cat.items.length} {dict.partisipasi.itemLabel}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                    {dict.partisipasi.detailTitle}
                    <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
