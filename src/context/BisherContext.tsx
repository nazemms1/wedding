import { createContext, useContext } from 'react'
import type { BisherTranslations } from '../i18n.bisher'
import { bisherTranslations } from '../i18n.bisher'
import { bisherConfig } from '../config.bisher'
import { bisherTheme } from '../theme.bisher'

export type Lang = 'ar' | 'en'

interface BisherContextValue {
  lang: Lang
  t: BisherTranslations
  dir: 'rtl' | 'ltr'
  config: typeof bisherConfig
  theme: typeof bisherTheme
}

export const BisherContext = createContext<BisherContextValue>({
  lang: 'ar',
  t: bisherTranslations.ar,
  dir: 'rtl',
  config: bisherConfig,
  theme: bisherTheme,
})

export function useBisher() {
  return useContext(BisherContext)
}

export function detectBisherLang(): Lang {
  const path = window.location.pathname
  if (path.includes('/en')) return 'en'
  return 'ar'
}

export function makeBisherContextValue(lang: Lang): BisherContextValue {
  return {
    lang,
    t: bisherTranslations[lang] as BisherTranslations,
    dir: lang === 'ar' ? 'rtl' : 'ltr',
    config: bisherConfig,
    theme: bisherTheme,
  }
}
