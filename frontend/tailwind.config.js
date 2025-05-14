/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'slide-in': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        'slide-down': {
          '0%': { 
            transform: 'translateY(-100%) translateX(-50%)',
            opacity: 0
          },
          '100%': { 
            transform: 'translateY(0) translateX(-50%)',
            opacity: 1
          }
        }
      },
      animation: {
        'slide-in': 'slide-in 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out'
      }
    },
  },
  plugins: [],
} 