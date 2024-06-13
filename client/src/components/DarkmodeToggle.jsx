import { Moon, Sun } from "../icons"
import { useTheme } from "../hooks/useTheme"

const DarkmodeToggle = () => {

  const { isDarkMode, onChangeTheme } = useTheme()


  return (
    <button onClick={onChangeTheme}>
      {isDarkMode ? <Moon /> : <Sun />}
    </button>
  )
}
export default DarkmodeToggle