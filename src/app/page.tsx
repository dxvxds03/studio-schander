import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import ProjectsGrid from '@/components/ProjectsGrid'
import { supabase } from '@/lib/supabase'

export const revalidate = 0

export default async function HomePage() {
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('order', { ascending: true })
    .order('created_at', { ascending: false })

  const all = projects ?? []

  return (
    <main>
      <Navigation />
      <HeroSection projects={all} />

      {/* About */}
      <section
        style={{
          borderTop: '2px solid #191917',
          borderBottom: '2px solid #191917',
          padding: 'clamp(64px, 9vw, 128px) clamp(32px, 5vw, 80px)',
        }}
      >
        <div style={{ maxWidth: '960px' }}>
          <p
            style={{
              fontFamily: '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(30px, 4.8vw, 68px)',
              letterSpacing: '-0.035em',
              lineHeight: 1.04,
              color: '#191917',
              marginBottom: 'clamp(28px, 3vw, 48px)',
            }}
          >
            Ich mache einfach,<br />was mir in den Kopf kommt.
          </p>

          <p
            style={{
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              fontSize: 'clamp(15px, 1.3vw, 18px)',
              lineHeight: 1.65,
              color: '#191917',
              maxWidth: '640px',
              marginBottom: 'clamp(36px, 4vw, 56px)',
            }}
          >
            Ich bin David. Ich designe, fotografiere, entwickle Webseiten und mache Editorial Design&nbsp;– meistens alles gleichzeitig.
            <br /><br />
            Angefangen hat es vor 6 Jahren mit einer Idee. Inzwischen sind es viele: Lernmaterialien auf Eduki, AI Prompts auf Promptbase, ein eigener Kochblog, Medienarbeit für Gastronomie&nbsp;– und was auch immer als nächstes kommt.
            <br /><br />
            Hintergrund in Informatik, Digitalisierung & digitalem Marketing.
          </p>

          <a
            href="mailto:hello@davidschander.com"
            className="btn-negroni"
            data-hover
            style={{
              fontSize: 'clamp(16px, 1.6vw, 22px)',
              padding: 'clamp(12px, 1.2vw, 18px) clamp(24px, 2.4vw, 36px)',
            }}
          >
            Du hast auch eine Idee?&nbsp;↗
          </a>
        </div>
      </section>

      <ProjectsGrid projects={all} />

      {/* Brand colors */}
      <section style={{ display: 'flex', minHeight: '340px' }}>
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: '#E8581A',
            padding: 'clamp(32px, 5vw, 72px)',
          }}
        >
          <span
            style={{
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(244,242,237,0.45)',
            }}
          >
            01 — Primärfarbe
          </span>
          <div>
            <p
              style={{
                fontFamily: '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(44px, 8vw, 112px)',
                color: '#F4F2ED',
                lineHeight: 1,
                letterSpacing: '-0.04em',
              }}
            >
              Negroni
            </p>
            <p
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontSize: '13px',
                color: 'rgba(244,242,237,0.5)',
                marginTop: '10px',
                letterSpacing: '0.06em',
              }}
            >
              #E8581A
            </p>
          </div>
        </div>

        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: '#0000CC',
            padding: 'clamp(32px, 5vw, 72px)',
          }}
        >
          <span
            style={{
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(244,242,237,0.45)',
            }}
          >
            02 — Sekundärfarbe
          </span>
          <div>
            <p
              style={{
                fontFamily: '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(44px, 8vw, 112px)',
                color: '#F4F2ED',
                lineHeight: 1,
                letterSpacing: '-0.04em',
              }}
            >
              Dead Poet
            </p>
            <p
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontSize: '13px',
                color: 'rgba(244,242,237,0.5)',
                marginTop: '10px',
                letterSpacing: '0.06em',
              }}
            >
              #0000CC
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: '2px solid #191917',
          padding: 'clamp(32px, 5vw, 72px) clamp(32px, 5vw, 80px)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '32px',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <p
              style={{
                fontFamily: '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(28px, 5vw, 64px)',
                letterSpacing: '-0.04em',
                lineHeight: 1,
                color: '#191917',
              }}
            >
              Studio Schander
            </p>
            <p
              style={{
                fontFamily: '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: 700,
                fontSize: '14px',
                letterSpacing: '-0.01em',
                color: '#787672',
                marginTop: '8px',
              }}
            >
              Design & Direction · Bielefeld
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '24px' }}>
              <a
                href="/impressum"
                data-hover
                style={{
                  fontFamily: '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
                  fontWeight: 700,
                  fontSize: '14px',
                  letterSpacing: '-0.01em',
                  color: '#191917',
                  textDecoration: 'none',
                }}
              >
                Impressum
              </a>
              <a
                href="/datenschutz"
                data-hover
                style={{
                  fontFamily: '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
                  fontWeight: 700,
                  fontSize: '14px',
                  letterSpacing: '-0.01em',
                  color: '#191917',
                  textDecoration: 'none',
                }}
              >
                Datenschutz
              </a>
            </div>
            <p
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontSize: '12px',
                color: '#787672',
              }}
            >
              © {new Date().getFullYear()} David Schander
            </p>
            <a
              href="/admin"
              data-hover
              style={{
                fontFamily: '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: 700,
                fontSize: '13px',
                letterSpacing: '-0.01em',
                color: '#787672',
                textDecoration: 'none',
              }}
            >
              Admin
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
