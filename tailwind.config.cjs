/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0e57c5',//primary-yellow
          secondary: '#fff',//primary-blue
          blue: '#edf0ff',
          text: '#000',
          black: '#323c47',
          gold: '#ffe29e',
          star: '#fce700',
          700: '#002d9c',
          800: '#001d6c',
          900: '#001141',
          950: '#000a29',
        },
        background: {
          gray: '#f1edff',
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
      },
      animation: {
        'bell-shake': 'bell-shake 1s ease-in-out infinite',
      },
      keyframes: {
        'bell-shake': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '5%': { transform: 'rotate(-8deg)' },
          '10%': { transform: 'rotate(8deg)' },
          '15%': { transform: 'rotate(-6deg)' },
          '20%': { transform: 'rotate(6deg)' },
          '25%': { transform: 'rotate(-4deg)' },
          '30%': { transform: 'rotate(4deg)' },
          '35%': { transform: 'rotate(-2deg)' },
          '40%': { transform: 'rotate(2deg)' },
          '45%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
          '55%': { transform: 'rotate(-0.5deg)' },
          '60%': { transform: 'rotate(0.5deg)' },
          '65%': { transform: 'rotate(-0.25deg)' },
          '70%': { transform: 'rotate(0.25deg)' },
          '75%': { transform: 'rotate(-0.1deg)' },
          '80%': { transform: 'rotate(0.1deg)' },
          '85%': { transform: 'rotate(-0.05deg)' },
          '90%': { transform: 'rotate(0.05deg)' },
          '95%': { transform: 'rotate(-0.02deg)' },
        },
      },
    },
  },
  plugins: [],
}
