import AnimatedSection from './AnimatedSection'

export default function Education({ profile }) {
  return (
    <AnimatedSection id="education" className="max-w-5xl mx-auto px-6 py-20">
      <h2 className="text-sm font-semibold text-blue-400 tracking-widest uppercase mb-10">
        Education
      </h2>
      <div className="space-y-6">
        {profile.education.map((edu) => (
          <div
            key={edu.degree}
            className="p-6 rounded-xl bg-white/5 border border-white/10"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-lg font-semibold text-white">{edu.degree}</h3>
              <span className="text-sm text-slate-500">{edu.period}</span>
            </div>
            <p className="text-slate-400 mt-1">{edu.school}</p>
          </div>
        ))}
      </div>
    </AnimatedSection>
  )
}
