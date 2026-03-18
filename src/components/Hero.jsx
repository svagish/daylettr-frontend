import dayLettrLogo from "../assets/daylettr-logo.png"
export const Hero = () => {
    return (
        <div className="flex flex-col items-center gap-3 mt-5">
            <img src={dayLettrLogo} alt="Daylettr logo" className="w-48 mb-2" />
            <h1 className="font-serif text-3xl text-zinc-800 dark:text-zinc-200 mb-4 tracking-tight">Daylettr</h1>
            <p className="max-w-md mb-8 text-center text-zinc-600 dark:text-zinc-400">
                Receive a single, anonymous note from the person who came
                before. Then, leave one for the person who comes after.
            </p>
        </div>
    )
}
