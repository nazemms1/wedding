import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync, mkdirSync } from 'fs'
import { resolve } from 'path'

// Plugin: after build, copy index.html → ar/index.html, en/index.html,
// bisher/index.html, bisher/ar/index.html, bisher/en/index.html
// so GitHub Pages serves the SPA at all language/section routes
function copyIndexForRoutes() {
  return {
    name: 'copy-index-for-routes',
    closeBundle() {
      const dist = resolve(__dirname, 'dist')
      const src = resolve(dist, 'index.html')
      // Main wedding routes
      for (const lang of ['ar', 'en']) {
        mkdirSync(resolve(dist, lang), { recursive: true })
        copyFileSync(src, resolve(dist, lang, 'index.html'))
      }
      // Bisher routes
      mkdirSync(resolve(dist, 'bisher'), { recursive: true })
      copyFileSync(src, resolve(dist, 'bisher', 'index.html'))
      for (const lang of ['ar', 'en']) {
        mkdirSync(resolve(dist, 'bisher', lang), { recursive: true })
        copyFileSync(src, resolve(dist, 'bisher', lang, 'index.html'))
      }
    },
  }
}

export default defineConfig({
  plugins: [tailwindcss(), react(), copyIndexForRoutes()],
  base: '/wedding/',
})
