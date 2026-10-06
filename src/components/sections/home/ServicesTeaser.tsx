"use client";

import Link from "next/link";
import { ArrowUpRight, Check, Clock } from "lucide-react";
import { useLang } from "@/i18n/LangProvider";
import { tx } from "@/i18n/types";
import type { Service } from "@/data/services";
import { serviceIcons } from "@/components/order/serviceIcons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { useOrderModal } from "@/components/order/OrderModalProvider";

export function ServicesTeaser({ services }: { services: Service[] }) {
  const { lang, dict } = useLang();
  const { open } = useOrderModal();

  return (
    <section className="py-20 sm:py-24 bg-muted/30 border-y border-border" aria-label="Layanan">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="flex items-end justify-between gap-6 mb-10">
          <SectionHeading kicker={dict.home.layananKicker} title={dict.home.layananTitle} />
          <Reveal delay={0.2} className="hidden md:block shrink-0">
            <Link
              href="/layanan"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:gap-2.5 transition-all"
            >
              {dict.common.lihatSemua}
              <ArrowUpRight size={15} />
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = serviceIcons[s.icon] ?? Clock;
            return (
              <Reveal key={s.slug} delay={0.06 * i}>
                <TiltCard className="h-full">
                  <div className="card-editorial group h-full p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-5">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                        <Icon size={20} />
                      </span>
                      <span className="font-mono text-xs text-muted-foreground/60">{s.number}</span>
                    </div>
                    <h3 className="font-display font-bold text-lg tracking-tight">
                      {tx(s.title, lang)}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">
                      {tx(s.description, lang)}
                    </p>
                    <ul className="mt-4 grid gap-1.5">
                      {s.outputs.slice(0, 2).map((o, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <Check size={13} className="text-teal dark:text-teal-bright mt-0.5 shrink-0" />
                          {tx(o, lang)}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => open(s.slug)}
                      className="mt-5 inline-flex items-center justify-between rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-all hover:border-accent hover:text-accent"
                    >
                      {dict.layanan.pesanIni}
                      <ArrowUpRight size={15} />
                    </button>
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
