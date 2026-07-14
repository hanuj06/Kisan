/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kd': {
          'green': {
            50:  '#f0f7f1',
            100: '#e8f5e9',
            200: '#c8e6ca',
            300: '#a5d6a7',
            400: '#4a7c59',
            500: '#4a7c59',
            600: '#3d6b4a',
            700: '#2F5233',
            800: '#1e3b22',
            900: '#1a3320',
          },
          'amber': {
            50:  '#fef9ea',
            100: '#fef3c7',
            400: '#f5c542',
            500: '#E8A93B',
            600: '#d4922a',
          },
          'blue': {
            500: '#4a7a9b',
            600: '#3B5B7A',
            700: '#2d4760',
          },
          'earth': '#2B2318',
          'paper': '#F6F2E7',
          'cream': '#faf7f0',
        },
      },
      fontFamily: {
        'display': ['"Zilla Slab"', 'Georgia', 'serif'],
        'body': ['"Inter"', 'system-ui', 'sans-serif'],
        'mono': ['"JetBrains Mono"', 'monospace'],
        'devanagari': ['"Noto Sans Devanagari"', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'ticker': 'ticker 30s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'count-up': 'countUp 1s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        bounceSlide: {
          '0%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #1a3320 0%, #2F5233 40%, #3d6b4a 70%, #4a7c59 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(47,82,51,0.08) 0%, rgba(232,169,59,0.05) 100%)',
        'amber-gradient': 'linear-gradient(135deg, #E8A93B 0%, #f5c542 100%)',
        'earth-gradient': 'linear-gradient(180deg, #1a3320 0%, #2B2318 100%)',
        'shimmer-gradient': 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
      },
      boxShadow: {
        'kd-sm': '0 1px 3px rgba(43,35,24,0.08), 0 1px 2px rgba(43,35,24,0.04)',
        'kd': '0 4px 16px rgba(43,35,24,0.08), 0 2px 6px rgba(43,35,24,0.04)',
        'kd-lg': '0 10px 40px rgba(43,35,24,0.12), 0 4px 16px rgba(43,35,24,0.06)',
        'kd-xl': '0 20px 60px rgba(43,35,24,0.15), 0 8px 24px rgba(43,35,24,0.08)',
        'green': '0 4px 16px rgba(47,82,51,0.25)',
        'amber': '0 4px 16px rgba(232,169,59,0.35)',
      },
      borderRadius: {
        'xl2': '1.25rem',
        'xl3': '1.5rem',
        'xl4': '2rem',
      },
      transitionTimingFunction: {
        'bounce-out': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
