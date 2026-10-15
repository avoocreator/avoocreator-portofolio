"use client";

import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useLang } from "@/i18n/LangProvider";
import { tx } from "@/i18n/types";
import type { Project } from "@/data/projects";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/utils";

/** Kartu proyek — dipakai di beranda & halaman proyek (variasi grid/list) */
export function ProjectCard({
  project,
  variant = "grid",
  delay = 0,
}: {
  project: Project;
  variant?: "grid" | "list";
  delay?: number;
}) {
  const { lang, dict } = useLang();

  const inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-xs text-accent">{project.number}</span>
        <StatusBadge status={project.status} />
      </div>
      <div className={cn("mt-4 flex-1", variant === "list" && "sm:mt-0")}>
        <h3 className="font-display font-bold text-lg sm:text-xl tracking-tight leading-snug group-hover:text-accent transition-colors">
          {tx(project.title, lang)}
        </h3>
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground mt-1">
          {tx(project.category, lang)}
          {project.year ? ` · ${project.year}` : ""}
        </p>
        <p
          className={cn(
            "text-sm text-muted-foreground leading-relaxed mt-3",
            variant === "grid" ? "" : "sm:max-w-xl"
          )}
        >
          {tx(project.description, lang)}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </div>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
        {project.link ? dict.proyek.kunjungi : dict.common.selengkapnya}
        {project.link ? (
          <ExternalLink size={14} />
        ) : (
          <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        )}
      </span>
    </>
  );

  const className = cn(
    "card-editorial group flex h-full p-6 transition-transform hover:-translate-y-1",
    variant === "list" ? "sm:flex-row sm:gap-8 sm:items-start" : "flex-col"
  );

  return (
    <Reveal delay={delay} className="h-full">
      {project.link ? (
        <a href={project.link} target="_blank" rel="noopener noreferrer" className={className}>
          {inner}
        </a>
      ) : (
        <Link href="/proyek" className={className}>
          {inner}
        </Link>
      )}
    </Reveal>
  );
}

/** 3 proyek pilihan di beranda */
export function FeaturedProjects({ projects }: { projects: Project[] }) {
  const { dict } = useLang();
  const featured = projects.slice(0, 3);

  return (
    <section className="py-20 sm:py-24" aria-label="Proyek pilihan">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="flex items-end justify-between gap-6 mb-10">
          <SectionHeading kicker={dict.home.proyekKicker} title={dict.home.proyekTitle} />
          <Reveal delay={0.2} className="hidden md:block shrink-0">
            <Link
              href="/proyek"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:gap-2.5 transition-all"
            >
              {dict.common.lihatSemua}
              <ArrowUpRight size={15} />
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <ProjectCard key={p.number} project={p} delay={0.08 * i} />
          ))}
        </div>
      </div>
    </section>
  );
}
