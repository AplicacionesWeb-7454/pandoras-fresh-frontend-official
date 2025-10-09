import { useUserStore } from '../../application/store/user-management.store'

export function requireAuth(to, from, next) {
    const store = useUserStore()
    if (!store.isAuthenticated) return next({ path: '/login', query: { redirect: to.fullPath } })
    next()
}
