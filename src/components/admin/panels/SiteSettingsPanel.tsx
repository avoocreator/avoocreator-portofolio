"use client";

import type { L } from "@/i18n/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BiInput, Field, SaveBar } from "../fields";
import { useSingleData } from "../useAdminData";
import { t } from "../strings";
import { Plus, Trash2 } from "lucide-react";

interface SettingsData {
  brand: string;
  owner: string;
  tagline: L;
  whatsapp: string;
  email: string;
  location: L;
  availability: L;
  socials: { label: string; href: string; handle?: string | null }[];
  stats: { value: number; suffix: string; label: L }[];
  roles: string[];
}

export function SiteSettingsPanel() {
  const { data, update, save, saving, dirty } = useSingleData<SettingsData>(
    "/api/admin/settings"
  );

  if (!data) return <Loading />;
  const d = data;

  return (
    <div className="grid min-w-0 grid-cols-1 gap-8">
      <section className="grid gap-4 sm:grid-cols-2">
        <Field label={t.situs.brand}>
          <Input value={d.brand} onChange={(e) => update({ ...d, brand: e.target.value })} />
        </Field>
        <Field label={t.situs.owner}>
          <Input value={d.owner} onChange={(e) => update({ ...d, owner: e.target.value })} />
        </Field>
        <Field label={t.situs.whatsapp} hint={t.situs.whatsappPh}>
          <Input
            value={d.whatsapp}
            inputMode="numeric"
            onChange={(e) =>
              update({ ...d, whatsapp: e.target.value.replace(/[^0-9]/g, "") })
            }
          />
        </Field>
        <Field label={t.situs.email}>
          <Input
            type="email"
            value={d.email}
            onChange={(e) => update({ ...d, email: e.target.value })}
          />
        </Field>
      </section>

      <BiInput
        label={t.situs.tagline}
        value={d.tagline}
        multiline
        rows={2}
        onChange={(v) => update({ ...d, tagline: v })}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <BiInput
          label={t.situs.lokasi}
          value={d.location}
          onChange={(v) => update({ ...d, location: v })}
        />
        <BiInput
          label={t.situs.ketersediaan}
          value={d.availability}
          onChange={(v) => update({ ...d, availability: v })}
        />
      </div>

      <Field label={t.situs.roles}>
        <Input
          value={d.roles.join(", ")}
          placeholder={t.situs.rolesPh}
          onChange={(e) =>
            update({
              ...d,
              roles: e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
            })
          }
        />
      </Field>

      {/* Sosial media */}
      <section className="grid grid-cols-1 gap-3">
        <h3 className="font-display font-bold text-lg tracking-tight">{t.situs.sosial}</h3>
        {d.socials.map((s, i) => (
          <div key={i} className="flex flex-wrap items-end gap-3 rounded-xl border border-border p-4">
            <Field label={t.situs.labelSosial} className="w-36">
              <Input
                value={s.label}
                onChange={(e) =>
                  update({
                    ...d,
                    socials: d.socials.map((x, j) =>
                      j === i ? { ...x, label: e.target.value } : x
                    ),
                  })
                }
              />
            </Field>
            <Field label={t.situs.hrefSosial} className="flex-1 min-w-[200px]">
              <Input
                value={s.href}
                onChange={(e) =>
                  update({
                    ...d,
                    socials: d.socials.map((x, j) =>
                      j === i ? { ...x, href: e.target.value } : x
                    ),
                  })
                }
              />
            </Field>
            <Field label={t.situs.handleSosial} className="w-40">
              <Input
                value={s.handle ?? ""}
                onChange={(e) =>
                  update({
                    ...d,
                    socials: d.socials.map((x, j) =>
                      j === i ? { ...x, handle: e.target.value } : x
                    ),
                  })
                }
              />
            </Field>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-muted-foreground hover:text-destructive"
              onClick={() => {
                if (confirm(t.shell.yakinHapus)) {
                  update({ ...d, socials: d.socials.filter((_, j) => j !== i) });
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
          onClick={() =>
            update({
              ...d,
              socials: [...d.socials, { label: "", href: "", handle: "" }],
            })
          }
        >
          <Plus size={13} />
          {t.situs.tambahSosial}
        </Button>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 gap-3">
        <h3 className="font-display font-bold text-lg tracking-tight">{t.situs.stats}</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {d.stats.map((s, i) => (
            <div key={i} className="flex flex-wrap items-end gap-3 rounded-xl border border-border p-4">
              <Field label={t.situs.nilaiStat} className="w-24">
                <Input
                  type="number"
                  value={s.value}
                  onChange={(e) =>
                    update({
                      ...d,
                      stats: d.stats.map((x, j) =>
                        j === i ? { ...x, value: Number(e.target.value) || 0 } : x
                      ),
                    })
                  }
                />
              </Field>
              <Field label={t.situs.suffixStat} className="w-20">
                <Input
                  value={s.suffix}
                  onChange={(e) =>
                    update({
                      ...d,
                      stats: d.stats.map((x, j) =>
                        j === i ? { ...x, suffix: e.target.value } : x
                      ),
                    })
                  }
                />
              </Field>
              <div className="flex-1 min-w-[180px]">
                <BiInput
                  label={t.situs.labelStat}
                  value={s.label}
                  onChange={(v) =>
                    update({
                      ...d,
                      stats: d.stats.map((x, j) => (j === i ? { ...x, label: v } : x)),
                    })
                  }
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-muted-foreground hover:text-destructive"
                onClick={() => {
                  if (confirm(t.shell.yakinHapus)) {
                    update({ ...d, stats: d.stats.filter((_, j) => j !== i) });
                  }
                }}
                aria-label={t.shell.hapus}
              >
                <Trash2 size={14} />
              </Button>
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
              stats: [...d.stats, { value: 0, suffix: "", label: { id: "", en: "" } }],
            })
          }
        >
          <Plus size={13} />
          {t.situs.tambahStat}
        </Button>
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
