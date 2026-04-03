import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LanguageContext, detectLang } from './context/LanguageContext'
import { translations } from './i18n'

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
