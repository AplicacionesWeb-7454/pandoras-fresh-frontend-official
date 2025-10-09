export function userLoggedIn(user) {
    // Punto de extensión para publicar evento a un bus o telemetría
    // TODO: integrar con notificationApi si deseas disparar correo desde dominio
    return { type: 'UserLoggedIn', payload: { userId: user?.id, email: user?.email } }
}
