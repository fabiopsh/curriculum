import { Colophon } from './components/Colophon'
import { Contacts } from './components/Contacts'
import { Entry } from './components/Entry'
import { Languages } from './components/Languages'
import { Masthead } from './components/Masthead'
import { Navbar } from './components/Navbar'
import { Section } from './components/Section'
import { Skills } from './components/Skills'
import { education, experience, sections } from './data/cv'
import { useTheme } from './hooks/useTheme'
import styles from './App.module.css'

export default function App() {
  const { theme, toggle } = useTheme()

  return (
    <>
      <Navbar theme={theme} onToggle={toggle} />

      <div className={styles.page}>
        <Masthead />

        <main>
          <Section id="esperienza" {...sections.esperienza}>
            {experience.map((role) => (
              <Entry
                key={role.id}
                period={role.period}
                title={role.title}
                organization={role.organization}
                logo={role.logo}
                summary={role.summary}
                highlights={role.highlights}
              />
            ))}
          </Section>

          <Section id="formazione" {...sections.formazione}>
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

          <Section id="competenze" {...sections.competenze}>
            <Skills />
          </Section>

          <Section id="lingue" {...sections.lingue}>
            <Languages />
          </Section>

          <Section id="contatti" {...sections.contatti}>
            <Contacts />
          </Section>
        </main>

        <Colophon />
      </div>
    </>
  )
}
