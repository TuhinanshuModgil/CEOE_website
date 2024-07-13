/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "tertary-color": "#7e269b",
        "tertary-color-hover": "#9d42d1"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
