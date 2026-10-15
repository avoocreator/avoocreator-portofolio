import { Hero } from "@/components/sections/home/Hero";
import { RolesMarquee } from "@/components/sections/home/RolesMarquee";
import { StatsStrip } from "@/components/sections/home/StatsStrip";
import { AboutTeaser } from "@/components/sections/home/AboutTeaser";
import { ExpertiseTeaser } from "@/components/sections/home/ExpertiseTeaser";
import { FeaturedProjects } from "@/components/sections/home/FeaturedProjects";
import { ServicesTeaser } from "@/components/sections/home/ServicesTeaser";
import { CTABanner } from "@/components/sections/home/CTABanner";
import { getExpertise, getProjects, getServices, getSiteSettings } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [projects, services, expertise, site] = await Promise.all([
    getProjects(),
    getServices(),
    getExpertise(),
    getSiteSettings(),
  ]);

  return (
    <>
      <Hero availability={site.availability} />
      <RolesMarquee roles={site.roles} />
      <div className="pt-16">
        <StatsStrip stats={site.stats} />
      </div>
      <AboutTeaser />
      <ExpertiseTeaser groups={expertise} />
      <FeaturedProjects projects={projects} />
      <ServicesTeaser services={services} />
      <CTABanner availability={site.availability} />
    </>
  );
}
