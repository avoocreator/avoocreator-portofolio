"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, Clock, Sparkles, ArrowUpRight, MapPin } from "lucide-react";
import { useLang } from "@/i18n/LangProvider";
import { tx, type L } from "@/i18n/types";
import { PageHero } from "@/components/sections/shared/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useOrderModal } from "@/components/order/OrderModalProvider";

interface KontakProps {
  email: string;
  whatsapp: string;
  socials: { label: string; href: string; handle?: string }[];
  location: L;
}

export function KontakView({ email, whatsapp, socials, location }: KontakProps) {
  const { lang, dict } = useLang();
  const { open } = useOrderModal();

  const cards = [
    {
      icon: Mail,
      label: dict.kontak.emailLabel,
      sub: dict.kontak.emailSub,
      value: email,
      href: `mailto:${email}`,
      accent: false,
    },
    {
      icon: MessageCircle,
      label: dict.kontak.waLabel,
      sub: dict.kontak.waSub,
      value: "+62 812-xxxx-xxxx",
      href: `https://wa.me/${whatsapp}`,
      accent: true,
    },
  ];

  return (
    <>
      <PageHero kicker={dict.kontak.kicker} title={dict.kontak.title} sub={dict.kontak.sub} />

      <section className="pb-20" aria-label="Kontak">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 grid gap-4">
          {/* Kanal utama */}
          <div className="grid gap-4 md:grid-cols-2">
            {cards.map((c, i) => (
              <Reveal key={c.label} delay={0.06 * i}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={`group flex h-full flex-col rounded-2xl border p-7 transition-all hover:-translate-y-1 ${
                    c.accent
                      ? "border-accent/40 bg-accent/5 hover:shadow-[0_12px_36px_-12px_rgb(226_102_31/0.4)]"
                      : "border-border bg-card card-editorial"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                        c.accent ? "bg-accent text-accent-foreground" : "bg-accent/10 text-accent"
                      }`}
                    >
                      <c.icon size={22} />
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    />
                  </div>
                  <p className="mt-5 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {c.label}
                  </p>
                  <p className="mt-1 font-display font-bold text-xl tracking-tight">{c.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{c.sub}</p>
                </a>
              </Reveal>
            ))}
          </div>

          {/* Jam respons + sosial */}
          <div className="grid gap-4 md:grid-cols-3">
            <Reveal>
              <div className="card-editorial h-full p-6">
                <Clock size={20} className="text-teal dark:text-teal-bright" />
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {dict.kontak.jamLabel}
                </p>
                <p className="mt-1 font-semibold">{dict.kontak.jamValue}</p>
                <p className="text-sm text-muted-foreground">{dict.kontak.jamSub}</p>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="card-editorial h-full p-6">
                <MapPin size={20} className="text-teal dark:text-teal-bright" />
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Lokasi
                </p>
                <p className="mt-1 font-semibold">{tx(location, lang)}</p>
                <p className="text-sm text-muted-foreground">
                  {lang === "id" ? "Remote — seluruh Indonesia" : "Remote — all of Indonesia"}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="card-editorial h-full p-6">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {dict.kontak.sosialLabel}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-border px-3.5 py-1.5 text-xs font-medium transition-colors hover:border-accent hover:text-accent"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* CTA order */}
          <Reveal delay={0.1}>
            <motion.div
              whileHover={{ scale: 1.005 }}
              className="relative overflow-hidden rounded-3xl bg-ink dark:bg-void-surface text-cream dark:text-cream p-8 sm:p-12"
            >
              <div className="absolute -top-16 -right-10 h-56 w-56 rounded-full bg-accent/25 blur-3xl animate-pulse-soft" aria-hidden="true" />
              <div className="relative flex flex-wrap items-center justify-between gap-6">
                <div className="max-w-xl">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-orange-bright mb-3">
                    {dict.kontak.orderLabel}
                  </p>
                  <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight">
                    {dict.home.ctaTitle}
                  </h2>
                  <p className="mt-2 text-cream/70 dark:text-cream/60 text-sm sm:text-base">
                    {dict.kontak.orderSub}
                  </p>
                </div>
                <MagneticButton>
                  <button
                    onClick={() => open()}
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5"
                  >
                    <Sparkles size={16} />
                    {dict.common.pesanSekarang}
                  </button>
                </MagneticButton>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
