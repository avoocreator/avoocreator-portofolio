import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/content";
import { KontakView } from "@/components/sections/KontakView";

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Hubungi Avoo Creator untuk proyek website, desain, atau kolaborasi — email, WhatsApp, dan sosial media.",
};

export default async function KontakPage() {
  const site = await getSiteSettings();
  return (
    <KontakView
      email={site.email}
      whatsapp={site.whatsapp}
      socials={site.socials}
      location={site.location}
    />
  );
}
