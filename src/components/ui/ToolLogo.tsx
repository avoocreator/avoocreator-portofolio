"use client";

import {
  siGithub,
  siGit,
  siNextdotjs,
  siReact,
  siTypescript,
  siTailwindcss,
  siVercel,
  siFigma,
  siFramer,
  siArduino,
  siRaspberrypi,
  siEspressif,
  siPlatformio,
  siGooglescholar,
  siNotion,
  siGooglesheets,
  siObsidian,
  type SimpleIcon,
} from "simple-icons";
import { toolByKey, type Tool } from "@/data/tools";
import type { ToolRef } from "@/data/expertise";
import { cn } from "@/lib/utils";

const slugMap: Record<string, SimpleIcon> = {
  github: siGithub,
  git: siGit,
  nextdotjs: siNextdotjs,
  react: siReact,
  typescript: siTypescript,
  tailwindcss: siTailwindcss,
  vercel: siVercel,
  figma: siFigma,
  framer: siFramer,
  arduino: siArduino,
  raspberrypi: siRaspberrypi,
  espressif: siEspressif,
  platformio: siPlatformio,
  googlescholar: siGooglescholar,
  notion: siNotion,
  googlesheets: siGooglesheets,
  obsidian: siObsidian,
};

function VsCodeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden="true">
      <path
        fill="#007ACC"
        fillRule="evenodd"
        d="M17.663 1.323 9.592 9.02 4.407 5.11 2 6.311l5.16 4.486L2 15.283l2.407 1.203 5.185-3.913 8.071 7.695 4.937-2.322V3.645zm.16 3.43v14.494l-6.994-6.995z"
      />
    </svg>
  );
}

function BadgeIcon({ text, bg, fg }: { text: string; bg: string; fg: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden="true">
      <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" fill={bg} />
      <text
        x="12"
        y="16.4"
        textAnchor="middle"
        fontSize="9.5"
        fontWeight="700"
        fill={fg}
        style={{ fontFamily: "var(--font-plex-mono), monospace" }}
      >
        {text}
      </text>
    </svg>
  );
}

function CanvaIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="canva-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00C4CC" />
          <stop offset="100%" stopColor="#7D2AE8" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10.5" fill="url(#canva-grad)" />
      <text
        x="12"
        y="16.2"
        textAnchor="middle"
        fontSize="11"
        fontWeight="800"
        fill="#ffffff"
        style={{ fontFamily: "var(--font-display), sans-serif" }}
      >
        C
      </text>
    </svg>
  );
}

/**
 * Glyph ikon bawaan saja (tanpa kotak chip) — dipakai ToolLogo, ToolChip,
 * dan pemilih ikon di dashboard admin.
 */
export function ToolLogoGlyph({ toolKey, className }: { toolKey: string; className?: string }) {
  const tool: Tool | undefined = toolByKey[toolKey];
  if (!tool) return null;

  if (tool.custom === "vscode") return <span className={className}><VsCodeIcon /></span>;
  if (tool.custom === "photoshop")
    return <span className={className}><BadgeIcon text="Ps" bg="#001E36" fg="#31A8FF" /></span>;
  if (tool.custom === "illustrator")
    return <span className={className}><BadgeIcon text="Ai" bg="#330000" fg="#FF9A00" /></span>;
  if (tool.custom === "canva")
    return <span className={className}><CanvaIcon /></span>;
  if (tool.slug && slugMap[tool.slug]) {
    const icon = slugMap[tool.slug];
    return (
      <span className={className}>
        <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden="true">
          <path fill={tool.hex ?? "currentColor"} d={icon.path} />
        </svg>
      </span>
    );
  }
  return null;
}

const sizes = {
  md: { box: "p-2", icon: "h-5 w-5" },
  lg: { box: "rounded-2xl p-3.5 lg:p-4", icon: "h-9 w-9 lg:h-11 lg:w-11" },
} as const;

/** Chip logo lama (dari key pustaka ikon) — masih dipakai di beberapa tempat. */
export function ToolLogo({
  toolKey,
  className,
  size = "md",
}: {
  toolKey: string;
  className?: string;
  size?: keyof typeof sizes;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-elevated border border-border shadow-[0_1px_2px_rgb(0_0_0/0.06)]",
        sizes[size].box,
        className
      )}
      title={toolByKey[toolKey]?.name ?? toolKey}
    >
      <ToolLogoGlyph toolKey={toolKey} className={cn("block", sizes[size].icon)} />
    </span>
  );
}

/**
 * Chip perangkat dari data admin (ToolRef):
 * 1. logoUrl (unggahan sendiri) → <img>
 * 2. key (ikon bawaan)          → glyph pustaka
 * 3. tanpa keduanya             → huruf awal nama
 */
export function ToolChip({
  tool,
  className,
  size = "md",
}: {
  tool: ToolRef;
  className?: string;
  size?: keyof typeof sizes;
}) {
  const label = tool.name || toolByKey[tool.key ?? ""]?.name || tool.key || "";
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center overflow-hidden rounded-md bg-elevated border border-border shadow-[0_1px_2px_rgb(0_0_0/0.06)]",
        sizes[size].box,
        className
      )}
      title={label || undefined}
    >
      {tool.logoUrl ? (
        <img
          src={tool.logoUrl}
          alt={label}
          className={cn("block object-contain", sizes[size].icon)}
          loading="lazy"
        />
      ) : tool.key ? (
        <ToolLogoGlyph toolKey={tool.key} className={cn("block", sizes[size].icon)} />
      ) : (
        <span
          className={cn(
            "grid place-items-center rounded-sm bg-accent/10 font-mono font-bold uppercase text-accent",
            sizes[size].icon
          )}
          aria-hidden="true"
        >
          {(label || "?").trim().charAt(0)}
        </span>
      )}
    </span>
  );
}
