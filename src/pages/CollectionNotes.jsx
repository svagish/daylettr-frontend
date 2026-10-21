import { useEffect, useState } from "react"
import { Header } from "../components/Header"
import { NoteCard } from "../components/NoteCard"
import { getCollection, removeFromCollection } from "../api/collectionService"

export const CollectionNotes = ({ onBack }) => {
    const [notes, setNotes] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCollection = async () => {
            try {
                const data = await getCollection()
                setNotes(data.notes)
                setTotal(data.totalCollected)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchCollection()
    }, [])

    async function handleRemove(messageId) {
        // optimistic removal
        setNotes((prev) => prev.filter((n) => n.messageId !== messageId))
        setTotal((prev) => Math.max(0, prev - 1))
        try {
            await removeFromCollection(messageId)
        } catch (err) {
            console.error(err)
            // rollback: refetch to reconcile server state
            try {
                const data = await getCollection()
                setNotes(data.notes)
                setTotal(data.totalCollected)
            } catch (e) {
                console.error(e)
            }
        }
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white transition-colors duration-300">
            <Header />
            <main className="px-8 py-4 max-w-6xl mx-auto">
                {/* TOP ROW */}
                <div className="flex justify-between items-center mb-8">
                    <button
                        onClick={onBack}
                        className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
                    >
                        ← Back
                    </button>
                    <h2 className="text-2xl font-serif italic text-gray-900 dark:text-white">
                        Your Collection
                    </h2>
                </div>

                {/* LOADING */}
                {loading && (
                    <p className="text-center text-gray-400 text-sm animate-pulse mt-16">
                        Loading your collection...
                    </p>
                )}

                {/* ERROR STATE */}
                {!loading && error && (
                    <p className="text-center text-gray-400 text-sm mt-16">
                        {error}
                    </p>
                )}

                {/* NOTES GRID */}
                {!loading && !error && notes.length > 0 && (
                    <>
                        <p className="text-xs text-gray-400 mb-4">
                            {total} note{total === 1 ? "" : "s"} in your collection
                        </p>
                        <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
                            {notes.map((note) => (
                                <NoteCard
                                    key={note.messageId}
                                    note={note}
                                    onDelete={() =>
                                        handleRemove(note.messageId)
                                    }
                                />
                            ))}
                        </div>
                    </>
                )}

                {/* EMPTY STATE */}
                {!loading && !error && notes.length === 0 && (
                    <p className="text-center text-gray-400 text-sm mt-16">
                        No notes in your collection yet.
                    </p>
                )}
            </main>
        </div>
    )
}
