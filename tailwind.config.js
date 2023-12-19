/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // 'custom-red': '#D9534F',
        // 'customColor': '#5BC0DE',
        customColorA: "#d4a762 ",
        customColorB: "#9a9a9a",
        customColorC: "rgba(0,0,0,.55)",
        customColorD: "#fffcf8",
      },
      fontFamily: {
        sans: [
          "Source Sans Pro",
          "Playball",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
          "Instrument Sans",
        ],
      },
    },
  },
  variants: {},
  plugins: [],
};
