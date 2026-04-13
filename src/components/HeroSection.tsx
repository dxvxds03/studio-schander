'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import DraggableLetters from './DraggableLetters'

export default function HeroSection() {
  const { scrollY } = useScroll()
  const contentY = useTransform(scrollY, [0, 500], [0, -80])
  const contentOpacity = useTransform(scrollY, [0, 350], [1, 0])

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Large faint year — decorative */}
      <motion.div
        className="absolute right-8 top-1/2 -translate-y-1/2 select-none pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        aria-hidden
      >
        <span
          className="text-display font-black"
          style={{
            fontSize: 'clamp(120px, 22vw, 340px)',
            color: 'rgba(25,25,23,0.04)',
            lineHeight: 1,
            letterSpacing: '-0.04em',
          }}
        >
          DS
        </span>
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 px-8 md:px-14 lg:px-20"
      >
        {/* "Das ist" */}
        <motion.div
          className="flex justify-end mb-1"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span
            className="text-display italic"
            style={{
              fontSize: 'clamp(32px, 6.5vw, 96px)',
              color: 'rgba(25,25,23,0.65)',
              lineHeight: 1,
              letterSpacing: '-0.01em',
            }}
          >
            Das ist
          </span>
        </motion.div>

        {/* DAVID — draggable */}
        <DraggableLetters />

        {/* SCHANDER + 's Portfolio. */}
        <motion.div
          className="mt-0 flex items-baseline flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ gap: '0.15em' }}
        >
          <span
            className="text-ink transition-colors duration-300 hover:text-deadpoet"
          style={{
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: 200,
            fontSize: 'clamp(28px, 6vw, 88px)',
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
          }}
          data-hover
        >
            Schander
          </span>
          <span
            className="text-display italic"
            style={{
              fontSize: 'clamp(22px, 4.5vw, 68px)',
              color: '#191917',
              lineHeight: 0.9,
              letterSpacing: '-0.01em',
            }}
          >
            's{' '}
          </span>
          <span
            className="text-display italic"
            style={{
              fontSize: 'clamp(22px, 4.5vw, 68px)',
              color: '#191917',
              lineHeight: 0.9,
              letterSpacing: '-0.01em',
            }}
          >
            Portfolio
          </span>
          <span
            className="text-display"
            style={{
              fontSize: 'clamp(22px, 4.5vw, 68px)',
              color: '#E8581A',
              lineHeight: 0.9,
            }}
          >
            .
          </span>
        </motion.div>

        {/* Divider + scroll hint */}
        <motion.div
          className="mt-16 flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <div className="h-px bg-ink/20 flex-grow max-w-[120px]" />
          <span className="label">Ausgewählte Arbeiten</span>
          <ScrollArrow />
        </motion.div>
      </motion.div>
    </section>
  )
}

function ScrollArrow() {
  return (
    <motion.div
      animate={{ y: [0, 6, 0] }}
      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      className="label"
      style={{ color: '#E8581A' }}
    >
      ↓
    </motion.div>
  )
}
