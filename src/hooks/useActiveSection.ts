import { useEffect, useState } from 'react'

/** Frazione dell'altezza del viewport oltre la quale una sezione conta come attiva. */
const SOGLIA = 0.28

/**
 * Restituisce l'id della sezione attualmente in lettura, per evidenziarla nella
 * barra di navigazione. Il controllo è sulla posizione assoluta: un salto di
 * scorrimento o un'ancora danno subito il risultato giusto.
 *
 * Parte da null, che è anche ciò che rende il prerender: l'idratazione non trova
 * differenze. Se non funzionasse, si perde solo l'evidenziazione.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    let frame = 0

    const aggiorna = () => {
      frame = 0

      // A fondo pagina le ultime sezioni non hanno piu' scorrimento per salire
      // sopra la soglia: senza questo caso non diventerebbero mai attive.
      const fondo =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2

      if (fondo) {
        setActive(ids[ids.length - 1] ?? null)
        return
      }

      const limite = window.innerHeight * SOGLIA
      let corrente: string | null = null

      for (const id of ids) {
        const node = document.getElementById(id)

        if (node && node.getBoundingClientRect().top <= limite) {
          corrente = id
        }
      }

      setActive(corrente)
    }

    const schedule = () => {
      frame ||= requestAnimationFrame(aggiorna)
    }

    aggiorna()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [ids])

  return active
}
