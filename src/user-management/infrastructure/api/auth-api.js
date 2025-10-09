import api from './axios-client'

export const authApi = {
    async login(email, password) {
        const { data } = await api.get(`/users`, {
            params: { email, password }
        })
        if (!data.length) throw new Error('Credenciales inválidas')
        return data[0] // devuelve el usuario encontrado
    },

    async register(payload) {
        const { data } = await api.post('/users', payload)
        return data
    },

    async resetPassword(email) {
        // Como json-server no tiene lógica de reset, lo simulamos
        const { data } = await api.get(`/users`, { params: { email } })
        if (!data.length) throw new Error('Usuario no encontrado')
        return { message: 'Instrucciones de reseteo enviadas (simulado)' }
    }
}
