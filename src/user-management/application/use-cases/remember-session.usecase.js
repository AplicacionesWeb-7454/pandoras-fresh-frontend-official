import { saveSession } from '../../shared/storage'

export function rememberSessionUseCase(token, expiresAt) {
    saveSession({ token, expiresAt })
}
