"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { useLang } from "@/i18n/LangProvider";
import { tx } from "@/i18n/types";
import { Mascot } from "@/components/mascot/Mascot";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { RevealLines } from "@/components/ui/Reveal";
import { ToolLogo } from "@/components/ui/ToolLogo";
import { useOrderModal } from "@/components/order/OrderModalProvider";

export function Hero() {
  const { lang, dict } = useLang();
  const { open } = useOrderModal();

  // Parallax maskot mengikuti kursor
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18 });
  const sy = useSpring(py, { stiffness: 60, damping: 18 });
  const mascotX = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const mascotY = useTransform(sy, [-0.5, 0.5], [-10, 10]);

  const headline =
    lang === "id"
      ? ["Membangun hal yang", "jalan — bukan cuma", "tampil bagus."]
      : ["Building things that", "run — not just", "look good."];

  const handleMouse = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      onMouseMove={handleMouse}
      className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-16"
      aria-label="Intro"
    >
      {/* Dekorasi latar */}
      <div className="absolute inset-0 grid-lines opacity-60" aria-hidden="true" />
      <div className="absolute -top-24 right-[8%] h-72 w-72 glow-orange rounded-full" aria-hidden="true" />
      <div className="absolute top-1/2 -left-24 h-56 w-56 glow-orange rounded-full opacity-50" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal dark:bg-teal-bright" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {dict.common.tersedia}
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="font-mono text-sm text-muted-foreground mb-3"
            >
              {dict.hero.perkenalan}
            </motion.p>

            <h1 className="font-display font-extrabold tracking-tight leading-[1.02] text-[2.6rem] sm:text-6xl lg:text-[4.4rem]">
              <RevealLines lines={[headline[0]]} delay={0.2} />
              <RevealLines
                lines={[headline[1]]}
                delay={0.32}
                lineClassName="[&>span]:text-accent accent-underline"
              />
              <RevealLines lines={[headline[2]]} delay={0.44} lineClassName="[&>span]:text-outline" />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="mt-6 max-w-xl text-muted-foreground leading-relaxed"
            >
              {tx(
                {
                  id: "Saya Avian — web developer & graphic designer dari Jawa Timur. Saya bantu ide kamu jadi website, desain, dan prototipe yang benar-benar bisa dipakai.",
                  en: "I'm Avian — a web developer & graphic designer from East Java. I turn your ideas into websites, designs, and prototypes you can actually use.",
                },
                lang
              )}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <MagneticButton>
                <button
                  onClick={() => open()}
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-[0_8px_24px_-6px_rgb(226_102_31/0.5)] transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles size={16} />
                  {dict.nav.orderCta}
                </button>
              </MagneticButton>
              <Link
                href="/proyek"
                className="inline-flex items-center gap-1.5 rounded-full border border-border-strong px-6 py-3 text-sm font-semibold transition-colors hover:bg-muted"
              >
                {dict.common.lihatProyek}
                <ArrowUpRight size={16} />
              </Link>
            </motion.div>
          </div>

          {/* Maskot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto hidden sm:block"
            aria-hidden="true"
          >
            <motion.div style={{ x: mascotX, y: mascotY }}>
              <Mascot variant="point" eager className="w-[300px] lg:w-[400px] drop-shadow-2xl" />
            </motion.div>
            {/* Chip tool melayang */}
            <div className="absolute -top-2 -left-6 animate-float [animation-delay:-1s]">
              <ToolLogo toolKey="nextdotjs" className="!p-2.5 shadow-lg rotate-[-6deg]" />
            </div>
            <div className="absolute top-1/3 -right-8 animate-float [animation-delay:-2.6s]">
              <ToolLogo toolKey="figma" className="!p-2.5 shadow-lg rotate-[5deg]" />
            </div>
            <div className="absolute -bottom-2 left-10 animate-float [animation-delay:-4s]">
              <ToolLogo toolKey="react" className="!p-2.5 shadow-lg rotate-[-4deg]" />
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-14 flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
        >
          {dict.hero.scroll}
          <ArrowDown size={13} className="animate-bounce-soft text-accent" />
        </motion.div>
      </div>
    </section>
  );
}
