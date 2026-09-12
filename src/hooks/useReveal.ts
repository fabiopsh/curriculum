import { useEffect, useRef, useState } from 'react'

/** Soglia di ingresso: l’elemento si rivela quando entra nell’ultimo 10% del viewport. */
const ENTER_RATIO = 0.9

function motionIsUnwanted(): boolean {
  return (
    typeof window === 'undefined' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/**
 * Rivela un elemento la prima volta che raggiunge il viewport.
 *
 * Il controllo è sulla posizione assoluta invece che sull’intersezione: così un
 * salto di scorrimento (ancora, ricerca nella pagina, tasto Fine) non può lasciare
 * indietro una sezione mai "attraversata". Se l’utente ha chiesto meno animazioni
 * l’elemento parte già visibile.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [revealed, setRevealed] = useState(motionIsUnwanted)

  useEffect(() => {
    const node = ref.current

    if (revealed || !node) {
      return
    }

    let frame = 0

    const check = () => {
      frame = 0

      if (node.getBoundingClientRect().top < window.innerHeight * ENTER_RATIO) {
        setRevealed(true)
      }
    }

    const schedule = () => {
      frame ||= requestAnimationFrame(check)
    }

    check()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [revealed])

  return { ref, state: revealed ? ('in' as const) : ('out' as const) }
}
