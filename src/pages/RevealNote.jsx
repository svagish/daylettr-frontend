import { RevealedNote } from "../components/RevealedNote"
import { NoteActions } from "../components/NoteActions"
import { MotivationSlider } from "../components/MotivationSlider"
import { WriteNoteFooter } from "../components/WriteNoteFooter"

export const RevealNote = ({
    note,
    onRate,
    onWrite,
    darkMode,
    onToggleTheme,
    collected,
    onToggleCollection,
}) => {
    return (
        <div className="flex flex-col items-center w-full px-4 mx-auto">
            <RevealedNote note={note} />
            <NoteActions
                onShare={() => {}}
                collected={collected}
                onToggleCollection={onToggleCollection}
            />
            <MotivationSlider onRate={onRate} />{" "}
            <WriteNoteFooter
                onWrite={onWrite}
                darkMode={darkMode}
                onToggleTheme={onToggleTheme}
            />
        </div>
    )
}
