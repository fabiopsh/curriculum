import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// The site is served from https://fabiopsh.github.io/curriculum/, so every
// asset URL has to be prefixed with the repository name.
export default defineConfig({
  base: '/curriculum/',
  plugins: [react()],
})
