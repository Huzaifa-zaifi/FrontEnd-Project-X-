/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sidebar: {
          bg: '#1F2937',
          'bg-dark': '#111827',
          text: '#FFFFFF',
          'text-muted': '#D1D5DB',
          'active-bg': '#E5E7EB',
          'active-text': '#111827',
        },
        analytics: {
          success: '#22C55E',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#3B82F6',
        }
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

