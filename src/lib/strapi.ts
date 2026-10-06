/**
 * Klien REST Strapi — dipakai server-side saja.
 *
 * Struktur yang didukung:
 * - Strapi v4 (data[i].attributes) maupun v5 (data[i] flat).
 * - Konten bilingual: field `*_id` dan `*_en`, atau field tunggal
 *   (otomatis dipakai untuk kedua bahasa).
 *
 * Semua fetch diberi timeout pendek + fallback — website tidak
 * boleh mati hanya karena Strapi free hosting sedang tidur/cold start.
 */
import type { L } from "@/i18n/types";

export const STRAPI_URL = process.env.STRAPI_URL?.replace(/\/+$/, "") || "";
export const STRAPI_TOKEN = process.env.STRAPI_TOKEN || "";

export function strapiConfigured(): boolean {
  return !!STRAPI_URL;
}

interface FetchOpts {
  timeoutMs?: number;
  revalidate?: number;
}

export async function strapiFetch<T = unknown>(
  path: string,
  { timeoutMs = 4000, revalidate = 300 }: FetchOpts = {}
): Promise<T | null> {
  if (!STRAPI_URL) return null;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${STRAPI_URL}/api${path}`, {
      headers: STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {},
      signal: controller.signal,
      next: { revalidate },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/** Ambil satu collection dua-duanya (locale id & en), hasil digabung per documentId. */
export async function strapiCollectionBothLocales(
  collection: string,
  pageSize = 100
): Promise<Record<string, Record<string, unknown>>[]> {
  const fetchLocale = async (locale: string) => {
    const json = await strapiFetch<{
      data?: Record<string, Record<string, unknown>>[];
    }>(
      `/${collection}?locale=${locale}&pagination[pageSize]=${pageSize}&pagination[page]=1&sort[0]=id`,
      { timeoutMs: 5000 }
    );
    return json?.data ?? [];
  };

  const [idData, enData] = await Promise.all([fetchLocale("id"), fetchLocale("en")]);
  if (!idData.length && !enData.length) return [];

  const keyOf = (entry: Record<string, Record<string, unknown>>) => {
    const flat = entry.attributes ?? entry;
    return String(flat.documentId ?? flat.id ?? entry.id ?? Math.random());
  };

  const merged = new Map<string, Record<string, Record<string, unknown>>>();
  for (const e of idData) merged.set(keyOf(e), { id: e, en: e });
  for (const e of enData) {
    const k = keyOf(e);
    const prev = merged.get(k);
    merged.set(k, { id: prev?.id ?? e, en: e });
  }
  return Array.from(merged.values());
}

/** Ambil nilai field mentah (mendukung v4 attributes & v5 flat). */
export function fieldOf(entry: Record<string, Record<string, unknown>> | undefined): Record<string, unknown> {
  if (!entry) return {};
  return (entry.attributes ?? entry) as Record<string, unknown>;
}

/** Susun teks bilingual dari field `x_id`/`x_en` atau fallback `x`. */
export function biField(
  idEntry: Record<string, unknown>,
  enEntry: Record<string, unknown>,
  base: string
): L | null {
  const idVal = idEntry[`${base}_id`] ?? idEntry[base];
  const enVal = enEntry[`${base}_en`] ?? enEntry[base];
  const idStr = typeof idVal === "string" ? idVal : "";
  const enStr = typeof enVal === "string" ? enVal : "";
  if (!idStr && !enStr) return null;
  return { id: idStr || enStr, en: enStr || idStr };
}

/** Parse field JSON yang bisa berupa array / string JSON / null. */
export function jsonField<T>(value: unknown, fallback: T): T {
  if (Array.isArray(value)) return value as T;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? (parsed as T) : fallback;
    } catch {
      return fallback;
    }
  }
  return fallback;
}
