import { StatusPage } from "@/components/layout/StatusPage";

export default function NotFound() {
  return (
    <StatusPage
      code="404"
      title={{ id: "Halaman tidak ditemukan", en: "Page not found" }}
      body={{
        id: "Alamat yang kamu buka tidak ada atau sudah dipindahkan. Yuk balik ke beranda.",
        en: "The address you opened doesn't exist or has moved. Let's head back home.",
      }}
    />
  );
}
