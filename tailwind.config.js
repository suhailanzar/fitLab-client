/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ 
    "./src/**/*.{html,ts}",
    "./node_modules/primeng/**/*.{html,js}",

  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [ 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
}

