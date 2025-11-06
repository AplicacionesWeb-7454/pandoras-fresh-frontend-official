export class Box {
    constructor({
                    id = null,
                    inventoryId = null,
                    name = '',
                    capacity = 0,
                    location = '',
                    storageConditions = {}
                }) {
        this.id = id;
        this.inventoryId = inventoryId;
        this.name = name;
        this.capacity = capacity;
        this.location = location;
        this.storageConditions = storageConditions;
        this.currentOccupancy = 0;
        this.productInstances = [];
    }

    canAccommodate(quantity) {
        return this.currentOccupancy + quantity <= this.capacity;
    }

    addProductInstance(productInstance) {
        if (this.canAccommodate(productInstance.quantity)) {
            this.productInstances.push(productInstance);
            this.currentOccupancy += productInstance.quantity;
            return true;
        }
        return false;
    }

    get utilizationRate() {
        return this.capacity > 0 ? (this.currentOccupancy / this.capacity) * 100 : 0;
    }
}