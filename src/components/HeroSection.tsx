'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface HeroProject {
  id: number
  title: string
  cover_image: string | null
  link: string | null
  tags: string[]
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
          style={{ display: 'block', color: '#0000CC', lineHeight: 'inherit', whiteSpace: 'nowrap' }}
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
              WebkitTextStroke: '1.5px #2A2927',
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
        <path d="M15 4v22M5 17l10 9 10-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
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
    let ctx: gsap.Context | null = null

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
            const dist    = Math.abs(rawIdx - i)
            const t       = Math.max(0, 1 - dist)
            const baseRot = CARD_ROTS[i % CARD_ROTS.length]
            gsap.set(card, {
              scale: 0.86 + 0.14 * t,
              rotate: baseRot * (1 - t * 0.75), // straighten toward center
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

    return () => ctx?.revert()
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
        <SchanderTicker />

        {/* Active project name — above carousel */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            height: 'clamp(44px, 6vh, 72px)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 clamp(20px, 2.5vw, 32px)',
            overflow: 'hidden',
            paddingTop: '56px',
          }}
        >
          {items.map((project) => (
            <span
              key={project.id}
              className="hero-proj-name"
              style={{
                position: 'absolute',
                left: 'clamp(20px, 2.5vw, 32px)',
                right: 'clamp(20px, 2.5vw, 32px)',
                top: '56px',
                fontFamily: '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(22px, 3.5vw, 52px)',
                letterSpacing: '-0.04em',
                lineHeight: 1,
                color: 'var(--ink)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              {project.title}
              {project.link && (
                <span style={{ color: 'var(--negroni)', marginLeft: '10px', fontSize: '0.65em' }}>↗</span>
              )}
            </span>
          ))}
        </div>

        {/* Carousel area */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            position: 'relative',
            zIndex: 1,
            // Fade edges to show depth
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          }}
        >
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
                      height: 'clamp(200px, 28vh, 360px)',
                      width: 'auto',
                      display: 'block',
                      maxWidth: '480px',
                    }}
                  />
                </a>
              )
            })}
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
            <span style={{ color: 'var(--negroni)', whiteSpace: 'nowrap' }}>Portfolio.</span>
          </h1>
          <CircleScrollButton />
        </motion.div>
      </div>
    </section>
  )
}
