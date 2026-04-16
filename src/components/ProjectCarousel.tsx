'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProjectCarousel({ images, title }: { images: string[]; title: string }) {
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)
  const n = images.length

  const go = (next: number) => {
    setDir(next > idx ? 1 : -1)
    setIdx(next)
  }
  const prev = () => go((idx - 1 + n) % n)
  const next = () => go((idx + 1) % n)

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? '60%' : '-60%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (d: number) => ({ x: d > 0 ? '-60%' : '60%', opacity: 0 }),
  }

  return (
    <div
      className="project-carousel-wrap"
      style={{
        marginTop: '61px',
        background: 'var(--cream)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'clamp(280px, 55vh, 700px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Image */}
      <div
        className="project-carousel-img-area"
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: n === 1
            ? 'clamp(24px, 4vw, 56px)'
            : 'clamp(20px, 3vw, 40px) clamp(64px, 9vw, 120px)',
        }}
      >
        <AnimatePresence mode="wait" custom={dir}>
          <motion.img
            key={idx}
            src={images[idx]}
            alt={`${title} — ${idx + 1}`}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
            draggable={false}
            style={{
              maxWidth: '100%',
              maxHeight: 'clamp(260px, 52vh, 660px)',
              width: 'auto',
              height: 'auto',
              display: 'block',
              objectFit: 'contain',
            }}
          />
        </AnimatePresence>
      </div>

      {/* Arrows — only if multiple images */}
      {n > 1 && (
        <>
          <button
            onClick={prev}
            data-hover
            aria-label="Vorheriges Bild"
            style={{
              position: 'absolute',
              left: 'clamp(12px, 2.5vw, 32px)',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: '1.5px solid var(--dead-poet)',
              color: 'var(--dead-poet)',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'none',
              transition: 'border-color 0.18s, background 0.18s',
              flexShrink: 0,
            }}
            onMouseEnter={e => {
              const el = e.currentTarget
              el.style.background = 'rgba(75,68,60,0.08)'
              el.style.borderColor = 'var(--ink)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget
              el.style.background = 'transparent'
              el.style.borderColor = 'var(--dead-poet)'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button
            onClick={next}
            data-hover
            aria-label="Nächstes Bild"
            style={{
              position: 'absolute',
              right: 'clamp(12px, 2.5vw, 32px)',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: '1.5px solid var(--dead-poet)',
              color: 'var(--dead-poet)',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'none',
              transition: 'border-color 0.18s, background 0.18s',
              flexShrink: 0,
            }}
            onMouseEnter={e => {
              const el = e.currentTarget
              el.style.background = 'rgba(75,68,60,0.08)'
              el.style.borderColor = 'var(--ink)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget
              el.style.background = 'transparent'
              el.style.borderColor = 'var(--dead-poet)'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Dots */}
          <div
            style={{
              position: 'absolute',
              bottom: 'clamp(12px, 2vw, 20px)',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
            }}
          >
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                data-hover
                aria-label={`Bild ${i + 1}`}
                style={{
                  width: i === idx ? '20px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  background: i === idx ? '#E8331A' : 'rgba(25,25,23,0.18)',
                  border: 'none',
                  padding: 0,
                  cursor: 'none',
                  transition: 'width 0.3s ease, background 0.2s ease',
                }}
              />
            ))}
          </div>

          {/* Counter */}
          <div
            className="project-carousel-counter"
            style={{
              position: 'absolute',
              top: 'clamp(12px, 2vw, 20px)',
              right: 'clamp(12px, 2.5vw, 32px)',
              fontFamily: '"Source Code Pro", monospace',
              fontSize: '11px',
              letterSpacing: '0.12em',
              color: 'var(--dead-poet)',
            }}
          >
            {String(idx + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
          </div>
        </>
      )}
    </div>
  )
}
