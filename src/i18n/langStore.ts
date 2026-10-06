/** Store bahasa eksternal — pattern useSyncExternalStore, aman SSR & lint */
import type { Locale } from "./types";
import { defaultLocale } from "./types";

const KEY = "avoo-lang";

let cached: Locale | null = null;
const listeners = new Set<() => void>();

function readFromStorage(): Locale {
  try {
    const stored = localStorage.getItem(KEY) as Locale | null;
    if (stored === "id" || stored === "en") return stored;
    if (navigator.language?.toLowerCase().startsWith("en")) return "en";
  } catch {
    /* noop */
  }
  return defaultLocale;
}

export function getLang(): Locale {
  if (cached === null) cached = readFromStorage();
  return cached;
}

export function getServerLang(): Locale {
  return defaultLocale;
}

export function setStoredLang(l: Locale) {
  cached = l;
  try {
    localStorage.setItem(KEY, l);
  } catch {
    /* noop */
  }
  listeners.forEach((fn) => fn());
}

export function subscribeLang(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
