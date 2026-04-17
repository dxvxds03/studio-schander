'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const WORDS = [
  'Ich', 'designe', 'seit', 'ich', '16', 'bin.', 'Inzwischen', 'studiere', 'ich',
  'Digitalisierungsmanagement,', 'baue', 'nebenbei', 'eigene', 'Marken',
  'und', 'schreibe', 'gerade', 'meine', 'Bachelorarbeit', 'darüber', 'wie',
  'KI', 'die', 'Suche', 'verändert.', 'Einfach', 'weil', 'mich', 'das', 'alles',
  'interessiert.', 'So', 'arbeite', 'ich', 'auch', 'mit', 'Kunden.',
]

export default function StatementBlock() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      const spans = gsap.utils.toArray<HTMLElement>('.statement-word', sectionRef.current!)
      gsap.fromTo(
        spans,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: { each: 0.7 / spans.length },
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            end: 'bottom 35%',
            scrub: 1.4,
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--cream)',
        padding: 'clamp(80px, 18vw, 340px) clamp(80px, 18vw, 340px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        zIndex: 46,
      }}
    >
      <p
        style={{
          fontFamily: '"Source Code Pro", monospace',
          fontWeight: 500,
          fontSize: 'clamp(10px, 1vw, 13px)',
          letterSpacing: '0.12em',
          lineHeight: 1.9,
          textTransform: 'uppercase',
          color: 'var(--dead-poet)',
          textAlign: 'justify',
          maxWidth: 'clamp(260px, 34ch, 420px)',
          width: '100%',
          hyphens: 'none',
        }}
      >
        {WORDS.map((word, i) => (
          <span
            key={i}
            className="statement-word"
            style={{ opacity: 0.12, display: 'inline' }}
          >
            {word}{i < WORDS.length - 1 ? '\u00a0' : ''}
          </span>
        ))}
      </p>
    </section>
  )
}
