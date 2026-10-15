"use client";

import type { L } from "@/i18n/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BiInput, Field, MediaInput, SaveBar } from "../fields";
import { useSingleData } from "../useAdminData";
import { t } from "../strings";
import { Plus, Trash2 } from "lucide-react";

/* ================= TENTANG ================= */

interface AboutData {
  /** Optional di tipe supaya data lama (sebelum fitur foto) tetap aman. */
  photoUrl?: string;
  photoAlt?: L;
  intro: L[];
  values: { icon: string; title: L; description: L }[];
  facts: { label: L; value: L }[];
  quoteText: L;
  quoteAuthor: string;
}

export function AboutPanel() {
  const { data, update, save, saving, dirty } = useSingleData<AboutData>(
    "/api/admin/about"
  );

  if (!data) return <Loading />;
  const d = {
    ...data,
    photoUrl: data.photoUrl ?? "",
    photoAlt: data.photoAlt ?? { id: "", en: "" },
  };

  return (
    <div className="grid min-w-0 grid-cols-1 gap-8">
      {/* Foto profil */}
      <section className="grid grid-cols-1 gap-3 rounded-xl border border-border p-4">
        <h3 className="font-display text-lg font-bold tracking-tight">{t.tentang.foto}</h3>
        <MediaInput
          label="Foto"
          value={d.photoUrl ?? ""}
          hint={t.tentang.fotoHint}
          ratioLabel="4:5 (potret)"
          minSizeLabel="800 × 1000 px"
          onChange={(url) => update({ ...d, photoUrl: url })}
        />
        <BiInput
          label={t.tentang.fotoAlt}
          value={d.photoAlt ?? { id: "", en: "" }}
          onChange={(v) => update({ ...d, photoAlt: v })}
        />
      </section>

      {/* Intro */}
      <section className="grid grid-cols-1 gap-3">
        <h3 className="font-display font-bold text-lg tracking-tight">{t.tentang.intro}</h3>
        {d.intro.map((p, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="flex-1 min-w-0">
              <BiInput
                label={`${t.tentang.paragraf} ${i + 1}`}
                value={p}
                multiline
                rows={3}
                onChange={(v) =>
                  update({ ...d, intro: d.intro.map((x, j) => (j === i ? v : x)) })
                }
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="mt-6 text-muted-foreground hover:text-destructive"
              onClick={() => {
                if (confirm(t.shell.yakinHapus)) {
                  update({ ...d, intro: d.intro.filter((_, j) => j !== i) });
                }
              }}
              aria-label={t.shell.hapus}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          className="justify-start gap-1.5 w-fit"
          onClick={() => update({ ...d, intro: [...d.intro, { id: "", en: "" }] })}
        >
          <Plus size={13} />
          {t.tentang.tambahParagraf}
        </Button>
      </section>

      {/* Values */}
      <section className="grid grid-cols-1 gap-3">
        <h3 className="font-display font-bold text-lg tracking-tight">{t.tentang.values}</h3>
        {d.values.map((v, i) => (
          <div key={i} className="relative grid min-w-0 grid-cols-1 gap-4 rounded-xl border border-border p-4">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-7 w-7 text-muted-foreground hover:text-destructive"
              onClick={() => {
                if (confirm(t.shell.yakinHapus)) {
                  update({ ...d, values: d.values.filter((_, j) => j !== i) });
                }
              }}
              aria-label={t.shell.hapus}
            >
              <Trash2 size={13} />
            </Button>
            <Field label="Ikon" className="max-w-[220px]">
              <Input
                value={v.icon}
                placeholder="check-circle / target / lightbulb / message"
                onChange={(e) =>
                  update({
                    ...d,
                    values: d.values.map((x, j) =>
                      j === i ? { ...x, icon: e.target.value } : x
                    ),
                  })
                }
              />
            </Field>
            <BiInput
              label={t.tentang.judulValue}
              value={v.title}
              onChange={(nv) =>
                update({
                  ...d,
                  values: d.values.map((x, j) => (j === i ? { ...x, title: nv } : x)),
                })
              }
            />
            <BiInput
              label={t.tentang.deskripsiValue}
              value={v.description}
              multiline
              rows={2}
              onChange={(nv) =>
                update({
                  ...d,
                  values: d.values.map((x, j) => (j === i ? { ...x, description: nv } : x)),
                })
              }
            />
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          className="justify-start gap-1.5 w-fit"
          onClick={() =>
            update({
              ...d,
              values: [
                ...d.values,
                { icon: "check-circle", title: { id: "", en: "" }, description: { id: "", en: "" } },
              ],
            })
          }
        >
          <Plus size={13} />
          {t.tentang.tambahValue}
        </Button>
      </section>

      {/* Facts */}
      <section className="grid grid-cols-1 gap-3">
        <h3 className="font-display font-bold text-lg tracking-tight">{t.tentang.fakta}</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {d.facts.map((f, i) => (
            <div key={i} className="relative grid min-w-0 grid-cols-1 gap-3 rounded-xl border border-border p-4">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-7 w-7 text-muted-foreground hover:text-destructive"
                onClick={() => {
                  if (confirm(t.shell.yakinHapus)) {
                    update({ ...d, facts: d.facts.filter((_, j) => j !== i) });
                  }
                }}
                aria-label={t.shell.hapus}
              >
                <Trash2 size={13} />
              </Button>
              <BiInput
                label={t.tentang.labelFakta}
                value={f.label}
                onChange={(nv) =>
                  update({
                    ...d,
                    facts: d.facts.map((x, j) => (j === i ? { ...x, label: nv } : x)),
                  })
                }
              />
              <BiInput
                label={t.tentang.valueFakta}
                value={f.value}
                onChange={(nv) =>
                  update({
                    ...d,
                    facts: d.facts.map((x, j) => (j === i ? { ...x, value: nv } : x)),
                  })
                }
              />
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="justify-start gap-1.5 w-fit"
          onClick={() =>
            update({
              ...d,
              facts: [...d.facts, { label: { id: "", en: "" }, value: { id: "", en: "" } }],
            })
          }
        >
          <Plus size={13} />
          {t.tentang.tambahFakta}
        </Button>
      </section>

      {/* Quote */}
      <section className="grid grid-cols-1 gap-3">
        <h3 className="font-display font-bold text-lg tracking-tight">{t.tentang.quote}</h3>
        <BiInput
          label={t.tentang.quote}
          value={d.quoteText}
          multiline
          rows={2}
          onChange={(v) => update({ ...d, quoteText: v })}
        />
        <Field label={t.tentang.quoteAuthor} className="max-w-md">
          <Input
            value={d.quoteAuthor}
            onChange={(e) => update({ ...d, quoteAuthor: e.target.value })}
          />
        </Field>
      </section>

      <SaveBar dirty={dirty} saving={saving} onSave={() => save()} />
    </div>
  );
}

function Loading() {
  return (
    <div className="grid gap-2">
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-16 rounded-xl bg-muted/50 animate-pulse" />
      ))}
    </div>
  );
}
