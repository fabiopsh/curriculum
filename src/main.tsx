import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import './styles/fonts.css'
import './styles/tokens.css'
import './styles/base.css'
import './styles/print.css'

const container = document.getElementById('root')

if (!container) {
  throw new Error("Elemento #root non trovato: impossibile montare l’applicazione.")
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
