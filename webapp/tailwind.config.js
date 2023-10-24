/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', 
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'theme-logo-blue': '#0084c6',
        'theme-bg-blue': '#e4eaf1',
        'theme-contrast-blue-dark': '#b7cbe2',
        'theme-contrast-blue-light': '#cad8e7',
        'theme-grey': '#dddddd'
      }
    },
  },
  plugins: [],
}

