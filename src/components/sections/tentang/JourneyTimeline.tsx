"use client";

import { useLang } from "@/i18n/LangProvider";
import { experienceItems } from "@/data/experience";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { Quote } from "lucide-react";
import { aboutContent } from "@/data/about";

/** Timeline perjalanan + kutipan */
export function JourneyTimeline() {
  const { lang, dict } = useLang();

  return (
    <section className="py-16 sm:py-20 bg-muted/30 border-y border-border" aria-label="Perjalanan">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <SectionHeading
          kicker={dict.tentang.perjalananLabel}
          title={lang === "id" ? "Milestone yang membentuk" : "Milestones that shaped me"}
          sub={dict.tentang.perjalananSub}
        />

        <div className="relative mt-12">
          {/* Garis timeline */}
          <div
            className="absolute left-[19px] sm:left-1/2 top-0 bottom-0 w-px bg-border sm:-translate-x-1/2"
            aria-hidden="true"
          />

          <div className="grid gap-10">
            {experienceItems.map((item, i) => {
              const left = i % 2 === 0;
              return (
                <Reveal key={i} delay={0.06 * i} y={30}>
                  <div
                    className={`relative flex gap-6 sm:gap-0 ${
                      left ? "sm:flex-row" : "sm:flex-row-reverse"
                    }`}
                  >
                    {/* Titik */}
                    <span
                      className="absolute left-[19px] sm:left-1/2 top-1.5 -translate-x-1/2 flex h-3.5 w-3.5 items-center justify-center"
                      aria-hidden="true"
                    >
                      <span
                        className={`h-3 w-3 rotate-45 border-2 ${
                          item.highlight ? "border-accent bg-accent" : "border-border-strong bg-background"
                        }`}
                      />
                    </span>

                    {/* Tahun (desktop) */}
                    <div className={`hidden sm:block sm:w-1/2 ${left ? "sm:pr-16 sm:text-right" : "sm:pl-16"}`}>
                      <span className="font-display text-3xl font-extrabold tracking-tight text-muted-foreground/40">
                        {item.year}
                      </span>
                    </div>

                    {/* Konten */}
                    <div className={`pl-12 sm:pl-0 sm:w-1/2 ${left ? "" : "sm:pl-16"}`}>
                      <div
                        className={`card-editorial p-5 sm:p-6 ${
                          item.highlight ? "border-accent/40" : ""
                        }`}
                      >
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Tag className="!bg-accent/10 !text-accent !border-accent/30">
                            {item.year}
                          </Tag>
                          <Tag>{item.category[lang]}</Tag>
                        </div>
                        <h3 className="font-display font-bold text-lg tracking-tight">
                          {item.title[lang]}
                        </h3>
                        <p className="font-mono text-xs text-accent mt-0.5">{item.role[lang]}</p>
                        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                          {item.description[lang]}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Kutipan */}
        <Reveal delay={0.1} className="mt-14">
          <figure className="mx-auto max-w-2xl rounded-2xl border border-accent/25 bg-accent/5 p-8 text-center">
            <Quote size={24} className="mx-auto mb-4 text-accent" aria-hidden="true" />
            <blockquote className="font-display font-semibold text-xl sm:text-2xl leading-snug tracking-tight">
              “{aboutContent.quote.text[lang]}”
            </blockquote>
            <figcaption className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              — {aboutContent.quote.author}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
