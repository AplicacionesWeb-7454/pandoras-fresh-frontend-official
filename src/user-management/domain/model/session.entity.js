export class Session {
    constructor({ token, expiresAt, remember }) {
        this.token = token
        this.expiresAt = expiresAt
        this.remember = remember || false
    }

    isExpired() {
        return new Date() > new Date(this.expiresAt)
    }
}
