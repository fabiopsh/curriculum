import { skills } from '../data/cv'
import styles from './Skills.module.css'

export function Skills() {
  return (
    <div className={styles.groups}>
      {skills.map((group) => (
        <section key={group.id} className={styles.group} aria-label={group.label}>
          <h3 className={styles.label}>{group.label}</h3>
          <ul className={styles.items}>
            {group.items.map((item) => (
              <li key={item} className={styles.item}>
                {item}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
