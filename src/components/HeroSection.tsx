'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState } from 'react'

interface HeroProject {
  id: number
  title: string
  cover_image: string | null
  link: string | null
}

// Organic scatter config for image pile — fixed, intentional
const PILE = [
  { x: -260, y:  48, rot: -6.5, z: 1, w: 200 },
  { x: -100, y: -30, rot:  3.5, z: 3, w: 220 },
  { x:   20, y:  12, rot: -1.5, z: 5, w: 240 }, // front / center
  { x:  170, y: -44, rot:  7.0, z: 4, w: 195 },
  { x:  300, y:  36, rot: -4.5, z: 2, w: 210 },
]

function ImagePile({ projects }: { projects: HeroProject[] }) {
  const items = projects.filter(p => p.cover_image).slice(0, 5)
  if (items.length === 0) return null

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(300px, 40vw, 520px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {items.map((project, i) => {
        const cfg = PILE[i % PILE.length]
        const href = project.link ?? `/projects/${project.id}`
        const isExternal = !!project.link

        return (
          <motion.a
            key={project.id}
            href={href}
            target={isExternal ? '_blank' : '_self'}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            data-hover
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              marginLeft: cfg.x,
              marginTop: cfg.y - cfg.w * 0.65,
              width: cfg.w,
              zIndex: cfg.z,
              textDecoration: 'none',
              transformOrigin: 'center center',
              rotate: `${cfg.rot}deg`,
            }}
            whileHover={{
              zIndex: 20,
              scale: 1.07,
              rotate: 0,
              boxShadow: '0 0 0 3px #E8581A, 0 8px 40px rgba(232,88,26,0.45)',
              transition: { type: 'spring', stiffness: 300, damping: 24 },
            }}
          >
            <img
              src={project.cover_image!}
              alt={project.title}
              draggable={false}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                outline: '2px solid #191917',
              }}
            />
            <p
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontSize: '9px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#787672',
                marginTop: '6px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {project.title}
            </p>
          </motion.a>
        )
      })}
    </div>
  )
}

function SchanderTicker() {
  const text = 'SCHANDER — '
  const repeated = text.repeat(8)

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <div
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          animation: 'schanderTicker 18s linear infinite',
          willChange: 'transform',
        }}
      >
        {[repeated, repeated].map((t, i) => (
          <span
            key={i}
            style={{
              fontFamily: '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(120px, 18vw, 220px)',
              letterSpacing: '-0.04em',
              lineHeight: 0.85,
              color: 'transparent',
              WebkitTextStroke: '2px #D8D5CF',
              userSelect: 'none',
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

function CircleScrollButton() {
  const scrollDown = () =>
    document.getElementById('leistungen')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <motion.button
      onClick={scrollDown}
      data-hover
      style={{
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        border: '2px solid #191917',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        padding: 0,
      }}
      whileHover={{
        background: '#191917',
        scale: 1.08,
      }}
      animate={{ y: [0, 5, 0] }}
      transition={{
        y: { repeat: Infinity, duration: 2.4, ease: 'easeInOut' },
        background: { duration: 0.15 },
        scale: { duration: 0.15 },
      }}
    >
      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        style={{ display: 'block' }}
        whileHover={{ color: '#F4F2ED' }}
      >
        <motion.path
          d="M10 3v14M4 11l6 6 6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: '#191917' }}
        />
      </motion.svg>
    </motion.button>
  )
}

export default function HeroSection({ projects }: { projects: HeroProject[] }) {
  const { scrollY } = useScroll()
  const tickerY = useTransform(scrollY, [0, 600], [0, 120])

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100svh',
        paddingTop: '56px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        borderBottom: '2px solid #191917',
      }}
    >
      {/* SCHANDER ticker background */}
      <motion.div style={{ y: tickerY, flex: 1, position: 'relative' }}>
        <SchanderTicker />

        {/* Image pile */}
        <motion.div
          style={{ position: 'relative', zIndex: 1, flex: 1 }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <ImagePile projects={projects} />
        </motion.div>
      </motion.div>

      {/* Bottom bar — headline + button */}
      <motion.div
        style={{
          borderTop: '2px solid #191917',
          padding: 'clamp(20px, 2.5vw, 32px) clamp(16px, 2vw, 24px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          background: 'var(--cream)',
          position: 'relative',
          zIndex: 2,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.7 }}
      >
        <h1
          style={{
            fontFamily: '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(32px, 5.5vw, 80px)',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            color: '#191917',
            margin: 0,
          }}
        >
          Das ist Davids{' '}
          <span style={{ color: 'var(--negroni)' }}>Portfolio.</span>
        </h1>

        <CircleScrollButton />
      </motion.div>
    </section>
  )
}
