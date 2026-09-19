import Hero from '../components/Hero'
import Highlights from '../components/Highlights'
import PageTransition from '../components/PageTransition'

export default function Home({ profile }) {
  return (
    <PageTransition>
      <Hero profile={profile} />
      <Highlights profile={profile} />
    </PageTransition>
  )
}
