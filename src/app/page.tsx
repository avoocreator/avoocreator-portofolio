import { Hero } from "@/components/sections/home/Hero";
import { RolesMarquee } from "@/components/sections/home/RolesMarquee";
import { StatsStrip } from "@/components/sections/home/StatsStrip";
import { AboutTeaser } from "@/components/sections/home/AboutTeaser";
import { ExpertiseTeaser } from "@/components/sections/home/ExpertiseTeaser";
import { FeaturedProjects } from "@/components/sections/home/FeaturedProjects";
import { ServicesTeaser } from "@/components/sections/home/ServicesTeaser";
import { CTABanner } from "@/components/sections/home/CTABanner";
import { getExpertise, getProjects, getServices } from "@/lib/content";

export default async function HomePage() {
  const [projects, services, expertise] = await Promise.all([
    getProjects(),
    getServices(),
    getExpertise(),
  ]);

  return (
    <>
      <Hero />
      <RolesMarquee />
      <div className="pt-16">
        <StatsStrip />
      </div>
      <AboutTeaser />
      <ExpertiseTeaser groups={expertise} />
      <FeaturedProjects projects={projects} />
      <ServicesTeaser services={services} />
      <CTABanner />
    </>
  );
}
