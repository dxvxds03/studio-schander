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
        className={`flex items-center justify-between px-8 py-6 transition-all duration-500 ${
          scrolled ? 'bg-cream/90 backdrop-blur-sm' : ''
        }`}
      >
        <Link
          href="/"
          className="label hover:text-deadpoet transition-colors"
          data-hover
        >
          Studio Schander
        </Link>

        <div className="flex items-center gap-10">
          <Link
            href="#work"
            className="label hover:text-deadpoet transition-colors"
            data-hover
          >
            Arbeiten
          </Link>
          <Link
            href="mailto:hello@davidschander.com"
            className="label hover:text-deadpoet transition-colors"
            data-hover
          >
            Kontakt
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}
