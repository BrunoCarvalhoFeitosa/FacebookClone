module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      screens: {
        'xl': '1560px',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}