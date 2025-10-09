import { PublicClientApplication } from '@azure/msal-browser'

const msalConfig = {
    auth: {
        clientId: import.meta.env.VITE_MSAL_CLIENT_ID || '',
        authority: 'https://login.microsoftonline.com/common',
        redirectUri: import.meta.env.VITE_MSAL_REDIRECT_URI || window.location.origin
    }
}

const msalInstance = new PublicClientApplication(msalConfig)

export const microsoftOAuth = {
    async signIn() {
        // TODO: completar scopes y flujo
        const loginResp = await msalInstance.loginPopup({ scopes: ['User.Read'] })
        // Intercambiar loginResp.accessToken en tu backend por sesión app
        return { user: { id: loginResp.account.homeAccountId, email: loginResp.account.username, name: loginResp.account.name }, token: loginResp.accessToken, expiresAt: new Date(Date.now() + 3600_000).toISOString() }
    },
    logout() {
        return msalInstance.logoutPopup()
    }
}
