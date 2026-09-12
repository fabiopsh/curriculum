/**
 * Rende i marcatori `**testo**` come <strong>.
 *
 * L'enfasi appartiene al contenuto, quindi vive in src/data/cv.ts insieme al
 * testo; qui viene solo tradotta in markup. I dati restano stringhe semplici:
 * niente HTML da interpretare, quindi nessun dangerouslySetInnerHTML.
 */
export function Enfasi({ testo }: { readonly testo: string }) {
  return (
    <>
      {testo.split(/(\*\*[^*]+\*\*)/g).map((pezzo, indice) =>
        pezzo.startsWith('**') && pezzo.endsWith('**') ? (
          <strong key={`${indice}-${pezzo}`}>{pezzo.slice(2, -2)}</strong>
        ) : (
          pezzo
        ),
      )}
    </>
  )
}
