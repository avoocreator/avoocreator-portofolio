import type { Metadata } from "next";
import { getApproach, getExpertise, getSiteSettings } from "@/lib/content";
import { unionTools } from "@/lib/tools";
import { PageHero } from "@/components/sections/shared/PageHero";
import { ExpertiseList } from "@/components/sections/keahlian/ExpertiseList";
import { ToolsMarquee } from "@/components/sections/keahlian/ToolsMarquee";
import { ApproachSteps } from "@/components/sections/keahlian/ApproachSteps";
import { CTABanner } from "@/components/sections/home/CTABanner";
import { KeahlianHead } from "@/components/sections/keahlian/KeahlianHead";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Keahlian",
  description:
    "Keahlian Avoo Creator: web development, visual design, creative technology, dan research — dengan perangkat yang dipakai sehari-hari.",
};

export default async function KeahlianPage() {
  const [groups, approach, site] = await Promise.all([getExpertise(), getApproach(), getSiteSettings()]);
  const allTools = unionTools(groups);
  return (
    <>
      <KeahlianHead />
      <ExpertiseList groups={groups} />
      <ToolsMarquee tools={allTools} />
      <ApproachSteps steps={approach} />
      <CTABanner availability={site.availability} />
    </>
  );
}
