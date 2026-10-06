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

/** Logo tool: pakai simple-icons, atau badge kustom untuk brand yang dihapus dari simple-icons */
export function ToolLogo({ toolKey, className }: { toolKey: string; className?: string }) {
  const tool: Tool | undefined = toolByKey[toolKey];
  if (!tool) return null;

  let inner: React.ReactNode = null;
  if (tool.custom === "vscode") inner = <VsCodeIcon />;
  else if (tool.custom === "photoshop") inner = <BadgeIcon text="Ps" bg="#001E36" fg="#31A8FF" />;
  else if (tool.custom === "illustrator") inner = <BadgeIcon text="Ai" bg="#330000" fg="#FF9A00" />;
  else if (tool.custom === "canva") inner = <CanvaIcon />;
  else if (tool.slug && slugMap[tool.slug]) {
    const icon = slugMap[tool.slug];
    inner = (
      <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden="true">
        <path fill={tool.hex ?? "currentColor"} d={icon.path} />
      </svg>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-elevated border border-border p-2 shadow-[0_1px_2px_rgb(0_0_0/0.06)]",
        className
      )}
      title={tool.name}
    >
      <span className="block h-5 w-5">{inner}</span>
    </span>
  );
}
