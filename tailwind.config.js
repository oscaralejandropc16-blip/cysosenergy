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
          950: '#0A192F', // Deep Luminous Sapphire Base
          900: '#0E2442', // Rich Oceanic Blue-Navy
          850: '#132F54', // Luminous Card Surface
          800: '#1A3D6D', // Elevated Container
          700: '#244E8A', // Active Highlights
          600: '#3267B3',
        },
        energy: {
          cyan: '#0EA5E9', // Electric Tech Cyan
          sky: '#38BDF8',  // Luminous Sky Blue
          blue: '#2563EB', // High-Impact Corporate Blue
        },
        gold: {
          300: '#FDE047',
          400: '#FACC15',
          500: '#EAB308',
          600: '#D97706',
          700: '#C59B27',
          metallic: '#E5C07B',
        },
        flame: {
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(135deg, #0A192F 0%, #132F54 50%, #0E2442 100%)',
        'sapphire-gradient': 'linear-gradient(135deg, #0E2442 0%, #1A3D6D 100%)',
        'energy-gradient': 'linear-gradient(135deg, #0EA5E9 0%, #2563EB 100%)',
        'flame-gradient': 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
        'metallic-border': 'linear-gradient(135deg, rgba(56, 189, 248, 0.4) 0%, rgba(249, 115, 22, 0.3) 100%)',
      },
      boxShadow: {
        'luxury': '0 20px 50px -15px rgba(10, 25, 47, 0.7)',
        'cyan-glow': '0 0 35px -5px rgba(14, 165, 233, 0.35)',
        'sapphire-glow': '0 0 45px -5px rgba(37, 99, 235, 0.25)',
        'flame-glow': '0 0 35px -5px rgba(249, 115, 22, 0.35)',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
      }
    },
  },
  plugins: [],
}
