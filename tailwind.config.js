/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#203b35',
        // Warm paper, ink and restrained accents
        primary: {
          50: '#fcf1eb',
          100: '#f4dfd1',
          200: '#e8bba5',
          300: '#d99577',
          400: '#c97555',
          500: '#b94b32',
          DEFAULT: '#b94b32', // Main Orange
          600: '#a5402b',
          700: '#903b29',
          dark: '#813321',
        },
        secondary: {
          50: '#edf2ec',
          100: '#d9e5d8',
          200: '#b7cbb5',
          DEFAULT: '#456b56', // Fresh Green
          400: '#3c604b',
          500: '#34533f',
          dark: '#294333',
        },
        accent: {
          DEFAULT: '#735e72', // Fun Purple
          light: '#b8aab6',
          dark: '#594658',
        },
        sky: {
          DEFAULT: '#4e7180', // Sky Blue
          light: '#b3c6cc',
          dark: '#375866',
        },
        gold: {
          DEFAULT: '#d6b66e', // Achievement Gold
          light: '#eee1bf',
          dark: '#ab873c',
        },
        background: '#f6f3ec', // Warm cream
        surface: '#FFFFFF',
        muted: '#ede9e1',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(32, 59, 53, 0.035)',
        'card-hover': '0 4px 14px rgba(32, 59, 53, 0.07)',
        'button': 'none',
        'button-secondary': 'none',
        'inner-glow': 'none',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'float': 'float 4s ease-in-out infinite',
        'wiggle': 'wiggle 0.5s ease-in-out',
        'pop': 'pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
        'shake': 'shake 0.5s ease-in-out',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pop: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-8px)' },
          '75%': { transform: 'translateX(8px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0', transform: 'scale(0)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(#b94b32, #b94b32)',
        'gradient-secondary': 'linear-gradient(#456b56, #456b56)',
        'gradient-accent': 'linear-gradient(#735e72, #735e72)',
        'gradient-sky': 'linear-gradient(#4e7180, #4e7180)',
        'gradient-gold': 'linear-gradient(#eee1bf, #eee1bf)',
        'gradient-warm': 'linear-gradient(#f6f3ec, #f6f3ec)',
      },
    },
  },
  plugins: [],
}
