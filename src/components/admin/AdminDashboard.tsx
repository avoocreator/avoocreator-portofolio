"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Lock,
  Inbox,
  CalendarClock,
  Database,
  RefreshCw,
  ExternalLink,
  LogOut,
  MessageCircle,
  ShieldCheck,
  CloudOff,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLang } from "@/i18n/LangProvider";
import { cn } from "@/lib/utils";

interface OrderRecord {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  service: string;
  message: string;
  budget?: string | null;
  deadline?: string | null;
  refLink?: string | null;
  storedVia: string;
  createdAt: string;
}

interface StrapiStatus {
  configured: boolean;
  connected: boolean;
  url: string;
}

export function AdminDashboard() {
  const { dict } = useLang();
  const [passcode, setPasscode] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [checking, setChecking] = useState(false);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [source, setSource] = useState<"strapi" | "local" | null>(null);
  const [demoPasscode, setDemoPasscode] = useState<string | null>(null);
  const [strapiStatus, setStrapiStatus] = useState<StrapiStatus | null>(null);

  const loadOrders = useCallback(async (pass: string) => {
    const res = await fetch("/api/orders", { headers: { "x-admin-passcode": pass } });
    if (res.status === 401) return false;
    const json = await res.json();
    if (json.ok) {
      setOrders(json.orders);
      setSource(json.source);
      setDemoPasscode(json.demoPasscode ?? null);
      return true;
    }
    return false;
  }, []);

  const loadStrapiStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/strapi-status");
      setStrapiStatus(await res.json());
    } catch {
      setStrapiStatus({ configured: false, connected: false, url: "" });
    }
  }, []);

  useEffect(() => {
    loadStrapiStatus();
    const stored = sessionStorage.getItem("avoo-admin-pass");
    if (stored) {
      loadOrders(stored).then((ok) => {
        if (ok) {
          setPasscode(stored);
          setAuthed(true);
        } else {
          sessionStorage.removeItem("avoo-admin-pass");
        }
      });
    }
  }, [loadOrders, loadStrapiStatus]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setChecking(true);
    setAuthError(false);
    const ok = await loadOrders(passcode);
    setChecking(false);
    if (ok) {
      setAuthed(true);
      sessionStorage.setItem("avoo-admin-pass", passcode);
    } else {
      setAuthError(true);
    }
  };

  const logout = () => {
    setAuthed(false);
    setPasscode("");
    sessionStorage.removeItem("avoo-admin-pass");
  };

  const weekCount = orders.filter(
    (o) => Date.now() - new Date(o.createdAt).getTime() < 7 * 24 * 3600 * 1000
  ).length;

  if (!authed) {
    return (
      <div className="flex min-h-dvh items-center justify-center px-4 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-editorial w-full max-w-sm p-8"
        >
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
            <Lock size={22} />
          </div>
          <h1 className="font-display font-extrabold text-2xl tracking-tight">
            {dict.admin.title}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{dict.admin.sub}</p>
          <form onSubmit={login} className="mt-6 grid gap-3">
            <Input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder={dict.admin.passLabel}
              autoFocus
            />
            {authError && <p className="text-xs text-destructive">{dict.admin.salah}</p>}
            {demoPasscode && !authError && (
              <p className="text-xs text-muted-foreground">
                {dict.admin.demoHint}:{" "}
                <code className="font-mono text-accent">{demoPasscode}</code>
              </p>
            )}
            <Button
              type="submit"
              disabled={checking}
              className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
            >
              {checking ? <Loader2 size={15} className="animate-spin" /> : null}
              {dict.admin.masuk}
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6">
      <div className="mx-auto max-w-[1240px]">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display font-extrabold text-3xl tracking-tight">
              {dict.admin.title}
            </h1>
            <p className="text-sm text-muted-foreground">{dict.admin.sub}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => loadOrders(passcode)}
              className="gap-1.5"
            >
              <RefreshCw size={14} />
              {dict.admin.cekLagi}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="gap-1.5 text-muted-foreground"
            >
              <LogOut size={14} />
              {dict.admin.keluar}
            </Button>
          </div>
        </div>

        {/* Stat ringkas */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="card-editorial p-5">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Inbox size={15} className="text-accent" />
              {dict.admin.totalPesanan}
            </div>
            <p className="mt-2 font-display text-4xl font-extrabold">{orders.length}</p>
          </div>
          <div className="card-editorial p-5">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <CalendarClock size={15} className="text-accent" />
              {dict.admin.mingguIni}
            </div>
            <p className="mt-2 font-display text-4xl font-extrabold">{weekCount}</p>
          </div>
          <div className="card-editorial p-5">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Database size={15} className="text-accent" />
              {dict.admin.sumberData}
            </div>
            <p className="mt-2.5">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
                  source === "strapi"
                    ? "border-teal/40 bg-teal/10 text-teal dark:text-teal-bright"
                    : "border-border bg-muted text-muted-foreground"
                )}
              >
                {source === "strapi" ? dict.admin.strapiTersambung : dict.admin.strapiTidak}
              </span>
            </p>
          </div>
        </div>

        {/* Status Strapi */}
        <div className="mt-4 card-editorial p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {strapiStatus?.connected ? (
                <ShieldCheck size={20} className="text-teal dark:text-teal-bright" />
              ) : (
                <CloudOff size={20} className="text-muted-foreground" />
              )}
              <div>
                <p className="text-sm font-semibold">
                  {strapiStatus?.connected
                    ? dict.admin.strapiTersambung
                    : dict.admin.strapiTidak}
                </p>
                {strapiStatus?.configured && (
                  <p className="font-mono text-xs text-muted-foreground break-all">
                    {strapiStatus.url}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={loadStrapiStatus}>
                {dict.admin.strapiCek}
              </Button>
              {strapiStatus?.configured && (
                <a
                  href={`${strapiStatus.url}/admin`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex"
                >
                  <Button
                    size="sm"
                    className="bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5"
                  >
                    {dict.admin.strapiPanel}
                    <ExternalLink size={13} />
                  </Button>
                </a>
              )}
            </div>
          </div>
          {!strapiStatus?.configured && (
            <p className="mt-3 rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">{dict.admin.panduanTitle}:</strong>{" "}
              {dict.admin.panduanSub}
            </p>
          )}
        </div>

        {/* Daftar pesanan */}
        <h2 className="mt-10 mb-4 font-display font-bold text-xl tracking-tight">
          {dict.admin.daftarPesanan}
        </h2>
        {orders.length === 0 ? (
          <div className="card-editorial flex flex-col items-center gap-3 p-12 text-center">
            <Inbox size={28} className="text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">{dict.admin.kosong}</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {orders.map((o, i) => (
              <motion.article
                key={o.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.03 * i }}
                className="card-editorial p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold">{o.name}</p>
                      <span className="rounded-full bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] text-accent">
                        {o.service}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{o.message}</p>
                    <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-muted-foreground">
                      <span>{new Date(o.createdAt).toLocaleString("id-ID")}</span>
                      {o.budget && (
                        <span>
                          {dict.order.budgetLabel}: {o.budget}
                        </span>
                      )}
                      {o.deadline && (
                        <span>
                          {dict.order.deadlineLabel}: {o.deadline}
                        </span>
                      )}
                      {o.refLink && (
                        <a
                          href={o.refLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          {o.refLink.slice(0, 40)}…
                        </a>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/${o.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-xs font-medium transition-colors hover:border-accent hover:text-accent"
                    >
                      <MessageCircle size={13} />
                      {dict.admin.aksi}
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
