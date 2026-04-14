'use client'

import Link from 'next/link'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => {
    setScrolled(v > 60)
  })

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 20px 10px 16px',
          borderBottom: scrolled ? '2px solid #191917' : '2px solid transparent',
          background: scrolled ? 'rgba(244,242,237,0.97)' : 'transparent',
          transition: 'background 0.3s ease, border-color 0.3s ease',
        }}
      >
        {/* Logo flush to edge */}
        <Link href="/" data-hover style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <motion.img
            src="https://fdiaoljpthlnytgedxnt.supabase.co/storage/v1/object/public/project-images/logo_schander_dead_poet.png"
            alt="Studio Schander"
            style={{ height: '34px', width: 'auto', display: 'block' }}
            whileHover={{ opacity: 0.55 }}
            transition={{ duration: 0.15 }}
          />
        </Link>

        {/* Subtitle small-caps right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <span
            style={{
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              fontVariant: 'small-caps',
              fontSize: '11px',
              letterSpacing: '0.08em',
              color: '#787672',
              lineHeight: 1,
              userSelect: 'none',
            }}
          >
            Ich mache einfach, was mir in den Kopf kommt — Studio
          </span>
          <Link
            href="mailto:hello@davidschander.com"
            data-hover
            style={{
              fontFamily: '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: 800,
              fontSize: '11px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#191917',
              textDecoration: 'none',
              border: '2px solid #191917',
              padding: '5px 12px',
              lineHeight: 1,
              transition: 'background 0.15s ease, color 0.15s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#191917'
              e.currentTarget.style.color = '#F4F2ED'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#191917'
            }}
          >
            Kontakt
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}
