"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LangProvider";
import { tx } from "@/i18n/types";
import { navLinks } from "./Navbar";
import { services } from "@/data/services";

interface FooterProps {
  email: string;
  location: { id: string; en: string };
}

export function Footer({ email, location }: FooterProps) {
  const { lang, dict } = useLang();
  const pathname = usePathname();
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      try {
        setTime(
          new Intl.DateTimeFormat(lang === "id" ? "id-ID" : "en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "Asia/Jakarta",
          }).format(new Date())
        );
      } catch {
        setTime("--:--");
      }
    };
    update();
    const t = setInterval(update, 30_000);
    return () => clearInterval(t);
  }, [lang]);

  return (
    <footer className="mt-auto border-t border-border bg-muted/40">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="flex flex-col gap-3">
            <Link href="/" className="font-display font-extrabold tracking-tight text-xl">
              Avoo<span className="text-accent">.</span>Creator
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {dict.footer.tagline}
            </p>
            <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin size={12} className="text-accent" />
              {tx(location, lang)}
            </p>
            <p className="font-mono text-xs text-muted-foreground">
              {dict.common.waktuLokal} · <span className="text-foreground">{time} WIB</span>
            </p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
              {dict.footer.navigasi}
            </p>
            <ul className="grid gap-2.5">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-sm transition-colors hover:text-accent ${
                      (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href))
                        ? "text-accent"
                        : "text-foreground/80"
                    }`}
                  >
                    {dict.nav[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
              {dict.footer.layanan}
            </p>
            <ul className="grid gap-2.5">
              {services.slice(0, 5).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/layanan?jasa=${s.slug}`}
                    className="text-sm text-foreground/80 transition-colors hover:text-accent"
                  >
                    {tx(s.title, lang)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
              {dict.footer.kontak}
            </p>
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-accent transition-colors"
            >
              <Mail size={14} className="text-accent" />
              {email}
            </a>
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                { label: "GitHub", href: "https://github.com/avoocreator" },
                { label: "Instagram", href: "https://instagram.com/avoocreator" },
                { label: "LinkedIn", href: "https://linkedin.com/in/avoocreator" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs text-foreground/80 transition-all hover:border-accent hover:text-accent"
                >
                  {s.label}
                  <ArrowUpRight size={11} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Avoo Creator. {dict.footer.hak}
          </p>
          <p className="font-mono">{dict.footer.dibuat}</p>
        </div>
      </div>
    </footer>
  );
}
