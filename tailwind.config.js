/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: "#C2C2D6",
        gray: {
          DEFAULT: "#4D4D4D",
          100: "#666666"
        },
        red: "#AC3939",
        blue:"#004466",
        black:"#000000"
      }
    },
  },
  plugins: [],
}

