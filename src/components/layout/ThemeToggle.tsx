"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-muted/60 text-foreground transition-colors hover:border-border-strong",
        className
      )}
      aria-label="Toggle theme"
    >
      <Sun size={16} className="text-accent dark:hidden" />
      <Moon size={16} className="hidden dark:block" />
    </button>
  );
}
