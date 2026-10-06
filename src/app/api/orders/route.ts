import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createOrder, listOrders, adminPasscode } from "@/lib/orders";

const orderSchema = z.object({
  name: z.string().min(2).max(80),
  phone: z.string().min(8).max(24),
  email: z.string().max(120).optional().or(z.literal("")),
  service: z.string().min(2).max(120),
  message: z.string().min(10).max(2000),
  budget: z.string().max(60).optional().or(z.literal("")),
  deadline: z.string().max(40).optional().or(z.literal("")),
  refLink: z.string().max(400).optional().or(z.literal("")),
  locale: z.enum(["id", "en"]).default("id"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = orderSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "VALIDATION", issues: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const d = parsed.data;
    const result = await createOrder({
      name: d.name,
      phone: d.phone,
      email: d.email || undefined,
      service: d.service,
      message: d.message,
      budget: d.budget || undefined,
      deadline: d.deadline || undefined,
      refLink: d.refLink || undefined,
      locale: d.locale,
    });
    return NextResponse.json({ ok: true, stored: result.stored });
  } catch {
    return NextResponse.json({ ok: false, error: "SERVER" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const passcode = req.headers.get("x-admin-passcode") ?? "";
  if (passcode !== adminPasscode()) {
    return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  }
  try {
    const { source, orders } = await listOrders();
    return NextResponse.json({
      ok: true,
      source,
      demoPasscode: process.env.ADMIN_PASSCODE ? undefined : adminPasscode(),
      orders,
    });
  } catch {
    return NextResponse.json({ ok: false, error: "SERVER" }, { status: 500 });
  }
}
