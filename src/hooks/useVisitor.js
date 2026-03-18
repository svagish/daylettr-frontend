// returns visitorId of existing user or generates a new id for new user
import { useState, useEffect } from "react"

export const useVisitor = () => {
    const [visitorId, setVisitorId] = useState(null)

    useEffect(() => {
        let id = localStorage.getItem("daylettr_visitor_id")
        if (!id) {
            id = crypto.randomUUID()
            localStorage.setItem("daylettr_visitor_id", id)
        }
        setVisitorId(id)
    }, [])

    return visitorId
}
