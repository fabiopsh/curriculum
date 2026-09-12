import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'

import App from './App.tsx'
import './styles/fonts.css'
import './styles/tokens.css'
import './styles/base.css'
import './styles/print.css'

const container = document.getElementById('root')

if (!container) {
  throw new Error('Elemento #root non trovato: impossibile montare l’applicazione.')
}

/**
 * hydrateRoot e non createRoot: il markup è già nell'HTML, prodotto da
 * scripts/prerender.mjs. createRoot svuoterebbe il container per rendere da
 * zero, e un errore in quel render lascerebbe la pagina bianca distruggendo
 * contenuto valido. L'idratazione invece parte dal DOM esistente.
 *
 * Se anche così qualcosa andasse storto, il try/catch lascia in piedi il markup
 * prerenderizzato: il curriculum resta leggibile e tutti i collegamenti sono
 * semplici <a href>, quindi funzionano senza React.
 */
try {
  hydrateRoot(
    container,
    <StrictMode>
      <App />
    </StrictMode>,
  )
} catch (error) {
  console.error('Idratazione fallita; resta il contenuto prerenderizzato.', error)
}
