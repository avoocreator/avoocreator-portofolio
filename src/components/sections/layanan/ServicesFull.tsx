"use client";

import { Check, Clock, ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LangProvider";
import { tx } from "@/i18n/types";
import type { Service } from "@/data/services";
import { PageHero } from "@/components/sections/shared/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { serviceIcons } from "@/components/order/serviceIcons";
import { useOrderModal } from "@/components/order/OrderModalProvider";

export function LayananHead() {
  const { dict } = useLang();
  return <PageHero kicker={dict.layanan.kicker} title={dict.layanan.title} sub={dict.layanan.sub} />;
}

export function ServicesFull({ services }: { services: Service[] }) {
  const { lang, dict } = useLang();
  const { open } = useOrderModal();

  return (
    <section className="pb-16" aria-label={dict.layanan.title}>
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => {
          const Icon = serviceIcons[s.icon] ?? Check;
          return (
            <Reveal key={s.slug} delay={0.05 * i}>
              <TiltCard className="h-full">
                <div className="card-editorial flex h-full flex-col p-6 sm:p-7">
                  <div className="flex items-start justify-between mb-5">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Icon size={22} />
                    </span>
                    <div className="text-right">
                      <span className="block font-mono text-xs text-muted-foreground/60">
                        {s.number}
                      </span>
                      {s.duration && (
                        <span className="mt-1 inline-flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
                          <Clock size={11} />
                          {tx(s.duration, lang)}
                        </span>
                      )}
                    </div>
                  </div>

                  <h2 className="font-display font-extrabold text-xl tracking-tight">
                    {tx(s.title, lang)}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {tx(s.description, lang)}
                  </p>

                  <div className="mt-5 rounded-xl bg-muted/50 p-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent mb-2.5">
                      {dict.layanan.outputLabel}
                    </p>
                    <ul className="grid gap-2">
                      {s.outputs.map((o, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm">
                          <Check size={14} className="text-teal dark:text-teal-bright mt-0.5 shrink-0" />
                          <span className="text-foreground/85">{tx(o, lang)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => open(s.slug)}
                    className="mt-6 inline-flex w-full items-center justify-between rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-all hover:shadow-[0_8px_24px_-6px_rgb(226_102_31/0.5)] hover:-translate-y-0.5"
                  >
                    {dict.layanan.pesanIni}
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
