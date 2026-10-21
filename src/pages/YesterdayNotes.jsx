import { useEffect, useState } from "react"
import { NoteCard } from "../components/NoteCard"
import { getYesterdayNotes } from "../api/messageService"
export const YesterdayNotes = ({ onBack }) => {
    const [notes, setNotes] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const data = await getYesterdayNotes()
                setNotes(data.messages)
                setTotal(data.totalMessages)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchNotes()
    }, [])

    return (
        <main className="px-8 py-4 max-w-6xl mx-auto">
                {/* TOP ROW */}
                <div className="flex justify-between items-center mb-8">
                    <button
                        onClick={onBack}
                        className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
                    >
                        ← Back to today
                    </button>
                    <h2 className="text-2xl font-serif italic text-gray-900 dark:text-white">
                        Some of Yesterday's Notes
                    </h2>
                </div>

                {/* LOADING */}
                {loading && (
                    <p className="text-center text-gray-400 text-sm animate-pulse mt-16">
                        Loading notes...
                    </p>
                )}

                {/* NOTES GRID */}
                {!loading && notes.length > 0 && (
                    <>
                        <p className="text-xs text-gray-400 mb-4">
                            {total} notes shared yesterday
                        </p>
                        <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
                            {notes.map((note) => (
                                <NoteCard key={note.id} note={note} />
                            ))}
                        </div>
                    </>
                )}

                {/* EMPTY STATE */}
                {!loading && notes.length === 0 && (
                    <p className="text-center text-gray-400 text-sm mt-16">
                        No notes from yesterday yet.
                    </p>
                )}
        </main>
    )
}
