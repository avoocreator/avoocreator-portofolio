"use client";

import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { useSyncExternalStore } from "react";
import { defaultLocale, type Locale } from "./types";
import { dictionary, type Dictionary } from "./dictionary";
import { getLang, getServerLang, setStoredLang, subscribeLang } from "./langStore";

interface LangContextValue {
  lang: Locale;
  setLang: (l: Locale) => void;
  toggle: () => void;
  dict: Dictionary;
}

const LangContext = createContext<LangContextValue>({
  lang: defaultLocale,
  setLang: () => {},
  toggle: () => {},
  dict: dictionary[defaultLocale],
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribeLang, getLang, getServerLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Locale) => setStoredLang(l), []);

  const toggle = useCallback(() => {
    setStoredLang(getLang() === "id" ? "en" : "id");
  }, []);

  const value = useMemo(
    () => ({ lang, setLang, toggle, dict: dictionary[lang] as Dictionary }),
    [lang, setLang, toggle]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
