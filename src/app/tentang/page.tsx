import type { Metadata } from "next";
import { TentangHero } from "@/components/sections/tentang/TentangHero";
import { ValuesAndFacts } from "@/components/sections/tentang/ValuesAndFacts";
import { JourneyTimeline } from "@/components/sections/tentang/JourneyTimeline";
import { PartisipasiTeaser } from "@/components/sections/tentang/PartisipasiTeaser";
import { CTABanner } from "@/components/sections/home/CTABanner";
import { getAbout, getExperience, getParticipation, getSiteSettings } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tentang",
  description:
    "Kenalan dengan Avian (Avoo Creator) — web developer & graphic designer dari Jawa Timur yang bangun hal yang jalan, bukan cuma tampil bagus.",
};

export default async function TentangPage() {
  const [about, experience, participation, site] = await Promise.all([
    getAbout(),
    getExperience(),
    getParticipation(),
    getSiteSettings(),
  ]);

  return (
    <>
      <TentangHero about={about} />
      <ValuesAndFacts about={about} />
      <JourneyTimeline experience={experience} about={about} />
      <PartisipasiTeaser participation={participation} />
      <CTABanner availability={site.availability} />
    </>
  );
}
