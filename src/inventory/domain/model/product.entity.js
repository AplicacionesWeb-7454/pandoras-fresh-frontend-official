export class Product {
    constructor({
                    id = null,
                    name = '',
                    category = '',
                    quantity = 0,
                    expirationDate = null,
                    optimalTemperature = null,
                    optimalHumidity = null,
                    barcode = '',
                    categoryId = null
                }) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.quantity = quantity;
        this.expirationDate = expirationDate;
        this.optimalTemperature = optimalTemperature;
        this.optimalHumidity = optimalHumidity;
        this.barcode = barcode;
        this.categoryId = categoryId;
    }

    get daysUntilExpiration() {
        if (!this.expirationDate) return null;
        const today = new Date();
        const expDate = new Date(this.expirationDate);
        const diffTime = expDate - today;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    isExpiringSoon(daysThreshold = 3) {
        const daysLeft = this.daysUntilExpiration;
        return daysLeft !== null && daysLeft <= daysThreshold && daysLeft >= 0;
    }

    isExpired() {
        const daysLeft = this.daysUntilExpiration;
        return daysLeft !== null && daysLeft < 0;
    }
}