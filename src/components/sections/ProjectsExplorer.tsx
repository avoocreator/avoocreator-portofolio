"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutGrid, List } from "lucide-react";
import { useLang } from "@/i18n/LangProvider";
import { tx } from "@/i18n/types";
import type { Project } from "@/data/projects";
import { PageHero } from "@/components/sections/shared/PageHero";
import { ProjectCard } from "@/components/sections/home/FeaturedProjects";
import { cn } from "@/lib/utils";

/** Penjelajah proyek: filter kategori + toggle grid/list */
export function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const { lang, dict } = useLang();
  const [category, setCategory] = useState<string>("all");
  const [view, setView] = useState<"grid" | "list">("grid");

  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => set.add(p.category[lang]));
    return Array.from(set);
  }, [projects, lang]);

  const filtered = useMemo(
    () => (category === "all" ? projects : projects.filter((p) => p.category[lang] === category)),
    [projects, category, lang]
  );

  return (
    <>
      <PageHero kicker={dict.proyek.kicker} title={dict.proyek.title} sub={dict.proyek.sub} />

      <section className="pb-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          {/* Kontrol */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter kategori">
              <FilterChip active={category === "all"} onClick={() => setCategory("all")}>
                {dict.proyek.semua} ({projects.length})
              </FilterChip>
              {categories.map((c) => (
                <FilterChip key={c} active={category === c} onClick={() => setCategory(c)}>
                  {c} ({projects.filter((p) => p.category[lang] === c).length})
                </FilterChip>
              ))}
            </div>

            <div className="flex items-center rounded-full border border-border bg-card p-1">
              <button
                onClick={() => setView("grid")}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                  view === "grid" ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                )}
                aria-label={dict.proyek.tampilanGrid}
                aria-pressed={view === "grid"}
              >
                <LayoutGrid size={15} />
              </button>
              <button
                onClick={() => setView("list")}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                  view === "list" ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                )}
                aria-label={dict.proyek.tampilanList}
                aria-pressed={view === "list"}
              >
                <List size={15} />
              </button>
            </div>
          </div>

          {/* Daftar proyek */}
          <motion.div
            layout
            className={cn(
              "grid gap-4",
              view === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
            )}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.number}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: i * 0.03 }}
                >
                  <ProjectCard project={p} variant={view} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <p className="py-16 text-center text-muted-foreground">{dict.proyek.kosong}</p>
          )}
        </div>
      </section>
    </>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      role="tab"
      aria-selected={active}
      className={cn(
        "rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
        active
          ? "border-accent bg-accent text-accent-foreground"
          : "border-border text-muted-foreground hover:border-border-strong hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}
