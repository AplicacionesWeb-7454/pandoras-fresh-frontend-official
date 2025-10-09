import axios from 'axios'
import { useUserStore } from '../../application/store/user-management.store'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api'
})

api.interceptors.request.use((config) => {
    const store = useUserStore()
    if (store?.token) {
        config.headers.Authorization = `Bearer ${store.token}`
    }
    return config
})

export default api
