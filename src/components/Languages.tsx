import { languages } from '../data/cv'
import styles from './Languages.module.css'

export function Languages() {
  return (
    <ul className={styles.list}>
      {languages.map((language) => (
        <li key={language.name} className={styles.row}>
          <span className={styles.name}>{language.name}</span>
          <span className={styles.leader} aria-hidden="true" />
          <span className={styles.level}>{language.level}</span>
        </li>
      ))}
    </ul>
  )
}
