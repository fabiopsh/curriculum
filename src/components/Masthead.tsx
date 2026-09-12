import portrait from '../assets/fabio-piscitelli.jpg'
import { contacts, cvFile, profile } from '../data/cv'
import { revealDelay, useEntrance } from '../hooks/useReveal'
import { DownloadIcon } from './Icons'
import styles from './Masthead.module.css'

const email = contacts.find((contact) => contact.id === 'email')

export function Masthead() {
  const state = useEntrance()

  return (
    <header className={styles.masthead}>
      <div className={styles.identity} data-reveal={state}>
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

      <figure className={styles.portrait} data-reveal={state} style={revealDelay(90)}>
        <img
          src={portrait}
          width={600}
          height={750}
          alt={`Ritratto fotografico di ${profile.name}`}
          fetchPriority="high"
        />
      </figure>

      <div className={styles.lede} data-reveal={state} style={revealDelay(180)}>
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
