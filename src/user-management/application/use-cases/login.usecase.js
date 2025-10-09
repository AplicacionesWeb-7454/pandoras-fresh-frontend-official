import { authApi } from '../../infrastructure/api/auth-api'
import { useUserStore } from '../store/user-management.store'

export async function loginUseCase(email, password) {
    const store = useUserStore()
    const { user, token } = await authApi.login(email, password)
    store.setUser(user, token)
}
