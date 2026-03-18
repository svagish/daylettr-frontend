// badge can be "most_inspiring", "highly_rated", or null
export const NoteCard = ({ note }) => {
    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-5 break-inside-avoid mb-4">
            <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-200">
                {note.content}
            </p>
        </div>
    )
}
