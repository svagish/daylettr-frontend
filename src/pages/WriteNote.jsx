import { useState } from "react"

export const WriteNote = ({ onSubmit, error }) => {
    const [text, setText] = useState("")
    const [loading, setLoading] = useState(false)

    const handleClick = async () => {
        if (!text.trim()) return
        setLoading(true)
        try {
            await onSubmit(text) 
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center w-full mt-16">
            
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Leave a thought for the person after you..."
                maxLength={300}
                className="font-serif text-2xl p-4 bg-transparent dark:bg-transparent border-b-2 border-zinc-300 dark:border-zinc-700 focus:outline-none focus:border-zinc-800 dark:focus:border-zinc-400 transition-colors resize-none w-full h-48"
            />

            <div className="w-full max-w-md text-right mt-1">
                <span className="text-xs text-gray-400">
                    {text.length} / 300
                </span>
            </div>

            {error && <p className="text-red-400 text-xs mt-2">{error}</p>}

            <button
                onClick={handleClick}
                disabled={loading || !text.trim()}
                className="mt-6 bg-zinc-800 text-white dark:bg-zinc-200 dark:text-zinc-900 font-bold py-3 px-8 rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-300 disabled:bg-zinc-400 dark:disabled:bg-zinc-600 transition-colors"
            >
                {loading ? "Sending..." : "Pass it on"}
            </button>
        </div>
    )
}
