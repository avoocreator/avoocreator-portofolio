export type Locale = "id" | "en";

/** Teks bilingual — dipilih sesuai bahasa aktif */
export interface L {
  id: string;
  en: string;
}

export const locales: Locale[] = ["id", "en"];
export const defaultLocale: Locale = "id";

export function tx(value: L, locale: Locale): string {
  return value[locale] ?? value.id;
}
