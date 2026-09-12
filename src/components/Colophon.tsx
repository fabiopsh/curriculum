import styles from './Colophon.module.css'

const repository = 'https://github.com/fabiopsh/curriculum'

export function Colophon() {
  return (
    <footer className={styles.colophon}>
      <p className={styles.line}>
        © {new Date().getFullYear()} Fabio Piscitelli
      </p>
      <p className={styles.line}>
        Realizzato con React, TypeScript e Vite —{' '}
        <a href={repository} target="_blank" rel="noreferrer noopener">
          codice sorgente
        </a>
      </p>
    </footer>
  )
}
