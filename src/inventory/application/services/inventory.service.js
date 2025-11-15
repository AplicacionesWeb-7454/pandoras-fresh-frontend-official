import {InventoryApi} from "../../infrastructure/inventory-api.js";

const inventoryApi = new InventoryApi();

export class InventoryService {
    constructor() {
        this.inventories = [];
        this.currentInventory = null;
    }

    async createInventory(inventoryData) {
        try {
            console.log('Sending inventory data to API:', inventoryData);

            // Make sure the data structure matches what your API expects
            const payload = {
                name: inventoryData.name,
                description: inventoryData.description || '',
                location: inventoryData.location,
                createdAt: inventoryData.createdAt || new Date().toISOString(),
                boxes: [] // Initialize with empty boxes array
            };

            const response = await inventoryApi.createInventory(payload);
            console.log('API response:', response);

            if (response.data) {
                const inventory = new Inventory({...response.data});
                return inventory;
            } else {
                throw new Error('No data returned from API');
            }
        } catch (error) {
            console.error('InventoryService - Failed to create inventory:', error);
            throw error;
        }
    }

    async getInventoryWithBoxes(inventoryId) {
        try {
            const response = await inventoryApi.getInventoryById(inventoryId);
            const inventory = new Inventory({...response.data});
            // Load boxes for this inventory
            const boxesResponse = await inventoryApi.getBoxesByInventory(inventoryId);
            inventory.boxes = boxesResponse.data.map(boxData => new Box({...boxData}));
            return inventory;
        } catch (error) {
            console.error('Failed to fetch inventory with boxes:', error);
            throw error;
        }
    }

    async getAllInventories() {
        try {
            const response = await inventoryApi.getInventories();
            this.inventories = response.data.map(invData => new Inventory({...invData}));
            return this.inventories;
        } catch (error) {
            console.error('Failed to fetch inventories:', error);
            throw error;
        }
    }

    async updateInventory(inventoryId, updateData) {
        try {
            const response = await inventoryApi.updateInventory({id: inventoryId, ...updateData});
            const updatedInventory = new Inventory({...response.data});
            const index = this.inventories.findIndex(inv => inv.id === inventoryId);
            if (index !== -1) this.inventories[index] = updatedInventory;
            return updatedInventory;
        } catch (error) {
            console.error('Failed to update inventory:', error);
            throw error;
        }
    }

    async deleteInventory(inventoryId) {
        try {
            await inventoryApi.deleteInventory(inventoryId);
            this.inventories = this.inventories.filter(inv => inv.id !== inventoryId);
        } catch (error) {
            console.error('Failed to delete inventory:', error);
            throw error;
        }
    }

    generateId() {
        return 'inv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
}