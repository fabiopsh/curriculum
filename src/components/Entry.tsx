import styles from './Entry.module.css'

interface EntryProps {
  readonly period: string
  readonly title: string
  readonly organization: string
  readonly summary: string
  readonly highlights?: readonly string[]
}

export function Entry({ period, title, organization, summary, highlights }: EntryProps) {
  return (
    <article className={styles.entry}>
      <p className={styles.period}>{period}</p>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.organization}>{organization}</p>
      <p className={styles.summary}>{summary}</p>

      {highlights && highlights.length > 0 && (
        <ul className={styles.highlights}>
          {highlights.map((highlight) => (
            <li key={highlight} className={styles.highlight}>
              {highlight}
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}
