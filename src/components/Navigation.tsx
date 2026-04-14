'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Navigation() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{ background: 'transparent' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: 'clamp(10px, 2.5vh, 18px) clamp(16px, 2.5vw, 32px) 10px',
        }}
      >
        <Link href="/" data-hover style={{ display: 'flex', alignItems: 'flex-end', flexShrink: 0 }}>
          <motion.img
            src="/logo_schander.svg"
            alt="Studio Schander"
            className="nav-logo"
            style={{ height: '51px', width: 'auto', display: 'block' }}
            whileHover={{ opacity: 0.55 }}
            transition={{ duration: 0.15 }}
          />
        </Link>

        {/* Desktop: single CTA button */}
        <Link
          href="mailto:mail@studio-schander.de"
          data-hover
          className="nav-cta-btn nav-cta-desktop"
          style={{
            fontFamily: '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: 800,
            fontSize: '13px',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            color: '#E8581A',
            border: '2px solid #E8581A',
            padding: '8px 18px',
            lineHeight: 1,
            whiteSpace: 'nowrap',
            background: 'transparent',
          }}
        >
          ich habe eine idee →
        </Link>

        {/* Mobile: two stacked buttons */}
        <div
          className="nav-mobile-btns"
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '8px',
            alignItems: 'stretch',
          }}
        >
          <Link
            href="/projekte"
            data-hover
            style={{
              fontFamily: '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: 800,
              fontSize: '11px',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              color: 'var(--dead-poet)',
              border: '2px solid var(--dead-poet)',
              padding: '7px 14px',
              lineHeight: 1,
              whiteSpace: 'nowrap',
              background: 'transparent',
              textAlign: 'center',
            }}
          >
            Alle Projekte →
          </Link>
          <Link
            href="mailto:mail@studio-schander.de"
            data-hover
            style={{
              fontFamily: '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: 800,
              fontSize: '11px',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              color: '#E8581A',
              border: '2px solid #E8581A',
              padding: '7px 14px',
              lineHeight: 1,
              whiteSpace: 'nowrap',
              background: 'transparent',
              textAlign: 'center',
            }}
          >
            Ich habe eine Idee →
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}
