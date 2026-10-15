import { cn } from "@/lib/utils";

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-muted/60 px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground",
        className
      )}
    >
      {children}
    </span>
  );
}
