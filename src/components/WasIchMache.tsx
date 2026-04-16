'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const ITEMS = [
  {
    key: 'ideen',
    title: 'Ideen umsetzen',
    lines: [
      'Du hast etwas im Kopf. Vielleicht ist es noch vage –',
      'ein Gefühl, eine Richtung, ein "das müsste es eigentlich geben".',
      'Ich nehme genau diesen Punkt und baue daraus etwas Echtes.',
    ],
    cta: { label: 'Erzähl mir davon →', href: '/kontakt' },
    badges: [] as string[],
  },
  {
    key: 'web',
    title: 'Webentwicklung',
    lines: [
      'Hast du eine Website, die du selbst nicht mehr stolz teilst?',
      'Ich baue Websites und Web-Apps, die funktionieren und gut aussehen –',
      'nicht nur beim Launch, sondern auch wenn es komplizierter wird.',
      'HTML, CSS, JavaScript. Mit echtem Backend wenn nötig.',
    ],
    cta: { label: 'Projekte ansehen →', href: '/projekte' },
    badges: ['Serving with David', 'Lernwald'],
  },
  {
    key: 'design',
    title: 'Design & Branding',
    lines: [
      'Sieht dein Auftritt so aus, wie du dich anfühlst?',
      'Visuelle Identitäten, die sofort sagen worum es geht –',
      'ohne dass irgendjemand etwas erklären muss.',
      'Editorial Design, Magazingestaltung, Markensysteme.',
    ],
    cta: { label: 'Meine Marken ansehen →', href: '/projekte' },
    badges: ['Schander Marken'],
  },
  {
    key: 'konzept',
    title: 'Konzeption',
    lines: [
      'Weißt du schon was du willst – oder weißt du noch was du brauchst?',
      'Bevor irgendetwas gebaut wird, muss es gedacht werden.',
      'Struktur, Inhalt, Strategie. Das ist kein Schritt den man überspringt –',
      'das ist der wichtigste.',
    ],
    cta: { label: 'Lass uns das herausfinden →', href: '/kontakt' },
    badges: [] as string[],
  },
  {
    key: 'ki',
    title: 'KI-Integration',
    lines: [
      'Arbeitest du noch neben der KI – oder schon mit ihr?',
      'Ich arbeite täglich mit KI-Tools und weiß wo sie helfen',
      'und wo sie im Weg stehen.',
      'Prompt Engineering, AI-gestützte Workflows, eigene Produkte.',
    ],
    cta: { label: 'Mehr erfahren →', href: '/kontakt' },
    badges: [] as string[],
  },
]

const px = 'clamp(16px, 2vw, 24px)'

export default function WasIchMache() {
  const [isTouch, setIsTouch] = useState(false)
  const [activeKey, setActiveKey] = useState<string | null>('web')
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    setIsTouch(!window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  }, [])

  const handleMouseEnter = (key: string) => {
    if (isTouch) return
    setActiveKey(key)
    if (!hasInteracted) setHasInteracted(true)
  }

  const handleSectionLeave = () => {
    if (isTouch) return
    setActiveKey(null)
  }

  const handleClick = (key: string) => {
    if (!isTouch) return
    setActiveKey(prev => (prev === key ? null : key))
  }

  const isDimming = hasInteracted && activeKey !== null

  return (
    <>
      <section
        id="leistungen"
        style={{
          paddingTop: 'clamp(96px, 14vw, 180px)',
          position: 'relative',
          zIndex: 46,
          background: 'var(--cream)',
        }}
      >
        {/* Section headline */}
        <p
          style={{
            fontFamily: '"Source Code Pro", monospace',
            fontSize: '10px',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            padding: `0 ${px}`,
            margin: '0 0 clamp(20px, 3vw, 40px)',
          }}
        >
          Was ich mache.
        </p>

        {/* Accordion */}
        <div onMouseLeave={handleSectionLeave}>
          {ITEMS.map((item, i) => {
            const isActive = activeKey === item.key
            const isDimmed = isDimming && !isActive

            return (
              <div
                key={item.key}
                onMouseEnter={() => handleMouseEnter(item.key)}
                onClick={() => handleClick(item.key)}
                style={{
                  borderTop: '1px solid var(--faint)',
                  opacity: isDimmed ? 0.35 : 1,
                  transition: 'opacity 0.25s ease',
                  cursor: isTouch ? 'pointer' : 'default',
                }}
              >
                {/* Title row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    padding: `clamp(10px, 1.4vw, 20px) ${px}`,
                  }}
                >
                  <h3
                    style={{
                      fontFamily: '"Cabinet Grotesk", "Helvetica Neue", sans-serif',
                      fontWeight: 800,
                      fontSize: 'clamp(36px, 7.5vw, 108px)',
                      letterSpacing: '-0.035em',
                      lineHeight: 1,
                      textTransform: 'uppercase',
                      color: 'var(--ink)',
                      margin: 0,
                    }}
                  >
                    {item.title}
                  </h3>

                  {/* Mobile toggle indicator */}
                  <span
                    className="wim-toggle"
                    style={{
                      fontFamily: '"Cabinet Grotesk", "Helvetica Neue", sans-serif',
                      fontWeight: 800,
                      fontSize: 'clamp(24px, 4vw, 40px)',
                      color: 'var(--muted)',
                      lineHeight: 1,
                      flexShrink: 0,
                      marginLeft: '16px',
                      transition: 'transform 0.25s ease, color 0.2s ease',
                      transform: isActive ? 'rotate(45deg)' : 'none',
                    }}
                  >
                    +
                  </span>
                </div>

                {/* Expanded content */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.38, ease: [0.25, 0, 0, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div
                        style={{
                          padding: `0 ${px} clamp(24px, 3vw, 48px)`,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '20px',
                          maxWidth: '820px',
                        }}
                      >
                        {/* Text */}
                        <div>
                          {item.lines.map((line, j) => (
                            <p
                              key={j}
                              style={{
                                fontFamily: '"Source Code Pro", monospace',
                                fontSize: 'clamp(13px, 1.2vw, 17px)',
                                lineHeight: 1.75,
                                color: 'var(--ink)',
                                margin: 0,
                              }}
                            >
                              {line}
                            </p>
                          ))}
                        </div>

                        {/* Badges */}
                        {item.badges.length > 0 && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {item.badges.map(b => (
                              <span
                                key={b}
                                style={{
                                  fontFamily: '"Source Code Pro", monospace',
                                  fontSize: '10px',
                                  letterSpacing: '0.18em',
                                  textTransform: 'uppercase',
                                  color: 'var(--muted)',
                                  border: '1px solid var(--faint)',
                                  padding: '4px 10px',
                                }}
                              >
                                {b}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* CTA */}
                        <Link
                          href={item.cta.href}
                          data-hover
                          style={{
                            fontFamily: '"Cabinet Grotesk", "Helvetica Neue", sans-serif',
                            fontWeight: 800,
                            fontSize: 'clamp(15px, 1.6vw, 22px)',
                            letterSpacing: '-0.02em',
                            color: 'var(--dead-poet)',
                            textDecoration: 'none',
                            display: 'inline-block',
                          }}
                        >
                          {item.cta.label}
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}

          {/* Last border */}
          <div style={{ borderTop: '1px solid var(--faint)' }} />
        </div>
      </section>

      {/* Closing CTA */}
      <section
        style={{
          paddingTop: 'clamp(64px, 9vw, 120px)',
          paddingBottom: 'clamp(64px, 9vw, 120px)',
          paddingLeft: px,
          paddingRight: px,
          position: 'relative',
          zIndex: 46,
          background: 'var(--cream)',
        }}
      >
        <p
          style={{
            fontFamily: '"Cabinet Grotesk", "Helvetica Neue", sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(28px, 5vw, 72px)',
            letterSpacing: '-0.035em',
            lineHeight: 1.05,
            color: 'var(--ink)',
            margin: '0 0 clamp(8px, 1vw, 16px)',
          }}
        >
          Du weißt noch nicht genau was du brauchst?
        </p>
        <p
          style={{
            fontFamily: '"Cabinet Grotesk", "Helvetica Neue", sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(28px, 5vw, 72px)',
            letterSpacing: '-0.035em',
            lineHeight: 1.05,
            color: 'var(--muted)',
            margin: '0 0 clamp(32px, 4vw, 56px)',
          }}
        >
          Das ist meistens der beste Startpunkt.
        </p>
        <Link
          href="/kontakt"
          data-hover
          style={{
            fontFamily: '"Cabinet Grotesk", "Helvetica Neue", sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(13px, 1.3vw, 17px)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            color: 'var(--ink)',
            border: '2px solid var(--ink)',
            padding: '14px 40px',
            display: 'inline-block',
            transition: 'background 0.18s ease, color 0.18s ease',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLAnchorElement
            el.style.background = 'var(--ink)'
            el.style.color = 'var(--cream)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLAnchorElement
            el.style.background = 'transparent'
            el.style.color = 'var(--ink)'
          }}
        >
          Schreib mir
        </Link>
      </section>
    </>
  )
}
