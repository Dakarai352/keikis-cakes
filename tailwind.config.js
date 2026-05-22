/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#FAF7F2',
        surface: '#F2EBE1',
        dark: '#1C1008',
        accent: '#B8935A',
        sage: '#7A9E7E',
        'sage-light': '#C8DBC9',
        blush: '#E8C4B8',
        espresso: '#2C1A0E',
        muted: '#6B4F3A',
        'muted-deco': '#A08060',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"Jost"', 'sans-serif'],
      },
      borderRadius: {
        card: '8px',
        image: '12px',
        pill: '99rem',
      },
      boxShadow: {
        ambient: '0 4px 24px rgba(44, 26, 14, 0.08)',
      },
    },
  },
  plugins: [],
}
