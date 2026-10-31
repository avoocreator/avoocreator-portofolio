"use client";

import { StatusPage } from "@/components/layout/StatusPage";

export default function GlobalRouteError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <StatusPage
      code="500"
      title={{ id: "Ada yang tidak beres", en: "Something went wrong" }}
      body={{
        id: "Halaman ini gagal dimuat. Coba lagi, atau kembali ke beranda.",
        en: "This page failed to load. Try again, or head back home.",
      }}
      onRetry={reset}
    />
  );
}
