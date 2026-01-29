/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // EQuest Brand Colors - Warm & Friendly
        primary: {
          50: '#FFF3E0',
          100: '#FFE0B2',
          200: '#FFCC80',
          300: '#FFB74D',
          400: '#FFA726',
          500: '#FF9800',
          DEFAULT: '#FF7043', // Main Orange
          600: '#FB8C00',
          700: '#F57C00',
          dark: '#E64A19',
        },
        secondary: {
          50: '#E8F5E9',
          100: '#C8E6C9',
          200: '#A5D6A7',
          DEFAULT: '#66BB6A', // Fresh Green
          400: '#43A047',
          500: '#2E7D32',
          dark: '#1B5E20',
        },
        accent: {
          DEFAULT: '#7C4DFF', // Fun Purple
          light: '#B388FF',
          dark: '#651FFF',
        },
        sky: {
          DEFAULT: '#29B6F6', // Sky Blue
          light: '#81D4FA',
          dark: '#0288D1',
        },
        gold: {
          DEFAULT: '#FFD54F', // Achievement Gold
          light: '#FFECB3',
          dark: '#FFC107',
        },
        background: '#FFF8F5', // Warm cream
        surface: '#FFFFFF',
        muted: '#F5F5F5',
      },
      fontFamily: {
        sans: ['"Nunito"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.12)',
        'button': '0 4px 14px rgba(255, 112, 67, 0.4)',
        'button-secondary': '0 4px 14px rgba(102, 187, 106, 0.4)',
        'inner-glow': 'inset 0 2px 4px rgba(255, 255, 255, 0.6)',
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
        'gradient-primary': 'linear-gradient(135deg, #FF7043 0%, #FF9800 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #66BB6A 0%, #81C784 100%)',
        'gradient-accent': 'linear-gradient(135deg, #7C4DFF 0%, #B388FF 100%)',
        'gradient-sky': 'linear-gradient(135deg, #29B6F6 0%, #81D4FA 100%)',
        'gradient-gold': 'linear-gradient(135deg, #FFD54F 0%, #FFE082 100%)',
        'gradient-warm': 'linear-gradient(180deg, #FFF8F5 0%, #FFECB3 100%)',
      },
    },
  },
  plugins: [],
}
