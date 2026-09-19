import { motion } from 'framer-motion'
import AnimatedSection from './AnimatedSection'
import TechTree from './TechTree'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}
const badge = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
}

export default function Skills({ profile }) {
  return (
    <AnimatedSection id="skills" className="max-w-5xl mx-auto px-6 py-20">
      <h2 className="text-sm font-semibold text-blue-400 tracking-widest uppercase mb-10">
        Skills &amp; Tech Stack
      </h2>

      <motion.div
        className="flex flex-wrap gap-2 mb-16 justify-center"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {profile.skills.map((skill) => (
          <motion.span
            key={skill}
            variants={badge}
            className="px-3 py-1.5 rounded-full text-sm bg-gradient-to-r from-violet-500/20 to-blue-400/20 border border-violet-400/30 text-violet-200"
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>

      <TechTree />
    </AnimatedSection>
  )
}
