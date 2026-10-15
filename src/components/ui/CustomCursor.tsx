"use client";

import { useEffect, useRef } from "react";

/** Kursor kustom: titik + cincin dengan delay. Nonaktif di layar sentuh & reduced-motion. */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    document.body.dataset.cursor = "on";
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let hovering = false;
    let visible = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      visible = true;
      const t = e.target as HTMLElement | null;
      hovering = !!t?.closest?.(
        'a, button, [data-hover], input, textarea, select, label, [role="button"], summary'
      );
    };
    const onLeave = () => {
      visible = false;
    };

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%) scale(${hovering ? 0.4 : 1})`;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%) scale(${hovering ? 1.8 : 1})`;
      dot.style.opacity = ring.style.opacity = visible ? "1" : "0";
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      delete document.body.dataset.cursor;
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[100] pointer-events-none hidden md:block h-1.5 w-1.5 rounded-full bg-accent opacity-0"
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[100] pointer-events-none hidden md:block h-8 w-8 rounded-full border-[1.5px] border-accent/70 opacity-0"
        aria-hidden="true"
      />
    </>
  );
}
