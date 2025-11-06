import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { InventoryService } from "./services/inventory.service.js";
import { BoxService } from "./services/box.service.js";

export const useBoxInventoryStore = defineStore('boxInventory', () => {
    const inventories = ref([]);
    const currentInventory = ref(null);
    const currentBox = ref(null);
    const boxes = ref([]);
    const productInstances = ref([]);
    const loading = ref(false);
    const errors = ref([]);

    const inventoryService = new InventoryService();
    const boxService = new BoxService();

    // Computed properties
    const inventoriesCount = computed(() => inventories.value.length);
    const boxesCount = computed(() => boxes.value.length);
    const totalCapacity = computed(() =>
        boxes.value.reduce((total, box) => total + box.capacity, 0)
    );
    const totalOccupancy = computed(() =>
        boxes.value.reduce((total, box) => total + box.currentOccupancy, 0)
    );
    const overallUtilization = computed(() =>
        totalCapacity.value > 0 ? (totalOccupancy.value / totalCapacity.value) * 100 : 0
    );

    // Inventory actions
    const fetchInventories = async () => {
        loading.value = true;
        try {
            inventories.value = await inventoryService.getAllInventories();
        } catch (error) {
            errors.value.push(error);
        } finally {
            loading.value = false;
        }
    };

    const fetchInventory = async (inventoryId) => {
        loading.value = true;
        try {
            currentInventory.value = await inventoryService.getInventoryWithBoxes(inventoryId);
            boxes.value = currentInventory.value.boxes || [];
        } catch (error) {
            errors.value.push(error);
        } finally {
            loading.value = false;
        }
    };

    const createInventory = async (inventoryData) => {
        loading.value = true;
        clearErrors();

        try {
            console.log('Creating inventory with data:', inventoryData); // Debug log

            // Ensure we have required fields
            if (!inventoryData.name || !inventoryData.location) {
                throw new Error('Name and location are required');
            }

            const newInventory = await inventoryService.createInventory({
                ...inventoryData,
                createdAt: new Date().toISOString()
            });

            console.log('Inventory created successfully:', newInventory); // Debug log
            inventories.value.push(newInventory);
            return newInventory;
        } catch (error) {
            console.error('Error creating inventory:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Failed to create inventory';
            errors.value.push({ message: errorMessage });
            throw error;
        } finally {
            loading.value = false;
        }
    };

    const updateInventory = async (inventoryId, updateData) => {
        try {
            const updatedInventory = await inventoryService.updateInventory(inventoryId, updateData);
            const index = inventories.value.findIndex(inv => inv.id === inventoryId);
            if (index !== -1) inventories.value[index] = updatedInventory;
            return updatedInventory;
        } catch (error) {
            errors.value.push(error);
            throw error;
        }
    };

    const deleteInventory = async (inventoryId) => {
        try {
            await inventoryService.deleteInventory(inventoryId);
            inventories.value = inventories.value.filter(inv => inv.id !== inventoryId);
        } catch (error) {
            errors.value.push(error);
            throw error;
        }
    };

    // Box actions
    const fetchBox = async (boxId) => {
        loading.value = true;
        try {
            currentBox.value = await boxService.getBoxWithProducts(boxId);
        } catch (error) {
            errors.value.push(error);
        } finally {
            loading.value = false;
        }
    };

    const createBox = async (boxData) => {
        try {
            const newBox = await boxService.createBox(boxData);
            boxes.value.push(newBox);
            return newBox;
        } catch (error) {
            errors.value.push(error);
            throw error;
        }
    };

    const updateBox = async (boxId, updateData) => {
        try {
            const updatedBox = await boxService.updateBox(boxId, updateData);
            const index = boxes.value.findIndex(box => box.id === boxId);
            if (index !== -1) boxes.value[index] = updatedBox;
            return updatedBox;
        } catch (error) {
            errors.value.push(error);
            throw error;
        }
    };

    const deleteBox = async (boxId) => {
        try {
            await boxService.deleteBox(boxId);
            boxes.value = boxes.value.filter(box => box.id !== boxId);
        } catch (error) {
            errors.value.push(error);
            throw error;
        }
    };

    // Product instance actions
    const addProductToBox = async (boxId, productData) => {
        try {
            const productInstance = await boxService.addProductInstance(boxId, productData);

            // Update current box if it's the one we're adding to
            if (currentBox.value && currentBox.value.id === boxId) {
                currentBox.value.productInstances.push(productInstance);
                currentBox.value.currentOccupancy += productInstance.quantity;
            }

            return productInstance;
        } catch (error) {
            errors.value.push(error);
            throw error;
        }
    };

    const clearErrors = () => {
        errors.value = [];
    };

    return {
        // State
        inventories,
        currentInventory,
        currentBox,
        boxes,
        productInstances,
        loading,
        errors,

        // Computed
        inventoriesCount,
        boxesCount,
        totalCapacity,
        totalOccupancy,
        overallUtilization,

        // Actions
        fetchInventories,
        fetchInventory,
        createInventory,
        updateInventory,
        deleteInventory,
        fetchBox,
        createBox,
        updateBox,
        deleteBox,
        addProductToBox,
        clearErrors
    };
});