import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import AnimatedSection from './AnimatedSection'

function CompanyLogo({ src, alt, className }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) {
    return (
      <div
        className={`${className} bg-white/10 border border-white/10 flex items-center justify-center text-slate-400 font-medium`}
      >
        {alt?.[0] ?? '?'}
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className={`${className} object-cover bg-white border border-white/10`}
    />
  )
}

export default function Experience({ profile }) {
  const [openIndex, setOpenIndex] = useState(null)
  const openRole = openIndex !== null ? profile.experience[openIndex] : null

  useEffect(() => {
    if (openRole) {
      const previousOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = previousOverflow
      }
    }
  }, [openRole])

  return (
    <AnimatedSection id="experience" className="max-w-5xl mx-auto px-6 py-20">
      <h2 className="text-sm font-semibold text-blue-400 tracking-widest uppercase mb-10">
        Experience
      </h2>

      <div className="space-y-4">
        {profile.experience.map((role, i) => (
          <motion.button
            key={`${role.company}-${role.period}`}
            type="button"
            onClick={() => setOpenIndex(i)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            whileHover={{ scale: 1.01 }}
            className="w-full text-left p-5 rounded-xl bg-white/5 border border-white/10 hover:border-violet-400/40 hover:bg-white/10 transition-colors flex items-start gap-4"
          >
            <CompanyLogo src={role.logo} alt={role.company} className="h-10 w-10 rounded-lg shrink-0" />
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-lg font-semibold text-white">{role.role}</h3>
                <span className="text-sm text-slate-500">{role.period}</span>
              </div>
              <p className="text-slate-400 mt-1">{role.company}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {openRole && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenIndex(null)}
          >
            <motion.div
              className="relative w-full max-w-lg max-h-[80vh] rounded-2xl bg-[#120b24] border border-white/10 overflow-hidden flex flex-col"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 flex items-start justify-between gap-4 p-6 pb-4 bg-[#120b24] border-b border-white/10">
                <div className="flex items-start gap-4 min-w-0">
                  <CompanyLogo
                    src={openRole.logo}
                    alt={openRole.company}
                    className="h-12 w-12 rounded-xl shrink-0"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">{openRole.role}</h3>
                    <p className="text-slate-400 text-sm mt-1">{openRole.company}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{openRole.period}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpenIndex(null)}
                  aria-label="Close"
                  className="shrink-0 h-9 w-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/20 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <ul className="overflow-y-auto p-6 pt-4 space-y-2">
                {openRole.bullets.map((bullet) => (
                  <li key={bullet} className="text-slate-300 text-sm leading-relaxed pl-4 relative">
                    <span className="absolute left-0 text-blue-400">›</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatedSection>
  )
}
