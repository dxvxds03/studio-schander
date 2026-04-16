import Navigation from '@/components/Navigation'
import Link from 'next/link'
import Arrow from '@/components/Arrow'

export default function DatenschutzPage() {
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
          Datenschutz
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
            <p style={{ fontWeight: 700, marginBottom: '8px' }}>1. Datenschutz auf einen Blick</p>
            <p style={{ color: '#787672' }}>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
              personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
              Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>
          </div>

          <div>
            <p style={{ fontWeight: 700, marginBottom: '8px' }}>2. Datenerfassung auf dieser Website</p>
            <p style={{ marginBottom: '12px', color: '#787672' }}>
              Diese Website erhebt keine personenbezogenen Daten über Besucher. Es werden keine
              Cookies gesetzt, keine Tracking-Technologien eingesetzt und keine Analyse-Dienste
              verwendet.
            </p>
            <p style={{ color: '#787672' }}>
              Beim Kontakt per E-Mail werden die von Ihnen mitgeteilten Daten (Ihre E-Mail-Adresse,
              ggf. Ihr Name und Ihr Anliegen) zum Zweck der Bearbeitung der Anfrage und für den Fall
              von Anschlussfragen bei mir gespeichert.
            </p>
          </div>

          <div>
            <p style={{ fontWeight: 700, marginBottom: '8px' }}>3. Hosting</p>
            <p style={{ color: '#787672' }}>
              Diese Website wird bei Netlify gehostet. Beim Besuch der Website werden automatisch
              Server-Logfiles erstellt, die technische Informationen (z.B. IP-Adresse,
              Browsertyp, Betriebssystem) enthalten. Diese Daten werden von Netlify erhoben und
              gespeichert. Weitere Informationen finden Sie in der{' '}
              <a
                href="https://www.netlify.com/privacy/"
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                style={{ color: 'var(--negroni)', textDecoration: 'none' }}
              >
                Datenschutzerklärung von Netlify
              </a>
              .
            </p>
          </div>

          <div>
            <p style={{ fontWeight: 700, marginBottom: '8px' }}>4. Ihre Rechte</p>
            <p style={{ color: '#787672' }}>
              Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten
              personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der
              Datenverarbeitung sowie ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu
              sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im
              Impressum angegebenen Adresse an mich wenden.
            </p>
          </div>

          <div>
            <p style={{ fontWeight: 700, marginBottom: '8px' }}>5. Kontakt</p>
            <p>
              <a
                href="mailto:mail@studio-schander.de"
                data-hover
                style={{ color: 'var(--negroni)', textDecoration: 'none' }}
              >
                  mail@studio-schander.de
              </a>
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
            <Arrow direction="left" size={14} /> Zurück
          </Link>
        </div>
      </section>
    </main>
  )
}
