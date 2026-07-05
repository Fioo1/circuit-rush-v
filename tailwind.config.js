/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Segoe UI', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 30px rgba(45, 212, 191, 0.35)',
        danger: '0 0 28px rgba(251, 113, 133, 0.35)',
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        pulseGlow: 'pulseGlow 1.8s ease-in-out infinite',
        pop: 'pop 460ms cubic-bezier(.2,1.4,.35,1)',
        drift: 'drift 18s linear infinite',
        scan: 'scan 4s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 18px rgba(45,212,191,.35)' },
          '50%': { boxShadow: '0 0 38px rgba(250,204,21,.5)' },
        },
        pop: {
          '0%': { transform: 'scale(.7)', opacity: 0 },
          '70%': { transform: 'scale(1.08)', opacity: 1 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        drift: {
          from: { transform: 'translate3d(0,0,0)' },
          to: { transform: 'translate3d(-120px,90px,0)' },
        },
        scan: {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};
