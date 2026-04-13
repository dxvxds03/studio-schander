'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const dotX = useSpring(mouseX, { stiffness: 900, damping: 40 })
  const dotY = useSpring(mouseY, { stiffness: 900, damping: 40 })
  const ringX = useSpring(mouseX, { stiffness: 180, damping: 24 })
  const ringY = useSpring(mouseY, { stiffness: 180, damping: 24 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const onEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement
      if (target.dataset.drag !== undefined) {
        setIsDragging(true)
      } else {
        setIsHovering(true)
      }
    }
    const onLeave = () => {
      setIsHovering(false)
      setIsDragging(false)
    }

    window.addEventListener('mousemove', onMove)

    const attachListeners = () => {
      document.querySelectorAll('a, button, [data-hover], [data-drag]').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    attachListeners()

    const observer = new MutationObserver(attachListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      observer.disconnect()
    }
  }, [mouseX, mouseY, visible])

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: dotX, y: dotY, opacity: visible ? 1 : 0 }}
        animate={{ scale: isDragging ? 1.5 : 1 }}
      >
        <div className="w-[6px] h-[6px] bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
      </motion.div>

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
        animate={{
          scale: isHovering ? 2.2 : isDragging ? 0.6 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <div
          className="w-8 h-8 rounded-full -translate-x-1/2 -translate-y-1/2 border transition-colors duration-300"
          style={{ borderColor: isDragging ? '#E8581A' : '#0000CC' }}
        />
      </motion.div>
    </>
  )
}
