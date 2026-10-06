"use client";

import { Marquee } from "@/components/ui/Marquee";
import { useLang } from "@/i18n/LangProvider";

/** Ticker role bergaya editorial antara hero dan section berikutnya */
export function RolesMarquee() {
  const { dict } = useLang();
  const roles = dict.hero.roles;
  return (
    <div className="border-y border-border bg-card/60 py-4">
      <Marquee>
        {roles.map((role, i) => (
          <span key={i} className="flex items-center">
            <span
              className={`mx-6 font-display text-2xl sm:text-3xl font-extrabold tracking-tight whitespace-nowrap ${
                i % 2 === 0 ? "text-foreground/85" : "text-outline"
              }`}
            >
              {role}
            </span>
            <span className="h-2 w-2 rotate-45 bg-accent" aria-hidden="true" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
