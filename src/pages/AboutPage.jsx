import About from '../components/About'
import Experience from '../components/Experience'
import Skills from '../components/Skills'
import Education from '../components/Education'
import PageTransition from '../components/PageTransition'

export default function AboutPage({ profile }) {
  return (
    <PageTransition>
      <div className="pt-8">
        <About profile={profile} />
        <Experience profile={profile} />
        <Skills profile={profile} />
        <Education profile={profile} />
      </div>
    </PageTransition>
  )
}
