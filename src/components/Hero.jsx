import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Hero({ profile }) {
  const initials = profile.name
    .split(' ')
    .map((part) => part[0])
    .join('')

  return (
    <section
      id="top"
      className="relative overflow-hidden min-h-[90vh] flex items-center px-6"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[32rem] w-[32rem] rounded-full bg-violet-600/30 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[24rem] w-[24rem] rounded-full bg-blue-500/20 blur-[100px]" />
      </div>

      <motion.div
        className="max-w-5xl mx-auto w-full grid gap-10 sm:grid-cols-[auto_1fr] items-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div
          variants={item}
          className="h-28 w-28 sm:h-36 sm:w-36 rounded-full bg-gradient-to-br from-violet-500 to-blue-400 flex items-center justify-center text-3xl sm:text-4xl font-bold text-white shadow-lg shadow-violet-900/40 mx-auto sm:mx-0"
        >
          {initials}
        </motion.div>

        <div>
          <motion.p variants={item} className="text-blue-400 font-medium tracking-wide">
            Hi, I'm
          </motion.p>
          <motion.h1
            variants={item}
            className="text-4xl sm:text-6xl font-bold text-white tracking-tight mt-1"
          >
            {profile.name}
          </motion.h1>
          <motion.p variants={item} className="text-xl sm:text-2xl text-slate-300 mt-2">
            {profile.title}
          </motion.p>
          <motion.p variants={item} className="text-slate-400 mt-4 max-w-xl leading-relaxed">
            {profile.tagline}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4 mt-8">
            <a
              href="/Leander_Robin_CV.pdf"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-500 to-blue-400 text-white font-medium hover:opacity-90 transition-opacity"
            >
              Download CV
            </a>
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 transition-colors"
            >
              Get in touch
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
