'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import DraggableLetters from './DraggableLetters'

interface HeroProject {
  id: number
  title: string
  cover_image: string | null
}

// Staggered Y offsets + rotations for Rue Studio scatter feel
const Y_OFFSETS = [20, 60, 0, 72, -16, 48, 32, -8]
const ROTATIONS = [-1.4, 0.8, -0.5, 1.6, -1.1, 0.7, -1.8, 1.2]
const WIDTHS =    [180, 148, 200, 136, 168, 152, 188, 144]

export default function HeroSection({ projects }: { projects: HeroProject[] }) {
  const { scrollY } = useScroll()
  const nameY    = useTransform(scrollY, [0, 500], [0, -60])
  const nameOpacity = useTransform(scrollY, [0, 380], [1, 0])
  const stripY   = useTransform(scrollY, [0, 400], [0, -28])

  const stripProjects = projects.filter(p => p.cover_image).slice(0, 8)

  return (
    <section
      className="relative flex flex-col justify-between overflow-hidden"
      style={{ minHeight: '100svh', paddingTop: '96px' }}
    >
      {/* Top label row */}
      <motion.div
        className="px-8 md:px-14 lg:px-20 flex items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.7 }}
      >
        <span className="label label-bracket">Das ist Davids Portfolio</span>
        <span className="label">Bielefeld — {new Date().getFullYear()}</span>
      </motion.div>

      {/* ── Image strip (Rue Studio) ── */}
      <motion.div
        style={{ y: stripY }}
        className="relative flex-1 flex items-center min-h-0 py-6"
      >
        {stripProjects.length > 0 ? (
          <>
            <motion.div
              className="flex items-start pl-8 md:pl-14 lg:pl-20 pr-8"
              style={{ gap: '16px' }}
              initial={{ opacity: 0, x: 48 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {stripProjects.map((project, i) => (
                <Link href={`/projects/${project.id}`} key={project.id} data-hover>
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 20 + i * 6,
                      rotate: ROTATIONS[i],
                    }}
                    animate={{
                      opacity: 1,
                      y: Y_OFFSETS[i],
                      rotate: ROTATIONS[i],
                    }}
                    transition={{
                      delay: 0.6 + i * 0.07,
                      duration: 0.8,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                    style={{
                      width: `${WIDTHS[i]}px`,
                      aspectRatio: '3/4',
                      flexShrink: 0,
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <img
                      src={project.cover_image!}
                      alt={project.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </motion.div>
                </Link>
              ))}
            </motion.div>

            {/* Counter — Rue Studio detail */}
            <motion.div
              className="absolute bottom-4 left-8 md:left-14 lg:left-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              <span className="label label-bracket">
                {String(stripProjects.length).padStart(2, '0')} Projekte
              </span>
            </motion.div>
          </>
        ) : (
          // Empty state — just space
          <div className="flex-1" />
        )}
      </motion.div>

      {/* ── Bottom: massive name ── */}
      <motion.div
        style={{ y: nameY, opacity: nameOpacity }}
        className="px-8 md:px-14 lg:px-20 pb-10 md:pb-14"
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
          className="mt-7 flex items-center gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.7 }}
        >
          <div className="h-px bg-ink/15 w-14" />
          <span className="label">Design & Direction</span>
          <span style={{ color: 'var(--negroni)', fontSize: '10px' }}>·</span>
          <span className="label">Bielefeld</span>
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
