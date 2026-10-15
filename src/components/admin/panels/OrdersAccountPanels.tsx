"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, SaveBar } from "../fields";
import { t } from "../strings";
import { toast } from "sonner";
import {
  MessageCircle,
  Trash2,
  Inbox,
  CalendarClock,
  FolderOpen,
  Loader2,
  KeyRound,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

/* ================= PESANAN ================= */

interface OrderRec {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  service: string;
  message: string;
  budget?: string | null;
  deadline?: string | null;
  refLink?: string | null;
  locale: string;
  status: string;
  createdAt: string;
}

const STATUS_LABELS: Record<string, string> = {
  baru: t.pesanan.baru,
  diproses: t.pesanan.diproses,
  selesai: t.pesanan.selesai,
  arsip: t.pesanan.arsip,
};

const STATUS_STYLE: Record<string, string> = {
  baru: "border-accent/40 bg-accent/10 text-accent",
  diproses: "border-teal/40 bg-teal/10 text-teal dark:text-teal-bright",
  selesai: "border-border bg-muted text-muted-foreground",
  arsip: "border-border bg-transparent text-muted-foreground/70",
};

export function OrdersPanel() {
  const [orders, setOrders] = useState<OrderRec[] | null>(null);
  const [filter, setFilter] = useState<string>("semua");

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/orders");
      if (!res.ok) throw new Error();
      const json = await res.json();
      setOrders(json.orders ?? []);
    } catch {
      toast.error(t.shell.gagalMuat);
      setOrders([]);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const setStatus = async (id: string, status: string) => {
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error();
      setOrders((prev) => prev?.map((o) => (o.id === id ? { ...o, status } : o)) ?? null);
      toast.success(t.shell.tersimpan);
    } catch {
      toast.error(t.shell.gagal);
    }
  };

  const remove = async (id: string) => {
    if (!confirm(t.pesanan.yakinHapus)) return;
    try {
      const res = await fetch(`/api/admin/orders?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      setOrders((prev) => prev?.filter((o) => o.id !== id) ?? null);
      toast.success(t.shell.tersimpan);
    } catch {
      toast.error(t.shell.gagal);
    }
  };

  if (!orders) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="animate-spin text-muted-foreground" size={22} />
      </div>
    );
  }

  const weekCount = orders.filter(
    (o) => Date.now() - new Date(o.createdAt).getTime() < 7 * 24 * 3600 * 1000
  ).length;
  const newCount = orders.filter((o) => o.status === "baru").length;
  const filtered = filter === "semua" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div>
      {/* Stat ringkas */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={<Inbox size={15} className="text-accent" />} label={t.ringkasan.totalPesanan} value={orders.length} />
        <StatCard icon={<CalendarClock size={15} className="text-accent" />} label={t.ringkasan.pesananBaru} value={newCount} hint={`${weekCount} · 7d`} />
        <StatCard icon={<FolderOpen size={15} className="text-accent" />} label={STATUS_LABELS[filter] ?? t.pesanan.semua} value={filtered.length} />
      </div>

      {/* Filter */}
      <div className="mt-6 flex flex-wrap gap-2">
        {["semua", "baru", "diproses", "selesai", "arsip"].map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
              filter === f
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border text-muted-foreground hover:text-foreground"
            )}
          >
            {f === "semua" ? t.pesanan.semua : STATUS_LABELS[f]}
          </button>
        ))}
      </div>

      {/* Daftar */}
      <h2 className="mt-8 mb-4 font-display font-bold text-xl tracking-tight">
        {t.nav.pesanan}
      </h2>
      {filtered.length === 0 ? (
        <div className="card-editorial flex flex-col items-center gap-3 p-12 text-center">
          <Inbox size={28} className="text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">{t.pesanan.kosong}</p>
        </div>
      ) : (
        <div className="grid min-w-0 grid-cols-1 gap-3">
          {filtered.map((o, i) => (
            <motion.article
              key={o.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.03 * i }}
              className="card-editorial p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold">{o.name}</p>
                    <span className="rounded-full bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] text-accent">
                      {o.service}
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
                        STATUS_STYLE[o.status] ?? STATUS_STYLE.baru
                      )}
                    >
                      {STATUS_LABELS[o.status] ?? o.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{o.message}</p>
                  <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-muted-foreground">
                    <span>{new Date(o.createdAt).toLocaleString("id-ID")}</span>
                    <span>{o.phone}</span>
                    {o.email && <span>{o.email}</span>}
                    {o.budget && <span>Budget: {o.budget}</span>}
                    {o.deadline && <span>Deadline: {o.deadline}</span>}
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
                <div className="flex flex-wrap items-center gap-2">
                  <Select value={o.status} onValueChange={(v) => setStatus(o.id, v)}>
                    <SelectTrigger size="sm" className="w-[130px] h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(STATUS_LABELS).map(([k, label]) => (
                        <SelectItem key={k} value={k}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <a
                    href={`https://wa.me/${o.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-xs font-medium transition-colors hover:border-accent hover:text-accent"
                  >
                    <MessageCircle size={13} />
                    {t.pesanan.chatWa}
                  </a>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => remove(o.id)}
                    aria-label={t.pesanan.hapus}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  hint?: string;
}) {
  return (
    <div className="card-editorial p-5">
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        {icon}
        {label}
      </div>
      <p className="mt-2 font-display text-4xl font-extrabold">{value}</p>
      {hint && <p className="mt-1 font-mono text-[11px] text-muted-foreground">{hint}</p>}
    </div>
  );
}

/* ================= AKUN ================= */

interface AccountForm {
  currentPassword: string;
  newUsername: string;
  newPassword: string;
}

export function AccountPanel({ username }: { username: string }) {
  const [form, setForm] = useState<AccountForm>({
    currentPassword: "",
    newUsername: "",
    newPassword: "",
  });
  const [saving, setSaving] = useState(false);

  const submit = async () => {
    if (!form.currentPassword) {
      toast.error(t.akun.salahLama);
      return;
    }
    if (form.newPassword && form.newPassword.length < 8) {
      toast.error(t.akun.tidakValid);
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/account", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          ...(form.newUsername.trim() ? { newUsername: form.newUsername.trim().toLowerCase() } : {}),
          ...(form.newPassword ? { newPassword: form.newPassword } : {}),
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        if (json.error === "INVALID_CURRENT") toast.error(t.akun.salahLama);
        else if (json.error === "USERNAME_TAKEN") toast.error(t.akun.usernameDipakai);
        else toast.error(t.akun.tidakValid);
        return;
      }
      toast.success(t.akun.sukses);
      setForm({ currentPassword: "", newUsername: "", newPassword: "" });
    } catch {
      toast.error(t.shell.gagal);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-xl">
      <div className="card-editorial p-6 grid gap-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <KeyRound size={18} />
          </div>
          <div>
            <h3 className="font-display font-bold">{t.akun.judul}</h3>
            <p className="text-xs text-muted-foreground">
              {t.nav.akun} · <span className="font-mono">{username}</span>
            </p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{t.akun.sub}</p>
        <Field label={t.akun.passwordLama}>
          <Input
            type="password"
            value={form.currentPassword}
            onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
          />
        </Field>
        <Field label={t.akun.usernameBaru} hint={t.akun.usernameHint}>
          <Input
            value={form.newUsername}
            placeholder={username}
            onChange={(e) =>
              setForm({ ...form, newUsername: e.target.value.replace(/[^a-z0-9_.-]/g, "") })
            }
          />
        </Field>
        <Field label={t.akun.passwordBaru} hint={t.akun.passwordHint}>
          <Input
            type="password"
            value={form.newPassword}
            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
          />
        </Field>
        <SaveBar
          dirty={Boolean(form.currentPassword && (form.newUsername || form.newPassword))}
          saving={saving}
          onSave={submit}
        />
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{t.akun.sesiBaru}</p>
    </div>
  );
}
