import type { Metadata } from "next";
import { getParticipation, getSiteSettings } from "@/lib/content";
import { PartisipasiExplorer } from "@/components/sections/PartisipasiViews";
import { CTABanner } from "@/components/sections/home/CTABanner";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Partisipasi",
  description:
    "Organisasi, kompetisi, dan proyek yang diikuti Avoo Creator — dari Matura Robo Tech sampai JHIC 2.0.",
};

export default async function PartisipasiPage() {
  const [categories, site] = await Promise.all([getParticipation(), getSiteSettings()]);
  return (
    <>
      <PartisipasiExplorer categories={categories} />
      <CTABanner availability={site.availability} />
    </>
  );
}
