export const Header = () => {
    return (
        <>
            <button
                title="Add to collection"
                className="fixed top-4 left-6 z-50 group flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-zinc-800 dark:text-zinc-500 dark:hover:text-zinc-200 transition-colors"
            >
                <div className="p-2 bg-white dark:bg-zinc-800 rounded-full shadow-sm border border-zinc-100 dark:border-zinc-700 group-hover:border-zinc-300 dark:group-hover:border-zinc-600 transition-colors">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    </svg>
                </div>
            </button>

            <header className="w-full px-6 py-4 flex justify-center items-center">
                <div className="flex flex-col items-center">
                    <span className="text-xs tracking-widest text-gray-400 uppercase">
                        Internet Mood Today
                    </span>
                    <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-gray-800 dark:bg-gray-200 inline-block" />
                        <span className="text-sm italic text-gray-700 dark:text-gray-300">
                            Calm
                        </span>
                    </div>
                </div>
            </header>
        </>
    )
}