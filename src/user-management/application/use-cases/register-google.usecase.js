import { googleOAuth } from '../../infrastructure/oauth/google-oauth'
import { useUserStore } from '../store/user-management.store'

export async function registerWithGoogleUseCase() {
    const store = useUserStore()
    const { user, token } = await googleOAuth.signIn()
    store.setUser(user, token)
}
