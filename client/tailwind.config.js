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

        light: {
          300: "#9C94C5",
          400: "#8077AA",
          500: "#6C6295",
          700: "#5A507F",
        },

        dark: {
          600: "#5A5381",
          700: "#473F68",
          800: "#393055",
          900: "#302649",
        },
      },
    },
  },
  plugins: [],
};
