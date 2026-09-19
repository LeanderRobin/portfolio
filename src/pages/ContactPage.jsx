import Contact from '../components/Contact'
import PageTransition from '../components/PageTransition'

export default function ContactPage({ profile }) {
  return (
    <PageTransition>
      <div className="pt-8">
        <Contact profile={profile} />
      </div>
    </PageTransition>
  )
}
