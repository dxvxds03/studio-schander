export default function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 46,
        background: 'var(--cream)',
      }}
    >
      {/* Separator */}
      <div style={{ borderTop: '1px solid var(--faint)' }} />

      {/* White footer content */}
      <div
        style={{
          padding: 'clamp(28px, 4vw, 56px) clamp(16px, 2vw, 24px)',
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
              fontFamily: '"Cabinet Grotesk", "Source Code Pro", monospace',
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
              fontFamily: '"Source Code Pro", monospace',
              fontSize: '12px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginTop: '8px',
            }}
          >
            Design & Direction · Bielefeld
          </p>
          <a
            href="mailto:mail@studio-schander.de"
            data-hover
            style={{
              fontFamily: '"Source Code Pro", monospace',
              fontSize: '12px',
              letterSpacing: '0.04em',
              color: 'var(--muted)',
              textDecoration: 'none',
              display: 'inline-block',
              marginTop: '6px',
            }}
          >
            mail@studio-schander.de
          </a>
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
                fontFamily: '"Source Code Pro", monospace',
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
                fontFamily: '"Source Code Pro", monospace',
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
              fontFamily: '"Source Code Pro", monospace',
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
              fontFamily: '"Source Code Pro", monospace',
              fontSize: '11px',
              color: 'var(--faint)',
              textDecoration: 'none',
            }}
          >
            Admin
          </a>
        </div>
      </div>

      {/* Brand colors */}
      <div style={{ display: 'flex', minHeight: '280px' }}>
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
              fontFamily: '"Source Code Pro", monospace',
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
                fontFamily: '"Cabinet Grotesk", "Source Code Pro", monospace',
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
                fontFamily: '"Source Code Pro", monospace',
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
              fontFamily: '"Source Code Pro", monospace',
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
                fontFamily: '"Cabinet Grotesk", "Source Code Pro", monospace',
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
                fontFamily: '"Source Code Pro", monospace',
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
      </div>
    </footer>
  )
}
