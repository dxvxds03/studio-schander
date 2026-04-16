export default function UnderConstruction() {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100dvh',
        background: '#0a0a0a',
        color: '#f0f0f0',
        fontFamily: 'system-ui, sans-serif',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <p
        style={{
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#555',
          marginBottom: '1.5rem',
        }}
      >
        Studio Schander
      </p>
      <h1
        style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          fontWeight: 400,
          marginBottom: '0.75rem',
          letterSpacing: '-0.02em',
        }}
      >
        Hier entsteht etwas.
      </h1>
      <p style={{ color: '#555', fontSize: '0.95rem' }}>
        Bald verfügbar.
      </p>
    </main>
  )
}
