import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { ensureSeeded } from "@/lib/seed";
import { AdminShell } from "@/components/admin/AdminShell";
import { SupabaseSetupNotice } from "@/components/admin/SupabaseSetupNotice";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const seeded = await ensureSeeded();
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }
  if (!seeded.ok) {
    return <SupabaseSetupNotice reason={seeded.reason} />;
  }
  return <AdminShell username={session.username} />;
}
