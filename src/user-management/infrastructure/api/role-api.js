import api from './axios-client'

export const roleApi = {
    async assignRole(userId, role) {
        const { data } = await api.post(`/users/${userId}/role`, { role })
        return data
    }
}
