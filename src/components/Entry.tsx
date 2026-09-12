import { logoFile } from '../data/cv'
import { Enfasi } from './Enfasi'
import styles from './Entry.module.css'

interface EntryProps {
  readonly period: string
  readonly title: string
  readonly organization: string
  readonly logo?: string
  readonly summary: string
  readonly highlights?: readonly string[]
}

export function Entry({ period, title, organization, logo, summary, highlights }: EntryProps) {
  return (
    <article className={styles.entry}>
      <p className={styles.period}>{period}</p>
      <h3 className={styles.title}>{title}</h3>

      <p className={styles.organization}>
        {logo && (
          <span className={styles.mark}>
            <img src={logoFile(logo)} alt="" width={96} height={96} loading="lazy" />
          </span>
        )}
        {organization}
      </p>

      <p className={styles.summary}>
        <Enfasi testo={summary} />
      </p>

      {highlights && highlights.length > 0 && (
        <ul className={styles.highlights}>
          {highlights.map((highlight) => (
            <li key={highlight} className={styles.highlight}>
              <Enfasi testo={highlight} />
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}
