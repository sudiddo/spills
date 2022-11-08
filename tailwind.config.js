/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        azeret: ["Azeret Mono", "sans-serif"],
        sans: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
};
