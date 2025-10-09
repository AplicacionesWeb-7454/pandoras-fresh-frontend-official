import api from './axios-client'

export const notificationApi = {
    async sendLoginNotification(userId) {
        const { data } = await api.post(`/users/${userId}/notify-login`)
        return data
    }
}
