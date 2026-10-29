// streak (optional): {
//   currentStreak, longestStreak, postedToday, totalMessagesPosted,
//   recentDays: [{ date, posted, messagesPosted }]  // 7 entries, oldest->newest
// }

export const Header = ({ onOpenCollection, streak }) => {
    const recentDays = streak?.recentDays ?? []

    return (
        <>
            {/* COLLECTION BUTTON (top-left) */}
            <button
                onClick={onOpenCollection}
                title="View collection"
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

            {/* STREAK BADGE (top-right)*/}
            {streak && (
                <div className="fixed top-4 right-6 z-50 flex items-center gap-2">
                    {streak.postedToday && (
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-amber-50 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                            Written today
                        </span>
                    )}

                    <div className="group relative">
                        <button
                            className="flex items-center gap-1 text-xs font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                            title="Your streak"
                            aria-label={`Streak: ${streak.currentStreak} day${streak.currentStreak === 1 ? "" : "s"}`}
                        >
                            <span className="p-2 bg-white dark:bg-zinc-800 rounded-full shadow-sm border border-zinc-100 dark:border-zinc-700 group-hover:border-zinc-300 dark:group-hover:border-zinc-600 transition-colors">
                                🔥{streak.currentStreak}
                            </span>
                            {/* <span>{streak.currentStreak}</span> */}
                        </button>

                        {/* HOVER PANEL */}
                        <div className="pointer-events-none opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 absolute right-0 top-full mt-2 w-56 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg p-4">
                            <div className="flex justify-between text-sm mb-3">
                                <span className="text-zinc-400">
                                    Longest streak
                                </span>
                                <span className="font-medium text-zinc-800 dark:text-zinc-100">
                                    {streak.longestStreak} day
                                    {streak.longestStreak === 1 ? "" : "s"}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm mb-4">
                                <span className="text-zinc-400">
                                    Notes shared
                                </span>
                                <span className="font-medium text-zinc-800 dark:text-zinc-100">
                                    {streak.totalMessagesPosted}
                                </span>
                            </div>

                            {/* 7-DAY HEATMAP — recentDays is oldest->newest */}
                            <div className="flex justify-between items-end">
                                {recentDays.map((day) => (
                                    <div
                                        key={day.date}
                                        className="flex flex-col items-center gap-1"
                                        title={`${day.date} · ${day.messagesPosted} note${day.messagesPosted === 1 ? "" : "s"}`}
                                    >
                                        <span
                                            className="rounded-full inline-block"
                                            style={{
                                                width: day.posted
                                                    ? Math.min(
                                                          8 + day.messagesPosted * 2,
                                                          24
                                                      )
                                                    : 6,
                                                height: day.posted
                                                    ? Math.min(
                                                          8 + day.messagesPosted * 2,
                                                          24
                                                      )
                                                    : 6,
                                                backgroundColor: day.posted
                                                    ? "#f59e0b"
                                                    : "#d4d4d4",
                                            }}
                                        />
                                        <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
                                            {new Date(day.date).toLocaleDateString(
                                                undefined,
                                                { weekday: "narrow" }
                                            )}
                                        </span>
                                        {/* count row has a fixed height (empty for
                                            unposted days) so columns stay aligned */}
                                        <span className="text-[10px] font-medium text-zinc-600 dark:text-zinc-300 h-3 leading-3 inline-block">
                                            {day.posted ? day.messagesPosted : ""}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

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
