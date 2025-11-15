export class Alert {
    constructor({ id, title, description, status, createdAt }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.createdAt = createdAt;
    }
}