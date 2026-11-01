"use client";

import { useState } from "react";
import {
  Mail,
  MessageCircle,
  Clock,
  Sparkles,
  ArrowUpRight,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  Copy,
  Check,
  type LucideIcon,
} from "lucide-react";
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
  availability?: L;
}

const socialMeta: Record<
  string,
  { icon: LucideIcon; desc: { id: string; en: string }; hoverColor: string }
> = {
  GitHub: {
    icon: Github,
    desc: {
      id: "Repositori kode, eksplorasi Next.js, dan proyek open-source.",
      en: "Code repositories, Next.js experiments, and open-source work.",
    },
    hoverColor: "group-hover:text-foreground group-hover:border-foreground/30",
  },
  Instagram: {
    icon: Instagram,
    desc: {
      id: "Karya desain visual, tipografi, dan update aktivitas kreatif.",
      en: "Visual design, typography showcases, and creative updates.",
    },
    hoverColor: "group-hover:text-[#E4405F] group-hover:border-[#E4405F]/40",
  },
  LinkedIn: {
    icon: Linkedin,
    desc: {
      id: "Profil profesional, rekam jejak pengalaman, dan koneksi kerja.",
      en: "Professional profile, experience highlights, and career network.",
    },
    hoverColor: "group-hover:text-[#0A66C2] group-hover:border-[#0A66C2]/40",
  },
};

export function KontakView({ email, whatsapp, socials, location, availability }: KontakProps) {
  const { lang, dict } = useLang();
  const { open } = useOrderModal();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <PageHero kicker={dict.kontak.kicker} title={dict.kontak.title} sub={dict.kontak.sub} />

      <section className="pb-24 sm:pb-28" aria-label="Detail Kontak">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14 items-start">
            
            {/* =========================================
                KOLOM KIRI: Status, Info Kerja, & Form CTA
                ========================================= */}
            <div className="flex flex-col gap-6">
              
              {/* Kartu Status Ketersediaan */}
              <Reveal>
                <div className="card-editorial p-6 sm:p-7 relative overflow-hidden">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal dark:bg-teal-bright" />
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-teal dark:text-teal-bright font-semibold">
                      {availability ? tx(availability, lang) : dict.common.tersedia}
                    </span>
                  </div>
                  <h2 className="font-display font-bold text-xl sm:text-2xl tracking-tight leading-snug">
                    {lang === "id"
                      ? "Terbuka untuk diskusi proyek & kerja sama."
                      : "Open for project discussions & collaborations."}
                  </h2>
                  <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">
                    {lang === "id"
                      ? "Siap membantu merancang antarmuka, membangun website modern, atau bertukar ide seputar teknologi kreatif."
                      : "Ready to assist with UI design, modern web engineering, or creative tech brainstorming."}
                  </p>
                </div>
              </Reveal>

              {/* Info Operasional Ringkas: Jam Kerja & Lokasi */}
              <Reveal delay={0.08}>
                <div className="card-editorial p-6 divide-y divide-border/60">
                  {/* Jam Respons */}
                  <div className="pb-5 flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Clock size={19} />
                    </span>
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                        {dict.kontak.jamLabel}
                      </p>
                      <p className="mt-0.5 font-display font-bold text-base text-foreground">
                        {dict.kontak.jamValue}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {dict.kontak.jamSub}
                      </p>
                    </div>
                  </div>

                  {/* Lokasi & Lingkup Kerja */}
                  <div className="pt-5 flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <MapPin size={19} />
                    </span>
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                        {dict.kontak.lokasiLabel}
                      </p>
                      <p className="mt-0.5 font-display font-bold text-base text-foreground">
                        {tx(location, lang)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {dict.kontak.lokasiSub}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Kartu CTA: Form Pemesanan Terstruktur */}
              <Reveal delay={0.14}>
                <div className="relative overflow-hidden rounded-3xl bg-ink dark:bg-void-surface text-cream dark:text-cream p-7 sm:p-8">
                  <div
                    className="absolute -top-16 -right-10 h-48 w-48 rounded-full bg-accent/20 blur-3xl pointer-events-none"
                    aria-hidden="true"
                  />
                  <div className="relative z-10 flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-accent">
                      <Sparkles size={18} />
                      <span className="font-mono text-xs uppercase tracking-[0.18em] text-orange-bright">
                        {dict.kontak.orderLabel}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-xl sm:text-2xl tracking-tight leading-snug">
                      {dict.kontak.formPesananTitle}
                    </h3>
                    <p className="text-sm text-cream/75 dark:text-cream/70 leading-relaxed">
                      {dict.kontak.formPesananSub}
                    </p>
                    <div className="pt-2">
                      <MagneticButton>
                        <button
                          onClick={() => open()}
                          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-all hover:bg-orange-bright hover:shadow-[0_8px_20px_-4px_rgba(226,102,31,0.5)]"
                        >
                          {dict.kontak.bukaForm}
                          <ArrowUpRight size={16} />
                        </button>
                      </MagneticButton>
                    </div>
                  </div>
                </div>
              </Reveal>

            </div>

            {/* =========================================
                KOLOM KANAN: Kanal Langsung & Media Sosial
                ========================================= */}
            <div className="flex flex-col gap-8">
              
              {/* Grup 1: Kanal Langsung (WhatsApp & Email/Gmail) */}
              <div className="flex flex-col gap-4">
                <Reveal delay={0.05}>
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                    {lang === "id" ? "Kanal Langsung" : "Direct Channels"}
                  </span>
                </Reveal>

                {/* Kartu WhatsApp */}
                <Reveal delay={0.1}>
                  <div className="card-editorial p-6 sm:p-7 relative overflow-hidden group border-accent/40 bg-accent/5 hover:border-accent transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-[0_6px_20px_-4px_rgba(226,102,31,0.4)]">
                          <MessageCircle size={26} />
                        </span>
                        <div>
                          <div className="flex items-center gap-2.5">
                            <h3 className="font-display font-bold text-xl tracking-tight">
                              {dict.kontak.waLabel}
                            </h3>
                            <span className="inline-block rounded-full bg-accent/15 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-accent uppercase tracking-wider">
                              {dict.kontak.responCepat}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                            {dict.kontak.waSub}
                          </p>
                        </div>
                      </div>

                      <a
                        href={`https://wa.me/${whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5 shrink-0"
                      >
                        {dict.kontak.chatWa}
                        <ArrowUpRight size={15} />
                      </a>
                    </div>
                  </div>
                </Reveal>

                {/* Kartu Email (Gmail) */}
                <Reveal delay={0.15}>
                  <div className="card-editorial p-6 sm:p-7 group hover:border-accent/50 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5">
                      <div className="flex items-start gap-4">
                        <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-teal/10 text-teal dark:text-teal-bright transition-transform group-hover:scale-105">
                          <Mail size={26} />
                        </span>
                        <div>
                          <h3 className="font-display font-bold text-xl tracking-tight">
                            {dict.kontak.emailLabel}
                          </h3>
                          <p className="mt-0.5 font-mono text-sm font-medium text-foreground">
                            {email}
                          </p>
                          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                            {dict.kontak.emailSub}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap sm:flex-col gap-2 shrink-0">
                        <a
                          href={`mailto:${email}`}
                          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border-strong px-4 py-2 text-xs font-semibold hover:border-accent hover:text-accent transition-colors"
                        >
                          {dict.kontak.kirimEmail}
                          <ArrowUpRight size={13} />
                        </a>
                        <button
                          type="button"
                          onClick={handleCopyEmail}
                          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                        >
                          {copied ? (
                            <>
                              <Check size={13} className="text-teal dark:text-teal-bright" />
                              <span className="text-teal dark:text-teal-bright font-semibold">
                                {dict.kontak.tersalin}
                              </span>
                            </>
                          ) : (
                            <>
                              <Copy size={13} />
                              <span>{dict.kontak.salinEmail}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </Reveal>

              </div>

              {/* Grup 2: Media Sosial (IG, LinkedIn, GitHub) */}
              <div className="flex flex-col gap-4 pt-2">
                <Reveal delay={0.2}>
                  <div>
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                      {dict.kontak.jejaringLabel}
                    </span>
                    <p className="text-sm text-muted-foreground mt-1">
                      {dict.kontak.jejaringSub}
                    </p>
                  </div>
                </Reveal>

                <div className="grid gap-3.5">
                  {socials.map((s, idx) => {
                    const meta = socialMeta[s.label] ?? {
                      icon: ArrowUpRight,
                      desc: { id: "Tautan profil", en: "Profile link" },
                      hoverColor: "group-hover:text-accent",
                    };
                    const Icon = meta.icon;

                    return (
                      <Reveal key={s.label} delay={0.22 + idx * 0.06}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`card-editorial group flex items-center justify-between p-5 transition-all duration-300 hover:-translate-y-0.5 ${meta.hoverColor}`}
                        >
                          <div className="flex items-center gap-4">
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-card border border-border group-hover:border-current transition-colors">
                              <Icon size={20} className="transition-transform group-hover:scale-110" />
                            </span>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-display font-bold text-base text-foreground group-hover:text-current transition-colors">
                                  {s.label}
                                </h4>
                                {s.handle && (
                                  <span className="font-mono text-xs text-muted-foreground">
                                    {s.handle}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                                {tx(meta.desc, lang)}
                              </p>
                            </div>
                          </div>

                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-all group-hover:border-current group-hover:text-current group-hover:translate-x-0.5">
                            <ArrowUpRight size={14} />
                          </span>
                        </a>
                      </Reveal>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  );
}
