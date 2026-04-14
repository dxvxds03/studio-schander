'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Navigation() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{ background: 'var(--cream)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          padding: '0 clamp(20px, 2.5vw, 32px) 10px clamp(20px, 2.5vw, 32px)',
        }}
      >
        <Link href="/" data-hover style={{ display: 'flex', alignItems: 'flex-end', flexShrink: 0 }}>
          <motion.img
            src="https://fdiaoljpthlnytgedxnt.supabase.co/storage/v1/object/public/project-images/logo_schander_dead_poet.png"
            alt="Studio Schander"
            style={{ height: '51px', width: 'auto', display: 'block', filter: 'brightness(0)' }}
            whileHover={{ opacity: 0.55 }}
            transition={{ duration: 0.15 }}
          />
        </Link>

        <Link
          href="mailto:hello@davidschander.com"
          data-hover
          className="nav-cta-btn"
          style={{
            fontFamily: '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: 800,
            fontSize: '13px',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            border: '2px solid currentColor',
            padding: '8px 18px',
            lineHeight: 1,
            whiteSpace: 'nowrap',
            background: 'transparent',
          }}
        >
          ich habe eine idee →
        </Link>
      </div>
    </motion.nav>
  )
}
