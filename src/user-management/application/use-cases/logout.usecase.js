import { useUserStore } from '../store/user-management.store'

export function logoutUseCase() {
    const store = useUserStore()
    store.clearUser()
}
