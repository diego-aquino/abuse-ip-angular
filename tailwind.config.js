/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    colors: {
      neutral: {
        medium: '#4B5563',
        dark: '#1F2937',
        darker: '#172554',
      },
      surface: {
        light: '#FFFFFF',
        medium: '#E2E8F0',
      },
      status: {
        negative: '#D11E00',
        warning: '#FFA318',
        positive: '#3B9410',
      },
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '2rem',
      '3xl': '3rem',
      '4xl': '4rem',
    },
    fontWeight: {
      regular: '400',
      medium: '500',
      bold: '700',
    },
    extend: {
      transitionDuration: {
        DEFAULT: '150ms',
      },
      animation: {
        'fade-in': 'fade-in 100ms ease-out',
        'expand-up': 'expand-up 100ms ease-out',
        'expand-center': 'expand-center 100ms ease-out',
        'spin-fast': 'spin-fast 750ms linear infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'expand-center': {
          '0%': { transform: 'scale(0.98)' },
          '100%': { transform: 'scale(1)' },
        },
        'expand-up': {
          '0%': { transform: 'translate(-50%, -49%) scale(0.99)' },
          '100%': { transform: 'translate(-50%, -50%) scale(1)' },
        },
        'spin-fast': {
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};
