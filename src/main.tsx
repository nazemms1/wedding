import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BisherApp } from './weddings/bisher/App'
import { WeddingContext, detectLang as detectBisherLang, makeContextValue as makeBisherContextValue } from './weddings/bisher/context'
import JoudiApp from './weddings/joudi/App'
import { LanguageContext, detectLang as detectJoudiLang } from './weddings/joudi/context'
import { translations } from './weddings/joudi/i18n'

const path = window.location.pathname
const isBisher = path.includes('/bisher')

if (isBisher) {
  const lang = detectBisherLang()
  const dir = lang === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.lang = lang
  document.documentElement.dir = dir
  document.documentElement.classList.add('bisher')

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <WeddingContext.Provider value={makeBisherContextValue(lang)}>
        <BisherApp />
      </WeddingContext.Provider>
    </StrictMode>,
  )
} else {
  const lang = detectJoudiLang()
  const t = translations[lang]
  const dir = lang === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.lang = lang
  document.documentElement.dir = dir

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <LanguageContext.Provider value={{ lang, t, dir }}>
        <JoudiApp />
      </LanguageContext.Provider>
    </StrictMode>,
  )
}
