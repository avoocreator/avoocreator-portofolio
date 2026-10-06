"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useLang } from "@/i18n/LangProvider";
import { aboutContent } from "@/data/about";
import { Reveal } from "@/components/ui/Reveal";
import { Mascot } from "@/components/mascot/Mascot";
import { tx } from "@/i18n/types";

/** Pembuka halaman Tentang — intro + maskot interaktif */
export function TentangHero() {
  const { lang, dict } = useLang();

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 70, damping: 18 });
  const sy = useSpring(py, { stiffness: 70, damping: 18 });
  const rotX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const rotY = useTransform(sx, [-0.5, 0.5], [-10, 10]);

  const handleMouse = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      onMouseMove={handleMouse}
      className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-16"
    >
      <div className="absolute inset-0 grid-lines opacity-50" aria-hidden="true" />
      <div className="absolute -top-16 right-[12%] h-64 w-64 glow-orange rounded-full" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <Reveal y={14} blur={false}>
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                <span className="h-px w-8 bg-accent/60" aria-hidden="true" />
                {dict.tentang.kicker}
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-4 font-display font-extrabold tracking-tight leading-[1.03] text-4xl sm:text-5xl lg:text-6xl">
                {dict.tentang.title}
                <span className="text-accent">.</span>
              </h1>
            </Reveal>
            <div className="mt-6 grid gap-4 max-w-2xl">
              {aboutContent.intro.map((p, i) => (
                <Reveal key={i} delay={0.18 + i * 0.08}>
                  <p
                    className={`leading-relaxed ${
                      i === 0 ? "text-foreground/90 text-base sm:text-lg" : "text-muted-foreground text-sm sm:text-base"
                    }`}
                  >
                    {tx(p, lang)}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.25} className="mx-auto">
            <motion.div style={{ rotateX: rotX, rotateY: rotY, perspective: 900 }}>
              <Mascot variant="curious" eager className="w-[260px] lg:w-[340px] drop-shadow-2xl" />
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
