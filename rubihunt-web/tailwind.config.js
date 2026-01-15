/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rubi-dark': '#121212',
        'rubi-card': '#1e1e1e',
        'rubi-green': '#00c853',
        'rubi-red': '#ff3d00',
      }
    },
  },
  plugins: [],
}