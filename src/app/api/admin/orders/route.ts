import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { deleteOrder, listOrders, updateOrderStatus } from "@/lib/orders";
import { requireAdmin } from "@/lib/auth";
import { ensureSeeded } from "@/lib/seed";

const patchSchema = z.object({
  id: z.string().min(1).max(80),
  status: z.enum(["baru", "diproses", "selesai", "arsip"]),
});

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  try {
    await ensureSeeded();
    const orders = await listOrders();
    return NextResponse.json({ ok: true, orders });
  } catch {
    return NextResponse.json({ ok: false, error: "SERVER" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  try {
    const parsed = patchSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "VALIDATION" }, { status: 400 });
    }
    const ok = await updateOrderStatus(parsed.data.id, parsed.data.status);
    return NextResponse.json({ ok });
  } catch {
    return NextResponse.json({ ok: false, error: "SERVER" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  try {
    const id = new URL(req.url).searchParams.get("id") ?? "";
    if (!id) return NextResponse.json({ ok: false, error: "VALIDATION" }, { status: 400 });
    const ok = await deleteOrder(id);
    return NextResponse.json({ ok });
  } catch {
    return NextResponse.json({ ok: false, error: "SERVER" }, { status: 500 });
  }
}
