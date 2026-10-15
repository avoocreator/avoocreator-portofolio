"use client";

import { useState } from "react";
import type { L } from "@/i18n/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BiInput,
  BiListInput,
  EditorCard,
  Field,
  SaveBar,
  SkillLevelInput,
  StringListInput,
  SwitchField,
} from "../fields";
import { ToolListInput } from "../ToolListInput";
import type { ToolRef } from "@/data/expertise";
import { listOps, newId, useContentList } from "../useAdminData";
import { t } from "../strings";
import { Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

/* ================= PROYEK ================= */

interface ProjectItem {
  number: string;
  title: L;
  category: L;
  description: L;
  tags: string[];
  status: string;
  year?: string | null;
  link?: string | null;
}

export function ProjectsPanel() {
  const { items, update, save, saving, dirty } = useContentList<ProjectItem>("projects");
  const [open, setOpen] = useState<number | null>(0);

  if (!items) return <Loading />;
  const ops = listOps(items, update);

  return (
    <div className="grid min-w-0 grid-cols-1 gap-3">
      {items.map((p, i) => (
        <EditorCard
          key={i}
          title={`${p.number || "?"} — ${p.title?.id || p.title?.en || ""}`}
          summary={p.category?.id}
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
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label={t.proyek.nomor}>
              <Input
                value={p.number}
                onChange={(e) => update(items.map((x, j) => (j === i ? { ...x, number: e.target.value } : x)))}
              />
            </Field>
            <Field label={t.proyek.status}>
              <Select
                value={p.status}
                onValueChange={(v) =>
                  update(items.map((x, j) => (j === i ? { ...x, status: v } : x)))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(t.statusOptions).map(([k, label]) => (
                    <SelectItem key={k} value={k}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label={t.proyek.tahun}>
              <Input
                value={p.year ?? ""}
                onChange={(e) =>
                  update(items.map((x, j) => (j === i ? { ...x, year: e.target.value } : x)))
                }
              />
            </Field>
          </div>
          <BiInput
            label={t.proyek.judul}
            value={p.title}
            onChange={(v) => update(items.map((x, j) => (j === i ? { ...x, title: v } : x)))}
          />
          <BiInput
            label={t.proyek.kategori}
            value={p.category}
            onChange={(v) => update(items.map((x, j) => (j === i ? { ...x, category: v } : x)))}
          />
          <BiInput
            label={t.proyek.deskripsi}
            value={p.description}
            multiline
            rows={3}
            onChange={(v) => update(items.map((x, j) => (j === i ? { ...x, description: v } : x)))}
          />
          <StringListInput
            label={t.proyek.tags}
            value={p.tags}
            onChange={(v) => update(items.map((x, j) => (j === i ? { ...x, tags: v } : x)))}
            placeholder={t.proyek.tagsPh}
          />
          <Field label={t.proyek.link}>
            <Input
              value={p.link ?? ""}
              placeholder={t.proyek.linkPh}
              onChange={(e) =>
                update(items.map((x, j) => (j === i ? { ...x, link: e.target.value } : x)))
              }
            />
          </Field>
        </EditorCard>
      ))}

      <Button
        variant="outline"
        className="justify-start gap-1.5 w-fit"
        onClick={() => {
          update([
            ...items,
            {
              number: String(items.length + 1).padStart(2, "0"),
              title: { id: "", en: "" },
              category: { id: "", en: "" },
              description: { id: "", en: "" },
              tags: [],
              status: "konsep",
              year: String(new Date().getFullYear()),
              link: "",
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

/* ================= LAYANAN ================= */

interface ServiceItem {
  number: string;
  slug: string;
  title: L;
  description: L;
  outputs: L[];
  icon: string;
  duration?: L | null;
}

export function ServicesPanel() {
  const { items, update, save, saving, dirty } = useContentList<ServiceItem>("services");
  const [open, setOpen] = useState<number | null>(0);

  if (!items) return <Loading />;
  const ops = listOps(items, update);

  return (
    <div className="grid min-w-0 grid-cols-1 gap-3">
      {items.map((s, i) => (
        <EditorCard
          key={i}
          title={`${s.number || "?"} — ${s.title?.id || s.title?.en || ""}`}
          summary={s.slug}
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
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label={t.layanan.nomor}>
              <Input
                value={s.number}
                onChange={(e) =>
                  update(items.map((x, j) => (j === i ? { ...x, number: e.target.value } : x)))
                }
              />
            </Field>
            <Field label={t.layanan.slug}>
              <Input
                value={s.slug}
                placeholder={t.layanan.slugPh}
                onChange={(e) =>
                  update(
                    items.map((x, j) =>
                      j === i ? { ...x, slug: e.target.value.replace(/[^a-z0-9-]/g, "") } : x
                    )
                  )
                }
              />
            </Field>
            <Field label={t.layanan.ikon} hint={t.layanan.ikonHint}>
              <Input
                value={s.icon}
                onChange={(e) =>
                  update(items.map((x, j) => (j === i ? { ...x, icon: e.target.value } : x)))
                }
              />
            </Field>
          </div>
          <BiInput
            label={t.layanan.judul}
            value={s.title}
            onChange={(v) => update(items.map((x, j) => (j === i ? { ...x, title: v } : x)))}
          />
          <BiInput
            label={t.layanan.deskripsi}
            value={s.description}
            multiline
            rows={3}
            onChange={(v) => update(items.map((x, j) => (j === i ? { ...x, description: v } : x)))}
          />
          <BiListInput
            label={t.layanan.output}
            value={s.outputs}
            onChange={(v) => update(items.map((x, j) => (j === i ? { ...x, outputs: v } : x)))}
            addLabel={t.layanan.tambahOutput}
          />
          <BiInput
            label={t.layanan.durasi}
            value={s.duration ?? { id: "", en: "" }}
            onChange={(v) => update(items.map((x, j) => (j === i ? { ...x, duration: v } : x)))}
          />
        </EditorCard>
      ))}

      <Button
        variant="outline"
        className="justify-start gap-1.5 w-fit"
        onClick={() => {
          update([
            ...items,
            {
              number: String(items.length + 1).padStart(2, "0"),
              slug: newId("layanan"),
              title: { id: "", en: "" },
              description: { id: "", en: "" },
              outputs: [{ id: "", en: "" }],
              icon: "code",
              duration: { id: "", en: "" },
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

/* ================= KEAHLIAN ================= */

interface ExpertiseItem {
  groupId: string;
  title: L;
  description: L;
  longDescription: L;
  skills: { name: string; level: number }[];
  tools: ToolRef[];
}

export function ExpertisePanel() {
  const { items, update, save, saving, dirty } = useContentList<ExpertiseItem>("expertise");
  const [open, setOpen] = useState<number | null>(0);

  if (!items) return <Loading />;
  const ops = listOps(items, update);

  return (
    <div className="grid min-w-0 grid-cols-1 gap-3">
      {items.map((g, i) => (
        <EditorCard
          key={i}
          title={g.title?.id || g.title?.en || g.groupId}
          summary={g.groupId}
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
            <Field label={t.keahlian.groupId}>
              <Input
                value={g.groupId}
                placeholder={t.keahlian.groupIdPh}
                onChange={(e) =>
                  update(
                    items.map((x, j) =>
                      j === i ? { ...x, groupId: e.target.value.replace(/[^a-z0-9-]/g, "") } : x
                    )
                  )
                }
              />
            </Field>
          </div>
          <BiInput
            label={t.keahlian.judul}
            value={g.title}
            onChange={(v) => update(items.map((x, j) => (j === i ? { ...x, title: v } : x)))}
          />
          <BiInput
            label={t.keahlian.deskripsi}
            value={g.description}
            onChange={(v) => update(items.map((x, j) => (j === i ? { ...x, description: v } : x)))}
          />
          <BiInput
            label={t.keahlian.longDesc}
            value={g.longDescription}
            multiline
            rows={3}
            onChange={(v) =>
              update(items.map((x, j) => (j === i ? { ...x, longDescription: v } : x)))
            }
          />
          <SkillLevelInput
            label={t.keahlian.skills}
            value={g.skills}
            onChange={(v) => update(items.map((x, j) => (j === i ? { ...x, skills: v } : x)))}
            addLabel={t.keahlian.tambahSkill}
            namePlaceholder={t.keahlian.namaSkill}
          />
          <ToolListInput
            label={t.keahlian.tools}
            value={g.tools ?? []}
            onChange={(v) => update(items.map((x, j) => (j === i ? { ...x, tools: v } : x)))}
            addLabel={t.keahlian.tambahTool}
          />
        </EditorCard>
      ))}

      <Button
        variant="outline"
        className="justify-start gap-1.5 w-fit"
        onClick={() => {
          update([
            ...items,
            {
              groupId: newId("grup"),
              title: { id: "", en: "" },
              description: { id: "", en: "" },
              longDescription: { id: "", en: "" },
              skills: [{ name: "", level: 50 }],
              tools: [],
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

/* ================= PENGALAMAN ================= */

interface ExperienceRec {
  year: string;
  title: L;
  role: L;
  description: L;
  category: L;
  highlight?: boolean | null;
}

export function ExperiencePanel() {
  const { items, update, save, saving, dirty } = useContentList<ExperienceRec>("experience");
  const [open, setOpen] = useState<number | null>(0);

  if (!items) return <Loading />;
  const ops = listOps(items, update);

  return (
    <div className="grid min-w-0 grid-cols-1 gap-3">
      {items.map((e, i) => (
        <EditorCard
          key={i}
          title={`${e.year} — ${e.title?.id || e.title?.en || ""}`}
          summary={e.role?.id}
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
            <Field label={t.pengalaman.tahun}>
              <Input
                value={e.year}
                onChange={(ev) =>
                  update(items.map((x, j) => (j === i ? { ...x, year: ev.target.value } : x)))
                }
              />
            </Field>
            <SwitchField
              label={t.pengalaman.sorot}
              checked={Boolean(e.highlight)}
              onChange={(v) =>
                update(items.map((x, j) => (j === i ? { ...x, highlight: v } : x)))
              }
            />
          </div>
          <BiInput
            label={t.pengalaman.judul}
            value={e.title}
            onChange={(v) => update(items.map((x, j) => (j === i ? { ...x, title: v } : x)))}
          />
          <BiInput
            label={t.pengalaman.peran}
            value={e.role}
            onChange={(v) => update(items.map((x, j) => (j === i ? { ...x, role: v } : x)))}
          />
          <BiInput
            label={t.pengalaman.kategori}
            value={e.category}
            onChange={(v) => update(items.map((x, j) => (j === i ? { ...x, category: v } : x)))}
          />
          <BiInput
            label={t.pengalaman.deskripsi}
            value={e.description}
            multiline
            rows={3}
            onChange={(v) => update(items.map((x, j) => (j === i ? { ...x, description: v } : x)))}
          />
        </EditorCard>
      ))}

      <Button
        variant="outline"
        className="justify-start gap-1.5 w-fit"
        onClick={() => {
          update([
            ...items,
            {
              year: String(new Date().getFullYear()),
              title: { id: "", en: "" },
              role: { id: "", en: "" },
              description: { id: "", en: "" },
              category: { id: "", en: "" },
              highlight: false,
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

/* ================= FAQ ================= */

interface FaqRec {
  q: L;
  a: L;
}

export function FaqPanel() {
  const { items, update, save, saving, dirty } = useContentList<FaqRec>("faq");
  const [open, setOpen] = useState<number | null>(0);

  if (!items) return <Loading />;
  const ops = listOps(items, update);

  return (
    <div className="grid min-w-0 grid-cols-1 gap-3">
      {items.map((f, i) => (
        <EditorCard
          key={i}
          title={f.q?.id || f.q?.en || `FAQ ${i + 1}`}
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
          <BiInput
            label={t.faq.q}
            value={f.q}
            onChange={(v) => update(items.map((x, j) => (j === i ? { ...x, q: v } : x)))}
          />
          <BiInput
            label={t.faq.a}
            value={f.a}
            multiline
            rows={3}
            onChange={(v) => update(items.map((x, j) => (j === i ? { ...x, a: v } : x)))}
          />
        </EditorCard>
      ))}

      <Button
        variant="outline"
        className="justify-start gap-1.5 w-fit"
        onClick={() => {
          update([...items, { q: { id: "", en: "" }, a: { id: "", en: "" } }]);
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

/* ================= LANGKAH KERJA ================= */

interface ApproachRec {
  number: string;
  title: L;
  description: L;
  duration?: L | null;
}

export function ApproachPanel() {
  const { items, update, save, saving, dirty } = useContentList<ApproachRec>("approach");
  const [open, setOpen] = useState<number | null>(0);

  if (!items) return <Loading />;
  const ops = listOps(items, update);

  return (
    <div className="grid min-w-0 grid-cols-1 gap-3">
      {items.map((a, i) => (
        <EditorCard
          key={i}
          title={`${a.number || "?"} — ${a.title?.id || a.title?.en || ""}`}
          summary={a.duration?.id}
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
          <div className="grid gap-4 sm:grid-cols-[120px_1fr]">
            <Field label={t.langkah.nomor}>
              <Input
                value={a.number}
                onChange={(e) =>
                  update(items.map((x, j) => (j === i ? { ...x, number: e.target.value } : x)))
                }
              />
            </Field>
            <BiInput
              label={t.langkah.durasi}
              value={a.duration ?? { id: "", en: "" }}
              onChange={(v) =>
                update(items.map((x, j) => (j === i ? { ...x, duration: v } : x)))
              }
            />
          </div>
          <BiInput
            label={t.langkah.judul}
            value={a.title}
            onChange={(v) => update(items.map((x, j) => (j === i ? { ...x, title: v } : x)))}
          />
          <BiInput
            label={t.langkah.deskripsi}
            value={a.description}
            multiline
            rows={3}
            onChange={(v) =>
              update(items.map((x, j) => (j === i ? { ...x, description: v } : x)))
            }
          />
        </EditorCard>
      ))}

      <Button
        variant="outline"
        className="justify-start gap-1.5 w-fit"
        onClick={() => {
          update([
            ...items,
            {
              number: String(items.length + 1).padStart(2, "0"),
              title: { id: "", en: "" },
              description: { id: "", en: "" },
              duration: { id: "", en: "" },
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
    <div className="grid gap-2">
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-16 rounded-xl bg-muted/50 animate-pulse" />
      ))}
    </div>
  );
}
