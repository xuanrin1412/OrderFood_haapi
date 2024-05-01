/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#243c5a',
        'secondary': '#F8FBFF',
        'third': "#347AE2",
        'textMain': "#96A0B5",
        'textsecondary': "#73778B",
        'borderColor': '#E0E5ED',
        'borderColorDark': '#565C70',
        'textInput': "#292C38"
      },
      spacing: {
        '58': '3.625rem',
      },
      lineHeight: {
        'nomalText': '1.4rem',
      },
      letterSpacing: {
        'nomalText': '0.3px',
      },
      fontFamily: {
        "Inter": ['"Inter"', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        'sm': '350px',
        // => @media (min-width: 576px) { ... }

        'md': '960px',
        // => @media (min-width: 960px) { ... }

        'lg': '1124px',
        // => @media (min-width: 1024px) { ... }

        'xl': '1400px',
        // => @media (min-width: 1400px) { ... }
      },
    },
    darkMode: 'class',
    plugins: []
  }
}
