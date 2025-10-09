import { authService } from '../services/auth.service'

export async function registerUseCase(payload) {
    return authService.register(payload)
}
