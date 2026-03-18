import { Header } from "../components/Header"
import { Hero } from "../components/Hero"
import { ActionButtons } from "../components/ActionButtons"
import { ThemeToggle } from "../components/ThemeToggle"
import { FeaturedNote } from "../components/FeaturedNote"
import {
    getTodaysNote,
    postNote,
    cooldownStatus,
} from "../api/messageService"
import { useVisitor } from "../hooks/useVisitor"
import { useState, useEffect } from "react"
import { Cooldown } from "./Cooldown"
import { RevealNote } from "./RevealNote"
import { WriteNote } from "./WriteNote"
import { YesterdayNotes } from "./YesterdayNotes"
import { AnimatePresence } from "framer-motion"
import { PageTransition } from "../components/PageTransition"

export const DaylettrPage = () => {
    const visitorId = useVisitor()
    const [darkMode, setDarkMode] = useState(false)
    const [view, setView] = useState("") // "" | "landing" | "reading" | "writing" | "cooldown" | "yesterday"
    const [note, setNote] = useState(null)
    const [rating, setRating] = useState(50)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [previousView, setPreviousView] = useState("")
    const [collection, setCollection] = useState([])
    const [lastPostedAt, setLastPostedAt] = useState(null)
    const toggleTheme = () => setDarkMode(!darkMode)

    useEffect(() => {
        async function checkInitialStatus() {
            try {
                const status = await cooldownStatus()
                setLastPostedAt(status.lastPostedAt)
                setView(status.onCooldown ? "cooldown" : "landing")
            } catch (err) {
                setView("landing")
            }
        }
        if (visitorId) checkInitialStatus()
    }, [visitorId])

    async function handleReveal() {
        setLoading(true)
        try {
            const data = await getTodaysNote()
            setNote(data)
            setView("reading")
        } catch (err) {
            if (err.response?.status === 400) setView("cooldown")
        } finally {
            setLoading(false)
        }
    }

    async function handleSubmit(text) {
        try {
            await postNote(text, note.id, rating)
            setView("cooldown")
        } catch (err) {
            setError("Failed to send your note.")
        }
    }

    function handleAddToCollection() {
        // setCollection([...collection, note])
        // localStorage.setItem("daylettr-favorites", collection)
    }

    function handleRemoveFromCollection() {
        // setCollection(
        //     collection.filter((c) => {
        //         c.id != note.id
        //     }),
        // )
        // localStorage.setItem("daylettr-favorites", collection)
    }

    function goToYesterday() {
        setPreviousView(view)
        setView("yesterday")
    }

    return (
        <div className={darkMode ? "dark" : ""}>
            <div className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white transition-colors duration-300">
                {view === "yesterday" ? (
                    <AnimatePresence mode="wait">
                        <PageTransition key="yesterday">
                            <YesterdayNotes
                                onBack={() => {
                                    setView(previousView)
                                }}
                            />
                        </PageTransition>
                    </AnimatePresence>
                ) : (
                    <>
                        <Header />
                        <AnimatePresence mode="wait">
                            <main className="flex flex-col items-center px-4">
                                {view === "" && (
                                    <PageTransition key="loading">
                                        <div className="mt-32 text-gray-400 text-sm animate-pulse">
                                            Loading...
                                        </div>
                                    </PageTransition>
                                )}

                                {view === "landing" && (
                                    <PageTransition key="landing">
                                        <div className="flex flex-col items-center mb-4">
                                            <Hero />
                                            <ActionButtons
                                                onReveal={handleReveal}
                                                onYesterday={goToYesterday}
                                                loading={loading}
                                            />
                                            <ThemeToggle
                                                darkMode={darkMode}
                                                onToggle={toggleTheme}
                                            />
                                            <FeaturedNote
                                                note={"test"}
                                                onClickAdd={
                                                    handleAddToCollection
                                                }
                                                onClickRemove={
                                                    handleRemoveFromCollection
                                                }
                                            />
                                        </div>
                                    </PageTransition>
                                )}

                                {view === "reading" && note && (
                                    <PageTransition key="reading">
                                        <RevealNote
                                            note={note}
                                            darkMode={darkMode}
                                            onToggleTheme={toggleTheme}
                                            onWrite={() => setView("writing")}
                                            onRate={setRating}
                                        />
                                    </PageTransition>
                                )}

                                {view === "writing" && (
                                    <PageTransition key="writing">
                                        <WriteNote
                                            onSubmit={handleSubmit}
                                            error={error}
                                        />
                                    </PageTransition>
                                )}

                                {view === "cooldown" && (
                                    <PageTransition key="cooldown">
                                        <Cooldown onYesterday={goToYesterday} lastPostedAt={lastPostedAt}/>
                                    </PageTransition>
                                )}
                            </main>
                        </AnimatePresence>
                    </>
                )}
            </div>
        </div>
    )
}
