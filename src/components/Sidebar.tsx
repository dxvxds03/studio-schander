'use client'

import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Sidebar() {
  const pathname = usePathname()
  const [scrolledOut, setScrolledOut] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const leistungen = document.getElementById('leistungen')
      if (leistungen) {
        setScrolledOut(leistungen.getBoundingClientRect().top < window.innerHeight)
      } else {
        setScrolledOut(window.scrollY > window.innerHeight)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (pathname !== '/') return null

  const handleClick = () => {
    if (scrolledOut) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      document.getElementById('leistungen')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        right: 0,
        top: '61px',
        bottom: 0,
        width: 'clamp(160px, 20vw, 280px)',
        background: 'var(--negroni)',
        zIndex: 47,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: `clamp(10px, 1.5vw, 20px) clamp(20px, 2.5vw, 32px) clamp(20px, 2.5vw, 32px)`,
      }}
    >
      <a
        href="/projekte"
        data-hover
        style={{
          fontFamily: '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
          fontWeight: 800,
          fontSize: '13px',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: 'var(--cream)',
          textDecoration: 'none',
          border: '2px solid var(--cream)',
          padding: '8px 18px',
          lineHeight: 1,
          whiteSpace: 'nowrap',
          background: 'transparent',
          display: 'inline-block',
          transition: 'background 0.15s ease, color 0.15s ease',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLAnchorElement
          el.style.background = 'var(--cream)'
          el.style.color = 'var(--negroni)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLAnchorElement
          el.style.background = 'transparent'
          el.style.color = 'var(--cream)'
        }}
      >
        Alle Projekte →
      </a>

      <motion.button
        key={scrolledOut ? 'up' : 'down'}
        onClick={handleClick}
        data-hover
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          border: '2px solid var(--cream)',
          background: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          padding: 0,
          color: 'var(--cream)',
          cursor: 'none',
        }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1, y: scrolledOut ? [0, -7, 0] : [0, 7, 0] }}
        whileHover={{ background: 'var(--cream)', color: 'var(--negroni)', scale: 1.06 }}
        transition={{
          opacity: { duration: 0.2 },
          scale: { type: 'spring', stiffness: 300, damping: 25 },
          y: { repeat: Infinity, duration: 2.4, ease: 'easeInOut' },
        }}
      >
        {scrolledOut ? (
          <svg width="26" height="26" viewBox="0 0 30 30" fill="none">
            <path
              d="M15 26V4M5 13l10-9 10 9"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 30 30" fill="none">
            <path
              d="M15 4v22M5 17l10 9 10-9"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </motion.button>
    </div>
  )
}
