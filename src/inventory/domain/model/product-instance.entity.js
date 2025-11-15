export class ProductInstance {
    constructor({
                    id = null,
                    productTypeId = null,
                    boxId = null,
                    quantity = 0,
                    entryDate = null,
                    expirationDate = null
                }) {
        this.id = id;
        this.productTypeId = productTypeId;
        this.boxId = boxId;
        this.quantity = quantity;
        this.entryDate = entryDate;
        this.expirationDate = expirationDate;
        this.status = 'active'; // active, expired, consumed
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
}