export const RevealedNote = ({ note }) => {
    return (
        <div className="text-center max-w-2xl mx-auto px-4">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                A note from the person before you...
            </p>

            <h2 className="font-serif text-3xl md:text-4xl leading-tight text-zinc-800">
                {note.content}
            </h2>
        </div>
    )
}
