import React from 'react'

export default function StatementBlock() {
  return (
    <section
      style={{
        background: 'var(--cream)',
        /*
         * Das Padding auf allen Seiten soll so groß sein wie der Textblock breit ist.
         * Der Textblock ist auf ~34ch begrenzt. Bei ~10px/ch à Source Code Pro 11px
         * à letter-spacing 0.12em ergibt das grob ~380px.
         * Wir nähern uns dem mit einem großzügigen fluid-Wert:
         * clamp(80px, 18vw, 340px) — auf 1440px = ~259px, auf 375px = ~68px.
         */
        padding: 'clamp(80px, 18vw, 340px) clamp(80px, 18vw, 340px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        zIndex: 46,
      }}
    >
      <p
        style={{
          fontFamily: '"Source Code Pro", monospace',
          fontWeight: 500,
          fontSize: 'clamp(10px, 1vw, 13px)',
          letterSpacing: '0.12em',
          lineHeight: 1.9,
          textTransform: 'uppercase',
          color: 'var(--dead-poet)',
          textAlign: 'justify',
          /* Breite: so klein wie möglich — Statement wirkt durch die Leere drum herum */
          maxWidth: 'clamp(260px, 34ch, 420px)',
          width: '100%',
          hyphens: 'none',
        }}
      >
        Ich designe seit ich 16 bin. Inzwischen studiere ich
        Digitalisierungsmanagement, baue nebenbei eigene Marken
        und schreibe gerade meine Bachelorarbeit darüber wie
        KI die Suche verändert. Einfach weil mich das alles
        interessiert. So arbeite ich auch mit Kunden.
      </p>
    </section>
  )
}
