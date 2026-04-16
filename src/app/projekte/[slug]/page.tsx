import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ProjectPinboard from '@/components/ProjectPinboard'
import ClientBadge from '@/components/ClientBadge'
import { supabase } from '@/lib/supabase'
import Arrow from '@/components/Arrow'

export const revalidate = 0

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const { data: project } = await supabase
    .from('projects')
    .select('title, description, cover_image, year, client, tags')
    .eq('slug', params.slug)
    .single()

  if (!project) return {}

  // title uses the root layout template: "Projektname — Studio Schander"
  const pageTitle = project.title
  const description = project.description
    ?? `${project.title}${project.year ? ` (${project.year})` : ''}${project.client ? ` · ${project.client}` : ''} — Ausgewählte Arbeit von Studio Schander.`

  const ogImages = project.cover_image
    ? [{ url: project.cover_image, width: 1200, height: 630, alt: project.title }]
    : [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Studio Schander' }]

  return {
    title: pageTitle,
    description,
    openGraph: {
      title: `${pageTitle} — Studio Schander`,
      description,
      images: ogImages,
      type: 'article',
      url: `https://studio-schander.de/projekte/${params.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${pageTitle} — Studio Schander`,
      description,
      images: [ogImages[0].url],
    },
  }
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!project) notFound()

  const images: string[] = project.images ?? []
  const tags: string[] = project.tags ?? []
  const allImages = [project.cover_image, ...images].filter(Boolean) as string[]

  return (
    <main style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <Navigation />

      {/* Pinboard */}
      {allImages.length > 0 && (
        <ProjectPinboard images={allImages} title={project.title} />
      )}

      {/* Title + meta */}
      <section
        className="project-detail-grid"
        style={{
          padding: 'clamp(40px, 6vw, 80px) clamp(16px, 2vw, 24px) clamp(64px, 10vw, 120px)',
          display: 'grid',
          gridTemplateColumns: '1fr minmax(min-content, min(340px, 38%))',
          gap: 'clamp(24px, 4vw, 64px)',
          alignItems: 'flex-start',
        }}
      >
        {/* Left: title + description */}
        <div style={{ minWidth: 0 }}>
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
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: 'clamp(20px, 3vw, 40px)',
              padding: '8px 0',
            }}
          >
            <Arrow direction="left" size={14} /> Alle Projekte
          </a>

          <h1
            style={{
              fontFamily: '"Cabinet Grotesk", "Source Code Pro", monospace',
              fontWeight: 800,
              fontSize: 'clamp(40px, 8vw, 120px)',
              letterSpacing: '-0.045em',
              lineHeight: 0.92,
              color: 'var(--ink)',
              textTransform: 'uppercase',
              margin: 0,
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
              hyphens: 'auto',
            }}
            lang="de"
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

          {(project.project_type || project.client) && (
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
                {project.project_type === 'client' ? 'Kunde' : 'Projekt'}
              </p>
              <ClientBadge
                projectType={project.project_type ?? null}
                client={project.client ?? null}
                variant="dark"
                size="md"
              />
            </div>
          )}

          {tags.length > 0 && (
            <div style={{ maxWidth: '100%' }}>
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
                  maxWidth: '100%',
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
                      padding: '4px 8px',
                      lineHeight: 1.4,
                      whiteSpace: 'nowrap',
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

      {/* Quote section */}
      {project.quote && (
        <section
          style={{
            padding: 'clamp(48px, 8vw, 120px) clamp(16px, 2vw, 24px)',
            borderTop: '1px solid var(--faint)',
            maxWidth: '900px',
          }}
        >
          <p
            style={{
              fontFamily: '"Cabinet Grotesk", "Helvetica Neue", sans-serif',
              fontWeight: 400,
              fontStyle: 'italic',
              fontSize: 'clamp(22px, 3.5vw, 52px)',
              letterSpacing: '-0.02em',
              lineHeight: 1.3,
              color: 'var(--ink)',
              margin: 0,
            }}
          >
            <span
              style={{
                color: 'var(--dead-poet)',
                fontStyle: 'normal',
                fontWeight: 800,
                marginRight: '0.15em',
                fontSize: '1.1em',
                lineHeight: 1,
              }}
            >
              "
            </span>
            {project.quote}
          </p>
        </section>
      )}

      <Footer />
    </main>
  )
}
