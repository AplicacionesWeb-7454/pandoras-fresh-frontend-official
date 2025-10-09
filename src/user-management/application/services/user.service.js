import { userApi } from '../../infrastructure/api/user-api'
import { useUserStore } from '../store/user-management.store'

export const userService = {
    async updateProfile(payload) {
        const store = useUserStore()
        const updated = await userApi.updateProfile(payload)
        store.setUser(updated, store.token)
        return updated
    },

    async deleteOwnAccount() {
        const store = useUserStore()
        await userApi.deleteAccount(store.user.id)
        store.clearUser()
    }
}
