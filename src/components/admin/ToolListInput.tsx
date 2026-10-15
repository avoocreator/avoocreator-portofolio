"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Field } from "./fields";
import { ToolLogoGlyph } from "@/components/ui/ToolLogo";
import { toolByKey, tools as builtinTools } from "@/data/tools";
import type { ToolRef } from "@/data/expertise";
import {
  Plus,
  Trash2,
  ImagePlus,
  Loader2,
  Shapes,
  X,
} from "lucide-react";
import { t } from "./strings";
import { cn } from "@/lib/utils";

const MAX_LOGO_MB = 2;

/**
 * Editor daftar perangkat per grup keahlian.
 * Setiap baris: preview logo + nama + sumber logo (unggahan / ikon bawaan /
 * huruf awal), lengkap dengan keterangan ukuran & rasio yang disarankan.
 */
export function ToolListInput({
  label,
  value,
  onChange,
  addLabel,
}: {
  label: string;
  value: ToolRef[];
  onChange: (v: ToolRef[]) => void;
  addLabel: string;
}) {
  const patch = (i: number, part: Partial<ToolRef>) =>
    onChange(value.map((it, j) => (j === i ? { ...it, ...part } : it)));

  return (
    <Field label={label}>
      <p className="flex items-start gap-1.5 rounded-lg border border-border bg-muted/40 px-3 py-2 text-[11px] leading-relaxed text-muted-foreground">
        <Shapes size={13} className="mt-0.5 shrink-0 text-accent" />
        <span>
          Rasio logo <b className="text-foreground">1:1 (persegi)</b> — minimal{" "}
          <b className="text-foreground">128 × 128 px</b>, PNG/WebP latar transparan
          paling rapi, maks {MAX_LOGO_MB} MB. Belum punya file logo? Pakai{" "}
          <b className="text-foreground">ikon bawaan</b> atau biarkan kosong — situs
          otomatis menampilkan huruf awal nama.
        </span>
      </p>

      <div className="grid min-w-0 grid-cols-1 gap-2">
        {value.map((tool, i) => (
          <ToolRow
            key={i}
            tool={tool}
            onChange={(part) => patch(i, part)}
            onRemove={() => onChange(value.filter((_, j) => j !== i))}
          />
        ))}

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-fit justify-start gap-1.5"
          onClick={() => onChange([...value, { name: "" }])}
        >
          <Plus size={13} />
          {addLabel}
        </Button>
      </div>
    </Field>
  );
}

function ToolRow({
  tool,
  onChange,
  onRemove,
}: {
  tool: ToolRef;
  onChange: (part: Partial<ToolRef>) => void;
  onRemove: () => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const source: "upload" | "builtin" | "initial" = tool.logoUrl
    ? "upload"
    : tool.key
      ? "builtin"
      : "initial";

  const upload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("File harus berupa gambar (PNG, WebP, SVG, JPG).");
      return;
    }
    if (file.size > MAX_LOGO_MB * 1024 * 1024) {
      toast.error(`Ukuran logo maksimal ${MAX_LOGO_MB} MB.`);
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "upload");
      onChange({ logoUrl: json.url });
      toast.success("Logo terunggah — jangan lupa Simpan Perubahan.");
    } catch {
      toast.error(
        'Gagal mengunggah. Pastikan bucket "media" ada di Supabase (jalankan ulang supabase/schema.sql).'
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="grid min-w-0 grid-cols-1 gap-2.5 rounded-lg border border-border bg-background p-3">
      {/* Baris utama: preview + nama + hapus */}
      <div className="flex items-center gap-2.5">
        <div className="relative h-11 w-11 shrink-0">
          <div
            className={cn(
              "grid h-full w-full place-items-center overflow-hidden rounded-md border bg-elevated",
              source === "initial" ? "border-dashed border-border" : "border-border"
            )}
          >
            {tool.logoUrl ? (
              <img
                src={tool.logoUrl}
                alt={tool.name || "Logo"}
                className="h-full w-full object-contain p-1"
              />
            ) : tool.key ? (
              <ToolLogoGlyph toolKey={tool.key} className="block h-6 w-6" />
            ) : (
              <span className="grid h-full w-full place-items-center bg-accent/10 font-mono text-sm font-bold uppercase text-accent" aria-hidden="true">
                {(tool.name || "?").trim().charAt(0)}
              </span>
            )}
          </div>
          {/* Hapus sumber logo (kembali ke huruf awal) */}
          {source !== "initial" && (
            <button
              type="button"
              onClick={() => onChange({ key: undefined, logoUrl: undefined })}
              className="absolute -right-1.5 -top-1.5 rounded-full bg-background p-0.5 text-muted-foreground shadow-sm ring-1 ring-border transition-colors hover:text-destructive"
              aria-label={t.keahlian.hapusLogo}
              title={t.keahlian.hapusLogo}
            >
              <X size={11} />
            </button>
          )}
        </div>

        <Input
          value={tool.name}
          placeholder={t.keahlian.namaToolPh}
          className="min-w-0 flex-1"
          onChange={(e) => onChange({ name: e.target.value })}
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
          onClick={onRemove}
          aria-label={t.shell.hapus}
        >
          <Trash2 size={13} />
        </Button>
      </div>

      {/* Kontrol sumber logo */}
      <div className="flex flex-wrap items-center gap-2">
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
          size="sm"
          className="h-7 gap-1.5 text-xs"
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
        >
          {uploading ? (
            <>
              <Loader2 size={12} className="animate-spin" />
              Mengunggah…
            </>
          ) : (
            <>
              <ImagePlus size={12} />
              {t.keahlian.unggahLogo}
            </>
          )}
        </Button>

        <Popover open={pickerOpen} onOpenChange={setPickerOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-7 gap-1.5 text-xs"
            >
              <Shapes size={12} />
              {t.keahlian.ikonBawaan}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-72 p-3">
            <p className="mb-2 text-[11px] font-semibold text-foreground/80">
              {t.keahlian.ikonBawaanJudul}
            </p>
            <div className="grid max-h-56 grid-cols-6 gap-1 overflow-y-auto">
              {builtinTools.map((bt) => (
                <button
                  key={bt.key}
                  type="button"
                  title={bt.name}
                  aria-label={bt.name}
                  onClick={() => {
                    onChange({ key: bt.key, name: tool.name || bt.name });
                    setPickerOpen(false);
                  }}
                  className={cn(
                    "grid aspect-square place-items-center rounded-md border p-1.5 transition-colors hover:border-accent hover:bg-accent/5",
                    tool.key === bt.key
                      ? "border-accent bg-accent/10"
                      : "border-border"
                  )}
                >
                  <ToolLogoGlyph toolKey={bt.key} className="block h-5 w-5" />
                </button>
              ))}
            </div>
            <p className="mt-2 text-[11px] leading-snug text-muted-foreground">
              {t.keahlian.ikonBawaanHint}
            </p>
          </PopoverContent>
        </Popover>

        <span className="text-[11px] text-muted-foreground">
          {source === "upload"
            ? t.keahlian.sumberUpload
            : source === "builtin"
              ? `${t.keahlian.sumberIkon}${toolByKey[tool.key ?? ""]?.name ? `: ${toolByKey[tool.key ?? ""].name}` : ""}`
              : t.keahlian.sumberInisial}
        </span>
      </div>
    </div>
  );
}
