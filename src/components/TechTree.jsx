import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import {
  SiPython,
  SiScikitlearn,
  SiOpencv,
  SiTensorflow,
  SiFlask,
  SiFastapi,
  SiApachespark,
  SiDatabricks,
  SiGit,
  SiDocker,
  SiStreamlit,
  SiGradio,
  SiJira,
} from 'react-icons/si'
import { TbBrandOpenai, TbBrandAws } from 'react-icons/tb'

// Items with a real, recognizable brand logo.
const iconTools = [
  { icon: SiPython, label: 'Python', color: '#3776AB' },
  {
    icon: TbBrandAws,
    label: 'AWS',
    color: '#FF9900',
    sub: 'S3, Lambda, ECR, SageMaker, Textract, Step Functions, CloudWatch',
  },
  { icon: TbBrandOpenai, label: 'OpenAI', color: '#EDEDED' },
  { icon: SiScikitlearn, label: 'Scikit-learn', color: '#F7931E' },
  { icon: SiTensorflow, label: 'TensorFlow / TFLite', color: '#FF6F00' },
  { icon: SiOpencv, label: 'OpenCV', color: '#5C3EE8' },
  { icon: SiFastapi, label: 'FastAPI', color: '#009688' },
  { icon: SiFlask, label: 'Flask', color: '#EDEDED' },
  { icon: SiDocker, label: 'Docker', color: '#2496ED' },
  { icon: SiGit, label: 'Git', color: '#F05032' },
  { icon: SiApachespark, label: 'Spark', color: '#E25A1C' },
  { icon: SiDatabricks, label: 'Databricks', color: '#FF3621' },
  { icon: SiStreamlit, label: 'Streamlit', color: '#FF4B4B' },
  { icon: SiGradio, label: 'Gradio', color: '#FF7C00' },
  { icon: SiJira, label: 'Jira', color: '#0052CC' },
]

// Everything else from the tech stack that has no reliable brand logo —
// shown as plain text nodes instead so nothing gets left out.
const textTools = [
  'SQL',
  'XGBoost',
  'ARIMA',
  'SARIMA',
  'Prophet',
  'RAG',
  'Vector DBs',
  'BioGPT',
  'YOLO',
  'ETL Pipelines',
  'Data Processing',
]

const HIGHLIGHT_COUNT = 3
const HIGHLIGHT_INTERVAL_MS = 3200

// Positions are computed from a single measured pixel size (not CSS %),
// so X and Y always use the exact same scale — the circle can't skew.
function polarOffset(index, total, radiusFraction, size) {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2
  const radius = radiusFraction * size
  return {
    x: size / 2 + radius * Math.cos(angle),
    y: size / 2 + radius * Math.sin(angle),
  }
}

function pickRandomIndices(count, total) {
  const indices = Array.from({ length: total }, (_, i) => i)
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[indices[i], indices[j]] = [indices[j], indices[i]]
  }
  return new Set(indices.slice(0, count))
}

export default function TechTree() {
  const containerRef = useRef(null)
  const [size, setSize] = useState(0)

  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return
    setSize(el.getBoundingClientRect().width)
    const observer = new ResizeObserver((entries) => {
      setSize(entries[0].contentRect.width)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Everything stays fixed in place; only which 3 icons + 3 words are
  // "spotlighted" (bigger, bordered) changes on a timer.
  const [highlightIcons, setHighlightIcons] = useState(() =>
    pickRandomIndices(HIGHLIGHT_COUNT, iconTools.length)
  )
  const [highlightTexts, setHighlightTexts] = useState(() =>
    pickRandomIndices(HIGHLIGHT_COUNT, textTools.length)
  )

  useEffect(() => {
    const id = setInterval(() => {
      setHighlightIcons(pickRandomIndices(HIGHLIGHT_COUNT, iconTools.length))
      setHighlightTexts(pickRandomIndices(HIGHLIGHT_COUNT, textTools.length))
    }, HIGHLIGHT_INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  const ready = size > 0

  return (
    <div className="overflow-hidden -mx-6 px-6">
      <div className="mx-auto w-full max-w-xl">
        <motion.div
          ref={containerRef}
          className="relative w-full"
          style={{ aspectRatio: '1 / 1', opacity: ready ? 1 : 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <div
            className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-400 shadow-lg shadow-violet-900/40"
            style={{ width: size * 0.12, height: size * 0.12, minWidth: 44, minHeight: 44, maxWidth: 64, maxHeight: 64 }}
          >
            <Sparkles className="text-white" style={{ width: '45%', height: '45%' }} />
          </div>

          {ready &&
            iconTools.map((tool, i) => {
              const { x, y } = polarOffset(i, iconTools.length, 0.25, size)
              const isHi = highlightIcons.has(i)
              const Icon = tool.icon
              const boxSize = Math.min(Math.max(size * 0.1, 24), 40)
              return (
                <div
                  key={tool.label}
                  className="absolute left-0 top-0"
                  title={`${tool.label}${tool.sub ? `: ${tool.sub}` : ''}`}
                  style={{
                    transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                    zIndex: isHi ? 20 : 1,
                  }}
                >
                  <motion.div
                    animate={{
                      scale: isHi ? 1.15 : 1,
                      borderColor: isHi ? 'rgba(167,139,250,0.8)' : 'rgba(255,255,255,0.1)',
                      boxShadow: isHi
                        ? `0 0 0 1px rgba(167,139,250,0.45), 0 8px 18px -4px ${tool.color}77`
                        : '0 0 0 0 rgba(0,0,0,0)',
                    }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="flex items-center justify-center rounded-xl bg-[#120b24] border"
                    style={{ width: boxSize, height: boxSize }}
                  >
                    <Icon style={{ color: tool.color, width: boxSize * 0.45, height: boxSize * 0.45 }} />
                  </motion.div>
                </div>
              )
            })}

          {ready &&
            textTools.map((label, i) => {
              const { x, y } = polarOffset(i, textTools.length, 0.44, size)
              const isHi = highlightTexts.has(i)
              const pillWidth = Math.min(Math.max(size * 0.16, 48), 68)
              const pillHeight = Math.min(Math.max(size * 0.1, 28), 40)
              return (
                <div
                  key={label}
                  className="absolute left-0 top-0"
                  style={{
                    transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                    zIndex: isHi ? 20 : 1,
                  }}
                >
                  <motion.div
                    className="flex items-center justify-center overflow-hidden rounded-full bg-white/5 border text-center leading-tight"
                    animate={{
                      scale: isHi ? 1.15 : 1,
                      color: isHi ? '#ddd6fe' : '#94a3b8',
                      borderColor: isHi ? 'rgba(167,139,250,0.75)' : 'rgba(255,255,255,0.1)',
                      boxShadow: isHi ? '0 0 0 1px rgba(167,139,250,0.35)' : '0 0 0 0 rgba(0,0,0,0)',
                    }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    style={{
                      fontSize: Math.min(Math.max(size * 0.02, 6), 8.5),
                      width: pillWidth,
                      height: pillHeight,
                      padding: '2px 6px',
                    }}
                  >
                    {label}
                  </motion.div>
                </div>
              )
            })}
        </motion.div>
      </div>
    </div>
  )
}
