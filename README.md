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
- **La pagina è prerenderizzata.** In fase di build l'albero React viene reso in
  HTML statico e iniettato in `dist/index.html`
  ([`scripts/prerender.mjs`](scripts/prerender.mjs)). Il curriculum è quindi
  leggibile per intero anche senza JavaScript, o se il bundle non arriva: un
  contenuto di testo statico non deve dipendere da un file JS per essere visibile.
  Il client non idrata quel markup, lo rimpiazza al montaggio; per questo lo stato
  iniziale reso dal server non deve combaciare con quello del client.
  Lo script verifica che ogni classe presente nel markup prerenderizzato esista
  nel CSS della build client, e fa fallire la build in caso contrario.
- **Tema chiaro e scuro.** Segue l'impostazione del sistema operativo finché non
  si sceglie esplicitamente; la scelta viene poi ricordata. Uno script inline in
  `index.html` applica il tema prima del primo paint, così non c'è il lampo di colore.
- **Animazioni discrete e che non possono nascondere il contenuto.** Le sezioni
  compaiono in dissolvenza quando raggiungono il viewport. Il controllo è sulla
  posizione assoluta e non sull'intersezione, perciò un salto di scorrimento
  (ancora, ricerca nella pagina, tasto Fine) non può lasciare una sezione
  invisibile. Lo stato nascosto richiede `data-motion="on"`, scritto dallo script
  inline prima del primo paint: senza quel flag non si nasconde nulla, quindi un
  errore di JavaScript fa perdere l'animazione, non il contenuto. Con
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
├── entry-server.tsx     ingresso usato dal prerender
├── data/cv.ts           contenuto del curriculum (unica fonte di verità)
├── components/          masthead, sezioni, voci, competenze, lingue, contatti
├── hooks/               tema chiaro/scuro, rivelazione allo scorrimento
└── styles/              font, design token, base, stampa
scripts/
└── prerender.mjs        rende l'albero React in HTML e lo inietta in dist/
public/
├── fonts/               woff2 self-hosted (sottoinsiemi latin e latin-ext)
├── fabio-piscitelli.jpg il ritratto (in public/ perché l'URL deve essere
│                        identico tra build client e build SSR)
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
