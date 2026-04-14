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
        overflow: 'hidden',
        background: 'var(--ink)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Navigation />

      {/* Polaroid — großes Querformat-Rechteck */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          margin: `61px clamp(20px, 2.5vw, 36px) clamp(14px, 1.8vw, 24px)`,
          background: 'var(--cream)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'clamp(24px, 3vw, 44px)',
          boxShadow: '0 20px 80px rgba(0,0,0,0.6)',
        }}
      >
        <h1
          style={{
            fontFamily: '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(56px, 13vw, 200px)',
            letterSpacing: '-0.05em',
            lineHeight: 0.88,
            color: 'var(--ink)',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          Alle<br />Projekte.
        </h1>
      </div>

      {/* Projekt-Carousel im schwarzen Bereich */}
      <div
        className="projekte-strip"
        style={{
          height: 'clamp(140px, 21vh, 190px)',
          display: 'flex',
          alignItems: 'flex-start',
          paddingTop: 'clamp(10px, 1.2vh, 16px)',
          paddingBottom: 'clamp(10px, 1.2vh, 16px)',
          paddingLeft: 'clamp(20px, 2.5vw, 36px)',
          paddingRight: 'clamp(20px, 2.5vw, 36px)',
          gap: 'clamp(8px, 1vw, 14px)',
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        } as React.CSSProperties}
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
                gap: '5px',
                width: 'clamp(62px, 8vw, 100px)',
              }}
            >
              <div
                style={{
                  aspectRatio: '3/4',
                  overflow: 'hidden',
                  background: '#2C2A27',
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
                ) : null}
              </div>

              <div>
                <p
                  style={{
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    fontSize: '9px',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: '#5A5856',
                    marginBottom: '2px',
                  }}
                >
                  [{index}]{project.year ? ` ${project.year}` : ''}
                </p>
                <p
                  style={{
                    fontFamily: '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
                    fontWeight: 800,
                    fontSize: 'clamp(10px, 1vw, 13px)',
                    letterSpacing: '-0.02em',
                    color: 'var(--cream)',
                    lineHeight: 1.1,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '100%',
                  }}
                >
                  {project.title}
                  {project.link && (
                    <span style={{ color: 'var(--negroni)', marginLeft: '3px', fontSize: '0.75em' }}>↗</span>
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
