import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Sparkles, Eye, Cloud, Bot, ChevronLeft, ChevronRight } from 'lucide-react'

const focusAreas = [
  {
    icon: Brain,
    title: 'Machine Learning',
    desc: 'Predictive analytics & recommendation systems with Scikit-learn, XGBoost, and time series forecasting (ARIMA, SARIMA, Prophet).',
  },
  {
    icon: Sparkles,
    title: 'Generative AI / LLMs',
    desc: 'LLM-based chatbots, RAG pipelines, and vector databases built with OpenAI and BioGPT.',
  },
  {
    icon: Bot,
    title: 'Agent Building',
    desc: 'Designing and building AI agents for automation, diagnostics, and intelligent workflows across modern agent frameworks and platforms.',
  },
  {
    icon: Eye,
    title: 'Computer Vision',
    desc: 'Object detection & video analysis using YOLO, OpenCV, and TFLite.',
  },
  {
    icon: Cloud,
    title: 'Cloud & MLOps',
    desc: 'End-to-end pipelines deployed at scale on AWS — S3, Lambda, ECR, SageMaker.',
  },
]

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.8,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: 'easeOut' },
  },
  exit: (direction) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.4, ease: 'easeIn' },
  }),
}

export default function FocusCarousel() {
  const [[index, direction], setIndex] = useState([0, 0])
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setIndex(([i]) => [(i + 1) % focusAreas.length, 1])
    }, 3500)
    return () => clearInterval(id)
  }, [paused])

  const go = (dir) => {
    setIndex(([i]) => [(i + dir + focusAreas.length) % focusAreas.length, dir])
  }

  const goTo = (i) => {
    setIndex(([current]) => [i, i > current ? 1 : -1])
  }

  const area = focusAreas[index]
  const Icon = area.icon

  return (
    <div
      className="relative max-w-xl mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-72 sm:h-64 flex items-center justify-center overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={area.title}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragStart={() => setPaused(true)}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1)
              else if (info.offset.x > 60) go(-1)
              setPaused(false)
            }}
            style={{ touchAction: 'pan-y' }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-10 cursor-grab active:cursor-grabbing"
          >
            <motion.div
              className="relative h-16 w-16 rounded-2xl bg-white/5 border border-violet-400/30 flex items-center justify-center mb-5"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-400 blur-lg opacity-40" />
              <Icon className="relative h-8 w-8 text-blue-300" strokeWidth={1.75} />
            </motion.div>
            <h3 className="text-xl font-semibold text-white mb-2">{area.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">{area.desc}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={() => go(-1)}
        aria-label="Previous"
        className="absolute left-0 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Next"
        className="absolute right-0 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      <div className="flex justify-center gap-2 mt-6">
        {focusAreas.map((a, i) => (
          <button
            key={a.title}
            onClick={() => goTo(i)}
            aria-label={`Go to ${a.title}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? 'w-6 bg-gradient-to-r from-violet-400 to-blue-400' : 'w-2 bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
