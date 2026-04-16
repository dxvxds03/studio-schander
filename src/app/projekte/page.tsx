import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ClientBadge from '@/components/ClientBadge'
import { supabase } from '@/lib/supabase'

export const revalidate = 0

export const metadata: Metadata = {
  title: 'Projekte',
  description: 'Alle Arbeiten von Studio Schander — Branding, Webentwicklung, Editorial Design & Konzeption.',
  openGraph: {
    title: 'Projekte — Studio Schander',
    description: 'Alle Arbeiten von Studio Schander — Branding, Webentwicklung, Editorial Design & Konzeption.',
    url: 'https://studio-schander.de/projekte',
  },
  twitter: {
    title: 'Projekte — Studio Schander',
    description: 'Alle Arbeiten von Studio Schander — Branding, Webentwicklung, Editorial Design & Konzeption.',
  },
}

export default async function ProjektePage() {
  const { data: projects } = await supabase
    .from('projects')
    .select('id, slug, title, cover_image, link, year, client, tags, project_type, quote, show_quote_on_list')
    .order('order', { ascending: true })
    .order('created_at', { ascending: false })

  const all = projects ?? []

  return (
    <main style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <Navigation />

      {/* Page header */}
      <section
        style={{
          paddingTop: '61px',
          paddingLeft: 'clamp(16px, 2vw, 24px)',
          paddingRight: 'clamp(16px, 2vw, 24px)',
        }}
      >
        <div
          className="projekte-header"
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '24px',
            borderBottom: '1px solid var(--faint)',
            paddingTop: 'clamp(48px, 8vw, 112px)',
            paddingBottom: 'clamp(24px, 3vw, 40px)',
          }}
        >
          <h1
            style={{
              fontFamily: '"Cabinet Grotesk", "Source Code Pro", monospace',
              fontWeight: 800,
              fontSize: 'clamp(40px, 12vw, 160px)',
              letterSpacing: '-0.045em',
              lineHeight: 0.88,
              color: 'var(--ink)',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            Alle<br />Projekte.
          </h1>
          <p
            style={{
              fontFamily: '"Source Code Pro", monospace',
              fontSize: 'clamp(11px, 0.9vw, 13px)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: '8px',
              flexShrink: 0,
              whiteSpace: 'nowrap',
            }}
          >
            {all.length} Arbeiten
          </p>
        </div>
      </section>

      {/* Project list */}
      <section
        style={{
          paddingLeft: 'clamp(16px, 2vw, 24px)',
          paddingRight: 'clamp(16px, 2vw, 24px)',
          paddingBottom: 'clamp(64px, 10vw, 120px)',
        }}
      >
        {all.map((project, i) => {
          const href = project.link ?? `/projekte/${project.slug}`
          const isExternal = !!project.link

          return (
            <a
              key={project.id}
              href={href}
              target={isExternal ? '_blank' : '_self'}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              data-hover
              className="projekte-row"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 'clamp(16px, 3vw, 48px)',
                padding: `clamp(14px, 1.8vw, 24px) 0`,
                borderBottom: '1px solid var(--faint)',
              }}
            >
              {/* Left: badge + title */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ marginBottom: '6px' }}>
                  <ClientBadge
                    projectType={(project.project_type as 'client' | 'schander' | 'personal' | null) ?? null}
                    client={project.client ?? null}
                    variant="dark"
                    size="md"
                  />
                </div>
                <h2
                  className="projekte-title"
                  style={{
                    fontFamily:
                      '"Cabinet Grotesk", "Source Code Pro", monospace',
                    fontWeight: 800,
                    fontSize: 'clamp(22px, 4vw, 64px)',
                    letterSpacing: '-0.04em',
                    lineHeight: 0.92,
                    color: 'var(--ink)',
                    textTransform: 'uppercase',
                    margin: 0,
                    transition: 'color 0.18s ease',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {project.title}
                  {isExternal && (
                    <span
                      style={{
                        color: 'var(--dead-poet)',
                        fontSize: '0.55em',
                        marginLeft: '0.2em',
                      }}
                    >
                      ↗
                    </span>
                  )}
                </h2>
                {project.show_quote_on_list && project.quote && (
                  <p
                    style={{
                      fontFamily: '"Cabinet Grotesk", "Helvetica Neue", sans-serif',
                      fontWeight: 400,
                      fontStyle: 'italic',
                      fontSize: 'clamp(15px, 1.8vw, 28px)',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.3,
                      color: 'var(--ink)',
                      marginTop: 'clamp(6px, 0.7vw, 12px)',
                      maxWidth: '36ch',
                    }}
                  >
                    <span style={{ fontStyle: 'normal', fontWeight: 800, marginRight: '0.1em', color: 'var(--ink)' }}>"</span>
                    {project.quote}
                  </p>
                )}
              </div>

              {/* Right: thumbnail */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(16px, 2.5vw, 36px)',
                  flexShrink: 0,
                }}
              >
                {project.cover_image && (
                  <img
                    src={project.cover_image}
                    alt={project.title}
                    draggable={false}
                    style={{
                      height: 'clamp(64px, 9vw, 130px)',
                      width: 'auto',
                      display: 'block',
                      flexShrink: 0,
                      transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    }}
                  />
                )}
              </div>
            </a>
          )
        })}
      </section>

      <Footer />
    </main>
  )
}
