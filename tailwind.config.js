/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    minWidth: {
      "1/2": "50%",
      "1/3": "33.333333%",
      "1/4": "25%",
    },
    extend: {},
  },
  plugins: [],
});
