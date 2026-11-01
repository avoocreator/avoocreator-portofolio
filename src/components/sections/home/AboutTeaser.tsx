"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles, Layers, Compass } from "lucide-react";
import { useLang } from "@/i18n/LangProvider";
import { tx } from "@/i18n/types";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function AboutTeaser() {
  const { lang, dict } = useLang();

  const pillars = [
    {
      num: "01",
      title: { id: "Detail yang Berarti", en: "Meaningful Details" },
      desc: {
        id: "Saya suka memperhatikan hal-hal kecil dalam desain, mulai dari pemilihan warna hingga tata letak. Buat saya, detail sederhana bisa membuat sebuah karya terasa jauh lebih baik.",
        en: "I pay close attention to the small things in design, from color palettes to layout. To me, thoughtful details elevate a piece from good to truly memorable.",
      },
      icon: Sparkles,
    },
    {
      num: "02",
      title: { id: "Ide Jadi Nyata", en: "Ideas Made Real" },
      desc: {
        id: "Saya senang mengubah ide menjadi sesuatu yang benar-benar bisa digunakan. Mulai dari merancang tampilan hingga membangun website, saya menikmati setiap proses di baliknya.",
        en: "I love turning ideas into something people can actually use. From designing interfaces to engineering websites, I enjoy every step of the craft.",
      },
      icon: Layers,
    },
    {
      num: "03",
      title: { id: "Selalu Penasaran", en: "Always Curious" },
      desc: {
        id: "Saya suka mencoba hal baru, bereksperimen dengan teknologi, dan mencari tahu bagaimana sesuatu bekerja. Mulai dari pengembangan web hingga proyek robotika, selalu ada hal baru untuk dipelajari.",
        en: "I love trying new things, experimenting with technology, and figuring out how things tick. From web development to robotics projects, there's always something new to learn.",
      },
      icon: Compass,
    },
  ];

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden" aria-label="Tentang Avian">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 items-center">
          
          {/* Sisi Kiri: Foto Kreator bebas tanpa box dengan fade gradient halus di bawah */}
          <Reveal className="flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[320px] sm:max-w-[360px] flex items-center justify-center">
              {/* Pendaran ambient hangat */}
              <div
                className="absolute inset-0 rounded-full bg-accent/15 blur-3xl scale-90 pointer-events-none"
                aria-hidden="true"
              />

              {/* Wrapper dengan CSS gradient mask agar potongan bawah memudar halus */}
              <div
                className="relative z-10 w-full flex items-center justify-center"
                style={{
                  maskImage: "linear-gradient(to bottom, black 65%, transparent 98%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 65%, transparent 98%)",
                }}
              >
                {/* Light mode: Dots - Orange */}
                <img
                  src="/assets/photo/dots-orange.webp"
                  alt={lang === "id" ? "Avian — Avoo Creator" : "Avian — Avoo Creator"}
                  className="w-full h-auto object-contain dark:hidden drop-shadow-[0_20px_35px_rgba(226,102,31,0.2)] transition-transform duration-500 hover:scale-105"
                />
                {/* Dark mode: Dots - White */}
                <img
                  src="/assets/photo/dots-white.webp"
                  alt={lang === "id" ? "Avian — Avoo Creator" : "Avian — Avoo Creator"}
                  className="hidden dark:block w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(255,255,255,0.1)] transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </Reveal>

          {/* Sisi Kanan: Narasi editorial yang mengalir */}
          <div className="flex flex-col gap-8">
            <SectionHeading
              kicker={dict.home.aboutKicker}
              title={
                lang === "id" ? (
                  <>
                    Kenalan dengan orang di balik{" "}
                    <span className="text-accent">Avoo Creator.</span>
                  </>
                ) : (
                  <>
                    Meet the creator behind{" "}
                    <span className="text-accent">Avoo.</span>
                  </>
                )
              }
            />

            <Reveal delay={0.12}>
              <div className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                <p>
                  {lang === "id" ? (
                    <>
                      <strong className="font-bold text-accent">
                        Saya Avian
                      </strong>
                      , kreator di balik Avoo Creator. Berawal dari rasa ingin tahu terhadap teknologi dan desain, saya terus mengeksplorasi cara mengubah ide menjadi karya digital. Mulai dari antarmuka yang intuitif hingga website yang fungsional, saya selalu berusaha menciptakan sesuatu yang sederhana, bermakna, dan bermanfaat.
                    </>
                  ) : (
                    <>
                      <strong className="font-bold text-accent">
                        I&apos;m Avian
                      </strong>
                      , the creator behind Avoo Creator. Rooted in a deep curiosity for technology and design, I constantly explore ways to turn ideas into digital works. From intuitive interfaces to functional websites, I always strive to create something simple, meaningful, and purposeful.
                    </>
                  )}
                </p>
              </div>
            </Reveal>

            {/* 3 Pilar Editorial — tanpa kartu kotak kaku */}
            <div className="border-t border-border divide-y divide-border">
              {pillars.map((p, idx) => (
                <Reveal key={p.num} delay={0.16 + idx * 0.08}>
                  <div className="py-4.5 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 group">
                    <div className="flex items-center gap-2 sm:w-44 shrink-0">
                      <span className="font-mono text-xs text-accent font-semibold tracking-wider">
                        {p.num}
                      </span>
                      <h3 className="font-display font-bold text-base text-foreground group-hover:text-accent transition-colors">
                        {tx(p.title, lang)}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {tx(p.desc, lang)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Tautan ke halaman lengkap */}
            <Reveal delay={0.4}>
              <div className="pt-2">
                <Link
                  href="/tentang"
                  className="inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-2.5 text-sm font-semibold transition-all hover:bg-muted hover:border-foreground/30 hover:gap-3"
                >
                  {dict.home.aboutLainnya}
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </Reveal>

          </div>

        </div>
      </div>
    </section>
  );
}
