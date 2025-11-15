export class NotificationPreference {
    constructor({ id, userId, channel, enabled }) {
        this.id = id;
        this.userId = userId;
        this.channel = channel;
        this.enabled = enabled;
    }
}