'use client'

// Deterministic rotations + vertical offsets so SSR and client match
const ROTS    = [-3.8,  2.5, -1.4,  4.0, -2.7,  1.8, -4.2,  3.1, -2.0,  3.6]
const OFFS_Y  = [  0,    10,  -6,   14,   -9,    5,  -13,    8,   -3,   11]

interface Props {
  images: string[]
  title: string
}

export default function ProjectPinboard({ images, title }: Props) {
  if (images.length === 0) return null

  return (
    <div
      className="project-pinboard-wrap"
      style={{
        marginTop: '61px',
        background: 'var(--cream)',
        padding: 'clamp(48px, 8vw, 100px) clamp(24px, 4vw, 64px) clamp(24px, 4vw, 56px)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-end',
        gap: 'clamp(20px, 4vw, 52px)',
        // slight extra horizontal overflow room so rotated edges aren't clipped
        overflowX: 'visible',
      }}
    >
      {images.map((src, i) => {
        const rot    = ROTS[i % ROTS.length]
        const offsetY = OFFS_Y[i % OFFS_Y.length]

        return (
          <div
            key={i}
            className="pinboard-card"
            style={{
              transform: `rotate(${rot}deg) translateY(${offsetY}px)`,
              transformOrigin: 'center bottom',
              // Photo-print frame: thin white border + bottom space for caption feel
              background: '#FEFCF8',
              padding: 'clamp(6px, 1vw, 10px) clamp(6px, 1vw, 10px) clamp(20px, 3vw, 32px)',
              boxShadow:
                '0 2px 8px rgba(25,25,23,0.09), 0 8px 32px rgba(25,25,23,0.11)',
              flexShrink: 0,
              transition: 'transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.35s ease',
            }}
          >
            <img
              src={src}
              alt={`${title} — ${i + 1}`}
              draggable={false}
              style={{
                display: 'block',
                height: 'clamp(160px, 26vw, 400px)',
                width: 'auto',
                maxWidth: 'clamp(180px, 34vw, 520px)',
                objectFit: 'cover',
                userSelect: 'none',
              }}
            />
          </div>
        )
      })}

      <style>{`
        @media (hover: hover) and (pointer: fine) {
          .pinboard-card:hover {
            transform: rotate(0deg) translateY(-6px) !important;
            box-shadow: 0 6px 18px rgba(25,25,23,0.14), 0 16px 56px rgba(25,25,23,0.16) !important;
          }
        }
        @media (max-width: 1024px) {
          .project-pinboard-wrap { margin-top: 88px !important; }
        }
        @media (max-width: 680px) {
          .pinboard-card img {
            height: clamp(130px, 38vw, 260px) !important;
            max-width: clamp(140px, 44vw, 320px) !important;
          }
          .project-pinboard-wrap {
            gap: clamp(12px, 5vw, 28px) !important;
            padding-left: clamp(16px, 4vw, 32px) !important;
            padding-right: clamp(16px, 4vw, 32px) !important;
          }
        }
      `}</style>
    </div>
  )
}
