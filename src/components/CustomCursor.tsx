'use client'

import { useEffect, useRef, useState } from 'react'
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

  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  const dotX  = useSpring(mouseX, { stiffness: 900, damping: 40 })
  const dotY  = useSpring(mouseY, { stiffness: 900, damping: 40 })
  const ringX = useSpring(mouseX, { stiffness: 180, damping: 24 })
  const ringY = useSpring(mouseY, { stiffness: 180, damping: 24 })

  // Track attached elements to avoid duplicate listeners
  const attachedRef = useRef<Set<Element>>(new Set())

  useEffect(() => {
    // Only render on true pointer devices
    const mq = window.matchMedia('(pointer: fine)')
    if (!mq.matches) return
    setHasPointer(true)

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setVisible(true)
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

    window.addEventListener('mousemove', onMove)
    document.documentElement.addEventListener('mouseleave', onMouseLeaveWindow)

    const observer = new MutationObserver(attach)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onMouseLeaveWindow)
      observer.disconnect()
      // Clean up all attached element listeners
      attachedRef.current.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
      attachedRef.current.clear()
    }
  }, [mouseX, mouseY])

  if (!hasPointer || pathname.startsWith('/admin')) return null

  const isHomepage = pathname === '/'
  const color = isDragging ? '#34160f' : isHomepage ? '#F4F2ED' : '#E8331A'

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          opacity: visible ? 1 : 0,
          width: `${DOT}px`,
          height: `${DOT}px`,
          marginLeft: `${-DOT / 2}px`,
          marginTop: `${-DOT / 2}px`,
          background: color,
          borderRadius: '50%',
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
          opacity: visible ? 1 : 0,
          width: `${SIZE}px`,
          height: `${SIZE}px`,
          marginLeft: `${-SIZE / 2}px`,
          marginTop: `${-SIZE / 2}px`,
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
