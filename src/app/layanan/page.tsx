import type { Metadata } from "next";
import { getApproach, getFaq, getServices, getSiteSettings } from "@/lib/content";
import { LayananHead, ServicesFull } from "@/components/sections/layanan/ServicesFull";
import { FaqSection } from "@/components/sections/layanan/FaqSection";
import { ApproachSteps } from "@/components/sections/keahlian/ApproachSteps";
import { StatsStrip } from "@/components/sections/home/StatsStrip";
import { CTABanner } from "@/components/sections/home/CTABanner";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Layanan",
  description:
    "Layanan Avoo Creator: pengembangan website, desain UI/UX, desain grafis, desain presentasi, branding, dan prototipe interaktif. Pesan langsung via WhatsApp.",
};

export default async function LayananPage() {
  const [services, faq, site, approach] = await Promise.all([
    getServices(),
    getFaq(),
    getSiteSettings(),
    getApproach(),
  ]);
  return (
    <>
      <LayananHead />
      <ServicesFull services={services} />
      <StatsStrip stats={site.stats} />
      <div className="pt-16">
        <ApproachSteps steps={approach} />
      </div>
      <FaqSection items={faq} whatsapp={site.whatsapp} />
      <CTABanner availability={site.availability} />
    </>
  );
}
