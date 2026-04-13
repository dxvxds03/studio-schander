'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import ProjectCard from './ProjectCard'

interface Project {
  id: number
  title: string
  year: number | null
  client: string | null
  cover_image: string | null
  featured: boolean
}

const SPANS = [2, 1, 1, 1, 2, 1, 1, 1, 2]

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  if (projects.length === 0) {
    return (
      <section id="work" className="px-8 md:px-14 lg:px-20 py-28">
        <SectionHeader inView count={0} />
        <div className="mt-20 py-24 flex flex-col items-center gap-3">
          <p className="font-display" style={{ fontSize: '20px', fontWeight: 700, color: 'rgba(25,25,23,0.35)', letterSpacing: '-0.02em' }}>
            Noch keine Projekte.
          </p>
          <a href="/admin" className="label label-bracket hover:text-negroni transition-colors" data-hover>
            Admin
          </a>
        </div>
      </section>
    )
  }

  return (
    <section id="work" ref={ref} className="px-8 md:px-14 lg:px-20 py-28">
      <SectionHeader inView={inView} count={projects.length} />
      <div className="mt-10 grid gap-5 md:gap-7" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            style={{ gridColumn: `span ${Math.min(SPANS[i % SPANS.length], 3)}` }}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <ProjectCard project={project} index={i} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function SectionHeader({ inView, count }: { inView: boolean; count: number }) {
  return (
    <motion.div
      className="flex items-end justify-between border-b border-faint pb-5"
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55 }}
    >
      <div>
        <span className="label label-bracket">Ausgewählte Arbeiten</span>
        <div className="mt-2 flex items-baseline gap-3">
          <h2
            className="font-display text-ink"
            style={{ fontSize: 'clamp(32px, 5vw, 66px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1 }}
          >
            Projekte
          </h2>
          {count > 0 && (
            <span style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '12px', color: '#787672' }}>
              ({count})
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
