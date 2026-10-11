import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import { KEYS } from "../services/storageService";

export default function useTheme() {
  const [theme, setTheme] = useLocalStorage(KEYS.theme, "dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  return [theme, toggleTheme];
}
