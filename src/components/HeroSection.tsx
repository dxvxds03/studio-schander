'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FlowerIcon from './FlowerIcon'
import ClientBadge from './ClientBadge'
import Arrow from './Arrow'

interface HeroProject {
  slug: string
  id: number
  title: string
  cover_image: string | null
  link: string | null
  tags: string[]
  show_in_carousel?: boolean
  project_type?: 'client' | 'schander' | 'personal' | null
  client?: string | null
}

const CIRCLE_TEXT = 'WEITERE PROJEKTE · WEITERE PROJEKTE · WEITERE PROJEKTE · '

function CircularTextButton() {
  const R = 82
  const pathD = `M 100,100 m -${R},0 a ${R},${R} 0 1,1 ${R * 2},0 a ${R},${R} 0 1,1 -${R * 2},0`

  return (
    <a
      href="/projekte"
      data-hover
      data-end=""
      className="hero-carousel-card"
      style={{ flexShrink: 0, display: 'block', textDecoration: 'none', transformOrigin: 'center center', pointerEvents: 'auto' }}
    >
      <div className="hero-end-btn" style={{ width: '180px', height: '180px', position: 'relative' }}>
        <motion.svg
          viewBox="0 0 200 200"
          style={{ width: '180px', height: '180px', position: 'absolute', inset: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
        >
          <defs>
            <path id="circleTextPath" d={pathD} />
          </defs>
          <text
            style={{
              fontSize: '10.5px',
              fontFamily: '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: 800,
              letterSpacing: '0.13em',
              fill: 'var(--ink)',
              textTransform: 'uppercase',
            } as React.CSSProperties}
          >
            <textPath href="#circleTextPath" startOffset="0%">
              {CIRCLE_TEXT}
            </textPath>
          </text>
        </motion.svg>

        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '110px',
          height: '110px',
          borderRadius: '50%',
          border: '1.5px solid var(--ink)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--cream)',
        }}>
          <FlowerIcon color="var(--negroni)" size={60} />
        </div>
      </div>
    </a>
  )
}

const GAP = 36
const CARD_ROTS = [-4.0, 2.5, -1.8, 3.5, -3.0, 2.0, -2.5, 3.2]
const CYCLING_WORDS = ['Freelance.', 'Schander.', 'Kreativ.', 'Studio.', 'Ideen.', 'Design.']

function CyclingWord() {
  const [idx, setIdx] = useState(0)
  const measureRef = useRef<HTMLSpanElement>(null)
  const motionW = useMotionValue(0)
  const springW = useSpring(motionW, { stiffness: 260, damping: 34 })

  useEffect(() => {
    const t = setInterval(() => setIdx(c => (c + 1) % CYCLING_WORDS.length), 4400)
    return () => clearInterval(t)
  }, [])

  useLayoutEffect(() => {
    if (measureRef.current) motionW.set(measureRef.current.offsetWidth)
  }, [idx, motionW])

  return (
    <motion.span
      style={{
        display: 'inline-block',
        overflow: 'hidden',
        verticalAlign: 'bottom',
        lineHeight: 'inherit',
        width: springW,
      }}
    >
      <span
        ref={measureRef}
        aria-hidden
        style={{
          position: 'absolute',
          visibility: 'hidden',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          fontFamily: 'inherit',
          fontWeight: 'inherit',
          fontSize: 'inherit',
          letterSpacing: 'inherit',
          lineHeight: 'inherit',
        }}
      >
        {CYCLING_WORDS[idx]}
      </span>

      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={idx}
          style={{
            display: 'block',
            lineHeight: 'inherit',
            whiteSpace: 'nowrap',
            color: 'var(--ink)',
          }}
          initial={{ y: '105%' }}
          animate={{ y: 0 }}
          exit={{ y: '-105%' }}
          transition={{ duration: 0.48, ease: [0.76, 0, 0.24, 1] }}
        >
          {CYCLING_WORDS[idx]}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  )
}

function SchaderSvgLogo() {
  return null
}

export default function HeroSection({ projects }: { projects: HeroProject[] }) {
  const items = projects.filter(p => p.cover_image && p.show_in_carousel !== false)

  return (
    <section>
      <div
        className="hero-namepill-wrapper"
        style={{
          position: 'absolute',
          top: 'clamp(16px, 7vh, 64px)',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      >
        {items.map((project) => (
          <span
            key={project.id}
            className="hero-proj-name"
            style={{
              position: 'absolute',
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              fontFamily: '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(12px, 1.3vw, 16px)',
              letterSpacing: '0.01em',
              lineHeight: 1,
              color: 'var(--ink)',
              whiteSpace: 'nowrap',
              userSelect: 'none',
              transition: 'opacity 0.3s ease',
            }}
          >
            <ClientBadge
              projectType={project.project_type ?? null}
              client={project.client ?? null}
              variant="dark"
              size="sm"
            />
            <span>
              {project.title}
              {project.link && (
                <span style={{ color: 'var(--negroni)', marginLeft: '8px' }}>↗</span>
              )}
            </span>
          </span>
        ))}
      </div>
    </section>
  )
}
