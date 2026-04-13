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
        className={`flex items-center justify-between px-8 md:px-14 lg:px-20 py-3 transition-all duration-500 ${
          scrolled ? 'bg-cream/95 backdrop-blur-sm border-b border-faint' : ''
        }`}
      >
        <Link href="/" data-hover className="flex items-center">
          <motion.img
            src="https://fdiaoljpthlnytgedxnt.supabase.co/storage/v1/object/public/project-images/logo_schander_dead_poet.png"
            alt="Studio Schander"
            style={{ height: '52px', width: 'auto', display: 'block' }}
            whileHover={{ opacity: 0.65 }}
            transition={{ duration: 0.2 }}
          />
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="#work"
            data-hover
            className="font-display hover:text-negroni transition-colors"
            style={{ fontWeight: 700, fontSize: '15px', letterSpacing: '-0.01em', color: '#191917' }}
          >
            Arbeiten
          </Link>
          <Link
            href="mailto:hello@davidschander.com"
            data-hover
            className="font-display hover:text-negroni transition-colors"
            style={{ fontWeight: 700, fontSize: '15px', letterSpacing: '-0.01em', color: '#191917' }}
          >
            Kontakt
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}
