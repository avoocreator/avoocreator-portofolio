"use client";

import { cn } from "@/lib/utils";
import { Fragment, type CSSProperties, type ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  reverse?: boolean;
  slow?: boolean;
  pauseOnHover?: boolean;
  repeat?: number;
  className?: string;
}

export function Marquee({
  children,
  reverse,
  slow,
  pauseOnHover = true,
  repeat = 3,
  className,
}: MarqueeProps) {
  // Durasi dikali `repeat` supaya kecepatan geser tetap sama seperti sebelumnya
  const baseDuration = slow ? 55 : 32;
  const style: CSSProperties = {
    animationDuration: `${baseDuration * repeat}s`,
    ...(reverse ? { animationDirection: "reverse" } : null),
  };

  return (
    <div className={cn("relative overflow-hidden", pauseOnHover && "marquee-paused", className)}>
      <div className="marquee-track items-center" style={style}>
        {Array.from({ length: repeat * 2 }).map((_, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center"
            aria-hidden={i === 0 ? undefined : true}
          >
            <Fragment>{children}</Fragment>
          </div>
        ))}
      </div>
    </div>
  );
}