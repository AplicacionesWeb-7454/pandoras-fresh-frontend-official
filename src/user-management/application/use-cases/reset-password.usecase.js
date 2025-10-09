import { authApi } from '../../infrastructure/api/auth-api'

export async function resetPasswordUseCase(email) {
    return authApi.resetPassword(email)
}
