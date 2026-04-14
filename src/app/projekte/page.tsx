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
    <main>
      <Navigation />

      <section
        style={{
          paddingTop: 'calc(61px + clamp(40px, 6vw, 80px))',
          padding: 'calc(61px + clamp(40px, 6vw, 80px)) clamp(20px, 2.5vw, 32px) clamp(56px, 8vw, 112px)',
        }}
      >
        <h1
          style={{
            fontFamily: '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(36px, 6vw, 88px)',
            letterSpacing: '-0.045em',
            lineHeight: 1,
            color: 'var(--ink)',
            marginBottom: 'clamp(32px, 5vw, 64px)',
          }}
        >
          Alle Projekte.
        </h1>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(220px, 28vw, 360px), 1fr))',
            gap: 'clamp(16px, 2vw, 28px)',
          }}
        >
          {all.map((project) => {
            const href = project.link ?? `/projects/${project.id}`
            const isExternal = !!project.link

            return (
              <a
                key={project.id}
                href={href}
                target={isExternal ? '_blank' : '_self'}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                data-hover
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <div
                  style={{
                    overflow: 'hidden',
                    background: 'var(--faint)',
                    aspectRatio: '4/3',
                  }}
                >
                  {project.cover_image ? (
                    <img
                      src={project.cover_image}
                      alt={project.title}
                      draggable={false}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      }}
                      onMouseEnter={e => { (e.target as HTMLImageElement).style.transform = 'scale(1.04)' }}
                      onMouseLeave={e => { (e.target as HTMLImageElement).style.transform = 'scale(1)' }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: 'var(--faint)' }} />
                  )}
                </div>
                <div style={{ paddingTop: '10px' }}>
                  <p
                    style={{
                      fontFamily: '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
                      fontWeight: 800,
                      fontSize: 'clamp(16px, 1.8vw, 22px)',
                      letterSpacing: '-0.03em',
                      color: 'var(--ink)',
                      lineHeight: 1.1,
                    }}
                  >
                    {project.title}
                    {project.link && (
                      <span style={{ color: 'var(--negroni)', marginLeft: '6px', fontSize: '0.7em' }}>↗</span>
                    )}
                  </p>
                  {(project.year || project.client) && (
                    <p
                      style={{
                        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                        fontSize: '11px',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'var(--muted)',
                        marginTop: '4px',
                      }}
                    >
                      {[project.year, project.client].filter(Boolean).join(' — ')}
                    </p>
                  )}
                </div>
              </a>
            )
          })}
        </div>
      </section>
    </main>
  )
}
