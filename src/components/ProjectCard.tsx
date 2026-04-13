'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState, useRef } from 'react'

interface Project {
  id: number
  title: string
  year: number | null
  client: string | null
  cover_image: string | null
  images: string[]
  featured: boolean
}

const ROTATIONS = [-1.8, 1.2, -0.6, 2.0, -1.3, 1.6, -0.9, 1.0]

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const rot = ROTATIONS[index % ROTATIONS.length]
  const [imgIndex, setImgIndex] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval>>()

  const allImages = [project.cover_image, ...(project.images ?? [])].filter(Boolean) as string[]
  const currentImage = allImages[imgIndex] ?? null

  const handleHoverStart = () => {
    if (allImages.length > 1) {
      intervalRef.current = setInterval(() => {
        setImgIndex(i => (i + 1) % allImages.length)
      }, 1400)
    }
  }

  const handleHoverEnd = () => {
    clearInterval(intervalRef.current)
    setImgIndex(0)
  }

  return (
    <Link href={`/projects/${project.id}`} data-hover>
      <motion.article
        className="group relative overflow-hidden bg-faint"
        initial={{ rotate: rot }}
        whileHover={{ rotate: 0, scale: 1.015 }}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      >
        <div className="relative overflow-hidden">
          {currentImage ? (
            <AnimatePresence mode="wait">
              <motion.img
                key={imgIndex}
                src={currentImage}
                alt={project.title}
                style={{ width: '100%', height: 'auto', display: 'block' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
          ) : (
            <div
              style={{
                width: '100%',
                aspectRatio: '4/5',
                background: 'rgba(25,25,23,0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                className="font-display"
                style={{ fontWeight: 700, fontSize: '13px', color: '#787672', letterSpacing: '-0.01em' }}
              >
                Kein Bild
              </span>
            </div>
          )}

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-end p-5"
            initial={{ background: 'rgba(25,25,23,0)' }}
            whileHover={{ background: 'rgba(25,25,23,0.8)' }}
            transition={{ duration: 0.28 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22 }}
            >
              {(project.year || project.client) && (
                <p
                  style={{
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(244,242,237,0.5)',
                    marginBottom: '6px',
                  }}
                >
                  {project.year}{project.year && project.client ? ' — ' : ''}{project.client}
                </p>
              )}
              <h3
                className="font-display"
                style={{
                  color: '#F4F2ED',
                  fontSize: 'clamp(18px, 2.2vw, 30px)',
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: '-0.025em',
                }}
              >
                {project.title}
              </h3>
              {allImages.length > 1 && (
                <p
                  style={{
                    color: 'rgba(244,242,237,0.35)',
                    fontSize: '10px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginTop: '8px',
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  }}
                >
                  {imgIndex + 1} / {allImages.length}
                </p>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Below image */}
        <div className="px-1 pt-4 pb-2">
          <p
            className="font-display"
            style={{
              fontSize: 'clamp(15px, 1.5vw, 20px)',
              fontWeight: 700,
              color: '#191917',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            {project.title}
          </p>
          {project.year && (
            <p
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontSize: '12px',
                color: '#787672',
                marginTop: '3px',
              }}
            >
              {project.year}
            </p>
          )}
        </div>
      </motion.article>
    </Link>
  )
}
