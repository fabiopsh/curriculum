import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const htmlPath = resolve(root, 'dist/index.html')

const { render } = await import(resolve(root, 'dist-ssr/entry-server.js'))
const markup = render()

const html = readFileSync(htmlPath, 'utf8')
const placeholder = '<div id="root"></div>'

if (!html.includes(placeholder)) {
  throw new Error(`Segnaposto ${placeholder} non trovato in dist/index.html`)
}

// I nomi delle classi dei CSS Modules sono generati due volte, una per la build
// client e una per quella SSR. Se non coincidessero, il markup prerenderizzato
// arriverebbe senza stili: meglio far fallire la build che accorgersene online.
const cssPath = resolve(root, 'dist', html.match(/\/[^"']*\/assets\/(index-[^"']+\.css)/)?.[1]
  ? `assets/${html.match(/assets\/(index-[^"']+\.css)/)[1]}`
  : '')
const css = readFileSync(cssPath, 'utf8')
const classi = [...new Set([...markup.matchAll(/class="([^"]+)"/g)].flatMap((m) => m[1].split(/\s+/)))]
const orfane = classi.filter((c) => !css.includes(`.${c}`))

if (orfane.length > 0) {
  throw new Error(
    `Classi presenti nel markup prerenderizzato ma assenti dal CSS della build client: ${orfane.join(', ')}`,
  )
}

writeFileSync(htmlPath, html.replace(placeholder, `<div id="root">${markup}</div>`), 'utf8')

console.log(
  `prerender: ${classi.length} classi verificate, ${(markup.length / 1024).toFixed(1)} kB di markup iniettati`,
)
