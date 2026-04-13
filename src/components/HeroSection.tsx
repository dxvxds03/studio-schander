'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import DraggableLetters from './DraggableLetters'

interface HeroProject {
  id: number
  title: string
  cover_image: string | null
  link: string | null
}

const WIDTHS =    [185, 228, 156, 212, 168, 244, 174, 202, 188, 158]
const ROTATIONS = [-2.4, 1.7, -1.1, 2.6, -1.9, 1.3, -2.8, 1.5, -1.4, 2.1]
const Y_OFFSETS = [0, 38, -20, 52, 8, -42, 26, -14, 44, -28]

function HeroCarousel({ projects }: { projects: HeroProject[] }) {
  const { scrollY } = useScroll()
  const parallaxX = useTransform(scrollY, [0, 1800], [0, -200])

  const items = projects.filter(p => p.cover_image)
  if (items.length === 0) return null

  const duration = Math.max(24, items.length * 8)
  // Triple for seamless infinite loop (animation moves -33.333% = one set width)
  const tripled = [...items, ...items, ...items]

  return (
    <motion.div style={{ x: parallaxX }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '20px',
          paddingTop: '16px',
          paddingBottom: '20px',
          animation: `marquee ${duration}s linear infinite`,
          willChange: 'transform',
        }}
      >
        {tripled.map((project, i) => {
          const idx  = i % items.length
          const w    = WIDTHS[idx % WIDTHS.length]
          const rot  = ROTATIONS[idx % ROTATIONS.length]
          const yOff = Y_OFFSETS[idx % Y_OFFSETS.length]
          const href = project.link ?? `/projects/${project.id}`
          const isExternal = !!project.link

          return (
            <a
              key={i}
              href={href}
              target={isExternal ? '_blank' : '_self'}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              data-hover
              style={{ flexShrink: 0, textDecoration: 'none' }}
            >
              <motion.div
                style={{
                  width: `${w}px`,
                  transform: `rotate(${rot}deg) translateY(${yOff}px)`,
                }}
                whileHover={{ scale: 1.08, rotate: 0, y: 0 }}
                transition={{ type: 'spring', stiffness: 280, damping: 26 }}
              >
                <div style={{ overflow: 'hidden' }}>
                  <img
                    src={project.cover_image!}
                    alt={project.title}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                    draggable={false}
                  />
                </div>
                <div style={{ marginTop: '8px', paddingLeft: '2px' }}>
                  <p
                    style={{
                      fontFamily: '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
                      fontWeight: 700,
                      fontSize: '11px',
                      letterSpacing: '-0.01em',
                      color: '#191917',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: `${w}px`,
                    }}
                  >
                    {project.title}
                  </p>
                  {isExternal && (
                    <span
                      style={{
                        fontSize: '10px',
                        color: 'var(--negroni)',
                        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                        letterSpacing: '0.06em',
                        fontWeight: 500,
                      }}
                    >
                      ↗ ansehen
                    </span>
                  )}
                </div>
              </motion.div>
            </a>
          )
        })}
      </div>
    </motion.div>
  )
}

export default function HeroSection({ projects }: { projects: HeroProject[] }) {
  const { scrollY } = useScroll()
  const nameY       = useTransform(scrollY, [0, 500], [0, -60])
  const nameOpacity = useTransform(scrollY, [0, 380], [1, 0])

  return (
    <section
      className="relative flex flex-col justify-between overflow-hidden"
      style={{ minHeight: '100svh', paddingTop: '72px' }}
    >
      {/* Top: playful badge + carousel */}
      <div>
        <motion.div
          className="px-8 md:px-14 lg:px-20 pt-8 pb-5"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <motion.span
            initial={{ rotate: -5 }}
            animate={{ rotate: -2.5 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ display: 'inline-block' }}
          >
            <span
              style={{
                fontFamily: '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(13px, 1.4vw, 18px)',
                color: 'var(--negroni)',
                border: '2px solid var(--negroni)',
                padding: '5px 14px',
                display: 'inline-block',
                letterSpacing: '-0.01em',
              }}
            >
              Das ist Davids Portfolio
            </span>
          </motion.span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <HeroCarousel projects={projects} />
        </motion.div>
      </div>

      {/* Bottom: massive name */}
      <motion.div
        style={{ y: nameY, opacity: nameOpacity }}
        className="px-8 md:px-14 lg:px-20 pb-10 md:pb-16"
      >
        <DraggableLetters />

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
