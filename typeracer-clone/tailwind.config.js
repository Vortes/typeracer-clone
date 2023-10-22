/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#2c394d',
        secondary: '#ff7990',
        textParagraph: '#3f6478',
        textInput: '#fffaf8',
        error: '#f04040',
      }
    },
  },
  plugins: [],
}