/** @type {import('tailwindcss').Config} */
const daisyui = require('daisyui')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts}"
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
}
