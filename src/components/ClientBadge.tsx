type Variant = 'light' | 'dark'

interface Props {
  projectType: 'client' | 'schander' | 'personal' | null
  client: string | null
  variant?: Variant // 'light' = on dark bg, 'dark' = on light bg
  size?: 'sm' | 'md'
}

export default function ClientBadge({ projectType, client, variant = 'dark', size = 'sm' }: Props) {
  const isLight = variant === 'light'
  const fontSize = size === 'sm' ? '10px' : '12px'
  const padding  = size === 'sm' ? '3px 8px' : '4px 11px'

  if (projectType === 'schander') {
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          fontFamily: '"Source Code Pro", monospace',
          fontSize,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: isLight ? '#E8331A' : '#E8331A',
          border: '1px solid #E8331A',
          padding,
          whiteSpace: 'nowrap',
          lineHeight: 1,
        }}
      >
        <svg width="8" height="8" viewBox="0 0 30 30" fill="none" style={{ flexShrink: 0 }}>
          <circle cx="15" cy="15" r="6" fill="#E8331A"/>
          {[0,45,90,135,180,225,270,315].map((deg, i) => (
            <ellipse
              key={i}
              cx={15 + 11 * Math.cos((deg * Math.PI) / 180)}
              cy={15 + 11 * Math.sin((deg * Math.PI) / 180)}
              rx="4.5" ry="3"
              transform={`rotate(${deg} ${15 + 11 * Math.cos((deg * Math.PI) / 180)} ${15 + 11 * Math.sin((deg * Math.PI) / 180)})`}
              fill="#E8331A"
            />
          ))}
        </svg>
        Schander Marke
      </span>
    )
  }

  if (projectType === 'personal') {
    return (
      <span
        style={{
          display: 'inline-block',
          fontFamily: '"Source Code Pro", monospace',
          fontSize,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: isLight ? 'rgba(244,242,237,0.5)' : 'var(--muted)',
          border: `1px solid ${isLight ? 'rgba(244,242,237,0.25)' : 'var(--faint)'}`,
          padding,
          whiteSpace: 'nowrap',
          lineHeight: 1,
        }}
      >
        Persönlich
      </span>
    )
  }

  // 'client' or null — show client name if present
  if (client) {
    return (
      <span
        style={{
          display: 'inline-block',
          fontFamily: '"Source Code Pro", monospace',
          fontSize,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: isLight ? 'rgba(244,242,237,0.55)' : 'var(--muted)',
          whiteSpace: 'nowrap',
          lineHeight: 1,
        }}
      >
        {client}
      </span>
    )
  }

  return null
}
