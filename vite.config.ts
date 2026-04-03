import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync, mkdirSync } from 'fs'
import { resolve } from 'path'

// Plugin: after build, copy index.html → ar/index.html and en/index.html
// so GitHub Pages serves the SPA at /wedding/ar and /wedding/en
function copyIndexForLangs() {
  return {
    name: 'copy-index-for-langs',
    closeBundle() {
      const dist = resolve(__dirname, 'dist')
      const src = resolve(dist, 'index.html')
      for (const lang of ['ar', 'en']) {
        mkdirSync(resolve(dist, lang), { recursive: true })
        copyFileSync(src, resolve(dist, lang, 'index.html'))
      }
    },
  }
}

export default defineConfig({
  plugins: [tailwindcss(), react(), copyIndexForLangs()],
  base: '/wedding/',
})
