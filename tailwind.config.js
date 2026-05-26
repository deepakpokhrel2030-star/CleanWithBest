/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#e8f0fb',
          100: '#c3d5f5',
          200: '#9dbfef',
          300: '#77a9e9',
          400: '#5193e3',
          500: '#2b7ddd',
          600: '#1a5fb4',
          700: '#134d96',
          800: '#0d3b7a',
          900: '#072960',
          950: '#050e1f',
        },
        accent: {
          400: '#5ee0d6',
          500: '#2ec4b6',
          600: '#1a9e92',
          700: '#157a71',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        heading: ['var(--font-poppins)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
