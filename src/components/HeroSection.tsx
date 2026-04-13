'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import DraggableLetters from './DraggableLetters'

export default function HeroSection() {
  const { scrollY } = useScroll()
  const contentY = useTransform(scrollY, [0, 500], [0, -60])
  const contentOpacity = useTransform(scrollY, [0, 380], [1, 0])

  return (
    <section
      className="relative overflow-hidden flex flex-col justify-between"
      style={{ minHeight: '100svh', paddingTop: '96px' }}
    >
      {/* Top bar */}
      <motion.div
        className="px-8 md:px-14 lg:px-20 flex items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.7 }}
      >
        <span className="label label-bracket">Das ist Davids Portfolio</span>
        <span className="label">{new Date().getFullYear()}</span>
      </motion.div>

      {/* Middle — space (project teasers later) */}
      <div className="flex-1" />

      {/* Bottom — massive name, IB Hasan style */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="px-8 md:px-14 lg:px-20 pb-10 md:pb-14"
      >
        {/* DAVID — draggable */}
        <DraggableLetters />

        {/* SCHANDER — Syne 800 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-[-0.05em]"
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

        {/* Divider + meta */}
        <motion.div
          className="mt-7 flex items-center gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.7 }}
        >
          <div className="h-px bg-ink/15 w-14" />
          <span className="label">Design & Direction</span>
          <span style={{ color: 'var(--negroni)', fontSize: '10px', letterSpacing: '0.22em' }}>·</span>
          <span className="label">Wien</span>
          <div className="flex-1 h-px bg-ink/10" />
          <ScrollHint />
        </motion.div>
      </motion.div>
    </section>
  )
}

function ScrollHint() {
  return (
    <motion.button
      animate={{ y: [0, 5, 0] }}
      transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
      className="label"
      style={{ color: 'var(--negroni)', background: 'none', border: 'none', padding: 0 }}
      onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
    >
      ↓ Arbeiten
    </motion.button>
  )
}
