"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Database,
  ExternalLink,
  ListOrdered,
  RefreshCw,
  TerminalSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { t } from "@/components/admin/strings";

const ENV_SNIPPET = `SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service_role-key-kamu>`;

const steps = [
  { title: t.setup.step1Title, desc: t.setup.step1Desc },
  { title: t.setup.step2Title, desc: t.setup.step2Desc },
  { title: t.setup.step3Title, desc: t.setup.step3Desc },
  { title: t.setup.step4Title, desc: t.setup.step4Desc },
];

/**
 * Layar panduan yang tampil di /admin & /admin/login ketika Supabase
 * belum terhubung (env kosong) atau tabel belum dibuat.
 * Tujuannya: pemilik situs tidak perlu membaca kode — cukup ikuti langkah.
 */
export function SupabaseSetupNotice({ reason }: { reason: "not-configured" | "db-error" }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(ENV_SNIPPET);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard tidak tersedia — biarkan user salin manual */
    }
  };

  return (
    <div className="relative flex min-h-dvh items-center justify-center px-4 py-16">
      <div className="absolute inset-0 grid-lines opacity-50" aria-hidden="true" />
      <div className="absolute -top-16 right-[15%] h-56 w-56 glow-orange rounded-full" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-editorial relative w-full max-w-2xl p-8"
      >
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
            <Database size={22} />
          </div>
          <div>
            <h1 className="font-display text-2xl font-extrabold tracking-tight">
              {t.setup.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {reason === "not-configured" ? t.setup.subNotConfigured : t.setup.subDbError}
            </p>
          </div>
        </div>

        <ol className="mt-6 grid gap-4">
          {steps.map((s, i) => (
            <li key={s.title} className="flex gap-3 rounded-xl border border-border/60 bg-muted/30 p-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-semibold">{s.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-6 rounded-xl border border-border/60 bg-muted/40 p-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="flex items-center gap-1.5 text-xs font-semibold">
              <TerminalSquare size={14} />
              {t.setup.envTitle}
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-7 gap-1.5 px-2 text-[11px]"
              onClick={copy}
            >
              {copied ? t.setup.copied : t.setup.copy}
            </Button>
          </div>
          <pre className="overflow-x-auto rounded-lg bg-background/80 p-3 text-[11px] leading-relaxed text-muted-foreground">
            <code>{ENV_SNIPPET}</code>
          </pre>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link href="/admin">
            <Button className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
              <RefreshCw size={14} />
              {t.setup.retry}
            </Button>
          </Link>
          <a
            href="https://supabase.com/dashboard"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-accent"
          >
            <ExternalLink size={12} />
            Supabase Dashboard
          </a>
        </div>
        <p className="mt-4 flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <ListOrdered size={12} />
          {t.setup.docs}
        </p>
      </motion.div>
    </div>
  );
}
