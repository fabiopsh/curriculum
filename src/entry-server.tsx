import { renderToString } from 'react-dom/server'

import App from './App.tsx'

/**
 * Reso in HTML statico da scripts/prerender.mjs e iniettato in dist/index.html.
 * Serve a un solo scopo: il curriculum deve restare leggibile anche se il bundle
 * non arriva o non parte. Il client non idrata questo markup, lo rimpiazza.
 */
export function render(): string {
  return renderToString(<App />)
}
