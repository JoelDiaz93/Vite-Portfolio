import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = dirname(fileURLToPath(import.meta.url))

const seoEntries = Object.fromEntries(
  ['eventra', 'routefast', 'qrflow', 'cerynt']
    .flatMap((slug) => ['en', 'es'].map((lang) => [`${slug}-${lang}`, resolve(projectRoot, `seo-pages/${slug}-${lang}.html`)]))
    .concat([
      ['home-en', resolve(projectRoot, 'seo-pages/home-en.html')],
      ['home-es', resolve(projectRoot, 'seo-pages/home-es.html')],
      ['resume-en', resolve(projectRoot, 'seo-pages/resume-en.html')],
      ['resume-es', resolve(projectRoot, 'seo-pages/resume-es.html')],
    ]),
)

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(projectRoot, 'index.html'),
        ...seoEntries,
      },
    },
  },
})
