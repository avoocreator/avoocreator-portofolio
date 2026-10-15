"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, Loader2, ExternalLink, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { t } from "@/components/admin/strings";

export function AdminLoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<"invalid" | "db" | null>(null);
  const [checking, setChecking] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setChecking(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        router.replace("/admin");
        router.refresh();
        return;
      }
      setError(json.error === "DB_NOT_CONFIGURED" || res.status >= 500 ? "db" : "invalid");
    } catch {
      setError("db");
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="relative flex min-h-dvh items-center justify-center px-4 py-16">
      <div className="absolute inset-0 grid-lines opacity-50" aria-hidden="true" />
      <div className="absolute -top-16 right-[15%] h-56 w-56 glow-orange rounded-full" aria-hidden="true" />
      <div className="absolute bottom-0 -left-16 h-48 w-48 glow-orange rounded-full opacity-40" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-editorial relative w-full max-w-sm p-8"
      >
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
          <Lock size={22} />
        </div>
        <h1 className="font-display font-extrabold text-2xl tracking-tight">
          {t.login.title}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{t.login.sub}</p>
        <form onSubmit={login} className="mt-6 grid gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="admin-username" className="text-xs font-semibold">
              {t.login.username}
            </Label>
            <Input
              id="admin-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t.login.usernamePh}
              autoComplete="username"
              autoFocus
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="admin-password" className="text-xs font-semibold">
              {t.login.password}
            </Label>
            <Input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.login.passwordPh}
              autoComplete="current-password"
            />
          </div>
          {error === "invalid" && (
            <p className="text-xs text-destructive">{t.login.salah}</p>
          )}
          {error === "db" && (
            <div className="flex gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs leading-relaxed text-destructive">
              <TriangleAlert size={14} className="mt-0.5 shrink-0" />
              <span>
                Supabase belum terhubung. Isi SUPABASE_URL &amp; SUPABASE_SERVICE_ROLE_KEY
                di .env.local, lalu restart aplikasi (lihat PANDUAN-DEPLOY.md).
              </span>
            </div>
          )}
          <Button
            type="submit"
            disabled={checking || !username || !password}
            className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
          >
            {checking ? <Loader2 size={15} className="animate-spin" /> : null}
            {checking ? t.login.submitting : t.login.submit}
          </Button>
        </form>
        <p className="mt-5 rounded-lg bg-muted/60 p-3 text-[11px] leading-relaxed text-muted-foreground">
          {t.login.firstHint}
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-accent"
        >
          <ExternalLink size={12} />
          {t.login.kembali}
        </Link>
      </motion.div>
    </div>
  );
}
