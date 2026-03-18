import { useState } from "react"

export const MotivationSlider = ({ onRate }) => {
    const [value, setValue] = useState(50)

    const handleChange = (e) => {
        const newValue = Number(e.target.value)
        setValue(newValue)
        onRate(newValue)
    }

    return (
        <div className="w-md mt-10 mb-4 p-6 bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-100 dark:border-zinc-700/50 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    How motivational was this note?
                </label>
                <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
                    {value}%
                </span>
            </div>

            <div className="relative h-6 flex items-center">
                <div className="absolute w-full h-2 bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-zinc-800 dark:bg-zinc-200"
                        style={{ width: `${value}%` }}
                    />
                </div>

                <input
                    min="0"
                    max="100"
                    step="1"
                    value={value}
                    onChange={handleChange}
                    className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                    type="range"
                />

                <div
                    className="absolute w-6 h-6 bg-white dark:bg-zinc-900 border-2 border-zinc-800 dark:border-zinc-200 rounded-full shadow-md pointer-events-none z-0"
                    style={{
                        left: `calc(${value}% - 12px)`,
                        transition: "none",
                    }}
                />
            </div>

            <div className="flex justify-between mt-2 text-[10px] text-zinc-400 uppercase tracking-wider font-medium">
                <span>Not really</span>
                <span>Somewhat</span>
                <span>Very</span>
            </div>
        </div>
    )

    /*
    return (
        <div className="max-w-sm mx-auto mt-10 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-blue-500">
                    How motivational was this note?
                </span>

                <span className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md text-xs text-gray-600 dark:text-gray-300">
                    {value}%
                </span>
            </div>
            <input
                type="range"
                min={0}
                max={100}
                value={value}
                onChange={handleChange}
                className="w-full accent-black dark:accent-white"
            />

            <div className="flex justify-between mt-2 text-xs text-gray-400 uppercase tracking-wider">
                <span>Not Really</span>
                <span>Somewhat</span>
                <span>Very</span>
            </div>
        </div>
    )
        */
}
