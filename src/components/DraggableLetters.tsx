'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const LETTERS = ['D', 'A', 'V', 'I', 'D']

const OFFSETS = [
  { y: 0, rotate: 0 },
  { y: -7, rotate: -0.9 },
  { y: 5, rotate: 0.7 },
  { y: -4, rotate: -0.6 },
  { y: 3, rotate: 1.0 },
]

function Letter({ char, index }: { char: string; index: number }) {
  const [dragging, setDragging] = useState(false)

  return (
    <motion.span
      data-drag
      drag
      dragSnapToOrigin
      dragElastic={0.35}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      initial={{ opacity: 0, y: -80 }}
      animate={{
        opacity: 1,
        y: OFFSETS[index].y,
        rotate: OFFSETS[index].rotate,
        color: dragging ? '#E8331A' : '#191917',
      }}
      transition={{
        opacity: { duration: 0.5, delay: 0.3 + index * 0.08 },
        y: { type: 'spring', stiffness: 120, damping: 18, delay: 0.3 + index * 0.08 },
        rotate: { duration: 0.5, delay: 0.3 + index * 0.08 },
        color: { duration: 0.15 },
      }}
      whileDrag={{ scale: 1.07 }}
      className="select-none"
      style={{
        display: 'inline-block',
        touchAction: 'none',
        fontFamily: '"Source Code Pro", monospace',
        fontWeight: 900,
        fontSize: 'clamp(70px, 13.5vw, 200px)',
        lineHeight: 0.88,
        letterSpacing: '-0.03em',
        cursor: dragging ? 'grabbing' : 'grab',
      }}
    >
      {char}
    </motion.span>
  )
}

export default function DraggableLetters() {
  return (
    <div className="flex items-baseline" style={{ gap: '0.01em' }}>
      {LETTERS.map((char, i) => (
        <Letter key={i} char={char} index={i} />
      ))}
    </div>
  )
}
