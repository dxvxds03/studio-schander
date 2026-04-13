import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      display: ['var(--font-playfair)', 'Didot', 'Bodoni MT', 'Georgia', 'serif'],
      sans: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      mono: ['"Courier New"', 'Courier', 'monospace'],
    },
    extend: {
      colors: {
        negroni: '#E8581A',
        cream: '#F4F2ED',
        ink: '#191917',
        muted: '#787672',
        faint: '#E8E5DF',
      },
    },
  },
  plugins: [],
}

export default config
