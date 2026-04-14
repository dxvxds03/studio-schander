'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import FlowerIcon from './FlowerIcon'

const SIZE = 30   // snowflake px
const DOT  = 5    // dot px

export default function CustomCursor() {
  const [visible, setVisible]       = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  // Dot follows tightly; flower lags softly
  const dotX  = useSpring(mouseX, { stiffness: 900, damping: 40 })
  const dotY  = useSpring(mouseY, { stiffness: 900, damping: 40 })
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
      if (target.dataset.drag !== undefined) setIsDragging(true)
      else setIsHovering(true)
    }
    const onLeave = () => { setIsHovering(false); setIsDragging(false) }

    window.addEventListener('mousemove', onMove)

    const attach = () => {
      document.querySelectorAll('a, button, [data-hover], [data-drag]').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    attach()

    const observer = new MutationObserver(attach)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      observer.disconnect()
    }
  }, [mouseX, mouseY, visible])

  const color = isDragging ? '#34160f' : '#E8331A'

  return (
    <>
      {/* Dot — motion.div IS the dot; margin centers it on the cursor */}
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
          background: '#E8331A',
          borderRadius: '50%',
        }}
        animate={{ scale: isDragging ? 1.5 : 1 }}
        transition={{ scale: { type: 'spring', stiffness: 300, damping: 25 } }}
      />

      {/* Flower — explicit SIZE×SIZE div so Framer rotates around true center */}
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
