import { Trash2 } from "lucide-react"

// badge can be "most_inspiring", "highly_rated", or null
export const NoteCard = ({ note, onDelete }) => {
    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-5 break-inside-avoid mb-4 relative">
            {onDelete && (
                <button
                    className="absolute middle-3 right-3 p-1 rounded-full text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                    aria-label="Remove from collection"
                    title="Remove from collection"
                    onClick={onDelete}
                >
                    <Trash2 size={16} />
                </button>
            )}
            <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-200">
                {note.content}
            </p>
        </div>
    )
}
