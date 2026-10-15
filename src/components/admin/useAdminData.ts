"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { t } from "./strings";

/** State loading/simpan + dirty tracking untuk daftar konten. */
export function useContentList<T>(type: string) {
  const [items, setItems] = useState<T[] | null>(null);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const initial = useRef<T[] | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/content/${type}`);
      if (!res.ok) throw new Error("load");
      const json = await res.json();
      setItems(json.items ?? []);
      initial.current = json.items ?? [];
      setDirty(false);
    } catch {
      toast.error(t.shell.gagalMuat);
      setItems([]);
    }
  }, [type]);

  useEffect(() => {
    load();
  }, [load]);

  const update = useCallback((next: T[]) => {
    setItems(next);
    setDirty(true);
  }, []);

  const save = useCallback(async (): Promise<boolean> => {
    if (items == null) return false;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/content/${type}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error("save");
      initial.current = items;
      setDirty(false);
      toast.success(t.shell.tersimpan);
      return true;
    } catch {
      toast.error(t.shell.gagal);
      return false;
    } finally {
      setSaving(false);
    }
  }, [items, type]);

  return { items, update, save, saving, dirty, reload: load };
}

/** Hook untuk data objek tunggal (about / settings). */
export function useSingleData<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("load");
      const json = await res.json();
      setData(json.data ?? null);
      setDirty(false);
    } catch {
      toast.error(t.shell.gagalMuat);
    }
  }, [url]);

  useEffect(() => {
    load();
  }, [load]);

  const update = useCallback((next: T) => {
    setData(next);
    setDirty(true);
  }, []);

  const save = useCallback(
    async (payload?: T): Promise<boolean> => {
      const body = payload ?? data;
      if (body == null) return false;
      setSaving(true);
      try {
        const res = await fetch(url, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const json = await res.json();
        if (!res.ok || !json.ok) {
          if (json.error === "INVALID_CURRENT") toast.error(t.akun.salahLama);
          else if (json.error === "USERNAME_TAKEN") toast.error(t.akun.usernameDipakai);
          else if (json.error === "VALIDATION") toast.error(t.akun.tidakValid);
          else throw new Error("save");
          return false;
        }
        setDirty(false);
        return true;
      } catch {
        toast.error(t.shell.gagal);
        return false;
      } finally {
        setSaving(false);
      }
    },
    [data, url]
  );

  return { data, update, save, saving, dirty, reload: load };
}

/** Util list helpers. */
export function listOps<T>(items: T[], setItems: (v: T[]) => void) {
  return {
    move: (i: number, dir: -1 | 1) => {
      const j = i + dir;
      if (j < 0 || j >= items.length) return;
      const next = [...items];
      [next[i], next[j]] = [next[j], next[i]];
      setItems(next);
    },
    remove: (i: number) => {
      setItems(items.filter((_, k) => k !== i));
    },
  };
}

export function newId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}
