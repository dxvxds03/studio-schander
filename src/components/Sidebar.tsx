'use client'

import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export default function Sidebar() {
  const pathname = usePathname()
  if (pathname.startsWith('/admin')) return null

  const scrollDown = () =>
    document.getElementById('leistungen')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div
      style={{
        position: 'fixed',
        right: 0,
        top: '61px',
        bottom: 0,
        width: 'clamp(160px, 20vw, 280px)',
        background: 'var(--negroni)',
        zIndex: 45,
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
        onClick={scrollDown}
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
        whileHover={{ background: 'var(--cream)', color: 'var(--negroni)', scale: 1.06 }}
        animate={{ y: [0, 7, 0] }}
        transition={{ y: { repeat: Infinity, duration: 2.4, ease: 'easeInOut' } }}
      >
        <svg width="26" height="26" viewBox="0 0 30 30" fill="none">
          <path
            d="M15 4v22M5 17l10 9 10-9"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.button>
    </div>
  )
}
