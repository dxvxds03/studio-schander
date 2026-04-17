'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Arrow from './Arrow'

export interface LeistungItem {
  id: number
  title: string
  lines: string[]
  cta_label: string
  cta_href: string
  badges: string[]
  order: number
  active: boolean
}

const px = 'clamp(24px, 4vw, 64px)'

const DARK_BG = '#34160F'
const CREAM = '#F4F2ED'
const ORANGE = '#E8331A'

export default function WasIchMache({ items }: { items: LeistungItem[] }) {
  const [activeKey, setActiveKey] = useState<number | null>(null)
  const [hoveredKey, setHoveredKey] = useState<number | null>(null)

  const toggle = (id: number) => setActiveKey(prev => (prev === id ? null : id))

  return (
    <>
      {/* ── Section: heading (cream) + accordion (dark) ─────────── */}
      <section
        id="leistungen"
        style={{
          paddingTop: 'clamp(80px, 12vw, 160px)',
          position: 'relative',
          zIndex: 46,
          background: 'var(--cream)',
          borderTop: '1px solid var(--faint)',
        }}
      >
        {/* Heading — fluid, stets volle Breite minus Padding */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 0, 0, 1] }}
          style={{
            paddingLeft: px,
            paddingRight: px,
            marginBottom: 'clamp(24px, 3vw, 40px)',
          }}
        >
          <h2
            style={{
              fontFamily: '"Cabinet Grotesk", "Helvetica Neue", sans-serif',
              fontWeight: 800,
              /*
               * "WAS ICH MACHE." = 15 Zeichen.
               * Cabinet Grotesk 800 uppercase hat ein Breiten-Verhältnis
               * von ~0.62 zum Font-Size. Padding ≈ 2 * 4vw = 8vw.
               * Verfügbare Breite ≈ 92vw.
               * font-size = 92vw / (15 * 0.62) ≈ 9.89vw.
               * Kein cap (9999px) damit die Schrift auf breiten Screens
               * weiter wächst. Floor 36px für kleine Screens.
               */
              fontSize: 'clamp(36px, 9.89vw, 9999px)',
              letterSpacing: '-0.035em',
              lineHeight: 1,
              margin: 0,
              color: 'var(--ink)',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            Was ich Mache<span style={{ color: ORANGE }}>.</span>
          </h2>
        </motion.div>

        {/* Accordion — dark background */}
        <div style={{ background: DARK_BG }}>
          {items.map((item, i) => {
            const isActive = activeKey === item.id
            const isHovered = hoveredKey === item.id
            const highlight = isActive || isHovered

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 0, 0, 1] }}
                onClick={() => toggle(item.id)}
                onMouseEnter={() => setHoveredKey(item.id)}
                onMouseLeave={() => setHoveredKey(null)}
                style={{
                  borderTop: '1px solid rgba(244,242,237,0.1)',
                  cursor: 'pointer',
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
                      color: highlight ? ORANGE : CREAM,
                      margin: 0,
                      transition: 'color 0.2s ease, text-shadow 0.2s ease',
                      textShadow: isHovered && !isActive
                        ? '0 0 40px rgba(232,51,26,0.5), 0 0 80px rgba(232,51,26,0.2)'
                        : 'none',
                    }}
                  >
                    {item.title}
                  </h3>

                  <span
                    style={{
                      fontFamily: '"Cabinet Grotesk", "Helvetica Neue", sans-serif',
                      fontWeight: 800,
                      fontSize: 'clamp(24px, 4vw, 40px)',
                      color: highlight ? ORANGE : 'rgba(244,242,237,0.35)',
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
                        <div>
                          {item.lines.map((line, j) => (
                            <p
                              key={j}
                              style={{
                                fontFamily: '"Source Code Pro", monospace',
                                fontSize: 'clamp(13px, 1.2vw, 17px)',
                                lineHeight: 1.75,
                                color: 'rgba(244,242,237,0.7)',
                                margin: 0,
                              }}
                            >
                              {line}
                            </p>
                          ))}
                        </div>

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
                                  color: 'rgba(244,242,237,0.45)',
                                  border: '1px solid rgba(244,242,237,0.18)',
                                  padding: '4px 10px',
                                }}
                              >
                                {b}
                              </span>
                            ))}
                          </div>
                        )}

                        <Link
                          href={item.cta_href}
                          data-hover
                          style={{
                            fontFamily: '"Cabinet Grotesk", "Helvetica Neue", sans-serif',
                            fontWeight: 800,
                            fontSize: 'clamp(15px, 1.6vw, 22px)',
                            letterSpacing: '-0.02em',
                            color: ORANGE,
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                          }}
                        >
                          {item.cta_label} <Arrow direction="right" size={20} />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}

          <div style={{ borderTop: '1px solid rgba(244,242,237,0.1)' }} />
        </div>
      </section>

      {/* ── Cream section: closing CTA ───────────────────────────── */}
      <section
        style={{
          paddingTop: 'clamp(80px, 12vw, 160px)',
          paddingBottom: 'clamp(64px, 9vw, 120px)',
          position: 'relative',
          zIndex: 46,
          background: 'var(--cream)',
        }}
      >
        {/* Text block */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 0, 0, 1] }}
          style={{ padding: `0 ${px}`, marginBottom: 'clamp(40px, 6vw, 80px)' }}
        >
          <p
            style={{
              fontFamily: '"Cabinet Grotesk", "Helvetica Neue", sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(32px, 5vw, 72px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: 'var(--ink)',
              margin: '0 0 0.35em',
            }}
          >
            Du weißt noch nicht genau
            <br />
            was du brauchst<span style={{ color: ORANGE }}>?</span>
          </p>
          <p
            style={{
              fontFamily: '"Cabinet Grotesk", "Helvetica Neue", sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(32px, 5vw, 72px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: 'var(--muted)',
              margin: 0,
            }}
          >
            Das ist meistens der beste Startpunkt —
            <br />
            kein fertiger Brief nötig.
          </p>
        </motion.div>

        {/* Pulsing orange CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 0, 0, 1] }}
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
              color: CREAM,
              background: ORANGE,
              border: `2px solid ${ORANGE}`,
              padding: 'clamp(16px, 2.5vw, 36px) clamp(20px, 3vw, 48px)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 'clamp(20px, 4vw, 60px)',
              transition: 'background 0.22s ease, color 0.22s ease, border-color 0.22s ease',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = '#34160F'
              el.style.borderColor = '#34160F'
              el.style.color = CREAM
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = ORANGE
              el.style.borderColor = ORANGE
              el.style.color = CREAM
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
