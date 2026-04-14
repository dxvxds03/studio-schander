import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import Footer from '@/components/Footer'
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
            fontFamily: '"Cabinet Grotesk", "Source Code Pro", monospace',
            fontWeight: 800,
            fontSize: 'clamp(32px, 5.5vw, 80px)',
            letterSpacing: '-0.03em',
            lineHeight: 0.95,
            textTransform: 'uppercase',
            color: 'var(--dead-poet)',
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
                fontFamily: '"Cabinet Grotesk", "Source Code Pro", monospace',
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
                    fontFamily: '"Source Code Pro", monospace',
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
          paddingRight: 'clamp(16px, 2vw, 24px)',
          marginRight: 'clamp(160px, 20vw, 280px)',
          position: 'relative',
          zIndex: 46,
          background: 'var(--cream)',
        }}
      >
        <p
          style={{
            fontFamily: '"Cabinet Grotesk", "Source Code Pro", monospace',
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

      <div style={{ marginTop: 'clamp(56px, 8vw, 112px)', position: 'relative', zIndex: 46, pointerEvents: 'none' }}>
        <Footer />
      </div>
    </main>
  )
}
