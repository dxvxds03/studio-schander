'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FlowerIcon from './FlowerIcon'

interface HeroProject {
  id: number
  title: string
  cover_image: string | null
  link: string | null
  tags: string[]
  show_in_carousel?: boolean
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
      style={{ flexShrink: 0, display: 'block', textDecoration: 'none', transformOrigin: 'center center' }}
    >
      <div style={{ width: '180px', height: '180px', position: 'relative' }}>
        {/* Rotating text ring */}
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

        {/* Static flower in center */}
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

// Organic tilts per card position
const CARD_ROTS = [-4.0, 2.5, -1.8, 3.5, -3.0, 2.0, -2.5, 3.2]

const CYCLING_WORDS = ['Marken.', 'Schander.', 'David.', 'Studio.', 'Ideen.']

function CyclingWord() {
  const [idx, setIdx] = useState(0)
  const measureRef = useRef<HTMLSpanElement>(null)
  const motionW    = useMotionValue(0)
  // Spring drives the container width → "Portfolio." floats smoothly
  const springW    = useSpring(motionW, { stiffness: 260, damping: 34 })

  useEffect(() => {
    const t = setInterval(() => setIdx(c => (c + 1) % CYCLING_WORDS.length), 4400)
    return () => clearInterval(t)
  }, [])

  // Measure the invisible span synchronously after every word change
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
      {/* Hidden clone — measures the current word's natural pixel width */}
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
            background: 'linear-gradient(to right, var(--ink) 50%, var(--cream) 50%)',
            backgroundAttachment: 'fixed',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
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

function SchanderTicker() {
  const chunk = 'SCHANDER — '.repeat(7)
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'schanderTicker 20s linear infinite', willChange: 'transform' }}>
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
        width: '90px',
        height: '90px',
        borderRadius: '50%',
        border: '2.5px solid var(--cream)',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        padding: 0,
        color: 'var(--cream)',
      }}
      whileHover={{ background: 'var(--cream)', color: '#0000CC', scale: 1.06 }}
      animate={{ y: [0, 7, 0] }}
      transition={{ y: { repeat: Infinity, duration: 2.4, ease: 'easeInOut' } }}
    >
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <path d="M15 4v22M5 17l10 9 10-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.button>
  )
}

export default function HeroSection({ projects }: { projects: HeroProject[] }) {
  const sectionRef   = useRef<HTMLElement>(null)
  const carouselRef  = useRef<HTMLDivElement>(null)
  const portfolioRef = useRef<HTMLSpanElement>(null)
  const items = projects.filter(p => p.cover_image && p.show_in_carousel !== false)
  const n = items.length

  useEffect(() => {
    if (!sectionRef.current || !carouselRef.current || n === 0) return

    gsap.registerPlugin(ScrollTrigger)
    let ctx: gsap.Context | null = null

    document.body.classList.add('negroni-hero-active')

    const setup = () => {
      ctx?.revert()
      if (!sectionRef.current || !carouselRef.current) return

      ctx = gsap.context(() => {
        const section  = sectionRef.current!
        const carousel = carouselRef.current!
        const cards    = gsap.utils.toArray<HTMLElement>('.hero-carousel-card', section)
        const names    = gsap.utils.toArray<HTMLElement>('.hero-proj-name', section)
        const total    = cards.length
        const viewW    = window.innerWidth

        // ── Dynamic padding: center the first card ─────────────────
        const firstW = cards[0].offsetWidth
        const lastW  = cards[total - 1].offsetWidth
        carousel.style.paddingLeft  = `${Math.max(0, viewW / 2 - firstW / 2)}px`
        carousel.style.paddingRight = `${Math.max(0, viewW / 2 - lastW / 2)}px`

        // Force layout so offsetLeft reflects padding
        void carousel.getBoundingClientRect()

        // ── Measure translateX needed to center each card ──────────
        const cardCenters = cards.map(c => c.offsetLeft + c.offsetWidth / 2)
        // At x=0, first card is centered (cardCenters[0] = viewW/2)
        // translateX[i] = amount to shift so card i center = viewW/2
        const txPerCard  = cardCenters.map(cx => viewW / 2 - cx)
        // txPerCard[0] ≈ 0, txPerCard[last] is negative (move left)

        const totalMove  = Math.abs(txPerCard[total - 1])
        // Snap fractions: 0 … 1 mapped to each card
        const snapFracs  = txPerCard.map(dx => Math.abs(dx) / (totalMove || 1))

        // ── Glow + rotation + name opacity ─────────────────────────
        const applyGlow = (rawIdx: number) => {
          cards.forEach((card, i) => {
            const dist = Math.abs(rawIdx - i)
            const t    = Math.max(0, 1 - dist)

            // Circular end-button: scale only, no glow, no rotation
            if (card.dataset.end !== undefined) {
              gsap.set(card, { scale: 0.88 + 0.12 * t })
              return
            }

            const baseRot = CARD_ROTS[i % CARD_ROTS.length]
            gsap.set(card, {
              scale: 0.86 + 0.14 * t,
              rotate: baseRot * (1 - t * 0.75),
              boxShadow: t > 0.04
                ? `0 0 ${Math.round(t * 90)}px rgba(232,88,26,${(t * 0.58).toFixed(2)}), 0 0 ${Math.round(t * 45)}px rgba(232,88,26,${(t * 0.32).toFixed(2)})`
                : 'none',
            })
          })
          names.forEach((name, i) => {
            const dist = Math.abs(rawIdx - i)
            name.style.opacity = Math.max(0, 1 - dist * 2.5).toFixed(3)
          })
        }

        applyGlow(0) // initial state

        const negroniEl = section.querySelector<HTMLElement>('.hero-negroni-half')

        if (total <= 1) return

        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.7,
          snap: {
            snapTo: snapFracs,
            duration: { min: 0.18, max: 0.45 },
            ease: 'power3.inOut',
            delay: 0.06,
          },
          onUpdate(self) {
            const rawIdx = self.progress * (total - 1)
            // Interpolate carousel translateX between measured positions
            const i0 = Math.min(Math.floor(rawIdx), total - 2)
            const i1 = i0 + 1
            const frac = rawIdx - i0
            const tx = txPerCard[i0] + frac * (txPerCard[i1] - txPerCard[i0])
            gsap.set(carousel, { x: tx })
            applyGlow(rawIdx)

            // Negroni half: slides out to the right in the last 30% of scroll
            const exitFrac = negroniEl
              ? Math.max(0, Math.min(1, (self.progress - 0.7) / 0.3))
              : 0
            if (negroniEl) gsap.set(negroniEl, { xPercent: exitFrac * 100 })

            // Portfolio. → plain ink once negroni starts leaving
            const pEl = portfolioRef.current
            if (pEl) {
              if (exitFrac > 0) {
                pEl.style.background = 'none'
                pEl.style.backgroundAttachment = 'auto'
                pEl.style.setProperty('-webkit-background-clip', 'unset')
                pEl.style.backgroundClip = 'unset'
                pEl.style.setProperty('-webkit-text-fill-color', 'var(--ink)')
              } else {
                pEl.style.background = 'linear-gradient(to right, var(--negroni) 50%, var(--cream) 50%)'
                pEl.style.backgroundAttachment = 'fixed'
                pEl.style.setProperty('-webkit-background-clip', 'text')
                pEl.style.backgroundClip = 'text'
                pEl.style.setProperty('-webkit-text-fill-color', 'transparent')
              }
            }

            // Nav CTA: cream while negroni visible, negroni when gone
            if (exitFrac >= 1) {
              document.body.classList.remove('negroni-hero-active')
            } else {
              document.body.classList.add('negroni-hero-active')
            }
          },
        })

        ScrollTrigger.refresh()
      }, sectionRef)
    }

    // Wait for all images to load before measuring
    const imgs = Array.from(carouselRef.current.querySelectorAll<HTMLImageElement>('img'))
    Promise.all(
      imgs.map(img =>
        img.complete
          ? Promise.resolve()
          : new Promise<void>(res => { img.onload = () => res(); img.onerror = () => res() })
      )
    ).then(setup)

    return () => {
      ctx?.revert()
      document.body.classList.remove('negroni-hero-active')
    }
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
          paddingTop: '61px', // space for fixed nav
        }}
      >
        <SchanderTicker />

        {/* Negroni right half — full viewport height, behind everything */}
        <div
          className="hero-negroni-half"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '50%',
            background: 'var(--negroni)',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        {/* Carousel area — title pill sits inside as absolute overlay */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            position: 'relative',
            zIndex: 1,
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          }}
        >
          {/* Active project name pill — directly above carousel */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
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
                  fontFamily: '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(12px, 1.3vw, 16px)',
                  letterSpacing: '0.01em',
                  lineHeight: 1,
                  color: 'var(--cream)',
                  background: 'var(--ink)',
                  borderRadius: '100px',
                  padding: '7px 18px',
                  whiteSpace: 'nowrap',
                  userSelect: 'none',
                  transition: 'opacity 0.3s ease',
                }}
              >
                {project.title}
                {project.link && (
                  <span style={{ color: 'var(--negroni)', marginLeft: '8px' }}>↗</span>
                )}
              </span>
            ))}
          </div>
          <div
            ref={carouselRef}
            style={{
              display: 'flex',
              gap: `${GAP}px`,
              flexShrink: 0,
              alignItems: 'center',
              // paddingLeft/Right set dynamically in JS after image load
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
                    display: 'block',
                    textDecoration: 'none',
                    transformOrigin: 'center center',
                  }}
                >
                  <img
                    src={project.cover_image!}
                    alt={project.title}
                    draggable={false}
                    style={{
                      height: 'clamp(240px, 34vh, 432px)',
                      width: 'auto',
                      display: 'block',
                      maxWidth: '480px',
                    }}
                  />
                </a>
              )
            })}
            <CircularTextButton />
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          style={{
            padding: 'clamp(14px, 1.8vw, 26px) clamp(20px, 2.5vw, 32px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            background: 'transparent',
            position: 'relative',
            zIndex: 10,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <h1
            style={{
              fontFamily: '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(48px, 8.5vw, 130px)',
              letterSpacing: '-0.045em',
              lineHeight: 1,
              margin: 0,
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.18em',
            }}
          >
            <CyclingWord />
            <span ref={portfolioRef} style={{
              whiteSpace: 'nowrap',
              background: 'linear-gradient(to right, var(--negroni) 50%, var(--cream) 50%)',
              backgroundAttachment: 'fixed',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Portfolio.</span>
          </h1>
          <CircleScrollButton />
        </motion.div>
      </div>
    </section>
  )
}
