import { useEffect, useState } from "react"
import { FeaturedNote } from "../components/FeaturedNote"

// Countdown timer hook — reusable
function useCountdown(targetHours = 6) {
    const [timeLeft, setTimeLeft] = useState("")

    useEffect(() => {
        const interval = setInterval(() => {
            // replace this with your actual reset time from backend if available
            const now = new Date()
            const reset = new Date()
            reset.setHours(reset.getHours() + targetHours, 0, 0, 0)

            const diff = reset - now
            if (diff <= 0) {
                setTimeLeft("00:00:00")
                clearInterval(interval)
                return
            }

            const h = String(Math.floor(diff / 3600000)).padStart(2, "0")
            const m = String(Math.floor((diff % 3600000) / 60000)).padStart(
                2,
                "0",
            )
            const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0")
            setTimeLeft(`${h}:${m}:${s}`)
        }, 1000)

        return () => clearInterval(interval) // cleanup on unmount
    }, [])

    return timeLeft
}

export const Cooldown = ({ streak = 0, stats, featuredNote, onYesterday }) => {
    const timeLeft = useCountdown(6)

    return (
        // mt-16         → push content down from header
        // flex flex-col → stack everything vertically
        // items-center  → center horizontally
        // gap-8         → space between sections
        <div className="mt-16 flex flex-col items-center gap-8 w-full max-w-xl">
            {/* TITLE */}
            <div className="text-center">
                <h2 className="text-3xl font-serif text-gray-900 dark:text-white mb-3">
                    Your note is now waiting.
                </h2>
                {/* max-w-sm   → keep subtitle narrow so it wraps like the design */}
                <p className="text-sm text-gray-400 max-w-sm mx-auto">
                    Thank you for sharing a piece of your day.
                </p>
            </div>

            {/* STREAK + COUNTDOWN ROW */}
            {/* grid grid-cols-2 → two equal columns side by side */}
            {/* gap-8            → space between them */}
            <div className="grid grid-cols-2 gap-8 text-center">
                <div>
                    {/* text-xs tracking-widest → small spaced label like the design */}
                    <p className="text-xs text-gray-400 tracking-widest mb-1">
                        Message Streak
                    </p>
                    <p className="text-4xl font-light text-gray-900 dark:text-white">
                        {streak}
                    </p>
                </div>
                <div>
                    <p className="text-xs text-gray-400 tracking-widest mb-1">
                        Next note in:
                    </p>
                    {/* font-mono   → monospace so digits don't jump around as they change */}
                    {/* text-4xl    → big prominent countdown */}
                    <p className="text-4xl font-mono font-light text-gray-900 dark:text-white">
                        {timeLeft || "..."}
                    </p>
                </div>
            </div>

            {/* STATS GRID */}
            {/* grid grid-cols-2 gap-3 → two stat cards side by side */}
            <div className="grid grid-cols-2 gap-3 w-full">
                {/* STAT CARD */}
                {/* border rounded-xl p-4 → card look */}
                {/* text-center           → centered content */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stats?.positiveVibes ?? "67"}%
                    </p>
                    <p className="text-xs text-gray-400 tracking-widest uppercase mt-1">
                        Positive Vibes Today
                    </p>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stats?.turnedPositive ?? "100"}%
                    </p>
                    <p className="text-xs text-gray-400 tracking-widest uppercase mt-1">
                        Turned Negative to Positive
                    </p>
                </div>

                {/* FULL WIDTH STAT — spans both columns */}
                {/* col-span-2 → takes up both grid columns */}
                <div className="col-span-2 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stats?.wordsShared ?? "53"}
                    </p>
                    <p className="text-xs text-gray-400 tracking-widest uppercase mt-1">
                        Words Shared by the Community Today
                    </p>
                </div>
            </div>

            {/* FEATURED NOTE — reusing our existing component */}
            <FeaturedNote note={"test"} />

            <button
                onClick={onYesterday}
                className="border border-gray-300 text-black px-6 py-3 rounded-full font-semibold text-sm hover:bg-gray-50 transition"
            >
                See yesterday's notes
            </button>
        </div>
    )
}
