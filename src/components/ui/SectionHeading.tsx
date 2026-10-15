"use client";

import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  kicker: string;
  title: string;
  sub?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}

/** Kepala section editorial: kicker mono + judul display besar + sub */
export function SectionHeading({
  kicker,
  title,
  sub,
  align = "left",
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <Reveal y={16} blur={false}>
        <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
          <span className="h-px w-8 bg-accent/60" aria-hidden="true" />
          {kicker}
          {align === "center" && <span className="h-px w-8 bg-accent/60" aria-hidden="true" />}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={cn(
            "font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.08] max-w-3xl",
            titleClassName
          )}
        >
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.16}>
          <p className={cn("text-muted-foreground max-w-2xl leading-relaxed", align === "center" && "mx-auto")}>
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}
