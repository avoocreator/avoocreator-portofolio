import type { Metadata } from "next";
import { getParticipation } from "@/lib/content";
import { PartisipasiExplorer } from "@/components/sections/PartisipasiViews";
import { CTABanner } from "@/components/sections/home/CTABanner";

export const metadata: Metadata = {
  title: "Partisipasi",
  description:
    "Organisasi, kompetisi, dan proyek yang diikuti Avoo Creator — dari Matura Robo Tech sampai JHIC 2.0.",
};

export default async function PartisipasiPage() {
  const categories = await getParticipation();
  return (
    <>
      <PartisipasiExplorer categories={categories} />
      <CTABanner />
    </>
  );
}
