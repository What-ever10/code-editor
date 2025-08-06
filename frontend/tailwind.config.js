/** @type {import('tailwindcss').Config} */
// Import the default theme to extend it.
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // --- ADD THIS FONT FAMILY CONFIGURATION ---
      // This tells Tailwind to use 'Inter' as the primary sans-serif font,
      // with the default system fonts as fallbacks.
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      // --- END OF FONT CONFIGURATION ---
    },
  },
  plugins: [],
}
