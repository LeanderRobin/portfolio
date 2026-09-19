import { Link } from 'react-router-dom'
import AnimatedSection from './AnimatedSection'
import FocusCarousel from './FocusCarousel'

export default function Highlights({ profile }) {
  return (
    <AnimatedSection className="max-w-5xl mx-auto px-6 py-20">
      <div className="grid grid-cols-3 gap-6 mb-16 text-center">
        {profile.stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              {stat.value}
            </p>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <h2 className="text-sm font-semibold text-blue-400 tracking-widest uppercase text-center mb-8">
        What I work on
      </h2>
      <FocusCarousel />

      <div className="text-center mt-12">
        <Link
          to="/about"
          className="inline-block px-5 py-2.5 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 transition-colors"
        >
          See full experience →
        </Link>
      </div>
    </AnimatedSection>
  )
}
