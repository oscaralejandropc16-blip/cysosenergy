/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#050A14',
          900: '#070F1E',
          850: '#0A1628',
          800: '#101F38',
          700: '#1A2C4E',
        },
        gold: {
          300: '#FDE047',
          400: '#FACC15',
          500: '#EAB308',
          600: '#D97706',
          700: '#C59B27',
          metallic: '#D4AF37',
        },
        flame: {
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(135deg, #070F1E 0%, #101F38 50%, #0A1628 100%)',
        'gold-gradient': 'linear-gradient(135deg, #FACC15 0%, #D97706 100%)',
        'metallic-border': 'linear-gradient(135deg, rgba(212, 175, 55, 0.4) 0%, rgba(249, 115, 22, 0.2) 100%)',
      },
      boxShadow: {
        'luxury': '0 20px 50px -15px rgba(7, 15, 30, 0.5)',
        'gold-glow': '0 0 35px -5px rgba(212, 175, 55, 0.25)',
        'flame-glow': '0 0 35px -5px rgba(249, 115, 22, 0.3)',
      }
    },
  },
  plugins: [],
}
