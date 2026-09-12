# Curriculum — Fabio Piscitelli

Sito personale che presenta il curriculum di Fabio Piscitelli, solution architect
e software engineer.

**Online:** <https://fabiopsh.github.io/curriculum/>

## Stack

- **React 19** con **TypeScript**
- **Vite** per sviluppo e build
- **CSS Modules** e custom property per il sistema di design; nessuna libreria UI
- **oxlint** per il lint
- Font (Newsreader, Inter, IBM Plex Mono) serviti dal dominio del sito, senza CDN esterni

## Scelte progettuali

- **Il contenuto è separato dalla presentazione.** Tutto il testo del curriculum
  vive in [`src/data/cv.ts`](src/data/cv.ts), tipizzato: per aggiornare il CV si
  modifica solo quel file, i componenti non contengono testo di merito.
- **Tema chiaro e scuro.** Segue l'impostazione del sistema operativo finché non
  si sceglie esplicitamente; la scelta viene poi ricordata. Uno script inline in
  `index.html` applica il tema prima del primo paint, così non c'è il lampo di colore.
- **Animazioni discrete e sicure.** Le sezioni compaiono in dissolvenza quando
  raggiungono il viewport. Il controllo è sulla posizione assoluta e non
  sull'intersezione, perciò un salto di scorrimento (ancora, ricerca nella pagina,
  tasto Fine) non può lasciare una sezione invisibile. Con
  `prefers-reduced-motion: reduce` tutto parte già visibile.
- **Stampa.** Un foglio di stile dedicato rende la pagina stampabile su carta con
  colori pieni e senza i controlli dell'interfaccia.
- **Accessibilità.** Un solo `h1`, gerarchia dei titoli coerente, testo alternativo
  sulle immagini, contrasti conformi ad AA in entrambi i temi, focus sempre visibile.

## Sviluppo

```bash
npm install
npm run dev      # server di sviluppo
npm run build    # typecheck + build di produzione in dist/
npm run preview  # anteprima locale della build
npm run lint
```

## Struttura

```
src/
├── App.tsx              composizione della pagina
├── data/cv.ts           contenuto del curriculum (unica fonte di verità)
├── components/          masthead, sezioni, voci, competenze, lingue, contatti
├── hooks/               tema chiaro/scuro, animazioni di ingresso
└── styles/              font, design token, base, stampa
public/
├── fonts/               woff2 self-hosted (sottoinsiemi latin e latin-ext)
├── curriculum-*.pdf     il CV scaricabile dal sito
├── og-image.jpg         anteprima per le condivisioni social
└── favicon.svg
```

## Pubblicazione

Ogni push su `main` lancia il workflow
[`deploy.yml`](.github/workflows/deploy.yml): installa, lint, build e pubblica
`dist/` su GitHub Pages.

**Prerequisito.** Pages deve essere attivo sulla repository con sorgente
*Settings → Pages → Build and deployment → Source: **GitHub Actions***. È un
passaggio manuale una tantum: il `GITHUB_TOKEN` del workflow non può creare il
sito Pages da sé, perché l'operazione richiede permessi di amministrazione che
il blocco `permissions:` di un workflow non può concedere.

Il sito è servito da una sottocartella (`/curriculum/`), quindi
`base: '/curriculum/'` in [`vite.config.ts`](vite.config.ts) deve restare
allineato al nome della repository.
