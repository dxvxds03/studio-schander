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

export default function KontaktForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [type, setType] = useState('')
  const [tab, setTab] = useState<Tab>('termin')
  const formRef = useRef<HTMLFormElement>(null)

  // Load Cal.com embed script once
  useEffect(() => {
    if (typeof window === 'undefined') return
    if ((window as any).Cal) return

    const script = document.createElement('script')
    script.src = 'https://app.cal.eu/embed/embed.js'
    script.async = true
    script.onload = () => {
      const Cal = (window as any).Cal
      if (!Cal) return
      Cal('init', 'erstgesprach', { origin: 'https://app.cal.eu' })
      Cal.ns.erstgesprach('ui', {
        cssVarsPerTheme: {
          light: { 'cal-brand': '#E8331A' },
          dark:  { 'cal-brand': '#34160F' },
        },
        hideEventTypeDetails: false,
        layout: 'week_view',
      })
    }
    document.head.appendChild(script)
  }, [])

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
    fontSize: '14px',
    color: 'var(--ink)',
    background: 'transparent',
    border: '1px solid var(--faint)',
    padding: '12px 16px',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.18s ease',
    lineHeight: 1.6,
  }

  const lbl: React.CSSProperties = {
    fontFamily: '"Source Code Pro", monospace',
    fontSize: '13px',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--ink)',
    display: 'block',
    marginBottom: '10px',
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
      {/* Heading */}
      <h1
        style={{
          fontFamily: '"Cabinet Grotesk", "Helvetica Neue", sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(48px, 9vw, 130px)',
          letterSpacing: '-0.045em',
          lineHeight: 0.9,
          color: 'var(--ink)',
          textTransform: 'uppercase',
          margin: '0 0 clamp(48px, 7vw, 80px)',
        }}
      >
        Lass uns<br />
        <span style={{ color: 'var(--dead-poet)' }}>reden.</span>
      </h1>

      {/* Tab switcher */}
      <div
        style={{
          display: 'flex',
          gap: '0',
          marginBottom: 'clamp(40px, 5vw, 64px)',
          borderBottom: '1px solid var(--faint)',
        }}
      >
        {([['termin', 'Erstgespräch buchen'], ['nachricht', 'Nachricht schreiben']] as [Tab, string][]).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              fontFamily: '"Cabinet Grotesk", "Helvetica Neue", sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(13px, 1.4vw, 17px)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              background: 'none',
              border: 'none',
              borderBottom: tab === key ? '2px solid var(--ink)' : '2px solid transparent',
              color: tab === key ? 'var(--ink)' : 'var(--muted)',
              padding: '12px 24px 12px 0',
              marginBottom: '-1px',
              cursor: 'pointer',
              transition: 'color 0.18s ease, border-color 0.18s ease',
            }}
          >
            {key === 'termin' && (
              <span style={{ marginRight: '8px', opacity: 0.6, fontSize: '0.85em' }}>01</span>
            )}
            {key === 'nachricht' && (
              <span style={{ marginRight: '8px', opacity: 0.6, fontSize: '0.85em' }}>02</span>
            )}
            {label}
          </button>
        ))}
      </div>

      {/* ── TAB 1: Erstgespräch ── */}
      {tab === 'termin' && (
        <div>
          <p
            style={{
              fontFamily: '"Source Code Pro", monospace',
              fontSize: '14px',
              lineHeight: 1.8,
              color: 'var(--muted)',
              maxWidth: '52ch',
              marginBottom: 'clamp(32px, 4vw, 48px)',
            }}
          >
            30 Minuten, kein Stress. Wir schauen gemeinsam, ob und wie ich helfen kann —
            ob Branding, Web oder Konzept. Einfach Termin wählen und loslegen.
          </p>

          <button
            data-cal-link="schander/erstgesprach"
            data-cal-namespace="erstgesprach"
            data-cal-config='{"layout":"week_view","useSlotsViewOnSmallScreen":"true"}'
            style={{
              fontFamily: '"Source Code Pro", monospace',
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              background: 'var(--ink)',
              color: 'var(--cream)',
              border: 'none',
              padding: '16px 40px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'background 0.18s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--dead-poet)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--ink)')}
          >
            Termin buchen <Arrow direction="right" size={14} />
          </button>

          {/* Divider hint */}
          <p
            style={{
              fontFamily: '"Source Code Pro", monospace',
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--faint)',
              marginTop: 'clamp(40px, 6vw, 72px)',
            }}
          >
            Lieber schreiben?{' '}
            <button
              onClick={() => setTab('nachricht')}
              style={{
                fontFamily: 'inherit',
                fontSize: 'inherit',
                letterSpacing: 'inherit',
                textTransform: 'inherit',
                background: 'none',
                border: 'none',
                padding: 0,
                color: 'var(--muted)',
                cursor: 'pointer',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
              }}
            >
              Zum Kontaktformular →
            </button>
          </p>
        </div>
      )}

      {/* ── TAB 2: Kontaktformular ── */}
      {tab === 'nachricht' && (
        <div style={{ maxWidth: '720px' }}>
          {status === 'success' ? (
            <div>
              <p
                style={{
                  fontFamily: '"Cabinet Grotesk", "Helvetica Neue", sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(22px, 3vw, 36px)',
                  letterSpacing: '-0.03em',
                  color: 'var(--ink)',
                  marginBottom: '16px',
                }}
              >
                Nachricht angekommen.
              </p>
              <p style={{ fontFamily: '"Source Code Pro", monospace', fontSize: '14px', lineHeight: 1.7, color: 'var(--muted)', maxWidth: '44ch' }}>
                Ich melde mich so schnell wie möglich. Bis dahin — schau dir gerne noch ein paar{' '}
                <a href="/projekte" style={{ color: 'var(--dead-poet)', textDecoration: 'none' }}>Projekte</a> an.
              </p>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}
            >
              {/* Name + E-Mail */}
              <div
                className="kontakt-row"
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}
              >
                <div>
                  <label htmlFor="kf-name" style={lbl}>Name *</label>
                  <input
                    id="kf-name"
                    name="name"
                    type="text"
                    required
                    placeholder="David Mustermann"
                    style={inp}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--ink)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'var(--faint)')}
                  />
                </div>
                <div>
                  <label htmlFor="kf-email" style={lbl}>E-Mail *</label>
                  <input
                    id="kf-email"
                    name="email"
                    type="email"
                    required
                    placeholder="hallo@beispiel.de"
                    style={inp}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--ink)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'var(--faint)')}
                  />
                </div>
              </div>

              {/* Projekt-Art */}
              <div>
                <label style={lbl}>Art des Projekts</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {TYPES.map(([val, label]) => (
                    <label
                      key={val}
                      style={{
                        fontFamily: '"Source Code Pro", monospace',
                        fontSize: '11px',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        border: `1px solid ${type === val ? 'var(--ink)' : 'var(--faint)'}`,
                        color: type === val ? 'var(--cream)' : 'var(--muted)',
                        background: type === val ? 'var(--ink)' : 'transparent',
                        padding: '6px 12px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        userSelect: 'none',
                      }}
                    >
                      <input
                        type="radio"
                        name="projektart"
                        value={val}
                        checked={type === val}
                        onChange={() => setType(val)}
                        style={{ display: 'none' }}
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Nachricht */}
              <div>
                <label htmlFor="kf-msg" style={lbl}>Nachricht / Projektidee *</label>
                <textarea
                  id="kf-msg"
                  name="nachricht"
                  required
                  rows={6}
                  placeholder="Beschreib kurz worum es geht — Kontext, Ziel, Zeitrahmen, alles was hilft."
                  style={{ ...inp, resize: 'vertical', minHeight: '140px' }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'var(--ink)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'var(--faint)')}
                />
              </div>

              {/* Error */}
              {status === 'error' && (
                <p style={{ fontFamily: '"Source Code Pro", monospace', fontSize: '11px', letterSpacing: '0.1em', color: 'var(--dead-poet)' }}>
                  Etwas ist schiefgelaufen — versuch es nochmal oder schreib direkt an{' '}
                  <a href="mailto:mail@studio-schander.de" style={{ color: 'inherit' }}>
                    mail@studio-schander.de
                  </a>.
                </p>
              )}

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  style={{
                    fontFamily: '"Source Code Pro", monospace',
                    fontSize: '11px',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    background: status === 'sending' ? 'var(--muted)' : 'var(--ink)',
                    color: 'var(--cream)',
                    border: 'none',
                    padding: '14px 32px',
                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                    transition: 'background 0.18s ease',
                  }}
                >
                  {status === 'sending'
                    ? 'Wird gesendet…'
                    : <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>Abschicken <Arrow direction="right" size={14} /></span>
                  }
                </button>
              </div>
            </form>
          )}

          {/* Divider hint */}
          <p
            style={{
              fontFamily: '"Source Code Pro", monospace',
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--faint)',
              marginTop: 'clamp(40px, 6vw, 72px)',
            }}
          >
            Lieber direkt einen Termin?{' '}
            <button
              onClick={() => setTab('termin')}
              style={{
                fontFamily: 'inherit',
                fontSize: 'inherit',
                letterSpacing: 'inherit',
                textTransform: 'inherit',
                background: 'none',
                border: 'none',
                padding: 0,
                color: 'var(--muted)',
                cursor: 'pointer',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
              }}
            >
              Erstgespräch buchen →
            </button>
          </p>
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
