'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface Project {
  id: number
  title: string
  cover_image: string | null
  link: string | null
  tags: string[]
  year: number | null
  client: string | null
}

export default function StackedCards({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLElement>(null)
  const items = projects.filter(p => p.cover_image)
  const n = items.length

  useEffect(() => {
    if (!sectionRef.current || n === 0) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const section = sectionRef.current!
      const cards = gsap.utils.toArray<HTMLElement>('.sc-card', section)
      const total = cards.length

      // Set initial stacked offsets (cards peek from behind)
      cards.forEach((card, i) => {
        if (i > 0) {
          gsap.set(card, { scale: 1 - i * 0.04, y: i * 22 })
        }
      })

      // Animate each card
      cards.forEach((card, i) => {
        // Exit: flies up + fades
        if (i < total - 1) {
          gsap.to(card, {
            yPercent: -120,
            scale: 0.9,
            opacity: 0,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: section,
              start: `${(i / total) * 100}% top`,
              end: `${((i + 1) / total) * 100}% top`,
              scrub: true,
            },
          })
        }

        // Entry: scales up from stacked position to full
        if (i > 0) {
          gsap.to(card, {
            scale: 1,
            y: 0,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: section,
              start: `${((i - 1) / total) * 100}% top`,
              end: `${(i / total) * 100}% top`,
              scrub: true,
            },
          })
        }
      })

      ScrollTrigger.refresh()
    }, sectionRef)

    return () => ctx.revert()
  }, [n])

  if (n === 0) return null

  return (
    <section
      ref={sectionRef}
      style={{ height: `calc(${n + 1} * 100vh)`, position: 'relative' }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {items.map((project, i) => {
          const href = project.link ?? `/projects/${project.id}`
          const isExternal = !!project.link

          return (
            <a
              key={project.id}
              href={href}
              target={isExternal ? '_blank' : '_self'}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className="sc-card"
              data-hover
              style={{
                position: 'absolute',
                width: 'clamp(280px, 40vw, 540px)',
                aspectRatio: '3/4',
                zIndex: n - i,
                transformOrigin: 'center bottom',
                overflow: 'hidden',
                textDecoration: 'none',
                display: 'block',
              }}
            >
              <img
                src={project.cover_image!}
                alt={project.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                draggable={false}
              />

              {/* Gradient overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(25,25,23,0.9) 0%, rgba(25,25,23,0.25) 45%, transparent 72%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Card meta */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '1.75rem',
                  left: '1.75rem',
                  right: '1.75rem',
                }}
              >
                <span
                  style={{
                    display: 'block',
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    fontSize: '11px',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#34160f',
                    marginBottom: '6px',
                  }}
                >
                  {String(i + 1).padStart(2, '0')} —
                </span>

                <span
                  style={{
                    display: 'block',
                    fontFamily:
                      '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
                    fontWeight: 800,
                    fontSize: 'clamp(24px, 3.2vw, 44px)',
                    color: '#F4F2ED',
                    lineHeight: 1,
                    letterSpacing: '-0.025em',
                    marginBottom: '8px',
                  }}
                >
                  {project.title}
                </span>

                {project.tags && project.tags.length > 0 && (
                  <span
                    style={{
                      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                      fontSize: '10px',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'rgba(244,242,237,0.5)',
                    }}
                  >
                    {project.tags.slice(0, 2).join(' / ')}
                    {isExternal && (
                      <span style={{ color: '#E8331A', marginLeft: '6px' }}>↗</span>
                    )}
                  </span>
                )}
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}
