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

// Rotation while stacked behind (gives depth/organic feel)
const PILE_ROTS  = [5.5, -6.5, 4.0, -5.0, 6.5]
// Rotation when card is the front card
const FRONT_ROTS = [-1.5, 2.0, -0.8, 1.8, -2.0]
// Exit rotation direction
const EXIT_ROTS  = [-14, 13, -11, 15, -12]

function SchanderTicker() {
  const text = 'SCHANDER — '
  const chunk = text.repeat(7)
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
        width: '54px',
        height: '54px',
        borderRadius: '50%',
        border: '2px solid #191917',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        padding: 0,
        color: '#191917',
      }}
      whileHover={{ background: '#191917', color: '#F4F2ED', scale: 1.06 }}
      animate={{ y: [0, 5, 0] }}
      transition={{
        y: { repeat: Infinity, duration: 2.4, ease: 'easeInOut' },
      }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M9 3v12M3 10l6 6 6-6"
          stroke="currentColor"
          strokeWidth="2"
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
      const cards = gsap.utils.toArray<HTMLElement>('.hero-card', section)
      const total = cards.length

      // Set initial stacked state
      cards.forEach((card, i) => {
        const blur = i * 6
        if (i === 0) {
          gsap.set(card, {
            rotate: FRONT_ROTS[0],
            filter: 'blur(0px)',
            scale: 1,
            y: 0,
            zIndex: total,
          })
        } else {
          gsap.set(card, {
            scale: 1 - i * 0.05,
            y: i * 18,
            rotate: PILE_ROTS[i % PILE_ROTS.length],
            filter: `blur(${blur}px)`,
            zIndex: total - i,
          })
        }
        // Meta: only front card shows it initially
        const meta = card.querySelector<HTMLElement>('.hero-card-meta')
        if (meta) {
          gsap.set(meta, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 18 })
        }
      })

      // Per-card scroll animations
      cards.forEach((card, i) => {
        const seg = 1 / total

        // EXIT: card i flies out
        if (i < total - 1) {
          gsap.to(card, {
            yPercent: -130,
            opacity: 0,
            rotate: EXIT_ROTS[i % EXIT_ROTS.length],
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: section,
              start: `${i * seg * 100}% top`,
              end: `${(i + 0.65) * seg * 100}% top`,
              scrub: true,
            },
          })
          // Meta fades out
          const meta = card.querySelector<HTMLElement>('.hero-card-meta')
          if (meta) {
            gsap.to(meta, {
              opacity: 0,
              y: -10,
              scrollTrigger: {
                trigger: section,
                start: `${i * seg * 100}% top`,
                end: `${(i + 0.3) * seg * 100}% top`,
                scrub: true,
              },
            })
          }
        }

        // ENTRY: card i comes to front
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
              end: `${i * seg * 100}% top`,
              scrub: true,
            },
          })
          // Meta fades in
          const meta = card.querySelector<HTMLElement>('.hero-card-meta')
          if (meta) {
            gsap.to(meta, {
              opacity: 1,
              y: 0,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: `${(i - 0.45) * seg * 100}% top`,
                end: `${i * seg * 100}% top`,
                scrub: true,
              },
            })
          }
        }
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
          borderBottom: '2px solid #191917',
        }}
      >
        {/* SCHANDER ticker background */}
        <SchanderTicker />

        {/* Card stack — centered in remaining height */}
        <div
          style={{
            flex: 1,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '56px', // clear nav
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
                style={{
                  position: 'absolute',
                  width: 'clamp(200px, 26vw, 360px)',
                  transformOrigin: 'center bottom',
                }}
              >
                <a
                  href={href}
                  target={isExternal ? '_blank' : '_self'}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  data-hover
                  style={{ display: 'block', textDecoration: 'none' }}
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
                </a>

                {/* Meta — only visible when this card is front */}
                <div
                  className="hero-card-meta"
                  style={{
                    marginTop: '12px',
                    paddingTop: '10px',
                    borderTop: '1px solid rgba(25,25,23,0.18)',
                  }}
                >
                  <a
                    href={href}
                    target={isExternal ? '_blank' : '_self'}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    data-hover
                    style={{ textDecoration: 'none' }}
                  >
                    <p
                      style={{
                        fontFamily:
                          '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
                        fontWeight: 800,
                        fontSize: 'clamp(16px, 2vw, 26px)',
                        letterSpacing: '-0.025em',
                        lineHeight: 1.05,
                        color: '#191917',
                        marginBottom: '5px',
                      }}
                    >
                      {project.title}
                      {isExternal && (
                        <span
                          style={{
                            color: 'var(--negroni)',
                            marginLeft: '6px',
                            fontSize: '0.75em',
                          }}
                        >
                          ↗
                        </span>
                      )}
                    </p>
                  </a>
                  {project.tags && project.tags.length > 0 && (
                    <span
                      style={{
                        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                        fontSize: '10px',
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: '#787672',
                      }}
                    >
                      {project.tags.slice(0, 2).join(' / ')}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom bar — always visible */}
        <motion.div
          style={{
            borderTop: '2px solid #191917',
            padding: 'clamp(16px, 2vw, 26px) clamp(16px, 2vw, 24px)',
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
              fontSize: 'clamp(28px, 5vw, 72px)',
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
