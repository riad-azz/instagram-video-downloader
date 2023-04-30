"use client";

import { createContext, useState } from "react";

export const ThemeContext = createContext({
  theme: "",
  setTheme: (set: string) => {},
});

interface IThemeProvider {
  value: string;
  children: React.ReactNode;
}

const ThemeProvider: React.FC<IThemeProvider> = ({ value, children }) => {
  const [theme, setTheme] = useState(value);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
