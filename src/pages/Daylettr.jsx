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
import {
    collectNote,
    removeFromCollection,
    isCollected,
} from "../api/collectionService"
import { useVisitor } from "../hooks/useVisitor"
import { useTheme } from "../hooks/useTheme"
import { useState, useEffect } from "react"
import { Cooldown } from "./Cooldown"
import { RevealNote } from "./RevealNote"
import { WriteNote } from "./WriteNote"
import { YesterdayNotes } from "./YesterdayNotes"
import { CollectionNotes } from "./CollectionNotes"
import { AnimatePresence } from "framer-motion"
import { PageTransition } from "../components/PageTransition"

export const DaylettrPage = () => {
    const visitorId = useVisitor()
    const { isDark, toggleTheme } = useTheme()
    const [view, setView] = useState("") // "" | "landing" | "reading" | "writing" | "cooldown" | "yesterday" | "collection"
    const [note, setNote] = useState(null)
    const [rating, setRating] = useState(50)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [previousView, setPreviousView] = useState("")
    const [collectedIds, setCollectedIds] = useState([])
    const [lastPostedAt, setLastPostedAt] = useState(null)

    useEffect(() => {
        async function checkInitialStatus() {
            try {
                const status = await cooldownStatus()
                setLastPostedAt(status.lastPostedAt)
                setView(status.onCooldown ? "cooldown" : "landing")
            } catch {
                setView("landing")
            }
        }
        if (visitorId) checkInitialStatus()
    }, [visitorId])

    useEffect(() => {
        if (view === "reading" && note?.id) {
            // Server is source of truth: sync bookmark state on entering
            // the reading view (also covers back-navigation from the
            // collection page, where removals happen locally there).
            isCollected(note.id)
                .then((collected) => {
                    setCollectedIds((prev) => {
                        const has = prev.includes(note.id)
                        if (collected && !has) return [...prev, note.id]
                        if (!collected && has)
                            return prev.filter((id) => id !== note.id)
                        return prev
                    })
                })
                .catch((err) => console.error(err))
        }
    }, [view, note])

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
        } catch {
            setError("Failed to send your note.")
        }
    }

    async function toggleCollection(messageId) {
        const wasCollected = collectedIds.includes(messageId)
        setCollectedIds(
            wasCollected
                ? collectedIds.filter((id) => id !== messageId)
                : [...collectedIds, messageId]
        )
        try {
            if (wasCollected) {
                await removeFromCollection(messageId)
            } else {
                await collectNote(messageId)
            }
        } catch (err) {
            console.error(err)
            // collectedIds (closure) is the pre-toggle state — restore it
            setCollectedIds(collectedIds)
        }
    }

    function goToYesterday() {
        setPreviousView(view)
        setView("yesterday")
    }

    function goToCollection() {
        setPreviousView(view)
        setView("collection")
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white transition-colors duration-300">
            <Header onOpenCollection={goToCollection} />
            {view === "yesterday" || view === "collection" ? (
                    <AnimatePresence mode="wait">
                        {view === "yesterday" ? (
                            <PageTransition key="yesterday">
                                <YesterdayNotes
                                    onBack={() => {
                                        setView(previousView)
                                    }}
                                />
                            </PageTransition>
                        ) : (
                            <PageTransition key="collection">
                                <CollectionNotes
                                    onBack={() => {
                                        setView(previousView)
                                    }}
                                />
                            </PageTransition>
                        )}
                    </AnimatePresence>
                ) : (
                    <>
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
                                                darkMode={isDark}
                                                onToggle={toggleTheme}
                                            />
                                            <FeaturedNote
                                                note={"test"}
                                                onClickAdd={() => {}}
                                                onClickRemove={() => {}}
                                            />
                                        </div>
                                    </PageTransition>
                                )}

                                {view === "reading" && note && (
                                    <PageTransition key="reading">
                                        <RevealNote
                                            note={note}
                                            darkMode={isDark}
                                            onToggleTheme={toggleTheme}
                                            onWrite={() => setView("writing")}
                                            onRate={setRating}
                                            collected={collectedIds.includes(
                                                note.id
                                            )}
                                            onToggleCollection={() =>
                                                toggleCollection(note.id)
                                            }
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
    )
}
