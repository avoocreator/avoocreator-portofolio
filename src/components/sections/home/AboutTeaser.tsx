"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Quote } from "lucide-react";
import { useLang } from "@/i18n/LangProvider";
import { tx } from "@/i18n/types";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";

/** Taruh fotomu di public/assets/about/avian.jpg */
const PHOTO_SRC = "/assets/about/avian.jpg";

/** Teaser tentang — grid bento */
export function AboutTeaser() {
  const { lang, dict } = useLang();
  const [photoFailed, setPhotoFailed] = useState(false);

  const cards = [
    {
      title: { id: "Bangun dari nol", en: "Built from scratch" },
      body: {
        id: "Website, desain, sampai prototipe IoT — semua lewat tangan sendiri dari brief pertama sampai serah terima.",
        en: "Websites, designs, even IoT prototypes — all handled personally from the first brief to handover.",
      },
      className: "sm:col-span-2",
    },
    {
      title: { id: "Desain × Kode", en: "Design × Code" },
      body: {
        id: "Dua sisi otak yang bekerja bersama: visual yang berkelas, kode yang rapi.",
        en: "Two sides of the brain working together: classy visuals, clean code.",
      },
      className: "",
    },
    {
      title: { id: "Belajar membangun", en: "Learning by building" },
      body: {
        id: "Setiap proyek adalah ruang kelas — selalu ada satu teknik baru yang dicoba.",
        en: "Every project is a classroom — there's always one new technique being tried.",
      },
      className: "",
    },
  ];

  return (
    <section className="py-20 sm:py-24" aria-label="Tentang singkat">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="flex items-end justify-between gap-6 mb-10">
          <SectionHeading
            kicker={dict.home.aboutKicker}
            title={dict.home.aboutTitle}
          />
          <Reveal delay={0.2} className="hidden md:block shrink-0">
            <Link
              href="/tentang"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:gap-2.5 transition-all"
            >
              {dict.home.aboutLainnya}
              <ArrowUpRight size={15} />
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {/* Kartu foto: memanjang 3 baris di kiri supaya grid rapat tanpa celah */}
          <Reveal className="sm:row-span-3">
            <TiltCard className="h-full">
              <div className="card-editorial relative h-full aspect-[4/5] sm:aspect-auto sm:min-h-[440px] overflow-hidden">
                <img
                  src={photoFailed ? "/assets/mascot/mascot-curious.svg" : PHOTO_SRC}
                  alt={lang === "id" ? "Foto Avian, pemilik Avoo Creator" : "Photo of Avian, owner of Avoo Creator"}
                  onError={() => setPhotoFailed(true)}
                  draggable={false}
                  className={
                    photoFailed
                      ? "absolute inset-0 h-full w-full object-contain p-10"
                      : "absolute inset-0 h-full w-full object-cover object-top"
                  }
                />
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/55 to-transparent"
                  aria-hidden="true"
                />
                <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/90">
                  {lang === "id" ? "Avian — di balik Avoo" : "Avian — behind Avoo"}
                </span>
              </div>
            </TiltCard>
          </Reveal>

          {cards.map((c, i) => (
            <Reveal key={i} delay={0.08 * (i + 1)} className={c.className}>
              <TiltCard className="h-full">
                <div className="card-editorial h-full p-6 flex flex-col gap-2">
                  <h3 className="font-display font-bold text-lg tracking-tight">
                    {tx(c.title, lang)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tx(c.body, lang)}
                  </p>
                </div>
              </TiltCard>
            </Reveal>
          ))}

          {/* Kutipan */}
          <Reveal className="sm:col-span-2">
            <div className="card-editorial h-full p-6 flex items-start gap-4 bg-gradient-to-br from-card to-muted/60">
              <Quote size={22} className="text-accent shrink-0 mt-1" />
              <p className="font-display font-semibold text-lg sm:text-xl leading-snug tracking-tight">
                {lang === "id"
                  ? "“Bangun yang jalan, bukan yang cuma bagus di mockup.”"
                  : "“Build things that run — not things that just look good in mockups.”"}
              </p>
            </div>
          </Reveal>

          <Reveal className="md:hidden">
            <Link
              href="/tentang"
              className="card-editorial flex items-center justify-between p-5 font-medium text-accent"
            >
              {dict.home.aboutLainnya}
              <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}