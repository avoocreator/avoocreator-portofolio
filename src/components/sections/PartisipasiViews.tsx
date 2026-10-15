"use client";

import Link from "next/link";
import { ArrowUpRight, Users, Trophy, FolderKanban, type LucideIcon } from "lucide-react";
import { useLang } from "@/i18n/LangProvider";
import { tx } from "@/i18n/types";
import type { ParticipationCategory } from "@/data/participation";
import { PageHero } from "@/components/sections/shared/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Tag } from "@/components/ui/Tag";

const catIcons: Record<string, LucideIcon> = {
  organisasi: Users,
  kompetisi: Trophy,
  proyek: FolderKanban,
};

export function PartisipasiExplorer({ categories }: { categories: ParticipationCategory[] }) {
  const { lang, dict } = useLang();

  return (
    <>
      <PageHero
        kicker={dict.partisipasi.kicker}
        title={dict.partisipasi.title}
        sub={dict.partisipasi.sub}
      />
      <section className="pb-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 grid gap-6 lg:grid-cols-3">
          {categories.map((cat, i) => {
            const Icon = catIcons[cat.id] ?? Users;
            const featured = cat.items.filter((it) => it.featured).slice(0, 3);
            return (
              <Reveal key={cat.id} delay={0.07 * i}>
                <TiltCard className="h-full">
                  <Link
                    href={`/partisipasi/${cat.id}`}
                    className="card-editorial group flex h-full flex-col p-6 sm:p-7"
                  >
                    <div className="flex items-start justify-between mb-5">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform group-hover:scale-110 group-hover:rotate-3">
                        <Icon size={22} />
                      </span>
                      <span className="font-display text-3xl font-extrabold text-muted-foreground/30">
                        {cat.number}
                      </span>
                    </div>
                    <h2 className="font-display font-extrabold text-xl tracking-tight">
                      {tx(cat.title, lang)}
                    </h2>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                      {tx(cat.description, lang)}
                    </p>

                    <div className="mt-5 grid gap-2 border-t border-border pt-4">
                      {featured.map((it) => (
                        <div key={it.id} className="flex items-start gap-2 text-sm">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" aria-hidden="true" />
                          <span className="font-medium truncate">{tx(it.title, lang)}</span>
                        </div>
                      ))}
                    </div>

                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent">
                      {dict.common.lihatSemua} ({cat.items.length})
                      <ArrowUpRight
                        size={15}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </Link>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}

export function PartisipasiDetail({ category }: { category: ParticipationCategory }) {
  const { lang, dict } = useLang();
  const Icon = catIcons[category.id] ?? Users;

  return (
    <>
      <section className="relative overflow-hidden pt-28 sm:pt-32 pb-10">
        <div className="absolute inset-0 grid-lines opacity-50" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6">
          <Reveal y={12} blur={false}>
            <Link
              href="/partisipasi"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-accent transition-colors"
            >
              ← {dict.partisipasi.kembaliKe}
            </Link>
          </Reveal>
          <div className="mt-6 flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <Icon size={26} />
            </span>
            <div>
              <Reveal delay={0.08}>
                <h1 className="font-display font-extrabold tracking-tight text-3xl sm:text-4xl">
                  {tx(category.title, lang)}
                </h1>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="text-muted-foreground mt-1">{tx(category.description, lang)}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 grid gap-4 md:grid-cols-2">
          {category.items.map((item, i) => (
            <Reveal key={item.id} delay={0.05 * i}>
              <article className="card-editorial h-full p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h2 className="font-display font-bold text-lg tracking-tight">
                    {tx(item.title, lang)}
                  </h2>
                  {item.role && <Tag>{tx(item.role, lang)}</Tag>}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tx(item.description, lang)}
                </p>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:gap-2.5 transition-all"
                  >
                    {dict.proyek.kunjungi}
                    <ArrowUpRight size={14} />
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
