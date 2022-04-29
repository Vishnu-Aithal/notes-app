import { useContext, createContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [darkTheme, setDarkTheme] = useState(false);

    return (
        <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
