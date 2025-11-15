export class Notification {
    constructor({ id, message, type, read, createdAt }) {
        this.id = id;
        this.message = message;
        this.type = type;
        this.read = read;
        this.createdAt = createdAt;
    }
}