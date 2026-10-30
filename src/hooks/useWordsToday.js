import { useState, useEffect, useCallback } from "react"
import { getWordsToday } from "../api/messageService"

// Fetches the community-wide words-shared-today count on mount and
// exposes refresh() to re-fetch after e.g. a successful POST /message.
export const useWordsToday = () => {
    const [wordsToday, setWordsToday] = useState(null)

    const refresh = useCallback(async () => {
        try {
            const data = await getWordsToday()
            setWordsToday(data.wordsSharedToday)
        } catch (err) {
            console.error(err)
        }
    }, [])

    useEffect(() => {
        refresh()
    }, [refresh])

    return { wordsToday, refresh }
}
