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

// La ricaduta in index.html compare se #root e' ancora vuoto dopo 4 secondi.
// Su una connessione molto lenta React puo' montare dopo quella soglia: qui la
// si richiude, cosi' le due non restano mai visibili insieme.
document.getElementById('fallback')?.setAttribute('hidden', '')
