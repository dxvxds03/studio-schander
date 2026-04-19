'use client'

import { useState, useEffect } from 'react'
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

function CalEmbed() {
  useEffect(() => {
    const existing = document.getElementById('cal-home-script')
    if (existing) existing.remove()

    const script = document.createElement('script')
    script.id = 'cal-home-script'
    script.type = 'text/javascript'
    script.innerHTML = `
      (function (C, A, L) {
        let p = function (a, ar) { a.q.push(ar); };
        let d = C.document;
        C.Cal = C.Cal || function () {
          let cal = C.Cal; let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {}; cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () { p(api, arguments); };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
      })(window, "https://app.cal.eu/embed/embed.js", "init");

      Cal("init", "erstgesprach", { origin: "https://app.cal.eu" });

      Cal.ns.erstgesprach("inline", {
        elementOrSelector: "#cal-home-inline",
        config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
        calLink: "schander/erstgesprach",
      });

      Cal.ns.erstgesprach("ui", { hideEventTypeDetails: false, layout: "month_view" });
    `
    document.body.appendChild(script)

    return () => {
      document.getElementById('cal-home-script')?.remove()
    }
  }, [])

  return (
    <>
      <div
        id="cal-home-inline"
        style={{ width: '100%', height: '700px', overflow: 'scroll' }}
      />
      <style>{`
        @media (min-width: 768px) {
          /* wrapper that Cal injects */
          #cal-home-inline,
          #cal-home-inline > *,
          #cal-home-inline iframe,
          #cal-home-inline div[style],
          #cal-home-inline > div {
            margin-left: 0 !important;
            margin-right: auto !important;
          }
        }
      `}</style>
    </>
  )
}

export default function WasIchMache({ items }: { items: LeistungItem[] }) {
  const [activeKey, setActiveKey] = useState<number | null>(null)
  const [hoveredKey, setHoveredKey] = useState<number | null>(null)

  const toggle = (id: number) => setActiveKey(prev => (prev === id ? null : id))

  return (
    <>
      {/* ── Section: heading + accordion ─────────────────────────── */}
      <section
        id="leistungen"
        style={{ position: 'relative', zIndex: 46, background: '#E8331A' }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          style={{ paddingLeft: px, paddingRight: px, marginBottom: 'clamp(24px, 3vw, 40px)' }}
        >
          <h2
            style={{
              fontFamily: '"Cabinet Grotesk", "Helvetica Neue", sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(36px, 9.89vw, 9999px)',
              letterSpacing: '-0.035em',
              lineHeight: 1,
              margin: 0,
              color: 'var(--ink)',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              display: 'flex',
              gap: '0.22em',
              alignItems: 'baseline',
            }}
          >
            {['Was', 'ich', 'Mache'].map((word, i) => (
              <span key={word} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
                <motion.span
                  style={{ display: 'inline-block' }}
                  variants={{
                    hidden: { y: '110%', rotate: 4 },
                    visible: { y: 0, rotate: 0, transition: { duration: 0.9, delay: i * 0.13, ease: [0.76, 0, 0.24, 1] } },
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
            <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
              <motion.span
                style={{ display: 'inline-block', color: CREAM }}
                variants={{
                  hidden: { y: '110%', rotate: 4 },
                  visible: { y: 0, rotate: 0, transition: { duration: 0.9, delay: 0.42, ease: [0.76, 0, 0.24, 1] } },
                }}
              >
                .
              </motion.span>
            </span>
          </h2>
        </motion.div>

        <div style={{ background: DARK_BG }}>
          {items.map((item, i) => {
            const isActive = activeKey === item.id
            const isHovered = hoveredKey === item.id
            const highlight = isActive || isHovered

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -48, skewX: -3 }}
                whileInView={{ opacity: 1, x: 0, skewX: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22, 0, 0, 1] }}
                onClick={() => toggle(item.id)}
                onMouseEnter={() => setHoveredKey(item.id)}
                onMouseLeave={() => setHoveredKey(null)}
                style={{ borderTop: '1px solid rgba(244,242,237,0.1)', cursor: 'pointer' }}
              >
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
                      textShadow: isHovered && !isActive ? '0 0 40px rgba(232,51,26,0.5), 0 0 80px rgba(232,51,26,0.2)' : 'none',
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
                            <p key={j} style={{ fontFamily: '"Source Code Pro", monospace', fontSize: 'clamp(13px, 1.2vw, 17px)', lineHeight: 1.75, color: 'rgba(244,242,237,0.7)', margin: 0 }}>
                              {line}
                            </p>
                          ))}
                        </div>
                        {item.badges.length > 0 && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {item.badges.map(b => (
                              <span key={b} style={{ fontFamily: '"Source Code Pro", monospace', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(244,242,237,0.45)', border: '1px solid rgba(244,242,237,0.18)', padding: '4px 10px' }}>
                                {b}
                              </span>
                            ))}
                          </div>
                        )}
                        <Link
                          href={item.cta_href}
                          data-hover
                          style={{ fontFamily: '"Cabinet Grotesk", "Helvetica Neue", sans-serif', fontWeight: 800, fontSize: 'clamp(15px, 1.6vw, 22px)', letterSpacing: '-0.02em', color: ORANGE, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
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

      {/* ── Closing CTA mit Cal Embed ────────────────────────────── */}
      <section
        style={{
          paddingTop: 'clamp(80px, 12vw, 160px)',
          paddingBottom: 'clamp(32px, 4vw, 48px)',
          position: 'relative',
          zIndex: 46,
          background: '#E8331A',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 0, 0, 1] }}
          style={{ paddingLeft: px, paddingRight: px, marginBottom: 'clamp(40px, 6vw, 64px)' }}
        >
          <p style={{ fontFamily: '"Cabinet Grotesk", "Helvetica Neue", sans-serif', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 72px)', letterSpacing: '-0.03em', lineHeight: 1.05, color: 'var(--ink)', margin: '0 0 0.2em' }}>
            Du weißt noch nicht genau
            <br />
            was du brauchst<span style={{ color: CREAM }}>?</span>
          </p>
          <p style={{ fontFamily: '"Cabinet Grotesk", "Helvetica Neue", sans-serif', fontWeight: 400, fontSize: 'clamp(32px, 5vw, 72px)', letterSpacing: '-0.03em', lineHeight: 1.05, color: 'rgba(25,25,23,0.5)', margin: 0 }}>
            Lass uns gemeinsam schauen:
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 0, 0, 1] }}
          style={{ paddingLeft: px, paddingRight: px }}
        >
          <CalEmbed />
        </motion.div>
      </section>
    </>
  )
}
