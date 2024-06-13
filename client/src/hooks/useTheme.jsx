import { useEffect, useState } from "react"


export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  )

  const onChangeTheme = () => setIsDarkMode(!isDarkMode)

  useEffect(() => {
    isDarkMode ?
      document.documentElement.classList.add('dark')
      :
      document.documentElement.classList.remove('dark')
    localStorage.theme = isDarkMode ? 'dark' : 'light'

  }, [isDarkMode])

  return {
    isDarkMode,
    onChangeTheme,
  }
}