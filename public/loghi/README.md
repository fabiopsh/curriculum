# Loghi delle organizzazioni

Immagini dei marchi mostrati accanto al nome dell'organizzazione nelle voci di
esperienza. Per attivarne uno basta indicare il nome del file nel campo `logo`
della voce corrispondente in [`src/data/cv.ts`](../../src/data/cv.ts):

```ts
{ id: 'uppwise', organization: 'Uppwise', logo: 'uppwise.svg', … }
```

Omesso il campo, non viene reso alcun segno: la voce resta corretta senza logo.

**Requisiti.** SVG, oppure PNG con sfondo trasparente ad almeno 96×96. Il marchio
viene reso dentro un riquadro chiaro di 30×30 con `object-fit: contain`, quindi
proporzioni qualsiasi vanno bene; il riquadro chiaro serve perché i marchi sono
pensati su fondo bianco e così restano leggibili anche in tema scuro, senza
dover mantenere una variante per tema.
