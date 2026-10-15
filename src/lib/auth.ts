import "server-only";
import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

export interface AdminRecord {
  username: string;
  password_hash: string;
}

/**
 * Autentikasi admin — tanpa dependency tambahan.
 * - Password di-hash dengan scrypt (salt acak per user).
 * - Session = token HMAC-SHA256 yang disimpan di cookie httpOnly.
 * - Secret session dibuat otomatis sekali & disimpan di DB (tabel Setting),
 *   jadi tidak perlu setup env apa pun.
 */

export const SESSION_COOKIE = "avoo_admin_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 hari

export interface SessionData {
  username: string;
  exp: number;
}

/* ---------------- Password ---------------- */

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  try {
    const [salt, hash] = stored.split(":");
    if (!salt || !hash) return false;
    const candidate = scryptSync(password, salt, 64);
    const expected = Buffer.from(hash, "hex");
    return candidate.length === expected.length && timingSafeEqual(candidate, expected);
  } catch {
    return false;
  }
}

/* ---------------- Session secret ---------------- */

async function getSessionSecret(): Promise<string> {
  const KEY = "_session_secret";
  const { data: row, error } = await db
    .from("settings")
    .select("value")
    .eq("key", KEY)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (row?.value && typeof row.value === "string") return row.value;
  const secret = randomBytes(48).toString("hex");
  const { error: upErr } = await db
    .from("settings")
    .upsert({ key: KEY, value: secret }, { onConflict: "key" });
  if (upErr) throw new Error(upErr.message);
  return secret;
}

/* ---------------- Token ---------------- */

function b64url(input: Buffer | string): string {
  return Buffer.from(input).toString("base64url");
}

export async function createSessionToken(username: string): Promise<string> {
  const secret = await getSessionSecret();
  const payload: SessionData = { username, exp: Date.now() + SESSION_TTL_MS };
  const body = b64url(JSON.stringify(payload));
  const sig = createHmac("sha256", secret).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export async function readSessionToken(token: string | undefined): Promise<SessionData | null> {
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  try {
    const secret = await getSessionSecret();
    const expected = createHmac("sha256", secret).update(body).digest("base64url");
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
    const payload = JSON.parse(Buffer.from(body, "base64url").toString()) as SessionData;
    if (!payload?.username || typeof payload.exp !== "number" || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

/* ---------------- Cookie helpers ---------------- */

export async function getSession(): Promise<SessionData | null> {
  const store = await cookies();
  return readSessionToken(store.get(SESSION_COOKIE)?.value);
}

export async function setSessionCookie(username: string): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, await createSessionToken(username), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
}

/** Untuk route handler API: kembalikan username jika sesi valid, selain itu null. */
export async function requireAdmin(): Promise<string | null> {
  const session = await getSession();
  if (!session) return null;
  try {
    const { data: user, error } = await db
      .from("admin_users")
      .select("username")
      .eq("username", session.username)
      .maybeSingle();
    if (error) return null;
    return user ? session.username : null;
  } catch {
    return null;
  }
}

/** Cari akun admin berdasarkan username. */
export async function findAdmin(username: string): Promise<AdminRecord | null> {
  const { data, error } = await db
    .from("admin_users")
    .select("username, password_hash")
    .eq("username", username)
    .maybeSingle();
  if (error) return null;
  return (data as AdminRecord | null) ?? null;
}
