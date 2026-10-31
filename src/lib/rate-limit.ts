/**
 * Pembatas laju sederhana di memori (sliding window per kunci, mis. IP).
 * Cukup untuk menahan brute-force dan spam form pada satu instance server.
 * Untuk perlindungan lintas-instance, ganti dengan Redis/Upstash.
 */
const g = globalThis as unknown as { __avooRateBuckets?: Map<string, number[]> };
const buckets = (g.__avooRateBuckets ??= new Map<string, number[]>());

function recent(key: string, windowMs: number): number[] {
  const now = Date.now();
  const arr = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (arr.length) buckets.set(key, arr);
  else buckets.delete(key);
  return arr;
}

/** true kalau kunci sudah mencapai batas dalam jendela waktu. Tidak menambah hitungan. */
export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  return recent(key, windowMs).length >= limit;
}

/** Catat satu kejadian. */
export function recordHit(key: string, windowMs: number): void {
  const arr = recent(key, windowMs);
  arr.push(Date.now());
  buckets.set(key, arr);
  if (buckets.size > 5000) {
    // sapu kunci kadaluarsa supaya memori tidak membengkak
    const now = Date.now();
    for (const [k, v] of buckets)
      if (!v.length || now - v[v.length - 1] > windowMs) buckets.delete(k);
  }
}

/** Reset hitungan satu kunci (mis. setelah login berhasil). */
export function clearHits(key: string): void {
  buckets.delete(key);
}

/** Ambil IP klien dari header proxy yang umum. */
export function clientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    headers.get("cf-connecting-ip") ||
    "unknown"
  );
}
