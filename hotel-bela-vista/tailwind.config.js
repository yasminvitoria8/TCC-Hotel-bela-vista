/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#18211d",
        pine: "#24483d",
        sage: "#6d8b7e",
        cream: "#f6f3ed",
        sand: "#e9e0d1"
      }
    }
  },
  plugins: []
};