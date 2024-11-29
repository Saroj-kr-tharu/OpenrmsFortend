/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],


  theme: {
    extend: {
      colors: {
        brandColor: {
          100: "#cce5e4",
          200: "#99cbc9",
          300: "#66b1af",
          400: "#339794",
          500: "#007d79",
          600: "#006461",
          700: "#004b49",
          800: "#003230",
          900: "#001918"
        },
      }
    },
  },
  plugins: [],
}

