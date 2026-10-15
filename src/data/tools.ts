import type { L } from "@/i18n/types";

export interface Tool {
  key: string
  name: string
  /** slug simple-icons, atau "custom" untuk ikon buatan sendiri */
  slug?: string
  /** key ikon kustom (SVG buatan, dipakai saat slug tidak ada) */
  custom?: "vscode" | "photoshop" | "illustrator" | "canva"
  /** warna brand — undefined = pakai currentColor */
  hex?: string
  category: "development" | "design" | "creative-tech" | "research"
}

export const tools: Tool[] = [
  // Development
  { key: "vscode", name: "VS Code", custom: "vscode", hex: "#007ACC", category: "development" },
  { key: "github", name: "GitHub", slug: "github", category: "development" },
  { key: "git", name: "Git", slug: "git", hex: "#F05032", category: "development" },
  { key: "nextdotjs", name: "Next.js", slug: "nextdotjs", category: "development" },
  { key: "react", name: "React", slug: "react", hex: "#61DAFB", category: "development" },
  { key: "typescript", name: "TypeScript", slug: "typescript", hex: "#3178C6", category: "development" },
  { key: "tailwindcss", name: "Tailwind CSS", slug: "tailwindcss", hex: "#06B6D4", category: "development" },
  { key: "vercel", name: "Vercel", slug: "vercel", category: "development" },
  // Design
  { key: "figma", name: "Figma", slug: "figma", hex: "#F24E1E", category: "design" },
  { key: "photoshop", name: "Photoshop", custom: "photoshop", hex: "#31A8FF", category: "design" },
  { key: "illustrator", name: "Illustrator", custom: "illustrator", hex: "#FF9A00", category: "design" },
  { key: "canva", name: "Canva", custom: "canva", hex: "#00C4CC", category: "design" },
  { key: "framer", name: "Framer", slug: "framer", hex: "#0055FF", category: "design" },
  // Creative tech
  { key: "arduino", name: "Arduino", slug: "arduino", hex: "#00878F", category: "creative-tech" },
  { key: "raspberrypi", name: "Raspberry Pi", slug: "raspberrypi", hex: "#A22846", category: "creative-tech" },
  { key: "espressif", name: "ESP32", slug: "espressif", hex: "#E7352C", category: "creative-tech" },
  { key: "platformio", name: "PlatformIO", slug: "platformio", hex: "#F5822D", category: "creative-tech" },
  // Research
  { key: "googlescholar", name: "Google Scholar", slug: "googlescholar", hex: "#4285F4", category: "research" },
  { key: "notion", name: "Notion", slug: "notion", category: "research" },
  { key: "googlesheets", name: "Spreadsheet", slug: "googlesheets", hex: "#34A853", category: "research" },
  { key: "obsidian", name: "Obsidian", slug: "obsidian", hex: "#8B5CF6", category: "research" },
];

export const toolByKey = Object.fromEntries(tools.map((t) => [t.key, t]));

export const toolsByCategory = (category: string) => tools.filter((t) => t.category === category);

/** Nama tampilan bilingual untuk tool */
export const toolNames: Record<string, L> = tools.reduce(
  (acc, t) => ({ ...acc, [t.key]: { id: t.name, en: t.name } }),
  {}
);
