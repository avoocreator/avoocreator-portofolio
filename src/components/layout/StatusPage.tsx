"use client";

import Link from "next/link";
import { Mascot } from "@/components/mascot/Mascot";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LangProvider";

interface StatusPageProps {
  code: string;
  title: { id: string; en: string };
  body: { id: string; en: string };
  /** Tombol kedua (mis. "Coba lagi" pada halaman error) */
  onRetry?: () => void;
}

/** Halaman status (404 / error) dengan maskot, selaras dengan gaya situs */
export function StatusPage({ code, title, body, onRetry }: StatusPageProps) {
  const { lang } = useLang();
  return (
    <section className="mx-auto flex min-h-[70dvh] max-w-[1240px] flex-col items-center justify-center gap-6 px-4 py-24 text-center sm:px-6">
      <Mascot variant="curious" className="w-44 sm:w-56" />
      <p className="font-mono text-sm tracking-widest text-accent">{code}</p>
      <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{title[lang]}</h1>
      <p className="max-w-md text-muted-foreground">{body[lang]}</p>
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/">{lang === "id" ? "Kembali ke beranda" : "Back to home"}</Link>
        </Button>
        {onRetry && (
          <Button variant="outline" onClick={onRetry}>
            {lang === "id" ? "Coba lagi" : "Try again"}
          </Button>
        )}
      </div>
    </section>
  );
}
