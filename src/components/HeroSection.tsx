'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import DraggableLetters from './DraggableLetters'

export default function HeroSection() {
  const { scrollY } = useScroll()
  const nameY       = useTransform(scrollY, [0, 500], [0, -60])
  const nameOpacity = useTransform(scrollY, [0, 380], [1, 0])

  return (
    <section
      className="relative flex flex-col justify-end overflow-hidden"
      style={{ minHeight: '100svh', paddingTop: '72px' }}
    >
      {/* Bottom: massive name */}
      <motion.div
        style={{ y: nameY, opacity: nameOpacity }}
        className="px-8 md:px-14 lg:px-20 pb-10 md:pb-16"
      >
        {/* DAVID — draggable */}
        <DraggableLetters />

        {/* SCHANDER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span
            className="font-display block text-ink"
            style={{
              fontWeight: 800,
              fontSize: 'clamp(52px, 10.5vw, 158px)',
              lineHeight: 0.88,
              letterSpacing: '-0.035em',
            }}
          >
            SCHANDER
          </span>
        </motion.div>

        {/* Meta row */}
        <motion.div
          className="mt-8 flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.7 }}
        >
          <div className="flex items-center gap-5">
            <div className="h-px bg-ink/20 w-12" />
            <span
              className="font-display"
              style={{ fontWeight: 700, fontSize: '14px', letterSpacing: '-0.01em', color: '#191917' }}
            >
              Design & Direction
            </span>
            <span style={{ color: 'var(--negroni)', fontWeight: 700, fontSize: '18px' }}>·</span>
            <span
              className="font-display"
              style={{ fontWeight: 700, fontSize: '14px', letterSpacing: '-0.01em', color: '#191917' }}
            >
              Bielefeld
            </span>
          </div>
          <ScrollHint />
        </motion.div>
      </motion.div>
    </section>
  )
}

function ScrollHint() {
  return (
    <motion.button
      animate={{ y: [0, 6, 0] }}
      transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
      className="font-display"
      style={{
        color: 'var(--negroni)',
        background: 'none',
        border: 'none',
        padding: 0,
        fontSize: '14px',
        fontWeight: 700,
        letterSpacing: '-0.01em',
        cursor: 'pointer',
      }}
      onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
    >
      ↓ Arbeiten
    </motion.button>
  )
}
