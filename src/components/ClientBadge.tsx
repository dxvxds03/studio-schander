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
    const tagColor = isLight ? '#F4F2ED' : '#191917'
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
          color: tagColor,
          border: `1px solid ${tagColor}`,
          padding,
          whiteSpace: 'nowrap',
          lineHeight: 1,
        }}
      >
        <svg width="8" height="8" viewBox="0 0 30 30" fill="none" style={{ flexShrink: 0 }}>
          <circle cx="15" cy="15" r="6" fill={tagColor}/>
          {[0,45,90,135,180,225,270,315].map((deg) => (
            <ellipse
              key={deg}
              cx={15 + 11 * Math.cos((deg * Math.PI) / 180)}
              cy={15 + 11 * Math.sin((deg * Math.PI) / 180)}
              rx="4.5" ry="3"
              transform={`rotate(${deg} ${15 + 11 * Math.cos((deg * Math.PI) / 180)} ${15 + 11 * Math.sin((deg * Math.PI) / 180)})`}
              fill={tagColor}
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
          color: '#F4F2ED',
          background: '#34160F',
          border: '1px solid #34160F',
          padding,
          whiteSpace: 'nowrap',
          lineHeight: 1,
        }}
      >
        Konzeptarbeit
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
          color: isLight ? '#F4F2ED' : '#191917',
          background: isLight ? 'rgba(244,242,237,0.15)' : 'rgba(25,25,23,0.08)',
          border: `1.5px solid ${isLight ? 'rgba(244,242,237,0.6)' : 'rgba(25,25,23,0.45)'}`,
          padding,
          whiteSpace: 'nowrap',
          lineHeight: 1,
          fontWeight: 700,
        }}
      >
        {client}
      </span>
    )
  }

  return null
}
