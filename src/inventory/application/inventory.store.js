import {InventoryApi} from "../infrastructure/inventory-api.js";
import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {ProductAssembler} from "../infrastructure/product.assembler.js";
import {Inventory} from "../domain/model/inventory.entity.js";

const inventoryApi = new InventoryApi();

const useInventoryStore = defineStore('inventory', () => {
    const products = ref([]);
    const inventory = ref([]);
    const errors = ref([]);
    const productsLoaded = ref(false);
    const inventoryLoaded = ref(false);

    // Computed properties
    const productsCount = computed(() => productsLoaded.value ? products.value.length : 0);
    const expiringProducts = computed(() =>
        products.value.filter(product => product.isExpiringSoon())
    );
    const expiredProducts = computed(() =>
        products.value.filter(product => product.isExpired())
    );
    const lowStockProducts = computed(() =>
        products.value.filter(product => product.quantity < 10)
    );
    const totalInventoryValue = computed(() =>
        products.value.reduce((total, product) => total + (product.quantity * (product.price || 0)), 0)
    );

    // Products actions
    function fetchProducts() {
        return inventoryApi.getProducts().then(response => {
            products.value = ProductAssembler.toEntitiesFromResponse(response);
            productsLoaded.value = true;
        }).catch(error => {
            errors.value.push(error);
        });
    }

    function getProductById(id) {
        let idNum = parseInt(id);
        return products.value.find(product => product.id === idNum);
    }

    function addProduct(product) {
        return inventoryApi.createProduct(product).then(response => {
            const resource = response.data;
            const newProduct = ProductAssembler.toEntityFromResource(resource);
            products.value.push(newProduct);
            return newProduct;
        }).catch(error => {
            errors.value.push(error);
            throw error;
        });
    }

    function updateProduct(product) {
        return inventoryApi.updateProduct(product).then(response => {
            const resource = response.data;
            const updatedProduct = ProductAssembler.toEntityFromResource(resource);
            const index = products.value.findIndex(prod => prod.id === updatedProduct.id);
            if (index !== -1) products.value[index] = updatedProduct;
            return updatedProduct;
        }).catch(error => {
            errors.value.push(error);
            throw error;
        });
    }

    function deleteProduct(id) {
        return inventoryApi.deleteProduct(id).then(() => {
            const index = products.value.findIndex(prod => prod.id === id);
            if (index !== -1) products.value.splice(index, 1);
        }).catch(error => {
            errors.value.push(error);
            throw error;
        });
    }

    // Inventory actions
    function fetchInventory() {
        return inventoryApi.getInventory().then(response => {
            if (response.status === 200) {
                const resources = response.data instanceof Array ? response.data : response.data['inventory'];
                inventory.value = resources.map(resource => new Inventory({...resource}));
                inventoryLoaded.value = true;
            }
        }).catch(error => {
            errors.value.push(error);
        });
    }

    // Search and filtering
    function searchProducts(query) {
        return inventoryApi.searchProducts(query).then(response => {
            return ProductAssembler.toEntitiesFromResponse(response);
        }).catch(error => {
            errors.value.push(error);
            return [];
        });
    }

    function getProductsByCategory(categoryId) {
        return inventoryApi.getProductsByCategory(categoryId).then(response => {
            return ProductAssembler.toEntitiesFromResponse(response);
        }).catch(error => {
            errors.value.push(error);
            return [];
        });
    }

    return {
        // State
        products,
        inventory,
        errors,
        productsLoaded,
        inventoryLoaded,

        // Computed
        productsCount,
        expiringProducts,
        expiredProducts,
        lowStockProducts,
        totalInventoryValue,

        // Actions
        fetchProducts,
        getProductById,
        addProduct,
        updateProduct,
        deleteProduct,
        fetchInventory,
        searchProducts,
        getProductsByCategory
    };
});

export default useInventoryStore;