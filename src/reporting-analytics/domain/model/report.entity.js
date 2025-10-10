export class ReportEntity {
    constructor({
                    id = null,
                    name = '',
                    type = 'inventory',
                    filters = {},
                    metrics = [],
                    data = [],
                    generatedAt = new Date(),
                    status = 'active'
                } = {}) {
        this._id = id;
        this._name = name;
        this._type = type;
        this._filters = filters;
        this._metrics = metrics;
        this._data = data;
        this._generatedAt = generatedAt;
        this._status = status;
    }

    // Getters
    get id() { return this._id; }
    get name() { return this._name; }
    get type() { return this._type; }
    get filters() { return this._filters; }
    get metrics() { return this._metrics; }
    get data() { return this._data; }
    get generatedAt() { return this._generatedAt; }
    get status() { return this._status; }

    // Business methods
    calculateMetrics(products) {
        const totalProducts = products.reduce((sum, product) => sum + product.quantity, 0);
        const expired = products.filter(p => this._isExpired(p.expiryDate)).length;
        const expiringSoon = products.filter(p => this._isExpiringSoon(p.expiryDate)).length;
        const available = products.filter(p => this._isAvailable(p.expiryDate)).length;

        this._metrics = {
            totalProducts: totalProducts.toFixed(1),
            expired,
            expiringSoon,
            available,
            availablePercent: Math.round((available / products.length) * 100),
            expiredPercent: ((expired / products.length) * 100).toFixed(1)
        };

        this._data = products;
        this._generatedAt = new Date();
    }

    _isExpired(expiryDate) {
        return new Date(expiryDate) < new Date();
    }

    _isExpiringSoon(expiryDate) {
        const threeDaysFromNow = new Date();
        threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
        const expiry = new Date(expiryDate);
        return expiry <= threeDaysFromNow && expiry >= new Date();
    }

    _isAvailable(expiryDate) {
        const threeDaysFromNow = new Date();
        threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
        return new Date(expiryDate) > threeDaysFromNow;
    }

    toJSON() {
        return {
            id: this._id,
            name: this._name,
            type: this._type,
            filters: this._filters,
            metrics: this._metrics,
            data: this._data,
            generatedAt: this._generatedAt,
            status: this._status
        };
    }
}