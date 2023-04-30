/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./posts/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#10b981",
      },
      height: {
        navh: "60px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
