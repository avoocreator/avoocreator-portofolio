import type { Metadata } from "next";
import { getFaq, getServices } from "@/lib/content";
import { LayananHead, ServicesFull } from "@/components/sections/layanan/ServicesFull";
import { FaqSection } from "@/components/sections/layanan/FaqSection";
import { ApproachSteps } from "@/components/sections/keahlian/ApproachSteps";
import { StatsStrip } from "@/components/sections/home/StatsStrip";
import { CTABanner } from "@/components/sections/home/CTABanner";

export const metadata: Metadata = {
  title: "Layanan",
  description:
    "Layanan Avoo Creator: pengembangan website, desain UI/UX, desain grafis, desain presentasi, branding, dan prototipe interaktif. Pesan langsung via WhatsApp.",
};

export default async function LayananPage() {
  const [services, faq] = await Promise.all([getServices(), getFaq()]);
  return (
    <>
      <LayananHead />
      <ServicesFull services={services} />
      <StatsStrip />
      <div className="pt-16">
        <ApproachSteps />
      </div>
      <FaqSection items={faq} />
      <CTABanner />
    </>
  );
}
