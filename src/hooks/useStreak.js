import { useState, useEffect, useCallback } from "react"
import { getStreak } from "../api/streakService"

// Fetches the visitor's streak on launch (gated on visitorId so the
// X-Visitor-Id interceptor is guaranteed) and exposes refresh() to
// re-fetch immediately after e.g. a successful POST /message.
export const useStreak = (visitorId) => {
    const [streak, setStreak] = useState(null)
    const [loading, setLoading] = useState(true)

    const refresh = useCallback(async () => {
        try {
            setStreak(await getStreak())
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (visitorId) refresh()
    }, [visitorId, refresh])

    return { streak, loading, refresh }
}
