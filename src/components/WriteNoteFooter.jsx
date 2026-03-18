export const WriteNoteFooter = ({ onWrite, darkMode, onToggleTheme }) => {
    return (
        <div className="flex flex-col items-center w-full mt-12 gap-6">
            <div className="flex items-center gap-4">
                <button
                    className="h-10 px-6 flex items-center justify-center bg-black text-white hover:bg-zinc-800 transition-colors border border-black rounded-full font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={onWrite}
                >
                    Write a note to the next person
                </button>

                <button
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors focus:outline-none"
                    aria-label="Toggle theme"
                    onClick={onToggleTheme}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ opacity: 1, transform: "none" }}
                    >
                        <circle cx="12" cy="12" r="5" />
                        <line x1="12" y1="1" x2="12" y2="3" />
                        <line x1="12" y1="21" x2="12" y2="23" />
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                        <line x1="1" y1="12" x2="3" y2="12" />
                        <line x1="21" y1="12" x2="23" y2="12" />
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </svg>{" "}
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
