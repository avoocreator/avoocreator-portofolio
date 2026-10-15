"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Type,
  ImagePlus,
  Image as ImageIcon,
  X,
  Loader2,
} from "lucide-react";
import { tx, type L } from "@/i18n/types";
import { useLang } from "@/i18n/LangProvider";
import { t } from "./strings";
import { cn } from "@/lib/utils";

/* ============ Wrappers dasar ============ */

export function Field({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid min-w-0 grid-cols-1 gap-1.5", className)}>
      <Label className="text-xs font-semibold text-foreground/80">{label}</Label>
      {children}
      {hint && <p className="text-[11px] text-muted-foreground">{hint}</p>}
    </div>
  );
}

/* ============ Bilingual input ============ */

/** Input teks bilingual {id, en} dengan tab bahasa. */
export function BiInput({
  label,
  value,
  onChange,
  hint,
  multiline = false,
  rows = 3,
  placeholder,
}: {
  label: string;
  value: L;
  onChange: (v: L) => void;
  hint?: string;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
}) {
  const [tab, setTab] = useState<"id" | "en">("id");
  return (
    <Field
      label={label}
      hint={hint ?? t.bi.hint}
    >
      <div className="flex gap-1 mb-1.5">
        {(["id", "en"] as const).map((lng) => (
          <button
            key={lng}
            type="button"
            onClick={() => setTab(lng)}
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-mono transition-colors",
              tab === lng
                ? "bg-accent text-accent-foreground"
                : "border border-border text-muted-foreground hover:text-foreground"
            )}
          >
            <Type size={10} />
            {lng === "id" ? t.bi.idLabel : t.bi.enLabel}
          </button>
        ))}
        <span className="ml-auto text-[11px] text-muted-foreground truncate max-w-[50%] text-right">
          {value?.id ? value.id : "—"}
        </span>
      </div>
      {multiline ? (
        <Textarea
          rows={rows}
          value={value?.[tab] ?? ""}
          onChange={(e) => onChange({ ...value, [tab]: e.target.value })}
          placeholder={placeholder}
        />
      ) : (
        <Input
          value={value?.[tab] ?? ""}
          onChange={(e) => onChange({ ...value, [tab]: e.target.value })}
          placeholder={placeholder}
        />
      )}
    </Field>
  );
}

/** Daftar teks bilingual (L[]) — untuk outputs dsb. */
export function BiListInput({
  label,
  value,
  onChange,
  addLabel,
}: {
  label: string;
  value: L[];
  onChange: (v: L[]) => void;
  addLabel: string;
}) {
  const { lang } = useLang();
  const update = (i: number, part: Partial<L>) => {
    const next = value.map((it, j) => (j === i ? { ...it, ...part } : it));
    onChange(next);
  };
  return (
    <Field label={label}>
      <div className="grid gap-2">
        {value.map((it, i) => (
          <div key={i} className="flex items-center gap-2">
            <Input
              value={tx(it, lang)}
              onChange={(e) => update(i, { [lang]: e.target.value } as Partial<L>)}
              className="flex-1"
              placeholder={lang === "id" ? "Versi Indonesia" : "English version"}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={() => onChange(value.filter((_, j) => j !== i))}
              aria-label={t.shell.hapus}
            >
              <Trash2 size={13} />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="justify-start gap-1.5 w-fit"
          onClick={() => onChange([...value, { id: "", en: "" }])}
        >
          <Plus size={13} />
          {addLabel}
        </Button>
      </div>
    </Field>
  );
}

/** Daftar string biasa — diinput sebagai baris per item. */
export function StringListInput({
  label,
  value,
  onChange,
  placeholder,
  hint,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <Field label={label} hint={hint}>
      <Textarea
        rows={2}
        value={value.join(", ")}
        onChange={(e) =>
          onChange(
            e.target.value
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          )
        }
        placeholder={placeholder}
      />
    </Field>
  );
}

/* ============ Card editor ============ */

export function EditorCard({
  title,
  summary,
  open,
  onToggle,
  onUp,
  onDown,
  onDelete,
  children,
  first,
  last,
}: {
  title: string;
  summary?: string;
  open: boolean;
  onToggle: () => void;
  onUp: () => void;
  onDown: () => void;
  onDelete: () => void;
  children: React.ReactNode;
  first: boolean;
  last: boolean;
}) {
  return (
    <div className="card-editorial min-w-0 overflow-hidden">
      <div className="flex items-center gap-2 p-3">
        <button
          type="button"
          onClick={onToggle}
          className="flex-1 min-w-0 text-left"
          aria-expanded={open}
        >
          <p className="font-semibold text-sm truncate">{title || "(tanpa judul)"}</p>
          {summary && <p className="text-xs text-muted-foreground truncate">{summary}</p>}
        </button>
        <div className="flex items-center gap-0.5 shrink-0">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground"
            onClick={onUp}
            disabled={first}
            aria-label={t.shell.naik}
          >
            <ChevronUp size={14} />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground"
            onClick={onDown}
            disabled={last}
            aria-label={t.shell.turun}
          >
            <ChevronDown size={14} />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-destructive"
            onClick={onDelete}
            aria-label={t.shell.hapus}
          >
            <Trash2 size={14} />
          </Button>
        </div>
      </div>
      {open && (
        <div className="grid grid-cols-1 gap-4 border-t border-border bg-muted/20 p-4">{children}</div>
      )}
    </div>
  );
}

export function SwitchField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2.5 cursor-pointer">
      <span className="text-sm font-medium">{label}</span>
      <Switch checked={checked} onCheckedChange={onChange} />
    </label>
  );
}

/* ============ Skill & level (slider) ============ */

const LEVEL_TIERS = [
  { max: 24, label: "Pemula" },
  { max: 49, label: "Dasar" },
  { max: 74, label: "Menengah" },
  { max: 89, label: "Mahir" },
  { max: 100, label: "Ahli" },
] as const;

function tierOf(level: number) {
  return LEVEL_TIERS.find((tr) => level <= tr.max) ?? LEVEL_TIERS[LEVEL_TIERS.length - 1];
}

/**
 * Editor skill + tingkat kemampuan yang ramah:
 * slider visual + angka + label kategori + preview bar seperti di situs publik.
 */
export function SkillLevelInput({
  label,
  value,
  onChange,
  addLabel,
  namePlaceholder,
}: {
  label: string;
  value: { name: string; level: number }[];
  onChange: (v: { name: string; level: number }[]) => void;
  addLabel: string;
  namePlaceholder?: string;
}) {
  const patch = (i: number, part: Partial<{ name: string; level: number }>) =>
    onChange(value.map((s, j) => (j === i ? { ...s, ...part } : s)));

  return (
    <Field label={label}>
      <p className="rounded-lg border border-accent/25 bg-accent/5 px-3 py-2 text-[11px] leading-relaxed text-foreground/80">
        Geser ke kanan/kiri untuk mengatur tingkat kemampuan — <b>tidak ada angka yang
        &quot;benar&quot;</b>, kira-kira saja seberapa yakin kamu memakainya:
        Pemula 0–24 · Dasar 25–49 · Menengah 50–74 · Mahir 75–89 · Ahli 90–100.
      </p>
      <div className="grid min-w-0 grid-cols-1 gap-2">
        {value.map((sk, i) => {
          const tier = tierOf(sk.level);
          return (
            <div key={i} className="grid min-w-0 grid-cols-1 gap-2.5 rounded-lg border border-border bg-background p-3">
              <div className="flex items-center gap-2">
                <Input
                  value={sk.name}
                  placeholder={namePlaceholder}
                  className="min-w-0 flex-1"
                  onChange={(e) => patch(i, { name: e.target.value })}
                />
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                    sk.level >= 75
                      ? "bg-accent/15 text-accent"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {tier.label}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                  onClick={() => onChange(value.filter((_, j) => j !== i))}
                  aria-label={t.shell.hapus}
                >
                  <Trash2 size={13} />
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={sk.level}
                  onChange={(e) => patch(i, { level: Number(e.target.value) })}
                  className="h-1.5 min-w-0 flex-1 cursor-pointer appearance-none rounded-full bg-muted accent-accent"
                  style={{ accentColor: "var(--accent)" }}
                  aria-label={`${sk.name || "Skill"}: tingkat kemampuan`}
                />
                <div className="flex shrink-0 items-center gap-1">
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    value={sk.level}
                    className="w-16 text-center font-mono text-xs"
                    onChange={(e) =>
                      patch(i, { level: Math.max(0, Math.min(100, Number(e.target.value) || 0)) })
                    }
                  />
                  <span className="font-mono text-xs text-muted-foreground">%</span>
                </div>
              </div>
              {/* Preview bar — persis gaya meter di situs publik */}
              <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-accent to-orange-bright transition-[width] duration-150"
                  style={{ width: `${sk.level}%` }}
                />
              </div>
            </div>
          );
        })}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-fit justify-start gap-1.5"
          onClick={() => onChange([...value, { name: "", level: 50 }])}
        >
          <Plus size={13} />
          {addLabel}
        </Button>
      </div>
    </Field>
  );
}

/* ============ Media (unggah gambar) ============ */

/**
 * Input media: unggah file ke Supabase Storage (bucket "media") lewat
 * /api/admin/upload, atau tempel URL gambar. Menampilkan preview +
 * keterangan rasio/ukuran yang disarankan.
 */
export function MediaInput({
  label,
  value,
  onChange,
  hint,
  ratioLabel = "4:5 (potret)",
  minSizeLabel = "800 × 1000 px",
  maxSizeMB = 5,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  hint?: string;
  ratioLabel?: string;
  minSizeLabel?: string;
  maxSizeMB?: number;
}) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("File harus berupa gambar (JPG, PNG, WebP).");
      return;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`Ukuran file maksimal ${maxSizeMB} MB.`);
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "upload");
      onChange(json.url);
      toast.success("Foto berhasil diunggah — jangan lupa Simpan Perubahan.");
    } catch (err) {
      const msg =
        err instanceof Error && err.message !== "upload"
          ? err.message
          : "Gagal mengunggah. Pastikan bucket \"media\" ada di Supabase (jalankan ulang supabase/schema.sql).";
      toast.error(msg);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Field label={label} hint={hint}>
      <p className="flex items-start gap-1.5 rounded-lg border border-border bg-muted/40 px-3 py-2 text-[11px] leading-relaxed text-muted-foreground">
        <ImageIcon size={13} className="mt-0.5 shrink-0 text-accent" />
        <span>
          Rasio <b className="text-foreground">{ratioLabel}</b> — disarankan minimal{" "}
          <b className="text-foreground">{minSizeLabel}</b>, format JPG/PNG/WebP, maks{" "}
          {maxSizeMB} MB. Foto dipotong otomatis mengikuti frame, jadi rasio lain tetap aman.
        </span>
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Preview */}
        <div
          className={cn(
            "relative w-full shrink-0 overflow-hidden rounded-xl border border-dashed border-border bg-muted/30 sm:w-44",
            dragOver && "border-accent bg-accent/5"
          )}
          style={{ aspectRatio: "4 / 5" }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            const f = e.dataTransfer.files?.[0];
            if (f) void upload(f);
          }}
        >
          {value ? (
            <>
              <img
                src={value}
                alt="Preview"
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => onChange("")}
                className="absolute right-2 top-2 rounded-full bg-background/90 p-1.5 text-muted-foreground shadow-sm transition-colors hover:text-destructive"
                aria-label="Hapus foto"
              >
                <X size={13} />
              </button>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-1.5 p-3 text-center">
              <ImageIcon size={20} className="text-muted-foreground/60" />
              <p className="text-[11px] leading-snug text-muted-foreground">
                Belum ada foto.
                <br />
                Tarik file ke sini atau klik tombol unggah.
              </p>
            </div>
          )}
        </div>

        {/* Kontrol */}
        <div className="grid min-w-0 flex-1 grid-cols-1 content-start gap-2.5">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void upload(f);
              e.target.value = "";
            }}
          />
          <Button
            type="button"
            variant="outline"
            className="w-fit gap-1.5"
            disabled={uploading}
            onClick={() => fileRef.current?.click()}
          >
            {uploading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Mengunggah…
              </>
            ) : (
              <>
                <ImagePlus size={14} />
                Unggah Foto
              </>
            )}
          </Button>
          <Field label="Atau tempel URL gambar">
            <Input
              value={value}
              placeholder="https://…/foto.jpg"
              onChange={(e) => onChange(e.target.value)}
            />
          </Field>
        </div>
      </div>
    </Field>
  );
}

/** Bar tombol simpan sticky. */
export function SaveBar({
  dirty,
  saving,
  onSave,
  extra,
}: {
  dirty: boolean;
  saving: boolean;
  onSave: () => void;
  extra?: React.ReactNode;
}) {
  return (
    <div className="sticky bottom-4 z-10 mt-6">
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-background/95 backdrop-blur px-4 py-3 shadow-lg">
        <span
          className={cn(
            "text-xs font-medium",
            dirty ? "text-accent" : "text-muted-foreground"
          )}
        >
          {dirty ? t.shell.adaPerubahan : "Semua perubahan tersimpan"}
        </span>
        {extra}
        <Button
          type="button"
          onClick={onSave}
          disabled={saving || !dirty}
          className="ml-auto bg-accent text-accent-foreground hover:bg-accent/90"
        >
          {saving ? t.shell.menyimpan : t.shell.simpan}
        </Button>
      </div>
    </div>
  );
}
