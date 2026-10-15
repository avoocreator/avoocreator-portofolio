"use client";

import { useState } from "react";
import type { L } from "@/i18n/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BiInput,
  EditorCard,
  Field,
  SaveBar,
  SwitchField,
} from "../fields";
import { listOps, newId, useContentList } from "../useAdminData";
import { t } from "../strings";
import { Plus, FolderOpen } from "lucide-react";

/* ================= PARTISIPASI ================= */

interface ParticipationItemRec {
  id: string;
  title: L;
  role?: L | null;
  description: L;
  link?: string | null;
  featured?: boolean | null;
}

interface ParticipationCatRec {
  catId: string;
  number: string;
  title: L;
  description: L;
  items: ParticipationItemRec[];
}

export function ParticipationPanel() {
  const { items, update, save, saving, dirty } =
    useContentList<ParticipationCatRec>("participation");
  const [open, setOpen] = useState<number | null>(0);
  const [openItem, setOpenItem] = useState<string | null>(null);

  if (!items) return <Loading />;
  const ops = listOps(items, update);

  return (
    <div className="grid min-w-0 grid-cols-1 gap-3">
      {items.map((c, i) => (
        <EditorCard
          key={i}
          title={`${c.number || "?"} — ${c.title?.id || c.title?.en || ""}`}
          summary={`${c.items.length} ${t.shell.item}`}
          open={open === i}
          onToggle={() => setOpen(open === i ? null : i)}
          onUp={() => ops.move(i, -1)}
          onDown={() => ops.move(i, 1)}
          onDelete={() => {
            if (confirm(t.shell.yakinHapus)) ops.remove(i);
          }}
          first={i === 0}
          last={i === items.length - 1}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t.partisipasi.catId}>
              <Input
                value={c.catId}
                placeholder={t.partisipasi.catIdPh}
                onChange={(e) =>
                  update(
                    items.map((x, j) =>
                      j === i
                        ? { ...x, catId: e.target.value.replace(/[^a-z0-9-]/g, "") }
                        : x
                    )
                  )
                }
              />
            </Field>
            <Field label={t.partisipasi.nomor}>
              <Input
                value={c.number}
                onChange={(e) =>
                  update(items.map((x, j) => (j === i ? { ...x, number: e.target.value } : x)))
                }
              />
            </Field>
          </div>
          <BiInput
            label={t.partisipasi.judul}
            value={c.title}
            onChange={(v) => update(items.map((x, j) => (j === i ? { ...x, title: v } : x)))}
          />
          <BiInput
            label={t.partisipasi.deskripsi}
            value={c.description}
            onChange={(v) =>
              update(items.map((x, j) => (j === i ? { ...x, description: v } : x)))
            }
          />

          {/* Items */}
          <div className="grid min-w-0 grid-cols-1 gap-2">
            <p className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5">
              <FolderOpen size={13} className="text-accent" />
              {t.partisipasi.item}
            </p>
            {c.items.map((it, k) => {
              const itemKey = `${i}-${k}`;
              const itemOps = listOps(c.items, (nextItems) =>
                update(items.map((x, j) => (j === i ? { ...x, items: nextItems } : x)))
              );
              return (
                <div key={it.id || itemKey} className="rounded-xl border border-border bg-card">
                  <div className="flex items-center gap-2 p-2.5">
                    <button
                      type="button"
                      className="flex-1 min-w-0 text-left"
                      onClick={() => setOpenItem(openItem === itemKey ? null : itemKey)}
                    >
                      <p className="text-sm font-medium truncate">
                        {it.title?.id || it.title?.en || "(tanpa judul)"}
                      </p>
                      {it.role?.id && (
                        <p className="text-[11px] text-muted-foreground truncate">
                          {it.role.id}
                        </p>
                      )}
                    </button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground"
                      onClick={() => itemOps.move(k, -1)}
                      disabled={k === 0}
                      aria-label={t.shell.naik}
                    >
                      ↑
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground"
                      onClick={() => itemOps.move(k, 1)}
                      disabled={k === c.items.length - 1}
                      aria-label={t.shell.turun}
                    >
                      ↓
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-destructive"
                      onClick={() => {
                        if (confirm(t.shell.yakinHapus)) itemOps.remove(k);
                      }}
                      aria-label={t.shell.hapus}
                    >
                      ×
                    </Button>
                  </div>
                  {openItem === itemKey && (
                    <div className="grid min-w-0 grid-cols-1 gap-4 border-t border-border bg-muted/20 p-4">
                      <BiInput
                        label={t.partisipasi.judulItem}
                        value={it.title}
                        onChange={(v) =>
                          update(
                            items.map((x, j) =>
                              j === i
                                ? {
                                    ...x,
                                    items: x.items.map((y, k2) =>
                                      k2 === k ? { ...y, title: v } : y
                                    ),
                                  }
                                : x
                            )
                          )
                        }
                      />
                      <BiInput
                        label={t.partisipasi.peranItem}
                        value={it.role ?? { id: "", en: "" }}
                        onChange={(v) =>
                          update(
                            items.map((x, j) =>
                              j === i
                                ? {
                                    ...x,
                                    items: x.items.map((y, k2) =>
                                      k2 === k ? { ...y, role: v } : y
                                    ),
                                  }
                                : x
                            )
                          )
                        }
                      />
                      <BiInput
                        label={t.partisipasi.deskripsiItem}
                        value={it.description}
                        multiline
                        rows={2}
                        onChange={(v) =>
                          update(
                            items.map((x, j) =>
                              j === i
                                ? {
                                    ...x,
                                    items: x.items.map((y, k2) =>
                                      k2 === k ? { ...y, description: v } : y
                                    ),
                                  }
                                : x
                            )
                          )
                        }
                      />
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label={t.partisipasi.linkItem}>
                          <Input
                            value={it.link ?? ""}
                            onChange={(e) =>
                              update(
                                items.map((x, j) =>
                                  j === i
                                    ? {
                                        ...x,
                                        items: x.items.map((y, k2) =>
                                          k2 === k ? { ...y, link: e.target.value } : y
                                        ),
                                      }
                                    : x
                                )
                              )
                            }
                          />
                        </Field>
                        <SwitchField
                          label={t.partisipasi.featured}
                          checked={Boolean(it.featured)}
                          onChange={(v) =>
                            update(
                              items.map((x, j) =>
                                j === i
                                  ? {
                                      ...x,
                                      items: x.items.map((y, k2) =>
                                        k2 === k ? { ...y, featured: v } : y
                                      ),
                                    }
                                  : x
                              )
                            )
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="justify-start gap-1.5 w-fit"
              onClick={() =>
                update(
                  items.map((x, j) =>
                    j === i
                      ? {
                          ...x,
                          items: [
                            ...x.items,
                            {
                              id: newId("item"),
                              title: { id: "", en: "" },
                              role: { id: "", en: "" },
                              description: { id: "", en: "" },
                              link: "",
                              featured: false,
                            },
                          ],
                        }
                      : x
                  )
                )
              }
            >
              <Plus size={13} />
              {t.partisipasi.tambahItem}
            </Button>
          </div>
        </EditorCard>
      ))}

      <Button
        variant="outline"
        className="justify-start gap-1.5 w-fit"
        onClick={() => {
          update([
            ...items,
            {
              catId: newId("kategori"),
              number: String(items.length + 1).padStart(2, "0"),
              title: { id: "", en: "" },
              description: { id: "", en: "" },
              items: [],
            },
          ]);
          setOpen(items.length);
        }}
      >
        <Plus size={14} />
        {t.shell.tambah}
      </Button>

      <SaveBar dirty={dirty} saving={saving} onSave={save} />
    </div>
  );
}

function Loading() {
  return (
    <div className="grid min-w-0 grid-cols-1 gap-2">
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-16 rounded-xl bg-muted/50 animate-pulse" />
      ))}
    </div>
  );
}
