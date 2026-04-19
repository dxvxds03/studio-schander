'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import FlowerIcon from './FlowerIcon'

const SIZE = 30
const DOT  = 5

export default function CustomCursor() {
  const pathname = usePathname()
  const [visible, setVisible]       = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [hasPointer, setHasPointer] = useState(false)

  // Raw motion values — set directly without spring for the dot (instant follow)
  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  // Dot: very stiff spring ≈ instant
  const dotX = useSpring(mouseX, { stiffness: 900, damping: 40 })
  const dotY = useSpring(mouseY, { stiffness: 900, damping: 40 })

  // Ring: intentional lag
  const ringX = useSpring(mouseX, { stiffness: 180, damping: 24 })
  const ringY = useSpring(mouseY, { stiffness: 180, damping: 24 })

  const attachedRef  = useRef<Set<Element>>(new Set())
  const rafRef       = useRef<number | null>(null)
  const pendingPos   = useRef<{ x: number; y: number } | null>(null)
  const debounceRef  = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Memoised colour — only recomputes when deps change, not on every render
  const isHomepage = pathname === '/'
  const color = useMemo(
    () => isDragging ? '#34160f' : isHomepage ? '#F4F2ED' : '#E8331A',
    [isDragging, isHomepage]
  )

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    if (!mq.matches) return
    setHasPointer(true)

    // RAF-throttled mousemove: buffer position, flush on next animation frame
    const onMove = (e: MouseEvent) => {
      pendingPos.current = { x: e.clientX, y: e.clientY }
      if (rafRef.current !== null) return
      rafRef.current = requestAnimationFrame(() => {
        if (pendingPos.current) {
          mouseX.set(pendingPos.current.x)
          mouseY.set(pendingPos.current.y)
          setVisible(true)
          pendingPos.current = null
        }
        rafRef.current = null
      })
    }

    const onMouseLeaveWindow = () => setVisible(false)

    const onEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement
      if (target.dataset.drag !== undefined) {
        setIsDragging(true)
        setIsHovering(false)
      } else {
        setIsHovering(true)
        setIsDragging(false)
      }
    }
    const onLeave = (e: Event) => {
      const target = e.currentTarget as HTMLElement
      if (target.dataset.drag !== undefined) {
        setIsDragging(false)
      } else {
        setIsHovering(false)
      }
    }

    const attach = () => {
      document.querySelectorAll('a, button, [data-hover], [data-drag]').forEach(el => {
        if (attachedRef.current.has(el)) return
        attachedRef.current.add(el)
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    attach()

    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onMouseLeaveWindow)

    // Debounced MutationObserver: wait 150ms after last DOM change before re-attaching
    const observer = new MutationObserver(() => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(attach, 150)
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onMouseLeaveWindow)
      observer.disconnect()
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      if (debounceRef.current) clearTimeout(debounceRef.current)
      attachedRef.current.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
      attachedRef.current.clear()
    }
  }, [mouseX, mouseY])

  if (!hasPointer || pathname.startsWith('/admin')) return null

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          width: `${DOT}px`,
          height: `${DOT}px`,
          marginLeft: `${-DOT / 2}px`,
          marginTop: `${-DOT / 2}px`,
          background: color,
          borderRadius: '50%',
          opacity: visible ? 1 : 0,
        }}
        animate={{ scale: isDragging ? 1.5 : 1 }}
        transition={{ scale: { type: 'spring', stiffness: 300, damping: 25 } }}
      />

      {/* Flower */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          width: `${SIZE}px`,
          height: `${SIZE}px`,
          marginLeft: `${-SIZE / 2}px`,
          marginTop: `${-SIZE / 2}px`,
          opacity: visible ? 1 : 0,
        }}
        animate={{
          scale: isHovering ? 2.0 : isDragging ? 0.65 : 1,
          rotate: [0, 360],
        }}
        transition={{
          scale: { type: 'spring', stiffness: 300, damping: 25 },
          rotate: { repeat: Infinity, duration: 14, ease: 'linear' },
        }}
      >
        <FlowerIcon color={color} size={SIZE} />
      </motion.div>
    </>
  )
}
