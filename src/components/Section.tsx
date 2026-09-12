import type { ReactNode } from 'react'

import { useReveal } from '../hooks/useReveal'
import styles from './Section.module.css'

interface SectionProps {
  readonly id: string
  readonly index: string
  readonly title: string
  readonly children: ReactNode
}

export function Section({ id, index, title, children }: SectionProps) {
  const { ref, state } = useReveal<HTMLElement>()

  return (
    <section id={id} ref={ref} className={styles.section} data-reveal={state} aria-labelledby={`${id}-label`}>
      <div className={styles.rail}>
        <span className={styles.index} aria-hidden="true">
          {index}
        </span>
        <h2 id={`${id}-label`} className={styles.label}>
          {title}
        </h2>
      </div>
      <div className={styles.body}>{children}</div>
    </section>
  )
}
