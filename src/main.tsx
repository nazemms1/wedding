import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BisherApp } from './bisher/BisherApp.tsx'
import { LanguageContext, detectLang } from './context/LanguageContext'
import { BisherContext, detectBisherLang, makeBisherContextValue } from './context/BisherContext'
import { translations } from './i18n'

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
      <BisherContext.Provider value={makeBisherContextValue(lang)}>
        <BisherApp />
      </BisherContext.Provider>
    </StrictMode>,
  )
} else {
  const lang = detectLang()
  const t = translations[lang]
  const dir = lang === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.lang = lang
  document.documentElement.dir = dir

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <LanguageContext.Provider value={{ lang, t, dir }}>
        <App />
      </LanguageContext.Provider>
    </StrictMode>,
  )
}
