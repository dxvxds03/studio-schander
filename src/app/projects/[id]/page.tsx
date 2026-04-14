import { notFound } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'

export const revalidate = 0

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('id', parseInt(params.id))
    .single()

  if (!project) notFound()

  const images: string[] = project.images ?? []
  const tags: string[] = project.tags ?? []
  const allImages = [project.cover_image, ...images].filter(Boolean) as string[]

  return (
    <main style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <Navigation />

      {/* Hero image */}
      {project.cover_image && (
        <div
          className="project-hero-img"
          style={{
            marginTop: '61px',
            width: '100%',
            overflow: 'hidden',
            maxHeight: '75vh',
          }}
        >
          <img
            src={project.cover_image}
            alt={project.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              maxHeight: '75vh',
            }}
          />
        </div>
      )}

      {/* Title + meta */}
      <section
        className="project-detail-grid"
        style={{
          padding: 'clamp(40px, 6vw, 80px) clamp(16px, 2vw, 24px) 0',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 'clamp(24px, 4vw, 64px)',
          alignItems: 'flex-start',
        }}
      >
        <div>
          {/* Back link */}
          <a
            href="/projekte"
            data-hover
            style={{
              fontFamily: '"Source Code Pro", monospace',
              fontSize: 'clamp(10px, 0.85vw, 12px)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              textDecoration: 'none',
              display: 'inline-block',
              marginBottom: 'clamp(20px, 3vw, 40px)',
            }}
          >
            ← Alle Projekte
          </a>

          <h1
            style={{
              fontFamily: '"Cabinet Grotesk", "Source Code Pro", monospace',
              fontWeight: 800,
              fontSize: 'clamp(40px, 8vw, 120px)',
              letterSpacing: '-0.045em',
              lineHeight: 0.9,
              color: 'var(--ink)',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            {project.title}
          </h1>

          {project.description && (
            <p
              style={{
                fontFamily: '"Source Code Pro", monospace',
                fontSize: 'clamp(13px, 1.1vw, 16px)',
                lineHeight: 1.75,
                color: 'var(--muted)',
                marginTop: 'clamp(20px, 3vw, 36px)',
                maxWidth: '56ch',
              }}
            >
              {project.description}
            </p>
          )}
        </div>

        {/* Meta sidebar */}
        <div
          className="project-meta"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            alignItems: 'flex-end',
            textAlign: 'right',
            paddingTop: 'clamp(48px, 7vw, 80px)',
            flexShrink: 0,
          }}
        >
          {project.year && (
            <div>
              <p
                style={{
                  fontFamily: '"Source Code Pro", monospace',
                  fontSize: '10px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  marginBottom: '4px',
                }}
              >
                Jahr
              </p>
              <p
                style={{
                  fontFamily: '"Cabinet Grotesk", "Source Code Pro", monospace',
                  fontWeight: 800,
                  fontSize: 'clamp(18px, 2vw, 28px)',
                  letterSpacing: '-0.02em',
                  color: 'var(--ink)',
                }}
              >
                {project.year}
              </p>
            </div>
          )}

          {project.client && (
            <div>
              <p
                style={{
                  fontFamily: '"Source Code Pro", monospace',
                  fontSize: '10px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  marginBottom: '4px',
                }}
              >
                Kunde
              </p>
              <p
                style={{
                  fontFamily: '"Cabinet Grotesk", "Source Code Pro", monospace',
                  fontWeight: 800,
                  fontSize: 'clamp(18px, 2vw, 28px)',
                  letterSpacing: '-0.02em',
                  color: 'var(--ink)',
                }}
              >
                {project.client}
              </p>
            </div>
          )}

          {tags.length > 0 && (
            <div>
              <p
                style={{
                  fontFamily: '"Source Code Pro", monospace',
                  fontSize: '10px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  marginBottom: '8px',
                }}
              >
                Tags
              </p>
              <div
                className="flex-end-tags"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'flex-end',
                  gap: '6px',
                }}
              >
                {tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: '"Source Code Pro", monospace',
                      fontSize: '10px',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--dead-poet)',
                      border: '1px solid var(--dead-poet)',
                      padding: '3px 8px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="btn-negroni"
              style={{
                fontSize: '12px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '10px 20px',
              }}
            >
              Projekt ansehen ↗
            </a>
          )}
        </div>
      </section>

      {/* Additional images */}
      {allImages.length > 1 && (
        <section
          style={{
            padding: 'clamp(40px, 6vw, 80px) clamp(16px, 2vw, 24px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 480px), 1fr))',
            gap: 'clamp(12px, 1.5vw, 20px)',
          }}
        >
          {allImages.slice(1).map((src, i) => (
            <div key={i} style={{ overflow: 'hidden' }}>
              <img
                src={src}
                alt={`${project.title} — ${i + 2}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
                className="img-hover"
              />
            </div>
          ))}
        </section>
      )}

      <Footer />
    </main>
  )
}
