/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ebf5ff',
          100: '#d0e2ff',
          200: '#a6c8ff',
          300: '#78a9ff',
          400: '#4589ff',
          500: '#0f62fe',
          600: '#0043ce',
          700: '#002d9c',
          800: '#001d6c',
          900: '#001141',
          950: '#000a29',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        accent: {
          50: '#fffbe6',
          100: '#fff4bf',
          200: '#ffe999',
          300: '#ffdc66',
          400: '#ffcc33',
          500: '#ffbb00',
          600: '#e6a700',
          700: '#cc9300',
          800: '#b37f00',
          900: '#996b00',
          950: '#664600',
        },
      }
    },
  },
  plugins: [],
}
