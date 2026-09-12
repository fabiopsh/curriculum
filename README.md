# Curriculum — Fabio Piscitelli

Sito personale che presenta il curriculum di Fabio Piscitelli, solution architect
e software engineer.

**Online:** <https://fabiopsh.github.io/curriculum/>

## Stack

React 19 · TypeScript · Vite · CSS Modules. Nessuna libreria UI. Font self-hosted
(Newsreader, Inter, IBM Plex Mono), nessuna richiesta a CDN esterne.

## Sviluppo

```bash
npm install
npm run dev      # server di sviluppo
npm run build    # typecheck, build, prerender in dist/
npm run preview  # anteprima della build
npm run lint
```

## Aggiornare il curriculum

Tutto il testo vive tipizzato in [`src/data/cv.ts`](src/data/cv.ts). I componenti
non contengono testo di merito: per aggiornare il CV si modifica solo quel file.
Il PDF scaricabile è `public/curriculum-fabio-piscitelli.pdf`.

## Due dettagli non ovvi

**La pagina è prerenderizzata.** `npm run build` rende l'albero React in HTML
statico e lo inietta in `dist/index.html`
([`scripts/prerender.mjs`](scripts/prerender.mjs)); il client lo idrata con
`hydrateRoot`, non lo sostituisce. Il curriculum resta quindi leggibile senza
JavaScript o se il bundle non arriva. Per questo lo stato reso dal server deve
combaciare con quello del client — è la ragione per cui il tema usa
`useSyncExternalStore` con uno snapshot server dedicato.

**La sorgente di Pages deve essere "GitHub Actions".** In *Settings → Pages →
Build and deployment* il valore predefinito è *Deploy from a branch*, e sceglierlo
rompe il sito senza lasciare tracce: GitHub aggiunge un workflow
`pages-build-deployment` che gira dopo [`deploy.yml`](.github/workflows/deploy.yml)
e ne sovrascrive la pubblicazione servendo la radice della repository invece di
`dist/` — cioè l'`index.html` sorgente di Vite, con un `<div id="root">` vuoto.
Risultato: pagina bianca, mentre il workflow riporta successo. Lo si riconosce
perché `/package.json` risponde, e non dovrebbe.

`base` in [`vite.config.ts`](vite.config.ts) deve restare allineato al nome della
repository, perché il sito è servito da una sottocartella.
