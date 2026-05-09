/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rh: {
          red:    '#EE0000',
          dark:   '#151515',
          darker: '#0d0d0d',
          gray:   '#3C3F42',
          light:  '#f5f5f5',
        },
        surface: {
          0: '#0d1117',
          1: '#161b22',
          2: '#1c2128',
          3: '#21262d',
        },
        border: '#30363d',
        token: {
          keyword:  '#ff7b72',
          string:   '#a5d6ff',
          comment:  '#8b949e',
          fn:       '#d2a8ff',
          number:   '#79c0ff',
          operator: '#ffa657',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
