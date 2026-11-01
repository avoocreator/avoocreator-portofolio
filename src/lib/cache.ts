/**
 * Cache konten di memori server.
 *
 * Kenapa: semua halaman publik `force-dynamic`, jadi tanpa cache setiap kunjungan
 * menjalankan 3–9 query Supabase. Dengan cache ini, query yang sama dijalankan
 * paling sering sekali per TTL (default 30 detik) per instance server.
 *
 * - Permintaan bersamaan untuk kunci yang sama digabung jadi satu query.
 * - Kalau Supabase error/lambat, data lama (stale) tetap dipakai daripada menampilkan data bawaan.
 * - Admin yang menyimpan perubahan memanggil `invalidateContent()` supaya langsung terlihat.
 *
 * Catatan: di hosting serverless (mis. Vercel) tiap instance punya cache sendiri, jadi instance lain
 * bisa tertinggal paling lama selama TTL. Atur lewat env CONTENT_CACHE_TTL_MS (0 = matikan cache).
 */

interface Entry<T> {
  value: T;
  at: number;
}

const TTL_MS = (() => {
  if (process.env.NODE_ENV === "development") return 0;
  const raw = Number(process.env.CONTENT_CACHE_TTL_MS);
  return Number.isFinite(raw) && raw >= 0 ? raw : 30_000;
})();

/** Setelah query gagal dan tidak ada data lama, jangan coba lagi selama ini (hindari halaman lambat berulang). */
const FAILURE_BACKOFF_MS = 5_000;

// Disimpan di globalThis: Next dapat memuat modul ini lebih dari sekali (halaman vs route handler admin),
// padahal cache harus satu supaya invalidateContent() dari admin benar-benar membuang data yang dipakai halaman.
interface Shared {
  store: Map<string, Entry<unknown>>;
  inflight: Map<string, Promise<unknown>>;
  /** Saat jaringan ke database bermasalah: lewati database sampai waktu ini (circuit breaker). */
  downUntil: number;
}
const g = globalThis as unknown as { __avooContentCache?: Shared };
const shared = (g.__avooContentCache ??= { store: new Map(), inflight: new Map(), downUntil: 0 });
const store = shared.store;
const inflight = shared.inflight;

/** Jaringan putus / timeout (bukan sekadar tabel kosong atau error kueri). */
const NETWORK_ERROR = /fetch failed|aborted|timeout|timed out|ECONN|ENOTFOUND|EAI_AGAIN|network/i;
const NETWORK_BACKOFF_MS = 10_000;

export async function cached<T>(
  key: string,
  load: () => Promise<T>,
  fallback: () => T,
): Promise<T> {
  if (TTL_MS === 0) {
    try {
      return await load();
    } catch {
      return fallback();
    }
  }

  const now = Date.now();
  const hit = store.get(key) as Entry<T> | undefined;
  if (hit && now - hit.at < TTL_MS) return hit.value;

  // Database sedang tidak terjangkau: jangan menunggu timeout lagi di setiap kunci/halaman.
  if (now < shared.downUntil) return hit ? hit.value : fallback();

  const pending = inflight.get(key) as Promise<T> | undefined;
  if (pending) return pending;

  const promise = load()
    .then((value) => {
      shared.downUntil = 0;
      store.set(key, { value, at: Date.now() });
      return value;
    })
    .catch((err: unknown) => {
      if (NETWORK_ERROR.test(err instanceof Error ? err.message : String(err))) {
        shared.downUntil = Date.now() + NETWORK_BACKOFF_MS;
      }
      if (hit) {
        // Pakai data lama, coba lagi sebentar lagi.
        store.set(key, { value: hit.value, at: Date.now() - TTL_MS + FAILURE_BACKOFF_MS });
        return hit.value;
      }
      const value = fallback();
      store.set(key, { value, at: Date.now() - TTL_MS + FAILURE_BACKOFF_MS });
      return value;
    })
    .finally(() => {
      inflight.delete(key);
    });

  inflight.set(key, promise);
  return promise;
}

/** Buang seluruh cache konten (dipanggil setelah admin menyimpan perubahan). */
export function invalidateContent(): void {
  store.clear();
  shared.downUntil = 0;
}
