/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        bounceY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-50%)' },
        },
      },
      animation: {
        bounceY: 'bounceY 0.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

