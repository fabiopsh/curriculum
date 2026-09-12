import { Colophon } from './components/Colophon'
import { Contacts } from './components/Contacts'
import { Entry } from './components/Entry'
import { Languages } from './components/Languages'
import { Masthead } from './components/Masthead'
import { Section } from './components/Section'
import { Skills } from './components/Skills'
import { ThemeToggle } from './components/ThemeToggle'
import { education, experience } from './data/cv'
import { useTheme } from './hooks/useTheme'
import styles from './App.module.css'

export default function App() {
  const { theme, toggle } = useTheme()

  return (
    <div className={styles.page}>
      <div className={styles.topbar} data-print-hidden>
        <ThemeToggle theme={theme} onToggle={toggle} />
      </div>

      <Masthead />

      <main>
        <Section id="esperienza" index="01" title="Esperienza">
          {experience.map((role) => (
            <Entry
              key={role.id}
              period={role.period}
              title={role.title}
              organization={role.organization}
              summary={role.summary}
              highlights={role.highlights}
            />
          ))}
        </Section>

        <Section id="formazione" index="02" title="Formazione">
          {education.map((study) => (
            <Entry
              key={study.id}
              period={study.period}
              title={study.title}
              organization={study.institution}
              summary={study.thesis}
            />
          ))}
        </Section>

        <Section id="competenze" index="03" title="Competenze">
          <Skills />
        </Section>

        <Section id="lingue" index="04" title="Lingue">
          <Languages />
        </Section>

        <Section id="contatti" index="05" title="Contatti">
          <Contacts />
        </Section>
      </main>

      <Colophon />
    </div>
  )
}
