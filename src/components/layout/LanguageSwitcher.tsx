"use client";

import { useLang } from "@/i18n/LangProvider";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/** Switcher bahasa ID/EN dengan indikator geser */
export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLang();
  return (
    <div
      className={cn(
        "relative flex items-center rounded-full border border-border bg-muted/60 p-0.5",
        compact ? "h-8" : "h-9"
      )}
      role="group"
      aria-label="Language"
    >
      {(["id", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={cn(
            "relative z-10 rounded-full px-2.5 font-mono text-[11px] font-medium uppercase tracking-wide transition-colors",
            lang === l ? "text-accent-foreground" : "text-muted-foreground hover:text-foreground"
          )}
          aria-pressed={lang === l}
        >
          {lang === l && (
            <motion.span
              layoutId={compact ? "lang-pill-c" : "lang-pill"}
              className="absolute inset-0 -z-10 rounded-full bg-accent"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          {l}
        </button>
      ))}
    </div>
  );
}
