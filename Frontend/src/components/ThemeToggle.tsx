import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="fixed bottom-4 right-4 p-3 rounded-full bg-white dark:bg-neutral-800 shadow-lg hover:shadow-xl transition-shadow"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="h-6 w-6 text-neutral-700" />
      ) : (
        <Sun className="h-6 w-6 text-yellow-500" />
      )}
    </button>
  );
} 