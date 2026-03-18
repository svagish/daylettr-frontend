import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080/api"
})

api.interceptors.request.use((config) => {
    const visitorId = localStorage.getItem("daylettr_visitor_id")
    if (visitorId) {
        config.headers['X-Visitor-Id'] = visitorId
    }
    return config
}, (error) => {
    return Promise.reject(error)
})