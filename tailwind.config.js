/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./mdx/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#10b981",
      },
      height: {
        navh: "80px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
