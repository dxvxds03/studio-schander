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
      transition={{ delay: 1.8, duration: 0.6 }}
    >
      <div
        className={`flex items-center justify-between px-8 md:px-14 lg:px-20 transition-all duration-500 ${
          scrolled ? 'bg-cream/95 backdrop-blur-sm border-b border-faint' : ''
        }`}
        style={{ paddingTop: '14px', paddingBottom: '14px' }}
      >
        <Link href="/" data-hover className="flex items-center">
          <motion.img
            src="https://fdiaoljpthlnytgedxnt.supabase.co/storage/v1/object/public/project-images/logo_schander_dead_poet.png"
            alt="Studio Schander"
            style={{ height: '38px', width: 'auto', display: 'block' }}
            whileHover={{ opacity: 0.65 }}
            transition={{ duration: 0.2 }}
          />
        </Link>

        <div className="flex items-center gap-7">
          <Link
            href="#work"
            data-hover
            style={{
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: 500,
              fontSize: '13px',
              letterSpacing: '0.01em',
              color: '#787672',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#191917')}
            onMouseLeave={e => (e.currentTarget.style.color = '#787672')}
          >
            Arbeiten
          </Link>
          <Link
            href="mailto:hello@davidschander.com"
            data-hover
            className="btn-negroni"
            style={{
              fontSize: '12px',
              padding: '7px 18px',
              letterSpacing: '0.01em',
            }}
          >
            Kontakt
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}
