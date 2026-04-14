import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import { supabase } from '@/lib/supabase'

export const revalidate = 0

const LEISTUNGEN = [
  {
    nr: '01',
    name: 'Design & Konzept',
    text: 'Markenidentitäten, visuelle Systeme, Gestaltungskonzepte — von der Idee bis zur Umsetzung.',
  },
  {
    nr: '02',
    name: 'Fotografie',
    text: 'Editorial, Gastronomie, Produkt. Bilder die eine Stimmung transportieren, nicht nur dokumentieren.',
  },
  {
    nr: '03',
    name: 'Webentwicklung',
    text: 'Individuelle Websites mit Next.js. Schnell, sauber, ohne Template-Kompromisse.',
  },
  {
    nr: '04',
    name: 'Editorial Design',
    text: 'Print-Publikationen, Layouts, Typografie. Lernmaterialien, Magazine, Bücher.',
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
      <section id="leistungen" style={{ paddingTop: 'clamp(56px, 8vw, 112px)' }}>
        <div
          style={{
            padding: '0 clamp(16px, 2vw, 24px)',
            marginBottom: 'clamp(32px, 5vw, 64px)',
          }}
        >
          <h2
            style={{
              fontFamily:
                '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(28px, 4vw, 56px)',
              letterSpacing: '-0.04em',
              lineHeight: 1,
              color: '#191917',
              margin: 0,
            }}
          >
            Was ich mache.
          </h2>
        </div>

        <div style={{ padding: '0 clamp(16px, 2vw, 24px)' }}>
          {LEISTUNGEN.map((item) => (
            <div
              key={item.nr}
              style={{
                paddingTop: 'clamp(28px, 3.5vw, 48px)',
                paddingBottom: 'clamp(28px, 3.5vw, 48px)',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr 2fr',
                gap: 'clamp(24px, 4vw, 72px)',
                alignItems: 'start',
              }}
            >
              <span
                style={{
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  fontSize: '11px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--negroni)',
                  paddingTop: '6px',
                  userSelect: 'none',
                }}
              >
                {item.nr}
              </span>
              <p
                style={{
                  fontFamily:
                    '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(22px, 3vw, 40px)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.05,
                  color: '#191917',
                  margin: 0,
                }}
              >
                {item.name}
              </p>
              <p
                style={{
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  fontSize: 'clamp(14px, 1.1vw, 16px)',
                  lineHeight: 1.65,
                  color: '#787672',
                  margin: 0,
                  paddingTop: '4px',
                }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Brand colors */}
      <section
        style={{
          display: 'flex',
          minHeight: '280px',
          marginTop: 'clamp(56px, 8vw, 112px)',
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: '#E8581A',
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
              #0000CC
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: 'clamp(28px, 4vw, 56px) clamp(16px, 2vw, 24px)',
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
                color: '#191917',
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
                color: '#787672',
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
                  color: '#787672',
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
                  color: '#787672',
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
                color: '#787672',
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
                color: '#D8D5CF',
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
