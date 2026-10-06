"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LangProvider";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { useOrderModal } from "@/components/order/OrderModalProvider";

export const navLinks = [
  { href: "/", key: "beranda" },
  { href: "/tentang", key: "tentang" },
  { href: "/keahlian", key: "keahlian" },
  { href: "/partisipasi", key: "partisipasi" },
  { href: "/proyek", key: "proyek" },
  { href: "/layanan", key: "layanan" },
  { href: "/kontak", key: "kontak" },
] as const;

export function Navbar() {
  const { lang, dict } = useLang();
  const { open } = useOrderModal();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-[55] transition-all duration-300 border-b",
        scrolled
          ? "bg-background/85 backdrop-blur-md border-border"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 flex h-16 items-center justify-between gap-3">
        <Link href="/" className="font-display font-extrabold tracking-tight text-lg" aria-label="Avoo Creator — Beranda">
          Avoo<span className="text-accent">.</span>Creator
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5" aria-label="Navigasi utama">
          {navLinks.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative px-3 py-2 text-sm transition-colors rounded-md",
                isActive(item.href)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="font-mono text-[10px] text-accent mr-1 opacity-70">
                {String(i + 1).padStart(2, "0")}
              </span>
              {dict.nav[item.key]}
              {isActive(item.href) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute left-3 right-3 -bottom-[1px] h-[2px] bg-accent rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LanguageSwitcher compact />
          </div>
          <ThemeToggle />
          <button
            onClick={() => open()}
            className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-all hover:shadow-[0_6px_20px_-4px_rgb(226_102_31/0.5)] hover:-translate-y-0.5"
          >
            {dict.nav.orderCta}
            <ArrowUpRight size={15} />
          </button>
          <button
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? dict.nav.closeMenu : dict.nav.openMenu}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden border-t border-border bg-background"
          >
            <nav className="mx-auto max-w-[1240px] px-4 sm:px-6 flex flex-col py-4" aria-label="Navigasi mobile">
              {navLinks.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 py-3 text-base border-b border-border/60 last:border-0",
                      isActive(item.href) ? "text-accent font-semibold" : "text-foreground"
                    )}
                  >
                    <span className="font-mono text-xs opacity-60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {dict.nav[item.key]}
                  </Link>
                </motion.div>
              ))}
              <div className="flex items-center justify-between pt-4 pb-2">
                <LanguageSwitcher />
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    open();
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground"
                >
                  {dict.nav.orderCta}
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
