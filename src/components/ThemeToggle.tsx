import type { Theme } from '../hooks/useTheme'
import { MoonIcon, SunIcon } from './Icons'
import styles from './ThemeToggle.module.css'

interface ThemeToggleProps {
  readonly theme: Theme
  readonly onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const label = theme === 'light' ? 'Attiva il tema scuro' : 'Attiva il tema chiaro'

  return (
    <button type="button" className={styles.toggle} onClick={onToggle} title={label} aria-label={label}>
      {theme === 'light' ? <MoonIcon className={styles.icon} /> : <SunIcon className={styles.icon} />}
    </button>
  )
}
