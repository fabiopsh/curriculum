import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'fp-theme'
const DARK_QUERY = '(prefers-color-scheme: dark)'

function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'light' || stored === 'dark' ? stored : null
  } catch {
    return null
  }
}

function resolveInitialTheme(): Theme {
  return readStoredTheme() ?? (window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light')
}

/**
 * Tema chiaro/scuro. Segue il sistema operativo finché l’utente non sceglie
 * esplicitamente; da quel momento la scelta viene ricordata.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(resolveInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    const media = window.matchMedia(DARK_QUERY)

    const followSystem = (event: MediaQueryListEvent) => {
      if (readStoredTheme() === null) {
        setTheme(event.matches ? 'dark' : 'light')
      }
    }

    media.addEventListener('change', followSystem)

    return () => media.removeEventListener('change', followSystem)
  }, [])

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === 'light' ? 'dark' : 'light'

      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        /* storage non disponibile: la scelta vale solo per questa sessione */
      }

      return next
    })
  }, [])

  return { theme, toggle }
}
