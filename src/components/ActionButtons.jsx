export const ActionButtons = ({ onReveal, onYesterday, loading }) => {
    return (
        <div className="flex gap-3">
            <button
                onClick={onReveal}
                disabled={loading}
                className="h-12 w-64 flex items-center justify-center bg-zinc-800 text-white dark:bg-zinc-200 dark:text-zinc-900 font-bold rounded-full hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors text-sm shadow-sm"
            >
                {loading ? "Loading..." : "Reveal today's note"}
            </button>

            <button
                onClick={onYesterday}
                className="h-12 w-64 flex items-center justify-center bg-white text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 font-bold rounded-full border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors text-sm shadow-sm"
            >
                See yesterday's notes
            </button>
        </div>
    )
}
