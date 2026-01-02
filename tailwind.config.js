/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#6366F1', // Entity text color
          600: '#6D28D9', // Button purple
        }
      }
    },
  },
  plugins: [],
}
