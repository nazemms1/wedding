import { createContext, useContext } from 'react'
import type { Lang, Translations } from '../i18n'
import { translations } from '../i18n'

interface LanguageContextValue {
  lang: Lang
  t: Translations
  dir: 'rtl' | 'ltr'
}

export const LanguageContext = createContext<LanguageContextValue>({
  lang: 'ar',
  t: translations.ar,
  dir: 'rtl',
})

export function useLanguage() {
  return useContext(LanguageContext)
}

/** Reads /ar or /en from the URL pathname. Defaults to 'ar'. */
export function detectLang(): Lang {
  const path = window.location.pathname
  if (path.includes('/en')) return 'en'
  if (path.includes('/ar')) return 'ar'
  return 'ar'
}
