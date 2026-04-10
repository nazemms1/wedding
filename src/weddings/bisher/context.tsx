import { createContext, useContext } from 'react'
import type { Translations } from './i18n'
import { translations } from './i18n'
import { config } from './config'
import { theme } from './theme'
import type { SiteConfig } from '../../types/config'

export type Lang = 'ar' | 'en'

interface ContextValue {
  lang: Lang
  t: Translations
  dir: 'rtl' | 'ltr'
  config: SiteConfig
  theme: typeof theme
}

export const WeddingContext = createContext<ContextValue>({
  lang: 'ar',
  t: translations.ar,
  dir: 'rtl',
  config,
  theme,
})

export function useWedding() {
  return useContext(WeddingContext)
}

export function detectLang(): Lang {
  const path = window.location.pathname
  if (path.includes('/en')) return 'en'
  return 'ar'
}

export function makeContextValue(lang: Lang): ContextValue {
  return {
    lang,
    t: translations[lang] as Translations,
    dir: lang === 'ar' ? 'rtl' : 'ltr',
    config,
    theme,
  }
}
