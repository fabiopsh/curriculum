import { contacts } from '../data/cv'
import { ArrowIcon } from './Icons'
import styles from './Contacts.module.css'

export function Contacts() {
  return (
    <ul className={styles.list}>
      {contacts.map((contact) => (
        <li key={contact.id} className={styles.row}>
          <span className={styles.label}>{contact.label}</span>
          <a
            className={styles.value}
            href={contact.href}
            {...(contact.href.startsWith('http')
              ? { target: '_blank', rel: 'noreferrer noopener' }
              : {})}
          >
            {contact.value}
            <ArrowIcon className={styles.arrow} />
          </a>
        </li>
      ))}
    </ul>
  )
}
