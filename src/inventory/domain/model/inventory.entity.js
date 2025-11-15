export class Inventory {
    constructor({
                    id = null,
                    name = '',
                    description = '',
                    location = '',
                    capacity = 0,
                    currentStock = 0,
                    lastUpdated = new Date(),
                    boxes = []
                }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.location = location;
        this.capacity = capacity;
        this.currentStock = currentStock;
        this.lastUpdated = lastUpdated;
        this.boxes = boxes;
    }

    get utilizationRate() {
        return this.capacity > 0 ? (this.currentStock / this.capacity) * 100 : 0;
    }

    hasSpaceFor(quantity) {
        return this.currentStock + quantity <= this.capacity;
    }

    addBox(box) {
        this.boxes.push(box);
    }

    getTotalCapacity() {
        return this.boxes.reduce((total, box) => total + box.capacity, 0);
    }

    getCurrentOccupancy() {
        return this.boxes.reduce((total, box) => total + box.currentOccupancy, 0);
    }
}