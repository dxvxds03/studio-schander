import Navigation from '@/components/Navigation'
import Link from 'next/link'

export default function ImpressumPage() {
  return (
    <main>
      <Navigation />

      <section
        style={{
          paddingTop: 'clamp(100px, 14vw, 160px)',
          paddingBottom: 'clamp(80px, 10vw, 120px)',
          paddingLeft: 'clamp(32px, 5vw, 80px)',
          paddingRight: 'clamp(32px, 5vw, 80px)',
          maxWidth: '720px',
        }}
      >
        <p
          style={{
            fontFamily: '"Source Code Pro", monospace',
            fontSize: '11px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#787672',
            marginBottom: '24px',
          }}
        >
          Rechtliches
        </p>

        <h1
          style={{
            fontFamily: '"Cabinet Grotesk", "Source Code Pro", monospace',
            fontWeight: 800,
            fontSize: 'clamp(40px, 6vw, 80px)',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            color: '#191917',
            marginBottom: 'clamp(48px, 6vw, 80px)',
          }}
        >
          Impressum
        </h1>

        <div
          style={{
            fontFamily: '"Source Code Pro", monospace',
            fontSize: '15px',
            lineHeight: 1.75,
            color: '#191917',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
          }}
        >
          <div>
            <p style={{ fontWeight: 700, marginBottom: '8px' }}>Angaben gemäß § 5 TMG</p>
            <p>David Schander</p>
            <p>Studio Schander</p>
            <p>Bielefeld, Deutschland</p>
          </div>

          <div>
            <p style={{ fontWeight: 700, marginBottom: '8px' }}>Kontakt</p>
            <p>
              E-Mail:{' '}
              <a
                href="mailto:mail@studio-schander.de"
                data-hover
                style={{ color: 'var(--negroni)', textDecoration: 'none' }}
              >
                  mail@studio-schander.de
              </a>
            </p>
          </div>

          <div>
            <p style={{ fontWeight: 700, marginBottom: '8px' }}>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</p>
            <p>David Schander</p>
            <p>Bielefeld, Deutschland</p>
          </div>

          <div>
            <p style={{ fontWeight: 700, marginBottom: '8px' }}>Haftungsausschluss</p>
            <p style={{ color: '#787672' }}>
              Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die
              Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr
              übernommen werden. Als Diensteanbieter bin ich gemäß § 7 Abs.1 TMG für eigene Inhalte
              auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '64px' }}>
          <Link
            href="/"
            data-hover
            style={{
              fontFamily: '"Cabinet Grotesk", "Source Code Pro", monospace',
              fontWeight: 700,
              fontSize: '14px',
              letterSpacing: '-0.01em',
              color: '#191917',
              textDecoration: 'none',
            }}
          >
            ← Zurück
          </Link>
        </div>
      </section>
    </main>
  )
}
