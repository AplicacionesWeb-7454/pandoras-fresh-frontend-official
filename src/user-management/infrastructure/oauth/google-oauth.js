// Placeholder: integra @react-oauth/google en la UI, aquí solo representamos el adaptador
export const googleOAuth = {
    async signIn() {
        // TODO: implementar el flujo con el componente de Google y backend
        return { user: { id: 'google-1', name: 'Google User', email: 'user@gmail.com', roles: ['empleado'] }, token: 'google-token', expiresAt: new Date(Date.now() + 3600_000).toISOString() }
    },
    logout() {}
}
