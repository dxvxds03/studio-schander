'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function StatementBlock() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Subtle parallax: block floats up as section scrolls into view
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])

  return (
    <section
      ref={sectionRef}
      style={{
        padding: 'clamp(80px, 18vw, 340px) clamp(80px, 18vw, 340px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        zIndex: 46,
        overflow: 'hidden',
      }}
    >
      <motion.div style={{ y }}>
        <motion.p
          initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0.6 }}
          whileInView={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          style={{
            fontFamily: '"Source Code Pro", monospace',
            fontWeight: 500,
            fontSize: 'clamp(10px, 1vw, 13px)',
            letterSpacing: '0.12em',
            lineHeight: 1.9,
            textTransform: 'uppercase',
            color: 'var(--ink)',
            textAlign: 'justify',
            maxWidth: 'clamp(260px, 34ch, 420px)',
            width: '100%',
            hyphens: 'none',
            margin: 0,
          }}
        >
          Ich designe seit ich 16 bin. Inzwischen studiere ich
          Digitalisierungsmanagement, baue nebenbei eigene Marken
          und schreibe gerade meine Bachelorarbeit darüber wie
          KI die Suche verändert. Einfach weil mich das alles
          interessiert. So arbeite ich auch mit Kunden.
        </motion.p>
      </motion.div>
    </section>
  )
}
