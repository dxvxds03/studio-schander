'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface HeroProject {
  id: number
  title: string
  cover_image: string | null
  link: string | null
  tags: string[]
}

const CARD_W = 260
const GAP    = 28
const STRIDE = CARD_W + GAP

const CYCLING_WORDS = ['Schander.', 'David.', 'Studio.', 'Ideen.']

function CyclingWord() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx(c => (c + 1) % CYCLING_WORDS.length), 2200)
    return () => clearInterval(t)
  }, [])

  return (
    <span
      style={{
        display: 'inline-block',
        overflow: 'hidden',
        verticalAlign: 'bottom',
        lineHeight: 'inherit',
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={idx}
          style={{ display: 'block', color: '#0000CC', lineHeight: 'inherit' }}
          initial={{ y: '105%' }}
          animate={{ y: 0 }}
          exit={{ y: '-105%' }}
          transition={{ duration: 0.48, ease: [0.76, 0, 0.24, 1] }}
        >
          {CYCLING_WORDS[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function SchanderTicker() {
  const chunk = 'SCHANDER — '.repeat(7)
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
          animation: 'schanderTicker 20s linear infinite',
          willChange: 'transform',
        }}
      >
        {[chunk, chunk].map((t, i) => (
          <span
            key={i}
            style={{
              fontFamily:
                '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(110px, 16vw, 200px)',
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
              color: 'transparent',
              WebkitTextStroke: '1.5px #D8D5CF',
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
        width: '90px',
        height: '90px',
        borderRadius: '50%',
        border: '2.5px solid #0000CC',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        padding: 0,
        color: '#0000CC',
      }}
      whileHover={{ background: '#0000CC', color: '#F4F2ED', scale: 1.06 }}
      animate={{ y: [0, 7, 0] }}
      transition={{ y: { repeat: Infinity, duration: 2.4, ease: 'easeInOut' } }}
    >
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <path
          d="M15 4v22M5 17l10 9 10-9"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  )
}

export default function HeroSection({ projects }: { projects: HeroProject[] }) {
  const sectionRef  = useRef<HTMLElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const items = projects.filter(p => p.cover_image)
  const n = items.length

  useEffect(() => {
    if (!sectionRef.current || !carouselRef.current || n === 0) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const section  = sectionRef.current!
      const carousel = carouselRef.current!
      const cards    = gsap.utils.toArray<HTMLElement>('.hero-carousel-card', section)
      const names    = gsap.utils.toArray<HTMLElement>('.hero-proj-name', section)
      const total    = cards.length

      // Apply glow + scale + name opacity based on fractional center index
      const applyGlow = (rawIdx: number) => {
        cards.forEach((card, i) => {
          const dist = Math.abs(rawIdx - i)
          const t    = Math.max(0, 1 - dist)
          gsap.set(card, {
            scale: 0.88 + 0.12 * t,
            boxShadow:
              t > 0.05
                ? `0 0 ${Math.round(t * 90)}px rgba(232,88,26,${(t * 0.58).toFixed(2)}), 0 0 ${Math.round(t * 45)}px rgba(232,88,26,${(t * 0.32).toFixed(2)})`
                : 'none',
          })
        })
        names.forEach((name, i) => {
          const dist = Math.abs(rawIdx - i)
          name.style.opacity = String(Math.max(0, 1 - dist * 2.5).toFixed(3))
        })
      }

      // Initial state — card 0 in center with glow
      applyGlow(0)

      if (total <= 1) return

      const totalMove = (total - 1) * STRIDE

      gsap.fromTo(
        carousel,
        { x: 0 },
        {
          x: -totalMove,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            snap: {
              snapTo: 1 / (total - 1),
              duration: { min: 0.3, max: 0.7 },
              ease: 'power2.inOut',
              delay: 0.05,
            },
            onUpdate(self) {
              applyGlow(self.progress * (total - 1))
            },
          },
        }
      )

      ScrollTrigger.refresh()
    }, sectionRef)

    return () => ctx.revert()
  }, [n])

  if (n === 0) return null

  return (
    <section
      ref={sectionRef}
      style={{ height: `calc(${n} * 100vh)`, position: 'relative' }}
    >
      {/* Sticky viewport */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* SCHANDER ticker */}
        <SchanderTicker />

        {/* Carousel area — images on top of ticker */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            paddingTop: '56px',
            overflow: 'hidden',
            position: 'relative',
            zIndex: 1,
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            maskImage:
              'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          }}
        >
          <div
            ref={carouselRef}
            style={{
              display: 'flex',
              gap: `${GAP}px`,
              flexShrink: 0,
              // First card centered: offset = 50vw - half card width
              paddingLeft: `calc(50vw - ${CARD_W / 2}px)`,
              paddingRight: `calc(50vw - ${CARD_W / 2}px)`,
            }}
          >
            {items.map((project) => {
              const href       = project.link ?? `/projects/${project.id}`
              const isExternal = !!project.link

              return (
                <a
                  key={project.id}
                  href={href}
                  target={isExternal ? '_blank' : '_self'}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  data-hover
                  className="hero-carousel-card"
                  style={{
                    flexShrink: 0,
                    width: `${CARD_W}px`,
                    display: 'block',
                    textDecoration: 'none',
                    transformOrigin: 'center center',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: 'clamp(210px, 30vh, 380px)',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={project.cover_image!}
                      alt={project.title}
                      draggable={false}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  </div>
                </a>
              )
            })}
          </div>
        </div>

        {/* Active project name */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            height: 'clamp(52px, 7vh, 88px)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 clamp(16px, 2vw, 24px)',
            overflow: 'hidden',
          }}
        >
          {items.map((project) => (
            <span
              key={project.id}
              className="hero-proj-name"
              style={{
                position: 'absolute',
                left: 'clamp(16px, 2vw, 24px)',
                right: 'clamp(16px, 2vw, 24px)',
                fontFamily:
                  '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(22px, 3.5vw, 52px)',
                letterSpacing: '-0.04em',
                lineHeight: 1,
                color: '#0000CC',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              {project.title}
              {project.link && (
                <span style={{ color: 'var(--negroni)', marginLeft: '10px', fontSize: '0.65em' }}>
                  ↗
                </span>
              )}
            </span>
          ))}
        </div>

        {/* Bottom bar */}
        <motion.div
          style={{
            padding: 'clamp(14px, 1.8vw, 26px) clamp(16px, 2vw, 24px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            background: 'var(--cream)',
            position: 'relative',
            zIndex: 10,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <h1
            style={{
              fontFamily:
                '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(48px, 8.5vw, 130px)',
              letterSpacing: '-0.045em',
              lineHeight: 1,
              margin: 0,
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.18em',
              overflow: 'hidden',
            }}
          >
            <CyclingWord />
            <span style={{ color: 'var(--negroni)' }}>Portfolio.</span>
          </h1>
          <CircleScrollButton />
        </motion.div>
      </div>
    </section>
  )
}
