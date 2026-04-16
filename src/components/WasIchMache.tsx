'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Arrow from './Arrow'

const ITEMS = [
  {
    key: 'ideen',
    title: 'Ideen umsetzen',
    lines: [
      'Du hast etwas im Kopf. Vielleicht ist es noch vage –',
      'ein Gefühl, eine Richtung, ein "das müsste es eigentlich geben".',
      'Ich nehme genau diesen Punkt und baue daraus etwas Echtes.',
    ],
    cta: { label: 'Erzähl mir davon', href: '/kontakt' },
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
    cta: { label: 'Projekte ansehen', href: '/projekte' },
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
    cta: { label: 'Meine Marken ansehen', href: '/projekte' },
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
    cta: { label: 'Lass uns das herausfinden', href: '/kontakt' },
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
    cta: { label: 'Mehr erfahren', href: '/kontakt' },
    badges: [] as string[],
  },
]

const px = 'clamp(16px, 2vw, 24px)'

export default function WasIchMache() {
  const [activeKey, setActiveKey] = useState<string | null>(null)
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)

  const toggle = (key: string) => setActiveKey(prev => (prev === key ? null : key))

  return (
    <>
      <section
        id="leistungen"
        style={{
          paddingTop: 'clamp(80px, 12vw, 160px)',
          position: 'relative',
          zIndex: 46,
          background: 'var(--cream)',
        }}
      >
        {/* Section headline — typographic statement */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 0, 0, 1] }}
          style={{ padding: `0 ${px}`, marginBottom: 'clamp(48px, 7vw, 96px)' }}
        >
          <h2
            style={{
              fontFamily: '"Cabinet Grotesk", "Helvetica Neue", sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(68px, 11vw, 152px)',
              letterSpacing: '-0.04em',
              lineHeight: 0.92,
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            <span style={{ color: 'var(--muted)', display: 'block' }}>Was ich</span>
            <span style={{ color: 'var(--ink)', display: 'block' }}>
              Mache<span style={{ color: 'var(--dead-poet)' }}>.</span>
            </span>
          </h2>
        </motion.div>

        {/* Accordion */}
        <div>
          {ITEMS.map((item, i) => {
            const isActive = activeKey === item.key
            const isHovered = hoveredKey === item.key
            const highlight = isActive || isHovered

            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 0, 0, 1] }}
                onClick={() => toggle(item.key)}
                onMouseEnter={() => setHoveredKey(item.key)}
                onMouseLeave={() => setHoveredKey(null)}
                style={{
                  borderTop: '1px solid var(--faint)',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
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
                      color: highlight ? 'var(--dead-poet)' : 'var(--ink)',
                      margin: 0,
                      transition: 'color 0.2s ease, text-shadow 0.2s ease',
                      textShadow: isHovered && !isActive
                        ? '0 0 40px rgba(232,51,26,0.35), 0 0 80px rgba(232,51,26,0.15)'
                        : 'none',
                    }}
                  >
                    {item.title}
                  </h3>

                  {/* Toggle indicator — always visible */}
                  <span
                    style={{
                      fontFamily: '"Cabinet Grotesk", "Helvetica Neue", sans-serif',
                      fontWeight: 800,
                      fontSize: 'clamp(24px, 4vw, 40px)',
                      color: highlight ? 'var(--dead-poet)' : 'var(--muted)',
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
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                          }}
                        >
                          {item.cta.label} <Arrow direction="right" size={20} />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}

          {/* Last border */}
          <div style={{ borderTop: '1px solid var(--faint)' }} />
        </div>
      </section>

      {/* Closing CTA */}
      <section
        style={{
          paddingTop: 'clamp(80px, 12vw, 160px)',
          paddingBottom: 'clamp(64px, 9vw, 120px)',
          position: 'relative',
          zIndex: 46,
          background: 'var(--cream)',
          overflow: 'hidden',
        }}
      >
        {/* Big typographic question */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 0, 0, 1] }}
          style={{ padding: `0 ${px}`, marginBottom: 'clamp(20px, 3vw, 40px)' }}
        >
          <h2
            style={{
              fontFamily: '"Cabinet Grotesk", "Helvetica Neue", sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(52px, 9.5vw, 136px)',
              letterSpacing: '-0.04em',
              lineHeight: 0.92,
              textTransform: 'uppercase',
              color: 'var(--ink)',
              margin: '0 0 clamp(16px, 2vw, 28px)',
            }}
          >
            Du weißt<br />
            noch nicht<span style={{ color: 'var(--dead-poet)' }}>?</span>
          </h2>
          <p
            style={{
              fontFamily: '"Source Code Pro", monospace',
              fontSize: 'clamp(12px, 1.1vw, 15px)',
              letterSpacing: '0.12em',
              lineHeight: 1.7,
              color: 'var(--muted)',
              margin: 0,
              maxWidth: '42ch',
            }}
          >
            Das ist meistens der beste Startpunkt —<br />
            kein fertiger Brief nötig.
          </p>
        </motion.div>

        {/* Arrow cluster → flows toward button */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 0, 0, 1] }}
          style={{
            padding: `0 ${px}`,
            display: 'flex',
            gap: '6px',
            alignItems: 'center',
            marginBottom: 'clamp(20px, 2.5vw, 36px)',
            color: 'var(--dead-poet)',
          }}
        >
          <Arrow direction="right" size={28} />
          <Arrow direction="right" size={28} />
          <Arrow direction="right" size={28} />
        </motion.div>

        {/* Full-width CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 0, 0, 1] }}
          style={{ padding: `0 ${px}` }}
        >
          <Link
            href="/kontakt"
            data-hover
            className="schreib-mir-btn"
            style={{
              fontFamily: '"Cabinet Grotesk", "Helvetica Neue", sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(28px, 5vw, 72px)',
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              color: 'var(--ink)',
              border: '2px solid var(--ink)',
              padding: 'clamp(16px, 2.5vw, 36px) clamp(20px, 3vw, 48px)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 'clamp(20px, 4vw, 60px)',
              transition: 'background 0.22s ease, color 0.22s ease',
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
            <Arrow direction="right" size={48} />
          </Link>
        </motion.div>
      </section>
    </>
  )
}
