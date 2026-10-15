import type { Metadata } from "next";
import { getProjects, getSiteSettings } from "@/lib/content";
import { ProjectsExplorer } from "@/components/sections/ProjectsExplorer";
import { CTABanner } from "@/components/sections/home/CTABanner";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Proyek",
  description:
    "Kumpulan proyek Avoo Creator — dari website sekolah JHIC 2.0, robotika, sampai eksperimen IoT.",
};

export default async function ProyekPage() {
  const [projects, site] = await Promise.all([getProjects(), getSiteSettings()]);
  return (
    <>
      <ProjectsExplorer projects={projects} />
      <CTABanner availability={site.availability} />
    </>
  );
}
