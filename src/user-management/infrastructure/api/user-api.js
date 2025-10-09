import api from './axios-client'

export const userApi = {
    async updateProfile(payload) {
        const { data } = await api.put('/users/profile', payload)
        return data
    },
    async deleteAccount(userId) {
        const { data } = await api.delete(`/users/${userId}`)
        return data
    },
    async list(params = {}) {
        const { data } = await api.get('/users', { params })
        return data
    },
    async create(payload) {
        const { data } = await api.post('/users', payload)
        return data
    }
}
