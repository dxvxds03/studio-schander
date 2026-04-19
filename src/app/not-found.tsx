import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: '404 — Seite nicht gefunden',
}

export default function NotFound() {
  return (
    <main style={{ background: 'var(--cream)', minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <Navigation />

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(100px, 15vw, 160px) clamp(16px, 4vw, 64px) clamp(56px, 8vw, 112px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Big background number */}
        <p
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -54%)',
            fontFamily: '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(200px, 40vw, 520px)',
            letterSpacing: '-0.06em',
            lineHeight: 1,
            color: 'var(--faint)',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          404
        </p>

        {/* Foreground text */}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '820px' }}>
          {/* Label */}
          <p
            className="label label-bracket"
            style={{ marginBottom: 'clamp(20px, 3vw, 36px)' }}
          >
            Fehler 404
          </p>

          {/* Headline */}
          <h1
            style={{
              fontFamily: '"Cabinet Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(52px, 10vw, 140px)',
              letterSpacing: '-0.04em',
              lineHeight: 0.92,
              color: 'var(--ink)',
              marginBottom: 'clamp(24px, 4vw, 48px)',
            }}
          >
            Diese Seite
            <br />
            existiert{' '}
            <span style={{ color: 'var(--dead-poet)' }}>nicht.</span>
          </h1>

          {/* Subline */}
          <p
            style={{
              fontFamily: '"Source Code Pro", monospace',
              fontSize: 'clamp(13px, 1.4vw, 16px)',
              color: 'var(--muted)',
              lineHeight: 1.7,
              maxWidth: '48ch',
              marginBottom: 'clamp(36px, 5vw, 64px)',
            }}
          >
            Die URL wurde möglicherweise verschoben, gelöscht
            oder war nie vorhanden. Kein Drama — zurück zur Startseite.
          </p>

          {/* CTA */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link
              href="/"
              className="btn-negroni"
              style={{
                padding: 'clamp(12px, 1.5vw, 16px) clamp(24px, 3vw, 36px)',
                fontSize: 'clamp(13px, 1.3vw, 17px)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Zurück zur Startseite
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
