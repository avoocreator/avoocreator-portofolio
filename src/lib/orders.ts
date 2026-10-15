import "server-only";
import { db } from "@/lib/db";

export interface OrderInput {
  name: string;
  phone: string;
  email?: string;
  service: string;
  message: string;
  budget?: string;
  deadline?: string;
  refLink?: string;
  locale?: string;
}

export interface OrderRecord {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  service: string;
  message: string;
  budget?: string | null;
  deadline?: string | null;
  refLink?: string | null;
  locale: string;
  status: string;
  createdAt: string;
}

export const ORDER_STATUSES = ["baru", "diproses", "selesai", "arsip"] as const;

/** Simpan pesanan baru dari form pemesanan. */
export async function createOrder(
  input: OrderInput
): Promise<{ stored: "local" | "none" }> {
  try {
    const { error } = await db.from("orders").insert({
      name: input.name,
      phone: input.phone,
      email: input.email || null,
      service: input.service,
      message: input.message,
      budget: input.budget || null,
      deadline: input.deadline || null,
      ref_link: input.refLink || null,
      locale: input.locale || "id",
      status: "baru",
    });
    if (error) return { stored: "none" };
    return { stored: "local" };
  } catch {
    return { stored: "none" };
  }
}

/** Daftar pesanan (untuk dashboard admin). */
export async function listOrders(): Promise<OrderRecord[]> {
  try {
    const { data, error } = await db
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) return [];
    return (data ?? []).map((o) => ({
      id: o.id,
      name: o.name,
      phone: o.phone,
      email: o.email,
      service: o.service,
      message: o.message,
      budget: o.budget,
      deadline: o.deadline,
      refLink: o.ref_link,
      locale: o.locale,
      status: o.status,
      createdAt: new Date(o.created_at).toISOString(),
    }));
  } catch {
    return [];
  }
}

/** Perbarui status pesanan. */
export async function updateOrderStatus(id: string, status: string): Promise<boolean> {
  if (!ORDER_STATUSES.includes(status as (typeof ORDER_STATUSES)[number])) return false;
  try {
    const { error } = await db.from("orders").update({ status }).eq("id", id);
    return !error;
  } catch {
    return false;
  }
}

/** Hapus pesanan. */
export async function deleteOrder(id: string): Promise<boolean> {
  try {
    const { error } = await db.from("orders").delete().eq("id", id);
    return !error;
  } catch {
    return false;
  }
}
