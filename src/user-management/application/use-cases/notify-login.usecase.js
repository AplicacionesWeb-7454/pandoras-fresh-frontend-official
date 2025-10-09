import { notificationApi } from '../../infrastructure/api/notification-api'

export async function notifyLoginUseCase(userId) {
    return notificationApi.sendLoginNotification(userId)
}
