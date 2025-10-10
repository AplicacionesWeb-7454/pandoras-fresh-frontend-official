export class Inventory {
    constructor({
                    id = null,
                    location = '',
                    capacity = 0,
                    currentStock = 0,
                    lastUpdated = new Date()
                }) {
        this.id = id;
        this.location = location;
        this.capacity = capacity;
        this.currentStock = currentStock;
        this.lastUpdated = lastUpdated;
    }

    get utilizationRate() {
        return this.capacity > 0 ? (this.currentStock / this.capacity) * 100 : 0;
    }

    hasSpaceFor(quantity) {
        return this.currentStock + quantity <= this.capacity;
    }
}