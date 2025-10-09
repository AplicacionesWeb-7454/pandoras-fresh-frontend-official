import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        token: null,
        isAuthenticated: false,
        roles: []
    }),
    getters: {
        isAdmin: (s) => s.roles.includes('admin'),
        isEmployee: (s) => s.roles.includes('empleado')
    },
    actions: {
        setUser(user, token) {
            this.user = user
            this.token = token
            this.isAuthenticated = !!user && !!token
            this.roles = Array.isArray(user?.roles) ? user.roles : (user?.role ? [user.role] : [])
        },
        clearUser() {
            this.user = null
            this.token = null
            this.isAuthenticated = false
            this.roles = []
        }
    }
})
