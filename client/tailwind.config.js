/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cabinet: ["Cabinet", "sans-serif"],
        satoshi: ["Satoshi", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      animation: {
        "gradient-x": "gradient-x 2s linear 3",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { "background-position": "0% 50%" },
          "33%": { "background-position": "100% 50%" },
          "66%": { "background-position": "0% 50%" },
        },
      },
    },
  },
  plugins: [],
};
