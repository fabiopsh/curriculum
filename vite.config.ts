import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// The site is served from https://fabiopsh.github.io/curriculum/, so every
// asset URL has to be prefixed with the repository name.
export default defineConfig({
  base: '/curriculum/',
  plugins: [react()],
  build: {
    // Il default di Vite (safari16.4) esclude telefoni ancora molto diffusi.
    // iOS 15.4 e' il pavimento realistico: sotto, React 19 richiede comunque
    // metodi runtime (Object.hasOwn, Array.prototype.at) che un cambio di
    // target non transpila.
    target: ['chrome90', 'edge90', 'firefox90', 'safari15.4', 'ios15.4'],
  },
})
