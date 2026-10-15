import { useState, useEffect, useCallback } from "react"

const STORAGE_KEY = "daylettr-theme"

function getInitialIsDark() {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === "dark") return true
    if (stored === "light") return false
    return window.matchMedia("(prefers-color-scheme: dark)").matches
}

function applyToDocument(isDark) {
    const root = document.documentElement
    root.classList.toggle("dark", isDark)
    root.style.colorScheme = isDark ? "dark" : "light"
}

export const useTheme = () => {
    const [isDark, setIsDark] = useState(getInitialIsDark)

    useEffect(() => {
        applyToDocument(isDark)
    }, [isDark])

    const toggleTheme = useCallback(() => {
        setIsDark((prev) => {
            const next = !prev
            localStorage.setItem(STORAGE_KEY, next ? "dark" : "light")
            return next
        })
    }, [])

    return { isDark, toggleTheme }
}
