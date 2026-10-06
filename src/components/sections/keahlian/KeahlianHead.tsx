"use client";

import { useLang } from "@/i18n/LangProvider";
import { PageHero } from "@/components/sections/shared/PageHero";

/** Judul halaman keahlian (mengikuti bahasa aktif) */
export function KeahlianHead() {
  const { lang, dict } = useLang();
  return (
    <PageHero
      kicker={dict.keahlian.kicker}
      title={dict.keahlian.title}
      sub={{
        id: "Empat bidang yang saling menguatkan — dikerjakan dengan perangkat yang sama seperti yang dipakai industri, dipelajari lewat proyek nyata.",
        en: "Four fields that reinforce each other — done with the same tools the industry uses, learned through real projects.",
      }}
    />
  );
}
