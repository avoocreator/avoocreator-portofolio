import type { Metadata } from "next";
import { TentangHero } from "@/components/sections/tentang/TentangHero";
import { ValuesAndFacts } from "@/components/sections/tentang/ValuesAndFacts";
import { JourneyTimeline } from "@/components/sections/tentang/JourneyTimeline";
import { PartisipasiTeaser } from "@/components/sections/tentang/PartisipasiTeaser";
import { CTABanner } from "@/components/sections/home/CTABanner";

export const metadata: Metadata = {
  title: "Tentang",
  description:
    "Kenalan dengan Avian (Avoo Creator) — web developer & graphic designer dari Jawa Timur yang bangun hal yang jalan, bukan cuma tampil bagus.",
};

export default function TentangPage() {
  return (
    <>
      <TentangHero />
      <ValuesAndFacts />
      <JourneyTimeline />
      <PartisipasiTeaser />
      <CTABanner />
    </>
  );
}
