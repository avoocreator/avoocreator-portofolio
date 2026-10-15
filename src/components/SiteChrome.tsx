"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { FloatingOrderButton } from "@/components/order/FloatingOrderButton";

/** Chrome situs: disembunyikan di halaman /admin */
export function SiteChrome({ children, footer }: { children: ReactNode; footer: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  return (
    <>
      {!isAdmin && <Navbar />}
      <main className="flex-1">{children}</main>
      {!isAdmin && footer}
      {!isAdmin && <FloatingOrderButton />}
    </>
  );
}
