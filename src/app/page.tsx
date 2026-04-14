import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import { supabase } from '@/lib/supabase'

export const revalidate = 0

const LEISTUNGEN = [
  {
    nr: '1',
    name: 'Ideen umsetzen',
    lines: [
      'Vom ersten Gedanken bis zum fertigen Produkt.',
      'Ich nehme was in meinem Kopf entsteht – und baue es.',
    ],
  },
  {
    nr: '2',
    name: 'Webentwicklung',
    lines: [
      'Websites und Web-Apps die funktionieren und gut aussehen.',
      'HTML, CSS, JavaScript. Eigene Projekte, Kundenprojekte, beides.',
    ],
  },
  {
    nr: '3',
    name: 'Design & Branding',
    lines: [
      'Visuelle Identitäten, Editorial Design, Magazingestaltung.',
      'Dinge die man ansieht und sofort weiß worum es geht.',
    ],
  },
  {
    nr: '4',
    name: 'Konzeption',
    lines: [
      'Bevor irgendetwas gebaut wird, muss es gedacht werden.',
      'Struktur, Strategie, Content – auch das ist Handwerk.',
    ],
  },
  {
    nr: '5',
    name: 'KI-Integration',
    lines: [
      'Ich arbeite täglich mit KI-Tools und setze sie sinnvoll ein.',
      'Prompt Engineering, AI-gestützte Workflows, eigene Produkte.',
    ],
  },
]

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

      {/* Leistungen */}
      <section
        id="leistungen"
        style={{
          paddingTop: 'clamp(96px, 14vw, 180px)',
          paddingBottom: 'clamp(32px, 5vw, 64px)',
          position: 'relative',
          zIndex: 46,
          background: 'var(--cream)',
          marginRight: 'clamp(160px, 20vw, 280px)',
        }}
      >
        <h2
          style={{
            fontFamily: '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(32px, 5.5vw, 80px)',
            letterSpacing: '-0.03em',
            lineHeight: 0.95,
            textTransform: 'uppercase',
            color: 'var(--ink)',
            padding: '0 clamp(16px, 2vw, 24px)',
            margin: '0 0 clamp(24px, 3.5vw, 48px) 0',
          }}
        >
          Was ich mache.
        </h2>
        {LEISTUNGEN.map((item, i) => (
          <div
            key={item.nr}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: 'clamp(16px, 3vw, 40px)',
              padding: `clamp(14px, 1.8vw, 24px) clamp(16px, 2vw, 24px)`,
              borderTop: '1px solid var(--faint)',
            }}
          >
            <h3
              style={{
                fontFamily: '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(26px, 5vw, 76px)',
                letterSpacing: '-0.04em',
                lineHeight: 0.92,
                color: 'var(--ink)',
                textTransform: 'uppercase',
                margin: 0,
                flex: 1,
              }}
            >
              ({item.nr}) {item.name}
            </h3>
            <div
              style={{
                flexShrink: 0,
                width: 'clamp(130px, 20%, 240px)',
                textAlign: 'right',
              }}
            >
              {item.lines.map((line, j) => (
                <p
                  key={j}
                  style={{
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    fontSize: 'clamp(12px, 1.1vw, 16px)',
                    lineHeight: 1.6,
                    color: 'var(--dead-poet)',
                    margin: 0,
                  }}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Kontakt */}
      <section
        style={{
          paddingTop: 'clamp(72px, 10vw, 140px)',
          paddingBottom: 'clamp(72px, 10vw, 140px)',
          paddingLeft: 'clamp(16px, 2vw, 24px)',
          paddingRight: 'clamp(176px, 22vw, 304px)',
          position: 'relative',
          zIndex: 46,
          background: 'var(--cream)',
        }}
      >
        <p
          style={{
            fontFamily: '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(36px, 7vw, 112px)',
            letterSpacing: '-0.04em',
            lineHeight: 1.0,
            color: 'var(--ink)',
            margin: 0,
          }}
        >
          Lass uns zusammen<br />
          Ideen umsetzen.<br />
          Nimm jetzt{' '}
          <a
            href="mailto:hello@davidschander.com"
            data-hover
            className="kontakt-link"
          >
            Kontakt
          </a>
          {' '}auf.
        </p>
      </section>

      {/* Brand colors */}
      <section
        style={{
          display: 'flex',
          minHeight: '280px',
          marginTop: 'clamp(56px, 8vw, 112px)',
          position: 'relative',
          zIndex: 46,
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: '#34160f',
            padding: 'clamp(24px, 4vw, 56px)',
          }}
        >
          <span
            style={{
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              fontSize: '10px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(244,242,237,0.45)',
            }}
          >
            01 — Primärfarbe
          </span>
          <div>
            <p
              style={{
                fontFamily:
                  '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(40px, 7vw, 96px)',
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
                fontSize: '12px',
                color: 'rgba(244,242,237,0.5)',
                marginTop: '8px',
                letterSpacing: '0.06em',
              }}
            >
              #34160f
            </p>
          </div>
        </div>

        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: '#E8331A',
            padding: 'clamp(24px, 4vw, 56px)',
          }}
        >
          <span
            style={{
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              fontSize: '10px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(244,242,237,0.45)',
            }}
          >
            02 — Sekundärfarbe
          </span>
          <div>
            <p
              style={{
                fontFamily:
                  '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(40px, 7vw, 96px)',
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
                fontSize: '12px',
                color: 'rgba(244,242,237,0.5)',
                marginTop: '8px',
                letterSpacing: '0.06em',
              }}
            >
              #E8331A
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: 'clamp(28px, 4vw, 56px) clamp(16px, 2vw, 24px)',
          position: 'relative',
          zIndex: 46,
          background: 'var(--cream)',
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
                fontFamily:
                  '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(24px, 4vw, 56px)',
                letterSpacing: '-0.04em',
                lineHeight: 1,
                color: 'var(--ink)',
              }}
            >
              Studio Schander
            </p>
            <p
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontSize: '12px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginTop: '8px',
              }}
            >
              Design & Direction · Bielefeld
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '10px',
            }}
          >
            <div style={{ display: 'flex', gap: '20px' }}>
              <a
                href="/impressum"
                data-hover
                style={{
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  fontSize: '12px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  textDecoration: 'none',
                }}
              >
                Impressum
              </a>
              <a
                href="/datenschutz"
                data-hover
                style={{
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  fontSize: '12px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  textDecoration: 'none',
                }}
              >
                Datenschutz
              </a>
            </div>
            <p
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontSize: '11px',
                color: 'var(--muted)',
              }}
            >
              © {new Date().getFullYear()} David Schander
            </p>
            <a
              href="/admin"
              data-hover
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontSize: '11px',
                color: 'var(--faint)',
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
