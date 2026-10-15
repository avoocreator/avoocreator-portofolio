import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { ensureSeeded } from "@/lib/seed";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { SupabaseSetupNotice } from "@/components/admin/SupabaseSetupNotice";

export const metadata: Metadata = {
  title: "Login Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const seeded = await ensureSeeded();
  const session = await getSession();
  if (session) {
    redirect("/admin");
  }
  if (!seeded.ok) {
    return <SupabaseSetupNotice reason={seeded.reason} />;
  }
  return <AdminLoginForm />;
}
