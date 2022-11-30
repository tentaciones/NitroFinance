/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      display: ["Space Grotesk", "sans-serif"],
    },
    screens: {
      tablet: "768px",
      laptop: "1024px",
    },
    extend: {},
  },
};
