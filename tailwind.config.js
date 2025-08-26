/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        floral: {
          50: '#fdf7f0',
          100: '#faeee0',
          200: '#f4dcc0',
          300: '#ecc294',
          400: '#e1a066',
          500: '#d98347',
          600: '#cb6e3b',
          700: '#a95632',
          800: '#884530',
          900: '#6e3829',
        },
        peach: {
          50: '#fef7f0',
          100: '#fdede0',
          200: '#fad8bf',
          300: '#f6bb93',
          400: '#f19066',
          500: '#ec7043',
          600: '#dd5528',
          700: '#b83f1e',
          800: '#93341d',
          900: '#762d1c',
        },
        sage: {
          50: '#f6f7f6',
          100: '#e3e7e3',
          200: '#c7d2c7',
          300: '#a3b4a3',
          400: '#7a917a',
          500: '#5d745d',
          600: '#485c48',
          700: '#3c4a3c',
          800: '#323e32',
          900: '#2a332a',
        },
        rose: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Playfair Display', 'serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'fadeInUp': 'fadeInUp 0.6s ease-out',
        'scale': 'scale 0.3s ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scale: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [],
};