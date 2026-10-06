"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircleQuestion } from "lucide-react";
import { useLang } from "@/i18n/LangProvider";
import { tx } from "@/i18n/types";
import type { FaqItem } from "@/data/faq";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";

/** FAQ accordion + ajakan tanya langsung */
export function FaqSection({ items }: { items: FaqItem[] }) {
  const { lang, dict } = useLang();

  return (
    <section className="py-16 sm:py-20 bg-muted/30 border-y border-border" aria-label="FAQ">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              kicker={dict.faqV.label}
              title={dict.layanan.faqLabel}
              sub={dict.layanan.faqSub}
            />
            <Reveal delay={0.2}>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                <MessageCircleQuestion size={16} />
                WhatsApp
              </a>
            </Reveal>
          </div>

          <div>
            <Accordion type="single" collapsible className="grid gap-3">
              {items.map((f, i) => (
                <Reveal key={i} delay={0.05 * i} blur={false}>
                  <AccordionItem
                    value={`faq-${i}`}
                    className="card-editorial !border-border px-5 data-[state=open]:border-accent/40"
                  >
                    <AccordionTrigger className="py-4 text-left font-display font-bold text-base tracking-tight hover:no-underline">
                      {tx(f.q, lang)}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-sm text-muted-foreground leading-relaxed">
                      {tx(f.a, lang)}
                    </AccordionContent>
                  </AccordionItem>
                </Reveal>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
