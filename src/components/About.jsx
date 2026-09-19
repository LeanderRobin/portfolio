import AnimatedSection from './AnimatedSection'

export default function About({ profile }) {
  return (
    <AnimatedSection id="about" className="max-w-5xl mx-auto px-6 py-20">
      <h2 className="text-sm font-semibold text-blue-400 tracking-widest uppercase mb-3">
        About
      </h2>
      <p className="text-2xl sm:text-3xl text-slate-100 leading-snug max-w-3xl">
        {profile.tagline}
      </p>
      <div className="flex flex-wrap gap-2 mt-6">
        {profile.languages.map((lang) => (
          <span
            key={lang}
            className="px-3 py-1 rounded-full text-sm bg-white/5 border border-white/10 text-slate-300"
          >
            {lang}
          </span>
        ))}
      </div>
    </AnimatedSection>
  )
}
