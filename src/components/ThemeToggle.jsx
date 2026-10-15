import { Moon, Sun } from "lucide-react"

export const ThemeToggle = ({ darkMode, onToggle }) => {
    return (
        <div className="mt-6 mb-2 flex justify-center">
            <button
                className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors focus:outline-none"
                aria-label="Toggle theme"
                aria-pressed={darkMode}
                onClick={onToggle}
            >
                {darkMode ? (
                    <Sun size={20} />
                ) : (
                    <Moon size={20} />
                )}
            </button>
        </div>
    )
}
