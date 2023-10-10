/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eefdfd",
          100: "#d3f8fa",
          200: "#adeef4",
          300: "#74e0ec",
          400: "#34c9dc",
          500: "#18acc2",
          600: "#178aa3",
          700: "#197085",
          800: "#1d5b6d",
          900: "#1d4c5c",
          950: "#081e26",
        },
      },
    },
  },
  plugins: [],
};
