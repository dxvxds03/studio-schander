'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const SNOWFLAKE =
  'M 590.34375 264.089844 C 547.40625 264.089844 470.042969 280.609375 404.742188 296.9375 C 462.609375 262.507812 529.40625 219.65625 560.003906 189.0625 C 585.347656 163.699219 585.347656 122.6875 560.003906 97.34375 C 534.65625 72 493.632812 72 468.285156 97.34375 C 437.929688 127.683594 394.910156 194.054688 360.308594 251.75 C 376.910156 186.46875 393.835938 108.933594 393.835938 65.65625 C 393.835938 29.796875 364.808594 0.785156 328.960938 0.785156 C 293.101562 0.785156 264.089844 29.796875 264.089844 65.65625 C 264.089844 108.59375 280.609375 185.976562 296.9375 251.257812 C 262.507812 193.390625 219.65625 126.609375 189.0625 95.996094 C 163.714844 70.652344 122.6875 70.652344 97.34375 95.996094 C 72 121.34375 72 162.367188 97.34375 187.714844 C 127.683594 218.070312 194.054688 261.089844 251.75 295.691406 C 186.46875 279.105469 108.933594 262.183594 65.65625 262.183594 C 29.796875 262.183594 0.785156 291.191406 0.785156 327.039062 C 0.785156 362.898438 29.796875 391.910156 65.65625 391.910156 C 108.59375 391.910156 185.976562 375.390625 251.257812 359.0625 C 193.390625 393.492188 126.609375 436.34375 95.996094 466.957031 C 70.652344 492.300781 70.652344 533.3125 95.996094 558.65625 C 121.359375 584.019531 162.367188 584.019531 187.714844 558.65625 C 218.070312 528.316406 261.089844 461.945312 295.691406 404.25 C 279.105469 469.53125 262.183594 547.082031 262.183594 590.34375 C 262.183594 626.203125 291.191406 655.214844 327.039062 655.214844 C 362.898438 655.214844 391.910156 626.203125 391.910156 590.34375 C 391.910156 547.40625 375.410156 470.042969 359.0625 404.742188 C 393.492188 462.609375 436.34375 529.390625 466.957031 560.003906 C 492.300781 585.347656 533.328125 585.347656 558.671875 560.003906 C 584.019531 534.65625 584.019531 493.632812 558.671875 468.285156 C 528.316406 437.929688 461.945312 394.910156 404.25 360.308594 C 469.53125 376.910156 547.082031 393.835938 590.34375 393.835938 C 626.203125 393.835938 655.214844 364.808594 655.214844 328.960938 C 655.214844 293.101562 626.203125 264.089844 590.34375 264.089844 Z'

export default function CustomCursor() {
  const [visible, setVisible]     = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

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

  const color = isDragging ? '#E8581A' : '#0000CC'

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: dotX, y: dotY, opacity: visible ? 1 : 0 }}
        animate={{ scale: isDragging ? 1.5 : 1 }}
      >
        <div className="w-[5px] h-[5px] bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
      </motion.div>

      {/* Snowflake */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
        animate={{
          scale: isHovering ? 2.0 : isDragging ? 0.65 : 1,
          rotate: [0, 360],
        }}
        transition={{
          scale: { type: 'spring', stiffness: 300, damping: 25 },
          rotate: { repeat: Infinity, duration: 14, ease: 'linear' },
        }}
      >
        <svg
          viewBox="0 0 656 656"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width: '30px',
            height: '30px',
            display: 'block',
            transform: 'translate(-50%, -50%)',
            overflow: 'visible',
          }}
        >
          <path
            d={SNOWFLAKE}
            fill={color}
            style={{ transition: 'fill 0.25s ease' }}
          />
        </svg>
      </motion.div>
    </>
  )
}
