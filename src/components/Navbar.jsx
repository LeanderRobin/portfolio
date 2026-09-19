import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const location = useLocation()

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-[#0c071c]/70 border-b border-white/10"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
        <Link to="/" className="font-semibold text-white tracking-tight text-sm sm:text-base">
          Leander Robin
        </Link>
        <ul className="flex gap-4 sm:gap-6 text-sm">
          {links.map((link) => {
            const active = location.pathname === link.to
            return (
              <li key={link.to} className="relative">
                <Link
                  to={link.to}
                  className={`transition-colors ${
                    active ? 'text-white' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-violet-400 to-blue-400"
                  />
                )}
              </li>
            )
          })}
        </ul>
      </nav>
    </motion.header>
  )
}
