import { authApi } from '../../infrastructure/api/auth-api'
import { useUserStore } from '../store/user-management.store'
import { saveSession, loadSession, clearSession } from '../../shared/storage'
import { decodeToken } from '../../shared/token'

export const authService = {
    async login(email, password, remember = false) {
        const { user, token, expiresAt } = await authApi.login(email, password)
        const store = useUserStore()
        store.setUser(user, token)
        if (remember) saveSession({ token, expiresAt })
        return { user, token }
    },

    async register(payload) {
        return authApi.register(payload)
    },

    logout() {
        const store = useUserStore()
        store.clearUser()
        clearSession()
    },

    restoreFromStorage() {
        const session = loadSession()
        if (!session?.token) return false
        const claims = decodeToken(session.token)
        const store = useUserStore()
        store.token = session.token
        store.isAuthenticated = true
        store.user = { id: claims?.sub, email: claims?.email, name: claims?.name }
        return true
    }
}
