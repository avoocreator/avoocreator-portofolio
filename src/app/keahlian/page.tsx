import type { Metadata } from "next";
import { getExpertise } from "@/lib/content";
import { PageHero } from "@/components/sections/shared/PageHero";
import { ExpertiseList } from "@/components/sections/keahlian/ExpertiseList";
import { ToolsMarquee } from "@/components/sections/keahlian/ToolsMarquee";
import { ApproachSteps } from "@/components/sections/keahlian/ApproachSteps";
import { CTABanner } from "@/components/sections/home/CTABanner";
import { KeahlianHead } from "@/components/sections/keahlian/KeahlianHead";

export const metadata: Metadata = {
  title: "Keahlian",
  description:
    "Keahlian Avoo Creator: web development, visual design, creative technology, dan research — dengan perangkat yang dipakai sehari-hari.",
};

export default async function KeahlianPage() {
  const groups = await getExpertise();
  return (
    <>
      <KeahlianHead />
      <ExpertiseList groups={groups} />
      <ToolsMarquee />
      <ApproachSteps />
      <CTABanner />
    </>
  );
}
