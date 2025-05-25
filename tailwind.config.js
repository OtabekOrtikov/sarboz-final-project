/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./basket.html",
      "./src/**/*.{ts,tsx,js,jsx}"
    ],
    theme: {
      extend: {
        colors: {
          primary: "#EF4444", // our red vibe
        }
      }
    },
    plugins: [],
  }
  