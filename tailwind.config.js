/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-gray': '#f5f5f4',
        'light-gray-secondary': '#fafaf9',
        'gray': '#57534e',
        'black': '#0c0a09',
        'blue': '#0091ff'
      }
    },
  },
  plugins: [],
}