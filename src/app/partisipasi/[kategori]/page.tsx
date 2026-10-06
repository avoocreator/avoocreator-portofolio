import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getParticipation } from "@/lib/content";
import { PartisipasiDetail } from "@/components/sections/PartisipasiViews";
import { CTABanner } from "@/components/sections/home/CTABanner";

interface Props {
  params: Promise<{ kategori: string }>;
}

export async function generateStaticParams() {
  const categories = await getParticipation();
  return categories.map((c) => ({ kategori: c.id }));
}

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
  const categories = await getParticipation();
  const category = categories.find((c) => c.id === kategori);
  if (!category) notFound();

  return (
    <>
      <PartisipasiDetail category={category} />
      <CTABanner />
    </>
  );
}
