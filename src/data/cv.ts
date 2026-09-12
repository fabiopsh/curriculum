/**
 * Contenuto del curriculum.
 * Unica fonte di verità del sito: i componenti non contengono testo di merito.
 */

export interface Role {
  readonly id: string
  readonly period: string
  readonly title: string
  readonly organization: string
  readonly summary: string
  readonly highlights: readonly string[]
}

export interface Study {
  readonly id: string
  readonly period: string
  readonly title: string
  readonly institution: string
  readonly thesis: string
}

export interface SkillGroup {
  readonly id: string
  readonly label: string
  readonly items: readonly string[]
}

export interface Language {
  readonly name: string
  readonly level: string
}

export interface Contact {
  readonly id: string
  readonly label: string
  readonly value: string
  readonly href: string
}

export const profile = {
  name: 'Fabio Piscitelli',
  roles: ['Solution Architect', 'Software Engineer'],
  location: 'Pisa, Italia',
  intro: [
    "Ingegnere informatico con un doppio percorso: tre anni di sviluppo software in un’azienda di prodotto e un’esperienza imprenditoriale conclusa con un’exit, alla guida di una startup nel settore media e advertising cresciuta fino a 120.000 follower.",
    'Frequento la laurea magistrale in Informatica a Pisa, curriculum ICT Solution Architect, con una tesi su inferenza AI distribuita e blockchain. Lavoro sulla progettazione di soluzioni tecniche e sulla gestione del prodotto end-to-end, dalla definizione dei requisiti al rilascio.',
  ],
} as const

export const experience: readonly Role[] = [
  {
    id: 'uppwise',
    period: '2022 — 2025',
    title: 'Developer',
    organization: 'Uppwise',
    summary:
      'Sviluppo frontend di un prodotto software in ambito finance e Strategic Portfolio Management.',
    highlights: [
      "Presa in carico del prodotto dalla fase iniziale al rilascio in produzione e alle iterazioni successive, con responsabilità su definizione dei requisiti, scelte di architettura frontend e rilascio.",
      "Realizzazione dell’interfaccia utente in React e TypeScript, integrazione con API REST e collaborazione continua con backend, design e product owner.",
      'Integrazione di tecnologie AI nei flussi di finanza e Strategic Portfolio Management.',
      'Code review, definizione degli standard di sviluppo e onboarding dei nuovi membri del team.',
    ],
  },
  {
    id: 'traplist',
    period: '2019 — 2022',
    title: 'Cofondatore e Direttore Creativo',
    organization: 'Traplist / Hip Hop Tender',
    summary:
      "Startup di comunicazione e advertising per artisti emergenti, conclusa con un’exit.",
    highlights: [
      'Crescita della community fino a 120.000 follower e 5.000 clienti nei primi due anni di attività.',
      'Acquisizione e integrazione del magazine Hip Hop Tender, con direzione artistica e responsabilità editoriale complessiva della testata.',
      'Gestione di un team di 30 persone tra grafici, redattori e collaboratori esterni: selezione, coordinamento operativo e definizione dei processi di lavoro.',
      'Responsabilità diretta della strategia di marketing, del posizionamento del brand e delle campagne pubblicitarie per i clienti.',
      'Produzione di contenuti editoriali e conduzione di interviste ad artisti di rilievo della scena musicale italiana.',
    ],
  },
]

export const education: readonly Study[] = [
  {
    id: 'unipi',
    period: '2025 — in corso',
    title: 'Laurea Magistrale in Informatica',
    institution: 'Università di Pisa · curriculum ICT Solution Architect',
    thesis:
      "Tesi in ambito blockchain: sviluppo di un framework per l’inferenza AI distribuita su rete peer-to-peer.",
  },
  {
    id: 'unica',
    period: '2019 — 2022',
    title: 'Laurea Triennale in Informatica',
    institution: 'Università degli Studi di Cagliari',
    thesis:
      "Tesi sulla realizzazione di un algoritmo di ambient occlusion in ambito computer vision.",
  },
]

export const skills: readonly SkillGroup[] = [
  {
    id: 'architettura',
    label: 'Architettura e progettazione',
    items: [
      'Progettazione di soluzioni software',
      'Architetture distribuite',
      'API design e integrazione di sistemi',
      'Modellazione dei dati',
      'Azure',
    ],
  },
  {
    id: 'sviluppo',
    label: 'Sviluppo',
    items: [
      'JavaScript / TypeScript',
      'React',
      'Svelte',
      'SolidJS',
      'HTML5, CSS3',
      'Node.js',
      'Quarkus',
      'Spring',
      'SQL / NoSQL',
      'Git',
      'Docker',
      'CI/CD',
    ],
  },
  {
    id: 'blockchain',
    label: 'Blockchain',
    items: ['Solidity', 'Smart contract', 'Architetture decentralizzate', 'Ethereum'],
  },
  {
    id: 'prodotto',
    label: 'Prodotto e gestione',
    items: [
      'Product management',
      'Definizione requisiti e roadmap',
      'Gestione team',
      'Agile / Scrum',
      'Rapporto con stakeholder e clienti',
    ],
  },
  {
    id: 'comunicazione',
    label: 'Comunicazione e creatività',
    items: [
      'Public speaking',
      'Direzione artistica',
      'Graphic design',
      'Adobe Suite / Figma',
      'Strategia di marketing e brand positioning',
    ],
  },
]

export const languages: readonly Language[] = [
  { name: 'Italiano', level: 'Madrelingua' },
  { name: 'Inglese', level: 'C1' },
]

export const contacts: readonly Contact[] = [
  {
    id: 'email',
    label: 'Email',
    value: 'fabiopiscitelli01@gmail.com',
    href: 'mailto:fabiopiscitelli01@gmail.com',
  },
  { id: 'phone', label: 'Telefono', value: '+39 389 1751 545', href: 'tel:+393891751545' },
  { id: 'github', label: 'GitHub', value: 'github.com/fabiopsh', href: 'https://github.com/fabiopsh' },
]

export const cvFile = `${import.meta.env.BASE_URL}curriculum-fabio-piscitelli.pdf`
export const portraitFile = `${import.meta.env.BASE_URL}fabio-piscitelli.jpg`
