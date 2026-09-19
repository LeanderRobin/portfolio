import { motion } from 'framer-motion'
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaLocationDot } from 'react-icons/fa6'
import AnimatedSection from './AnimatedSection'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}
const card = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Contact({ profile }) {
  const { email, phone, location, linkedin, github } = profile.contact

  const channels = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: email,
      href: `mailto:${email}`,
      color: '#60a5fa',
    },
    {
      icon: FaPhone,
      label: 'Phone',
      value: phone,
      href: `tel:${phone.replace(/\s+/g, '')}`,
      color: '#34d399',
    },
    linkedin && {
      icon: FaLinkedin,
      label: 'LinkedIn',
      value: 'in/leanderrobin',
      href: linkedin,
      color: '#0A66C2',
    },
    github && {
      icon: FaGithub,
      label: 'GitHub',
      value: '@LeanderRobin',
      href: github,
      color: '#EDEDED',
    },
  ].filter(Boolean)

  return (
    <AnimatedSection id="contact" className="max-w-5xl mx-auto px-6 py-24 text-center">
      <h2 className="text-sm font-semibold text-blue-400 tracking-widest uppercase mb-4">
        Contact
      </h2>
      <h3 className="text-3xl sm:text-4xl font-bold text-white mb-3">
        Let's build something together.
      </h3>
      <p className="flex items-center justify-center gap-1.5 text-slate-400 mb-12">
        <FaLocationDot className="h-3.5 w-3.5 text-slate-500" />
        {location}
      </p>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {channels.map(({ icon: Icon, label, value, href, color }) => (
          <motion.a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            variants={card}
            whileHover={{ y: -4 }}
            className="group flex flex-col items-center gap-3 rounded-2xl bg-white/5 border border-white/10 p-5 hover:border-violet-400/40 hover:bg-white/10 transition-colors"
          >
            <span
              className="flex h-11 w-11 items-center justify-center rounded-full transition-transform group-hover:scale-110"
              style={{ backgroundColor: `${color}22` }}
            >
              <Icon style={{ color }} className="h-[18px] w-[18px]" />
            </span>
            <div>
              <p className="text-sm font-medium text-white">{label}</p>
              <p className="text-xs text-slate-400 mt-0.5 break-all">{value}</p>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </AnimatedSection>
  )
}
