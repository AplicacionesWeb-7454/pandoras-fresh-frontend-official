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
                    categoryId = null,
                    // New fields for box-based inventory
                    boxId = null,
                    entryDate = null,
                    status = 'active'
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
        this.boxId = boxId;
        this.entryDate = entryDate;
        this.status = status;
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

    updateStatus() {
        if (this.isExpired()) {
            this.status = 'expired';
        } else if (this.isExpiringSoon()) {
            this.status = 'expiring_soon';
        } else {
            this.status = 'active';
        }
    }

    // Convert to ProductInstance for box-based inventory
    toProductInstance(boxId = null) {
        return new ProductInstance({
            productTypeId: this.id,
            boxId: boxId,
            quantity: this.quantity,
            entryDate: this.entryDate || new Date(),
            expirationDate: this.expirationDate
        });
    }
}