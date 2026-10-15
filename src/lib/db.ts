import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Koneksi Supabase (server-side only).
 *
 * Dipakai dengan SERVICE ROLE KEY yang TIDAK PERNAH dikirim ke browser
 * (nama variabel tanpa NEXT_PUBLIC_ supaya Next.js tidak membocorkannya).
 *
 * Jika env belum diisi, modul TETAP bisa di-import tanpa error —
 * `supabaseConfigured` bernilai false dan setiap pemanggilan query akan
 * gagal lewat try/catch pemanggil (situs publik memakai data seed fallback,
 * halaman admin menampilkan panduan setup).
 */

const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const key =
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  process.env.SUPABASE_SERVICE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "";

export const supabaseConfigured = Boolean(url && key);

/** UUID "kosong" — dipakai untuk pola delete-all (tidak ada row yang punya id ini). */
export const ZERO_UUID = "00000000-0000-0000-0000-000000000000";

export const db: SupabaseClient = createClient(
  // placeholder agar createClient tidak melempar saat env kosong;
  // client tidak akan dipakai selama supabaseConfigured === false.
  url || "http://localhost:54321",
  key || "placeholder-anon-key",
  {
    auth: { persistSession: false, autoRefreshToken: false },
  }
);

/** Error database yang bisa dibedakan dari error lain. */
export class DbError extends Error {
  constructor(
    message: string,
    public readonly code: "NOT_CONFIGURED" | "DB" = "DB"
  ) {
    super(message);
    this.name = "DbError";
  }
}

/** Lempar DbError jika env Supabase belum diisi. */
export function assertConfigured(): void {
  if (!supabaseConfigured) {
    throw new DbError(
      "SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY belum diisi di .env.local",
      "NOT_CONFIGURED"
    );
  }
}

/** Bantuan: ubah pola { data, error } Supabase jadi data / throw DbError. */
export function unwrap<T>(data: T | null, error: { message: string } | null): T {
  if (error) throw new DbError(error.message);
  return data as T;
}
