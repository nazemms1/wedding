import { createContext, useContext } from "react";
import type { Lang, Translations } from "../i18n";
import { translations } from "../i18n";

interface LanguageContextValue {
  lang: Lang;
  t: Translations;
  dir: "rtl" | "ltr";
}

export const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  t: translations.en,
  dir: "rtl",
});

export function useLanguage() {
  return useContext(LanguageContext);
}

 export function detectLang(): Lang {
  const path = window.location.pathname;
  if (path.includes("/en")) return "en";
  if (path.includes("/ar")) return "ar";
  return "en";
}
