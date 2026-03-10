import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#060609',
        surface: '#0F0F1A',
        raised: '#14142A',
        accent: '#5F6FFF',
        'accent-hover': '#4A5AEE',
        accent2: '#A78BFA',
        'text-color': '#E8E8F0',
        muted: '#8888AA',
        subtle: '#55556E',
        faint: '#3A3A55',
        green: '#4ADE80',
      },
      fontFamily: {
        outfit: ['var(--font-outfit)', 'sans-serif'],
        fira: ['var(--font-fira-code)', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
