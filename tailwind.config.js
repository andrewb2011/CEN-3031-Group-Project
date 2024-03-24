/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#08D97B",
        secondary: "#E6E6E6",
        orange: "#FB8C29",
        yellow: "#FAC710",
        footer: "#808080",
        greenHover: "#06b164",
      },
      fontFamily: {
        abrilfatface: ['"Abril Fatface"', ...defaultTheme.fontFamily.sans],
        robotoslab: ['"Roboto SLab"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
