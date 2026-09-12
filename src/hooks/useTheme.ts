import { useCallback, useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'fp-theme'
const DARK_QUERY = '(prefers-color-scheme: dark)'

/**
 * La fonte di verità del tema è l'attributo data-theme su <html>, scritto dallo
 * script inline in index.html prima del primo paint. Leggerlo da lì invece di
 * tenere uno stato React parallelo evita che i due divergano, e permette di
 * dichiarare a React cosa ha reso il server durante il prerender: senza questo
 * l'idratazione troverebbe un markup diverso da quello atteso.
 */
const listeners = new Set<() => void>()

function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'light' || stored === 'dark' ? stored : null
  } catch {
    return null
  }
}

function applyTheme(next: Theme): void {
  document.documentElement.dataset.theme = next

  for (const listener of listeners) {
    listener()
  }
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener)

  const media = window.matchMedia(DARK_QUERY)
  const followSystem = () => {
    // Finché l'utente non ha scelto esplicitamente, si segue il sistema.
    if (readStoredTheme() === null) {
      applyTheme(media.matches ? 'dark' : 'light')
    }
  }

  media.addEventListener('change', followSystem)

  return () => {
    listeners.delete(listener)
    media.removeEventListener('change', followSystem)
  }
}

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

/** Il prerender non ha un DOM da leggere: rende sempre la variante chiara. */
function getServerSnapshot(): Theme {
  return 'light'
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const toggle = useCallback(() => {
    const next: Theme = getSnapshot() === 'light' ? 'dark' : 'light'

    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* storage non disponibile: la scelta vale solo per questa sessione */
    }

    applyTheme(next)
  }, [])

  return { theme, toggle }
}
