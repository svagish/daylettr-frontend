import { useEffect, useState } from "react"
import { FeaturedNote } from "../components/FeaturedNote"

function useCountdown(lastPostedAt) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!lastPostedAt) return;

    const interval = setInterval(() => {
      // reset time is exactly lastPostedAt + 6 hours
      const reset = new Date(lastPostedAt);
      reset.setHours(reset.getHours() + 6);

      const diff = reset - new Date();
      if (diff <= 0) {
        setTimeLeft("00:00:00");
        clearInterval(interval);
        return;
      }

      const h = String(Math.floor(diff / 3600000)).padStart(2, "0");
      const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
      const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
      setTimeLeft(`${h}:${m}:${s}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [lastPostedAt]);

  return timeLeft;
}

export const Cooldown = ({ streak = 0, stats, featuredNote, onYesterday, lastPostedAt }) => {
    const timeLeft = useCountdown(lastPostedAt)

    return (
        <div className="mt-16 flex flex-col items-center gap-8 w-full max-w-xl">
            <div className="text-center">
                <h2 className="text-3xl font-serif text-gray-900 dark:text-white mb-3">
                    Your note is now waiting.
                </h2>
                <p className="text-sm text-gray-400 max-w-sm mx-auto">
                    Thank you for sharing a piece of your day.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-8 text-center">
                <div>
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
                    <p className="text-4xl font-mono font-light text-gray-900 dark:text-white">
                        {timeLeft || "..."}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full">
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

                <div className="col-span-2 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stats?.wordsShared ?? "53"}
                    </p>
                    <p className="text-xs text-gray-400 tracking-widest uppercase mt-1">
                        Words Shared by the Community Today
                    </p>
                </div>
            </div>

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
