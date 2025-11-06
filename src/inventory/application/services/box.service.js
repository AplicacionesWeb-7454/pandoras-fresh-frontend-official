import {InventoryApi} from "../../infrastructure/inventory-api.js";

const inventoryApi = new InventoryApi();

export class BoxService {
    constructor() {
        this.boxes = [];
    }

    async createBox(boxData) {
        try {
            const response = await inventoryApi.createBox(boxData);
            const box = new Box({...response.data});
            this.boxes.push(box);
            return box;
        } catch (error) {
            console.error('Failed to create box:', error);
            throw error;
        }
    }

    async getBoxWithProducts(boxId) {
        try {
            const response = await inventoryApi.getBoxById(boxId);
            const box = new Box({...response.data});

            // Load product instances for this box
            const productsResponse = await inventoryApi.getProductInstancesByBox(boxId);
            box.productInstances = productsResponse.data.map(prodData => new ProductInstance({...prodData}));
            box.currentOccupancy = box.productInstances.reduce((total, prod) => total + prod.quantity, 0);

            return box;
        } catch (error) {
            console.error('Failed to fetch box with products:', error);
            throw error;
        }
    }

    async getBoxesByInventory(inventoryId) {
        try {
            const response = await inventoryApi.getBoxesByInventory(inventoryId);
            this.boxes = response.data.map(boxData => new Box({...boxData}));
            return this.boxes;
        } catch (error) {
            console.error('Failed to fetch boxes:', error);
            throw error;
        }
    }

    async updateBox(boxId, updateData) {
        try {
            const response = await inventoryApi.updateBox({id: boxId, ...updateData});
            const updatedBox = new Box({...response.data});
            const index = this.boxes.findIndex(box => box.id === boxId);
            if (index !== -1) this.boxes[index] = updatedBox;
            return updatedBox;
        } catch (error) {
            console.error('Failed to update box:', error);
            throw error;
        }
    }

    async deleteBox(boxId) {
        try {
            await inventoryApi.deleteBox(boxId);
            this.boxes = this.boxes.filter(box => box.id !== boxId);
        } catch (error) {
            console.error('Failed to delete box:', error);
            throw error;
        }
    }

    async addProductInstance(boxId, productData) {
        try {
            const productInstance = new ProductInstance({
                ...productData,
                boxId: boxId,
                entryDate: new Date()
            });

            const response = await inventoryApi.createProductInstance(productInstance);
            return new ProductInstance({...response.data});
        } catch (error) {
            console.error('Failed to add product to box:', error);
            throw error;
        }
    }
}