'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface HeroProject {
  id: number
  title: string
  cover_image: string | null
  link: string | null
  tags: string[]
}

const PILE_ROTS  = [5.5, -6.5, 4.0, -5.0, 6.5]
const FRONT_ROTS = [-1.5, 2.0, -0.8, 1.8, -2.0]
const EXIT_ROTS  = [-14, 13, -11, 15, -12]

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
              fontFamily: '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
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
        width: '68px',
        height: '68px',
        borderRadius: '50%',
        border: '2px solid #0000CC',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        padding: 0,
        color: '#0000CC',
      }}
      whileHover={{ background: '#0000CC', color: '#F4F2ED', scale: 1.06 }}
      animate={{ y: [0, 6, 0] }}
      transition={{ y: { repeat: Infinity, duration: 2.4, ease: 'easeInOut' } }}
    >
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M11 3v16M4 12l7 7 7-7"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  )
}

export default function HeroSection({ projects }: { projects: HeroProject[] }) {
  const sectionRef = useRef<HTMLElement>(null)
  const items = projects.filter(p => p.cover_image)
  const n = items.length

  useEffect(() => {
    if (!sectionRef.current || n === 0) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const section = sectionRef.current!
      const cards   = gsap.utils.toArray<HTMLElement>('.hero-card', section)
      const names   = gsap.utils.toArray<HTMLElement>('.hero-proj-name', section)
      const total   = cards.length
      const seg     = 1 / total

      // ── Initial stacked state ──────────────────────────────────────
      cards.forEach((card, i) => {
        if (i === 0) {
          gsap.set(card, { rotate: FRONT_ROTS[0], filter: 'blur(0px)', scale: 1, y: 0, zIndex: total })
        } else {
          gsap.set(card, {
            scale: 1 - i * 0.05,
            y: i * 18,
            rotate: PILE_ROTS[i % PILE_ROTS.length],
            filter: `blur(${i * 6}px)`,
            zIndex: total - i,
          })
        }
      })
      names.forEach((name, i) => gsap.set(name, { opacity: i === 0 ? 1 : 0 }))

      // ── Per-card animations ────────────────────────────────────────
      cards.forEach((card, i) => {
        // EXIT
        if (i < total - 1) {
          gsap.to(card, {
            yPercent: -130,
            opacity: 0,
            rotate: EXIT_ROTS[i % EXIT_ROTS.length],
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: section,
              start: `${i * seg * 100}% top`,
              end:   `${(i + 0.65) * seg * 100}% top`,
              scrub: true,
            },
          })
          gsap.to(names[i], {
            opacity: 0,
            scrollTrigger: {
              trigger: section,
              start: `${i * seg * 100}% top`,
              end:   `${(i + 0.28) * seg * 100}% top`,
              scrub: true,
            },
          })
        }

        // ENTRY
        if (i > 0) {
          gsap.to(card, {
            scale: 1,
            y: 0,
            rotate: FRONT_ROTS[i % FRONT_ROTS.length],
            filter: 'blur(0px)',
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: section,
              start: `${(i - 1) * seg * 100}% top`,
              end:   `${i * seg * 100}% top`,
              scrub: true,
            },
          })
          gsap.to(names[i], {
            opacity: 1,
            scrollTrigger: {
              trigger: section,
              start: `${(i - 0.38) * seg * 100}% top`,
              end:   `${i * seg * 100}% top`,
              scrub: true,
            },
          })
        }
      })

      // ── Snap: always land on a complete card ──────────────────────
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        snap: {
          snapTo: Array.from({ length: total }, (_, i) => i / total),
          duration: { min: 0.3, max: 0.7 },
          ease: 'power2.inOut',
          delay: 0.05,
        },
      })

      ScrollTrigger.refresh()
    }, sectionRef)

    return () => ctx.revert()
  }, [n])

  if (n === 0) return null

  return (
    <section
      ref={sectionRef}
      style={{ height: `calc(${n + 1} * 100vh)`, position: 'relative' }}
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

        {/* Card stack area */}
        <div
          style={{
            flex: 1,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '56px',
            zIndex: 1,
          }}
        >
          {items.map((project, i) => {
            const href = project.link ?? `/projects/${project.id}`
            const isExternal = !!project.link
            return (
              <div
                key={project.id}
                className="hero-card"
                style={{ position: 'absolute', transformOrigin: 'center bottom' }}
              >
                <a
                  href={href}
                  target={isExternal ? '_blank' : '_self'}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  data-hover
                  style={{ display: 'block', textDecoration: 'none' }}
                >
                  <div
                    style={{
                      height: 'clamp(240px, 34vh, 420px)',
                      overflow: 'hidden',
                      outline: '2px solid #191917',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <img
                      src={project.cover_image!}
                      alt={project.title}
                      draggable={false}
                      style={{ height: '100%', width: 'auto', display: 'block', flexShrink: 0 }}
                    />
                  </div>
                </a>
              </div>
            )
          })}
        </div>

        {/* Project name row — switches with scroll */}
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
          {items.map((project, i) => (
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
            borderTop: '2px solid #191917',
            padding: 'clamp(18px, 2.2vw, 30px) clamp(16px, 2vw, 24px)',
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
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <h1
            style={{
              fontFamily:
                '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(36px, 6.5vw, 96px)',
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
      </div>
    </section>
  )
}
