import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export function ThemeProvider({ children }) {
  // Theme can be "normal" (Sleek Obsidian Dark) or "cute" (Colorful Cute Pastel)
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("presidium_theme");
      if (saved === "cute" || saved === "normal") {
        return saved;
      }
    } catch {
      // Ignore localStorage errors
    }
    return "normal"; // Default is Normal sleek dark mode (not blue)
  });

  useEffect(() => {
    try {
      localStorage.setItem("presidium_theme", theme);
    } catch {
      // Ignore
    }
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "cute") {
      document.documentElement.classList.add("theme-cute");
      document.documentElement.classList.remove("theme-normal");
    } else {
      document.documentElement.classList.add("theme-normal");
      document.documentElement.classList.remove("theme-cute");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "normal" ? "cute" : "normal"));
  };

  const isCute = theme === "cute";

  const value = {
    theme,
    setTheme,
    toggleTheme,
    isCute,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
