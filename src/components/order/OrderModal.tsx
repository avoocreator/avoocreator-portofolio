"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Check, ChevronLeft, ChevronRight, Send, Loader2, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang } from "@/i18n/LangProvider";
import { tx } from "@/i18n/types";
import type { Service } from "@/data/services";
import { serviceIcons } from "./serviceIcons";

interface OrderModalProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  services: Pick<Service, "slug" | "title" | "icon">[];
  whatsapp: string;
  presetService?: string;
}

interface FormState {
  serviceSlug: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  budget: string;
  deadline: string;
  refLink: string;
}

const initialForm: FormState = {
  serviceSlug: "",
  name: "",
  phone: "",
  email: "",
  message: "",
  budget: "",
  deadline: "",
  refLink: "",
};

export function OrderModal({ open, onOpenChange, services, whatsapp, presetService }: OrderModalProps) {
  const { lang, dict } = useLang();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (open) {
      setStep(0);
      setErrors({});
      setDone(false);
      setSending(false);
      setForm((f) => ({ ...initialForm, serviceSlug: presetService ?? "", ...keepIdentity(f) }));
    }
  }, [open, presetService]);

  const selectedService = useMemo(
    () => services.find((s) => s.slug === form.serviceSlug),
    [services, form.serviceSlug]
  );

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validateStep = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (step === 0 && !form.serviceSlug) e.serviceSlug = dict.order.validasi.layanan;
    if (step === 1) {
      if (form.name.trim().length < 2) e.name = dict.order.validasi.nama;
      const phoneClean = form.phone.replace(/[\s-]/g, "");
      if (!/^\+?[0-9]{8,15}$/.test(phoneClean)) e.phone = dict.order.validasi.wa;
      if (form.message.trim().length < 10) e.message = dict.order.validasi.kebutuhan;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, 2));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const buildWaMessage = () => {
    if (lang === "id") {
      return [
        `Halo Avoo! Saya *${form.name.trim()}* ingin memesan jasa.`,
        ``,
        `*Layanan:* ${selectedService ? tx(selectedService.title, lang) : "-"}`,
        `*Kebutuhan:* ${form.message.trim()}`,
        form.budget ? `*Budget:* ${form.budget}` : null,
        form.deadline ? `*Target selesai:* ${form.deadline}` : null,
        form.refLink ? `*Referensi:* ${form.refLink}` : null,
        ``,
        `Terima kasih!`,
      ]
        .filter((l) => l !== null)
        .join("\n");
    }
    return [
      `Hi Avoo! I'm *${form.name.trim()}* and I'd like to order a service.`,
      ``,
      `*Service:* ${selectedService ? tx(selectedService.title, lang) : "-"}`,
      `*Needs:* ${form.message.trim()}`,
      form.budget ? `*Budget:* ${form.budget}` : null,
      form.deadline ? `*Target completion:* ${form.deadline}` : null,
      form.refLink ? `*Reference:* ${form.refLink}` : null,
      ``,
      `Thank you!`,
    ]
      .filter((l) => l !== null)
      .join("\n");
  };

  const submit = async () => {
    setSending(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          service: selectedService ? tx(selectedService.title, lang) : form.serviceSlug,
          message: form.message.trim(),
          budget: form.budget,
          deadline: form.deadline,
          refLink: form.refLink,
          locale: lang,
        }),
      });
      const json = await res.json().catch(() => null);
      if (res.ok && json?.ok) {
        toast.success(dict.order.sukses, {
          description: json.stored !== "none" ? dict.order.tersimpan : undefined,
        });
      } else {
        toast.error(dict.order.gagal);
      }
    } catch {
      toast.error(dict.order.gagal);
    } finally {
      setSending(false);
      setDone(true);
      const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(buildWaMessage())}`;
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const steps = [dict.order.step1, dict.order.step2, dict.order.step3];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90dvh] overflow-y-auto bg-card border-border rounded-2xl p-0 gap-0">
        <div className="p-6 pb-0">
          <DialogTitle className="font-display font-extrabold text-2xl tracking-tight">
            {done ? "" : dict.order.title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm mt-1">
            {done ? "" : dict.order.sub}
          </DialogDescription>
        </div>

        {!done && (
          <div className="px-6 pt-5">
            <div className="flex items-center gap-2">
              {steps.map((label, i) => (
                <div key={i} className="flex flex-1 items-center gap-2 last:flex-none">
                  <div
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-mono transition-colors",
                      i < step && "bg-accent text-accent-foreground border-accent",
                      i === step && "border-accent text-accent",
                      i > step && "border-border text-muted-foreground"
                    )}
                  >
                    {i < step ? <Check size={13} /> : i + 1}
                  </div>
                  <span
                    className={cn(
                      "hidden sm:block text-xs whitespace-nowrap",
                      i === step ? "text-foreground font-medium" : "text-muted-foreground"
                    )}
                  >
                    {label}
                  </span>
                  {i < steps.length - 1 && (
                    <div className="h-px flex-1 bg-border" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="p-6">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center gap-4 py-6"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal/15 text-teal dark:text-teal-bright">
                  <Check size={28} />
                </div>
                <p className="text-lg font-semibold">{dict.order.sukses}</p>
                <p className="text-sm text-muted-foreground">{dict.order.catatan}</p>
                <Button onClick={() => onOpenChange(false)} className="mt-2">
                  {dict.common.tutup}
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {step === 0 && (
                  <div className="flex flex-col gap-3">
                    <p className="text-sm font-medium">{dict.order.pilihLayanan}</p>
                    <div className="grid gap-2 max-h-[300px] overflow-y-auto pr-1">
                      {services.map((s) => {
                        const Icon = serviceIcons[s.icon] ?? MessageCircle;
                        const active = form.serviceSlug === s.slug;
                        return (
                          <button
                            key={s.slug}
                            type="button"
                            onClick={() => set("serviceSlug", s.slug)}
                            className={cn(
                              "flex items-center gap-3 rounded-xl border p-3 text-left transition-all",
                              active
                                ? "border-accent bg-accent/5 shadow-[0_0_0_1px_var(--accent)]"
                                : "border-border hover:border-border-strong"
                            )}
                            aria-pressed={active}
                          >
                            <span
                              className={cn(
                                "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                                active ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                              )}
                            >
                              <Icon size={18} />
                            </span>
                            <span className="text-sm font-medium">{tx(s.title, lang)}</span>
                            {active && <Check size={16} className="ml-auto text-accent" />}
                          </button>
                        );
                      })}
                    </div>
                    {errors.serviceSlug && (
                      <p className="text-xs text-destructive">{errors.serviceSlug}</p>
                    )}
                  </div>
                )}

                {step === 1 && (
                  <div className="grid gap-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="grid gap-1.5">
                        <Label htmlFor="order-name">{dict.order.nama}</Label>
                        <Input
                          id="order-name"
                          value={form.name}
                          onChange={(e) => set("name", e.target.value)}
                          placeholder={dict.order.namaPh}
                          autoComplete="name"
                        />
                        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                      </div>
                      <div className="grid gap-1.5">
                        <Label htmlFor="order-phone">{dict.order.wa}</Label>
                        <Input
                          id="order-phone"
                          value={form.phone}
                          onChange={(e) => set("phone", e.target.value)}
                          placeholder={dict.order.waPh}
                          inputMode="tel"
                          autoComplete="tel"
                        />
                        {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                      </div>
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="order-message">{dict.order.kebutuhan}</Label>
                      <Textarea
                        id="order-message"
                        value={form.message}
                        onChange={(e) => set("message", e.target.value)}
                        placeholder={dict.order.kebutuhanPh}
                        rows={4}
                      />
                      {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="grid gap-1.5">
                        <Label>{dict.order.budget}</Label>
                        <div className="flex flex-wrap gap-1.5">
                          {dict.order.budgetOps.map((b) => (
                            <button
                              key={b}
                              type="button"
                              onClick={() => set("budget", form.budget === b ? "" : b)}
                              className={cn(
                                "rounded-full border px-3 py-1 text-xs transition-colors",
                                form.budget === b
                                  ? "border-accent bg-accent/10 text-accent"
                                  : "border-border text-muted-foreground hover:border-border-strong"
                              )}
                              aria-pressed={form.budget === b}
                            >
                              {b}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="grid content-start gap-1.5">
                        <Label htmlFor="order-deadline">{dict.order.deadline}</Label>
                        <Input
                          id="order-deadline"
                          type="date"
                          value={form.deadline}
                          onChange={(e) => set("deadline", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="order-ref">{dict.order.referensi}</Label>
                      <Input
                        id="order-ref"
                        value={form.refLink}
                        onChange={(e) => set("refLink", e.target.value)}
                        placeholder={dict.order.referensiPh}
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="grid gap-4">
                    <div className="rounded-xl border border-border bg-muted/40 p-4 grid gap-2.5 text-sm">
                      <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-1">
                        {dict.order.ringkasan}
                      </p>
                      <Row label={dict.order.layanan} value={selectedService ? tx(selectedService.title, lang) : "-"} />
                      <Row label={dict.order.pengirim} value={`${form.name} · ${form.phone}`} />
                      <Row label={dict.order.kebutuhan} value={form.message} multiline />
                      {form.budget && <Row label={dict.order.budgetLabel} value={form.budget} />}
                      {form.deadline && <Row label={dict.order.deadlineLabel} value={form.deadline} />}
                      {form.refLink && <Row label={dict.order.referensi} value={form.refLink} />}
                    </div>
                    <p className="text-xs text-muted-foreground flex items-start gap-2">
                      <Send size={13} className="mt-0.5 shrink-0 text-accent" />
                      {dict.order.catatan}
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!done && (
          <div className="flex items-center justify-between gap-3 border-t border-border p-4 px-6">
            <Button variant="ghost" onClick={back} disabled={step === 0} className="gap-1">
              <ChevronLeft size={16} />
              {dict.common.sebelumnya}
            </Button>
            {step < 2 ? (
              <Button onClick={next} className="gap-1 bg-accent text-accent-foreground hover:bg-accent/90">
                {dict.common.lanjut}
                <ChevronRight size={16} />
              </Button>
            ) : (
              <Button
                onClick={submit}
                disabled={sending}
                className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                {sending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    {dict.order.mengirim}
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    {dict.order.kirim}
                  </>
                )}
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Row({ label, value, multiline }: { label: string; value: string; multiline?: boolean }) {
  return (
    <div className={cn("flex gap-3", multiline && "flex-col")}>
      <span className="text-muted-foreground shrink-0 w-28">{label}</span>
      <span className="font-medium break-words">{value}</span>
    </div>
  );
}

/** Pertahankan identitas form antar pembukaan modal */
function keepIdentity(f: FormState): Partial<FormState> {
  return f.name || f.phone ? { name: f.name, phone: f.phone, email: f.email } : {};
}
