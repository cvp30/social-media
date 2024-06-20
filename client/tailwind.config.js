/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react"


export default {
  // darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
      },
      spacing: {
        '148': '37rem',
      }
    },
  },
  plugins: [nextui({
    addCommonColors: true,
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: {
            DEFAULT: '#377DFF',
          },
          background: 'white',
          foreground: '#27272a', // text

        }
      },
      dark: {
        colors: {
          primary: {
            DEFAULT: '#377DFF',
          },
          background: '#15202B',
          foreground: 'white',
        }
      }
    }
  })],
}

