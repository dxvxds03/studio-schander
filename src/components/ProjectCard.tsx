'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface Project {
  id: number
  title: string
  year: number | null
  client: string | null
  cover_image: string | null
  featured: boolean
}

const ROTATIONS = [-1.8, 1.2, -0.6, 2.0, -1.3, 1.6, -0.9, 1.0]

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const rot = ROTATIONS[index % ROTATIONS.length]

  return (
    <Link href={`/projects/${project.id}`} data-hover>
      <motion.article
        className="group relative overflow-hidden bg-faint"
        initial={{ rotate: rot }}
        whileHover={{ rotate: 0, scale: 1.015 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      >
        <div className="relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
          {project.cover_image ? (
            <motion.img
              src={project.cover_image}
              alt={project.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ background: 'rgba(25,25,23,0.06)' }}>
              <span className="label" style={{ letterSpacing: '0.2em' }}>
                Kein Bild
              </span>
            </div>
          )}

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-end p-5"
            initial={{ background: 'rgba(25,25,23,0)' }}
            whileHover={{ background: 'rgba(25,25,23,0.72)' }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              {(project.year || project.client) && (
                <p className="label mb-2" style={{ color: 'rgba(244,242,237,0.6)' }}>
                  {project.year}{project.year && project.client ? ' — ' : ''}{project.client}
                </p>
              )}
              <h3
                className="text-display italic"
                style={{ color: '#F4F2ED', fontSize: 'clamp(18px, 2vw, 26px)', lineHeight: 1.15, letterSpacing: '-0.01em' }}
              >
                {project.title}
              </h3>
            </motion.div>
          </motion.div>
        </div>

        <div className="px-1 pt-3 pb-1">
          <p style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '13px', color: '#191917', letterSpacing: '-0.01em' }}>
            {project.title}
          </p>
          {project.year && <p className="label mt-0.5">{project.year}</p>}
        </div>
      </motion.article>
    </Link>
  )
}
