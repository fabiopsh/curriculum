import { profile, sectionOrder, sections } from '../data/cv'
import { useActiveSection } from '../hooks/useActiveSection'
import type { Theme } from '../hooks/useTheme'
import { ThemeToggle } from './ThemeToggle'
import styles from './Navbar.module.css'

interface NavbarProps {
  readonly theme: Theme
  readonly onToggle: () => void
}

export function Navbar({ theme, onToggle }: NavbarProps) {
  const active = useActiveSection(sectionOrder)

  return (
    <div className={styles.bar} data-print-hidden>
      <div className={styles.inner}>
        <a className={styles.home} href="#top">
          {profile.name}
        </a>

        <nav className={styles.nav} aria-label="Sezioni del curriculum">
          {sectionOrder.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={styles.link}
              aria-current={active === id ? 'true' : undefined}
            >
              {sections[id].title}
            </a>
          ))}
        </nav>

        <ThemeToggle theme={theme} onToggle={onToggle} />
      </div>
    </div>
  )
}
