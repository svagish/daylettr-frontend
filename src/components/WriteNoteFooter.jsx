import { Moon, Sun } from "lucide-react"

export const WriteNoteFooter = ({ onWrite, darkMode, onToggleTheme }) => {
    return (
        <div className="flex flex-col items-center w-full mt-12 gap-6">
            <div className="flex items-center gap-4">
                <button
                    className="h-10 px-6 flex items-center justify-center bg-black text-white hover:bg-zinc-800 transition-colors border border-black rounded-full font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-zinc-300 dark:border-zinc-200"
                    onClick={onWrite}
                >
                    Write a note to the next person
                </button>

                <button
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors focus:outline-none"
                    aria-label="Toggle theme"
                    aria-pressed={darkMode}
                    onClick={onToggleTheme}
                >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            </div>
            <p className="text-xs text-center text-zinc-400 dark:text-zinc-500 max-w-xs mt-5">
                A gentle reminder:{" "}
                This is your one view for the day. If you leave or refresh
                now, you won't be able to send a reply until tomorrow.
            </p>
        </div>
    )
}
