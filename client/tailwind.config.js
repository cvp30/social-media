/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react"


export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [nextui({
    addCommonColors: true,
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          background: 'white',
        }
      },
      dark: {
        colors: {
          background: '#15202B',
        }
      }
    }
  })],
}

