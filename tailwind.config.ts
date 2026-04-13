import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      display: ['var(--font-syne)', 'Arial Black', 'Arial', 'sans-serif'],
      sans: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      mono: ['"Courier New"', 'Courier', 'monospace'],
    },
    extend: {
      colors: {
        negroni: '#E8581A',
        deadpoet: '#0000CC',
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
