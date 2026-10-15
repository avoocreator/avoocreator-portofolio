import { toolByKey } from "@/data/tools";
import type { ToolRef } from "@/data/expertise";

/**
 * Normalisasi daftar perangkat dari database (jsonb) supaya selalu berbentuk
 * ToolRef[] — sambil tetap kompatibel dengan data lama berupa string[]:
 *   "figma"  → { name: "Figma", key: "figma" }   (nama diambil dari pustaka ikon)
 *
 * Aturan:
 * - logoUrl menang atas key saat render (dilakukan di komponen ToolChip)
 * - name kosong → diambil dari pustaka ikon bawaan, atau dari key itu sendiri
 * - item tanpa name/key/logoUrl dibuang
 */
export function normalizeToolRefs(raw: unknown, fallback: ToolRef[]): ToolRef[] {
  if (!Array.isArray(raw)) return fallback;
  const out: ToolRef[] = [];
  for (const t of raw) {
    if (typeof t === "string") {
      const key = t.trim();
      if (!key) continue;
      out.push({ name: toolByKey[key]?.name ?? key, key });
      continue;
    }
    if (typeof t !== "object" || t === null) continue;
    const o = t as Record<string, unknown>;
    const key = typeof o.key === "string" && o.key.trim() ? o.key.trim() : undefined;
    const logoUrl =
      typeof o.logoUrl === "string" && o.logoUrl.trim()
        ? o.logoUrl.trim()
        : typeof o.logo_url === "string" && o.logo_url.trim()
          ? o.logo_url.trim()
          : undefined;
    const name =
      typeof o.name === "string" && o.name.trim()
        ? o.name.trim()
        : (key && toolByKey[key]?.name) || key || "";
    if (!name && !key && !logoUrl) continue;
    out.push({ name, key, logoUrl });
  }
  return out;
}

/** Gabungkan perangkat dari semua grup (urut, tanpa duplikat) untuk marquee. */
export function unionTools(groups: { tools: ToolRef[] }[]): ToolRef[] {
  const seen = new Set<string>();
  const out: ToolRef[] = [];
  for (const g of groups) {
    for (const t of g.tools) {
      const id = (t.name || t.key || t.logoUrl || "").toLowerCase();
      if (!id || seen.has(id)) continue;
      seen.add(id);
      out.push(t);
    }
  }
  return out;
}
