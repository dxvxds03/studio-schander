'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1900)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#E8331A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.72, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Flower — spins + bounces */}
          <motion.img
            src="/flower.png"
            alt=""
            aria-hidden
            draggable={false}
            style={{ width: '140px', height: '140px', userSelect: 'none' }}
            initial={{ scale: 0.4, opacity: 0, rotate: 0 }}
            animate={{
              scale:   [0.4, 1.08, 1, 1.06, 1],
              opacity: [0,   1,    1, 1,    1],
              rotate:  [0, 60, 120, 200, 360],
            }}
            transition={{
              duration: 1.8,
              ease: 'easeOut',
              rotate: {
                duration: 1.8,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
