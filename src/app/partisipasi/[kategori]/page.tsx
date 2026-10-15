import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getParticipation, getSiteSettings } from "@/lib/content";
import { PartisipasiDetail } from "@/components/sections/PartisipasiViews";
import { CTABanner } from "@/components/sections/home/CTABanner";

interface Props {
  params: Promise<{ kategori: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kategori } = await params;
  const categories = await getParticipation();
  const cat = categories.find((c) => c.id === kategori);
  return {
    title: cat ? cat.title.id : "Partisipasi",
    description: cat?.description.id,
  };
}

export default async function PartisipasiDetailPage({ params }: Props) {
  const { kategori } = await params;
  const [categories, site] = await Promise.all([getParticipation(), getSiteSettings()]);
  const category = categories.find((c) => c.id === kategori);
  if (!category) notFound();

  return (
    <>
      <PartisipasiDetail category={category} />
      <CTABanner availability={site.availability} />
    </>
  );
}
