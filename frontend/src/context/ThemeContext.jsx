import { createContext, useMemo, useState } from "react";
import themes from "../theme";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

    const [themeName, setThemeName] = useState("romantic");

    const value = useMemo(() => ({

        theme: themes[themeName],

        themeName,

        setTheme: setThemeName,

    }), [themeName]);

    return (

        <ThemeContext.Provider value={value}>

            {children}

        </ThemeContext.Provider>

    );

};