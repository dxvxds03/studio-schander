import Navigation from '@/components/Navigation'
import { supabase } from '@/lib/supabase'

export const revalidate = 0

export default async function ProjektePage() {
  const { data: projects } = await supabase
    .from('projects')
    .select('id, title, cover_image, link, year, client, tags')
    .order('order', { ascending: true })
    .order('created_at', { ascending: false })

  const all = projects ?? []

  return (
    <main
      style={{
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        background: 'var(--cream)',
      }}
    >
      <Navigation />

      {/* Heading */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '0 clamp(20px, 2.5vw, 32px)',
          paddingBottom: 'clamp(24px, 3vw, 40px)',
        }}
      >
        <h1
          style={{
            fontFamily: '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(52px, 10vw, 148px)',
            letterSpacing: '-0.045em',
            lineHeight: 0.92,
            color: 'var(--ink)',
          }}
        >
          Alle<br />Projekte.
        </h1>
      </div>

      {/* Horizontal film strip */}
      <div
        style={{
          display: 'flex',
          gap: 'clamp(10px, 1.2vw, 16px)',
          overflowX: 'auto',
          overflowY: 'hidden',
          padding: '0 clamp(20px, 2.5vw, 32px) clamp(28px, 3.5vw, 48px)',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        className="projekte-strip"
      >
        {all.map((project, i) => {
          const href = project.link ?? `/projects/${project.id}`
          const isExternal = !!project.link
          const index = String(i + 1).padStart(3, '0')

          return (
            <a
              key={project.id}
              href={href}
              target={isExternal ? '_blank' : '_self'}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              data-hover
              style={{
                flexShrink: 0,
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                width: 'clamp(120px, 14vw, 200px)',
              }}
            >
              <div
                style={{
                  overflow: 'hidden',
                  background: 'var(--faint)',
                  aspectRatio: '3/4',
                }}
              >
                {project.cover_image ? (
                  <img
                    src={project.cover_image}
                    alt={project.title}
                    draggable={false}
                    className="img-hover"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'var(--faint)' }} />
                )}
              </div>

              <div>
                <p
                  style={{
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    fontSize: '10px',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                    marginBottom: '3px',
                  }}
                >
                  [{index}]{project.year ? ` ${project.year}` : ''}
                </p>
                <p
                  style={{
                    fontFamily: '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
                    fontWeight: 800,
                    fontSize: 'clamp(12px, 1.1vw, 15px)',
                    letterSpacing: '-0.025em',
                    color: 'var(--ink)',
                    lineHeight: 1.1,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '100%',
                  }}
                >
                  {project.title}
                  {project.link && (
                    <span style={{ color: 'var(--negroni)', marginLeft: '4px', fontSize: '0.75em' }}>↗</span>
                  )}
                </p>
              </div>
            </a>
          )
        })}
      </div>
    </main>
  )
}
