"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  reverse?: boolean;
  slow?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}

/** Marquee CSS murni — konten diduplikasi 2x untuk loop mulus */
export function Marquee({ children, reverse, slow, pauseOnHover = true, className }: MarqueeProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        pauseOnHover && "marquee-paused",
        className
      )}
      aria-hidden="false"
    >
      <div
        className={cn("marquee-track items-center", slow && "[animation-duration:55s]")}
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
