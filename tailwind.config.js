/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'star-orange': '#FFA65E',
        'primary-gray': '#292929',
        'secondary-gray': '#121212',
        'primary-white': '#F6F4DF'
      }
    },
  },
  plugins: [],
}

