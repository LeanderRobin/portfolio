import { AnimatePresence } from 'framer-motion'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import profile from './data/profile.json'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

function AppRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home profile={profile} />} />
        <Route path="/about" element={<AboutPage profile={profile} />} />
        <Route path="/contact" element={<ContactPage profile={profile} />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="bg-[#0c071c] min-h-screen">
        <Navbar />
        <div className="pt-16">
          <AppRoutes />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
