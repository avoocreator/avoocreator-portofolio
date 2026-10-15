import { cn } from "@/lib/utils";
import { projectStatusLabels, type ProjectStatusKey } from "@/data/projects";
import { useLang } from "@/i18n/LangProvider";
import { tx } from "@/i18n/types";

const styles: Record<ProjectStatusKey, string> = {
  selesai: "bg-teal/10 text-teal border-teal/30 dark:text-teal-bright dark:border-teal-bright/30",
  berjalan: "bg-accent/10 text-accent border-accent/30",
  riset: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
  konsep: "bg-muted text-muted-foreground border-border",
};

/** Badge status proyek */
export function StatusBadge({ status, className }: { status: ProjectStatusKey; className?: string }) {
  const { lang } = useLang();
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px]",
        styles[status],
        className
      )}
    >
      {status === "berjalan" && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
      )}
      {tx(projectStatusLabels[status], lang)}
    </span>
  );
}
