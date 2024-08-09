import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContextProvider"

const useTheme = () => {
    const theme = useContext(ThemeContext)
    return theme
}

export default useTheme