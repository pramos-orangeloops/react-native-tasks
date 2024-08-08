import { createContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { AppTheme, darkTheme, ligthTheme } from "../style/themes";

export const ThemeContext = createContext<AppTheme>(ligthTheme)

export interface ThemeContextProviderProps {
    children: any
}

export const ThemeContextProvider = (props: ThemeContextProviderProps) => {

    const systemTheme = useColorScheme()
    const [theme, setTheme] = useState(systemTheme === "dark" ? darkTheme : ligthTheme)

    useEffect(() => {
        setTheme(systemTheme === "dark" ? darkTheme : ligthTheme)
    }, [systemTheme])

    return (
        <ThemeContext.Provider value={theme}>
            {props.children}
        </ThemeContext.Provider>
    )
}
