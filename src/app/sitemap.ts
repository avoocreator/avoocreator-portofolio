import type { MetadataRoute } from "next";
import { getParticipation } from "@/lib/content";

const BASE = (process.env.NEXT_PUBLIC_SITE_URL || "https://avoocreator-portofolio.vercel.app").replace(/\/$/, "");

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const pages = ["", "/tentang", "/keahlian", "/partisipasi", "/proyek", "/layanan", "/kontak"];
  const participation = await getParticipation();
  return [
    ...pages.map((path) => ({
      url: `${BASE}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...participation.map((cat) => ({
      url: `${BASE}/partisipasi/${cat.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
