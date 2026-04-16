interface ArrowProps {
  direction?: 'right' | 'left' | 'up' | 'down'
  size?: number
}

// Paths derived from the Sidebar scroll arrow style:
// thick stroke, round linecap/join, minimal geometry
const PATHS = {
  right: 'M4 15h22M17 5l9 10-9 10',
  left:  'M26 15H4M13 5l-9 10 9 10',
  down:  'M15 4v22M5 17l10 9 10-9',
  up:    'M15 26V4M5 13l10-9 10 9',
}

export default function Arrow({ direction = 'right', size = 18 }: ArrowProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      aria-hidden="true"
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
    >
      <path
        d={PATHS[direction]}
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
