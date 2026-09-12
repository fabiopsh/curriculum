import { contacts, cvFile, portraitFile, profile } from '../data/cv'
import { DownloadIcon } from './Icons'
import styles from './Masthead.module.css'

const email = contacts.find((contact) => contact.id === 'email')

export function Masthead() {
  return (
    <header className={styles.masthead}>
      <div className={styles.identity}>
        <p className={styles.eyebrow}>{profile.location}</p>
        <h1 className={styles.name}>{profile.name}</h1>
        <p className={styles.roles}>
          {profile.roles.map((role, index) => (
            <span key={role}>
              {index > 0 && (
                <span className={styles.separator} aria-hidden="true">
                  /
                </span>
              )}
              {role}
            </span>
          ))}
        </p>
      </div>

      <figure className={styles.portrait}>
        <img
          src={portraitFile}
          width={600}
          height={750}
          alt={`Ritratto fotografico di ${profile.name}`}
          fetchPriority="high"
        />
      </figure>

      <div className={styles.lede}>
        {profile.intro.map((paragraph) => (
          <p key={paragraph} className={styles.paragraph}>
            {paragraph}
          </p>
        ))}

        <div className={styles.actions}>
          <a className={styles.download} href={cvFile} download data-print-hidden>
            <DownloadIcon className={styles.downloadIcon} />
            Scarica il CV in PDF
          </a>
          {email && (
            <a className={styles.email} href={email.href}>
              {email.value}
            </a>
          )}
        </div>
      </div>
    </header>
  )
}
