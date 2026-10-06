import "server-only";
import { db } from "@/lib/db";
import { strapiFetch, strapiConfigured, STRAPI_URL } from "./strapi";

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
  storedVia: string;
  createdAt: string;
}

/** Buat pesanan: coba Strapi dulu, gagal → simpan lokal (Prisma). */
export async function createOrder(
  input: OrderInput
): Promise<{ stored: "strapi" | "local" | "none" }> {
  if (strapiConfigured()) {
    const ok = await postToStrapi(input);
    if (ok) {
      // tetap simpan lokal sebagai cadangan arsip ringan
      try {
        await db.order.create({
          data: {
            ...input,
            email: input.email || null,
            budget: input.budget || null,
            deadline: input.deadline || null,
            refLink: input.refLink || null,
            locale: input.locale || "id",
            storedVia: "strapi",
          },
        });
      } catch {
        /* lokal gagal — tidak masalah, sudah masuk Strapi */
      }
      return { stored: "strapi" };
    }
  }
  try {
    await db.order.create({
      data: {
        ...input,
        email: input.email || null,
        budget: input.budget || null,
        deadline: input.deadline || null,
        refLink: input.refLink || null,
        locale: input.locale || "id",
        storedVia: "local",
      },
    });
    return { stored: "local" };
  } catch {
    return { stored: "none" };
  }
}

async function postToStrapi(input: OrderInput): Promise<boolean> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 6000);
  try {
    const res = await fetch(`${STRAPI_URL}/api/pesanan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.STRAPI_TOKEN
          ? { Authorization: `Bearer ${process.env.STRAPI_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({
        data: {
          nama: input.name,
          kontak_wa: input.phone,
          email: input.email ?? "",
          layanan: input.service,
          kebutuhan: input.message,
          budget: input.budget ?? "",
          deadline: input.deadline ?? "",
          referensi: input.refLink ?? "",
        },
      }),
      signal: controller.signal,
    });
    return res.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

/** Daftar pesanan: Strapi (jika tersambung) → lokal. */
export async function listOrders(): Promise<{ source: "strapi" | "local"; orders: OrderRecord[] }> {
  if (strapiConfigured()) {
    const json = await strapiFetch<{
      data?: { id: number; documentId?: string; attributes?: Record<string, unknown> }[] | Record<string, unknown>[];
    }>("/pesanan?sort[0]=createdAt:desc&pagination[pageSize]=100", { timeoutMs: 5000, revalidate: 0 });
    const data = Array.isArray(json?.data) ? json.data : [];
    if (data.length) {
      return {
        source: "strapi",
        orders: data.map((e, i) => {
          const f = (e as { attributes?: Record<string, unknown> }).attributes ?? (e as Record<string, unknown>);
          return {
            id: String((e as { documentId?: string }).documentId ?? (e as { id: number }).id ?? i),
            name: String(f.nama ?? f.name ?? "-"),
            phone: String(f.kontak_wa ?? f.phone ?? "-"),
            email: f.email ? String(f.email) : null,
            service: String(f.layanan ?? f.service ?? "-"),
            message: String(f.kebutuhan ?? f.message ?? "-"),
            budget: f.budget ? String(f.budget) : null,
            deadline: f.deadline ? String(f.deadline) : null,
            refLink: f.referensi ? String(f.referensi) : null,
            locale: "id",
            storedVia: "strapi",
            createdAt: String(f.createdAt ?? f.publishedAt ?? new Date().toISOString()),
          };
        }),
      };
    }
  }
  try {
    const orders = await db.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return {
      source: "local",
      orders: orders.map((o) => ({
        id: o.id,
        name: o.name,
        phone: o.phone,
        email: o.email,
        service: o.service,
        message: o.message,
        budget: o.budget,
        deadline: o.deadline,
        refLink: o.refLink,
        locale: o.locale,
        storedVia: o.storedVia,
        createdAt: o.createdAt.toISOString(),
      })),
    };
  } catch {
    return { source: "local", orders: [] };
  }
}

export function adminPasscode(): string {
  return process.env.ADMIN_PASSCODE || "avoo2026";
}
