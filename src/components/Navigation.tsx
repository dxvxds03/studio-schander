'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Arrow from './Arrow'

export default function Navigation() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 nav-root"
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

        <div className="nav-ctas">
          <Link href="/projekte" data-hover className="nav-btn nav-btn-arbeiten" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            Arbeiten <Arrow direction="right" size={16} />
          </Link>
          <Link href="/kontakt" data-hover className="nav-btn nav-btn-kontakt" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            Kontakt <Arrow direction="right" size={16} />
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}
