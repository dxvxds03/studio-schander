'use client'

import { useState, useRef, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Arrow from '@/components/Arrow'

type Status = 'idle' | 'sending' | 'success' | 'error'
type Tab = 'termin' | 'nachricht'

const TYPES = [
  ['branding',  'Branding & Identität'],
  ['web',       'Webentwicklung'],
  ['editorial', 'Editorial / Print'],
  ['konzept',   'Konzeption'],
  ['sonstiges', 'Sonstiges'],
] as const

function CalEmbed() {
  useEffect(() => {
    const existing = document.getElementById('cal-embed-script')
    if (existing) existing.remove()

    const script = document.createElement('script')
    script.id = 'cal-embed-script'
    script.type = 'text/javascript'
    script.innerHTML = `
      (function (C, A, L) {
        let p = function (a, ar) { a.q.push(ar); };
        let d = C.document;
        C.Cal = C.Cal || function () {
          let cal = C.Cal; let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {}; cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () { p(api, arguments); };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
      })(window, "https://app.cal.eu/embed/embed.js", "init");

      Cal("init", "erstgesprach", { origin: "https://app.cal.eu" });

      Cal.ns.erstgesprach("inline", {
        elementOrSelector: "#my-cal-inline-erstgesprach",
        config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
        calLink: "schander/erstgesprach",
      });

      Cal.ns.erstgesprach("ui", { hideEventTypeDetails: false, layout: "month_view" });
    `
    document.body.appendChild(script)

    return () => {
      document.getElementById('cal-embed-script')?.remove()
    }
  }, [])

  return (
    <div
      id="my-cal-inline-erstgesprach"
      style={{ width: '100%', height: '700px', overflow: 'scroll' }}
    />
  )
}

export default function KontaktForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [type, setType]     = useState('')
  const [tab, setTab]       = useState<Tab>('termin')
  const formRef             = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    const data = new FormData(e.currentTarget)
    try {
      const { error } = await supabase.from('kontakt_submissions').insert({
        name:       data.get('name') as string,
        email:      data.get('email') as string,
        projektart: data.get('projektart') as string | null,
        nachricht:  data.get('nachricht') as string,
      })
      if (error) throw error
      setStatus('success')
      formRef.current?.reset()
      setType('')
    } catch {
      setStatus('error')
    }
  }

  const inp: React.CSSProperties = {
    fontFamily: '"Source Code Pro", monospace',
    fontSize: '16px',
    color: 'var(--ink)',
    background: 'transparent',
    border: '1px solid var(--faint)',
    padding: '14px 18px',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.18s ease',
    lineHeight: 1.6,
  }

  const lbl: React.CSSProperties = {
    fontFamily: '"Cabinet Grotesk", "Helvetica Neue", sans-serif',
    fontWeight: 700,
    fontSize: '13px',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--ink)',
    display: 'block',
    marginBottom: '12px',
  }

  return (
    <section
      style={{
        paddingTop: 'clamp(130px, 14vw, 160px)',
        paddingBottom: 'clamp(72px, 10vw, 140px)',
        paddingLeft: 'clamp(16px, 5vw, 80px)',
        paddingRight: 'clamp(16px, 5vw, 80px)',
        maxWidth: '1200px',
      }}
    >
      {/* H1 */}
      <h1
        style={{
          fontFamily: '"Cabinet Grotesk", "Helvetica Neue", sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(56px, 10vw, 140px)',
          letterSpacing: '-0.045em',
          lineHeight: 0.88,
          color: 'var(--ink)',
          textTransform: 'uppercase',
          margin: '0 0 clamp(48px, 6vw, 72px)',
        }}
      >
        Lass uns<br />
        <span style={{ color: 'var(--dead-poet)' }}>reden.</span>
      </h1>

      {/* Toggle */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          border: '1px solid var(--faint)',
          marginBottom: 'clamp(48px, 6vw, 80px)',
          overflow: 'hidden',
        }}
      >
        {([
          ['termin',    'Termin buchen'],
          ['nachricht', 'Nachricht schreiben'],
        ] as [Tab, string][]).map(([key, label], i) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              fontFamily: '"Cabinet Grotesk", "Helvetica Neue", sans-serif',
              fontWeight: 700,
              fontSize: '15px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              background: tab === key ? 'var(--ink)' : 'transparent',
              color: tab === key ? 'var(--cream)' : 'var(--muted)',
              border: 'none',
              borderLeft: i === 1 ? '1px solid var(--faint)' : 'none',
              padding: '14px 32px',
              cursor: 'pointer',
              transition: 'background 0.18s ease, color 0.18s ease',
              whiteSpace: 'nowrap',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* TAB: Termin */}
      {tab === 'termin' && (
        <div>
          <CalEmbed />
        </div>
      )}

      {/* TAB: Nachricht */}
      {tab === 'nachricht' && (
        <div style={{ maxWidth: '720px' }}>
          {status === 'success' ? (
            <div>
              <p
                style={{
                  fontFamily: '"Cabinet Grotesk", "Helvetica Neue", sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(28px, 4vw, 48px)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.05,
                  color: 'var(--ink)',
                  marginBottom: '20px',
                }}
              >
                Nachricht angekommen.
              </p>
              <p style={{
                fontFamily: '"Source Code Pro", monospace',
                fontSize: '16px',
                lineHeight: 1.75,
                color: 'var(--muted)',
                maxWidth: '44ch',
              }}>
                Ich melde mich so schnell wie möglich. Bis dahin — schau dir gerne noch ein paar{' '}
                <a href="/projekte" style={{ color: 'var(--dead-poet)', textDecoration: 'none' }}>Projekte</a> an.
              </p>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
            >
              <div
                className="kontakt-row"
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}
              >
                <div>
                  <label htmlFor="kf-name" style={lbl}>Name *</label>
                  <input
                    id="kf-name" name="name" type="text" required
                    placeholder="David Mustermann"
                    style={inp}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--ink)')}
                    onBlur={e  => (e.currentTarget.style.borderColor = 'var(--faint)')}
                  />
                </div>
                <div>
                  <label htmlFor="kf-email" style={lbl}>E-Mail *</label>
                  <input
                    id="kf-email" name="email" type="email" required
                    placeholder="hallo@beispiel.de"
                    style={inp}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--ink)')}
                    onBlur={e  => (e.currentTarget.style.borderColor = 'var(--faint)')}
                  />
                </div>
              </div>

              <div>
                <label style={lbl}>Art des Projekts</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {TYPES.map(([val, label]) => (
                    <label
                      key={val}
                      style={{
                        fontFamily: '"Cabinet Grotesk", "Helvetica Neue", sans-serif',
                        fontWeight: 600,
                        fontSize: '14px',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        border: `1px solid ${type === val ? 'var(--ink)' : 'var(--faint)'}`,
                        color: type === val ? 'var(--cream)' : 'var(--muted)',
                        background: type === val ? 'var(--ink)' : 'transparent',
                        padding: '9px 18px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        userSelect: 'none',
                      }}
                    >
                      <input
                        type="radio" name="projektart" value={val}
                        checked={type === val}
                        onChange={() => setType(val)}
                        style={{ display: 'none' }}
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="kf-msg" style={lbl}>Nachricht / Projektidee *</label>
                <textarea
                  id="kf-msg" name="nachricht" required rows={6}
                  placeholder="Beschreib kurz worum es geht — Kontext, Ziel, Zeitrahmen, alles was hilft."
                  style={{ ...inp, resize: 'vertical', minHeight: '160px' }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'var(--ink)')}
                  onBlur={e  => (e.currentTarget.style.borderColor = 'var(--faint)')}
                />
              </div>

              {status === 'error' && (
                <p style={{
                  fontFamily: '"Source Code Pro", monospace',
                  fontSize: '14px',
                  letterSpacing: '0.06em',
                  color: 'var(--dead-poet)',
                  lineHeight: 1.6,
                }}>
                  Etwas ist schiefgelaufen — versuch es nochmal oder schreib direkt an{' '}
                  <a href="mailto:mail@studio-schander.de" style={{ color: 'inherit' }}>mail@studio-schander.de</a>.
                </p>
              )}

              <div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  style={{
                    fontFamily: '"Cabinet Grotesk", "Helvetica Neue", sans-serif',
                    fontWeight: 700,
                    fontSize: '15px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    background: status === 'sending' ? 'var(--muted)' : 'var(--ink)',
                    color: 'var(--cream)',
                    border: 'none',
                    padding: '16px 40px',
                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                    transition: 'background 0.18s ease',
                  }}
                >
                  {status === 'sending'
                    ? 'Wird gesendet…'
                    : <span style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}>Abschicken <Arrow direction="right" size={16} /></span>
                  }
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 560px) {
          .kontakt-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
