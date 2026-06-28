/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /* ── Brand Palette (Official Packaging) ── */
        background: '#FFFFFF',
        'background-alt': '#F8F9FA',
        card: '#FFFFFF',

        /* Primary = Official Red */
        primary: {
          DEFAULT: '#D71920',
          light: '#E84B51',
          dark: '#B01318',
        },

        /* Brand Blue = Royal Blue */
        blue: {
          DEFAULT: '#2E3192',
          light: '#4B54C4',
          dark: '#1E2070',
        },

        /* Accent = Dark Green */
        accent: {
          DEFAULT: '#1F6B3A',
          light: '#2E8A4A',
          dark: '#155229',
        },

        /* Neutral secondary */
        secondary: {
          DEFAULT: '#F8F9FA',
          light: '#FFFFFF',
        },

        /* Text */
        text: {
          DEFAULT: '#1F2937',
          light: '#6B7280',
          lighter: '#9CA3AF',
        },

        /* Border */
        border: '#E5E7EB',
      },

      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },

      borderRadius: {
        DEFAULT: '16px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
        full: '9999px',
      },

      boxShadow: {
        soft: '0 2px 15px rgba(0,0,0,0.06)',
        card: '0 4px 24px rgba(0,0,0,0.08)',
        hover: '0 8px 40px rgba(0,0,0,0.12)',
        /* Brand shadows */
        primary: '0 4px 20px rgba(215,25,32,0.28)',
        blue: '0 4px 20px rgba(46,49,146,0.28)',
        accent: '0 4px 20px rgba(31,107,58,0.25)',
      },

      animation: {
        'fade-up': 'fadeUp 0.6s ease-out both',
        'fade-in': 'fadeIn 0.4s ease-out both',
        'bounce-slow': 'bounceSlow 4s ease-in-out infinite',
      },

      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
