import {BaseApi} from "../../shared/infrastructure/base-api.js";
import {BaseEndpoint} from "../../shared/infrastructure/base-endpoint.js";

const productsEndpointPath = import.meta.env.VITE_PRODUCTS_ENDPOINT_PATH || '/api/v1/products';
const inventoryEndpointPath = import.meta.env.VITE_INVENTORY_ENDPOINT_PATH || '/api/v1/inventory';
const boxesEndpointPath = import.meta.env.VITE_BOXES_ENDPOINT_PATH || '/api/v1/boxes';
const productInstancesEndpointPath = import.meta.env.VITE_PRODUCT_INSTANCES_ENDPOINT_PATH || '/api/v1/product-instances';

export class InventoryApi extends BaseApi {
    #productsEndpoint;
    #inventoryEndpoint;
    #boxesEndpoint;
    #productInstancesEndpoint;

    constructor() {
        super();
        this.#productsEndpoint = new BaseEndpoint(this, productsEndpointPath);
        this.#inventoryEndpoint = new BaseEndpoint(this, inventoryEndpointPath);
        this.#boxesEndpoint = new BaseEndpoint(this, boxesEndpointPath);
        this.#productInstancesEndpoint = new BaseEndpoint(this, productInstancesEndpointPath);
    }

    // Products endpoints (existing)
    getProducts() {
        return this.#productsEndpoint.getAll();
    }

    getProductById(id) {
        return this.#productsEndpoint.getById(id);
    }

    createProduct(resource) {
        return this.#productsEndpoint.create(resource);
    }

    updateProduct(resource) {
        return this.#productsEndpoint.update(resource.id, resource);
    }

    deleteProduct(id) {
        return this.#productsEndpoint.delete(id);
    }

    // Inventory endpoints (existing)
    getInventory() {
        return this.#inventoryEndpoint.getAll();
    }

    getInventoryById(id) {
        return this.#inventoryEndpoint.getById(id);
    }

    updateInventory(resource) {
        return this.#inventoryEndpoint.update(resource.id, resource);
    }

    // New inventory management endpoints
    getInventories() {
        return this.http.get(`${inventoryEndpointPath}/management`);
    }

    createInventory(resource) {
        return this.http.post(`${inventoryEndpointPath}/management`, resource);
    }

    deleteInventory(id) {
        return this.http.delete(`${inventoryEndpointPath}/management/${id}`);
    }

    // Boxes endpoints
    getBoxesByInventory(inventoryId) {
        return this.http.get(`${boxesEndpointPath}?inventoryId=${inventoryId}`);
    }

    getBoxById(id) {
        return this.http.get(`${boxesEndpointPath}/${id}`);
    }

    createBox(resource) {
        return this.http.post(boxesEndpointPath, resource);
    }

    updateBox(resource) {
        return this.http.put(`${boxesEndpointPath}/${resource.id}`, resource);
    }

    deleteBox(id) {
        return this.http.delete(`${boxesEndpointPath}/${id}`);
    }

    // Product instances endpoints
    getProductInstancesByBox(boxId) {
        return this.http.get(`${productInstancesEndpointPath}?boxId=${boxId}`);
    }

    getProductInstancesByInventory(inventoryId) {
        return this.http.get(`${productInstancesEndpointPath}?inventoryId=${inventoryId}`);
    }

    createProductInstance(resource) {
        return this.http.post(productInstancesEndpointPath, resource);
    }

    updateProductInstance(resource) {
        return this.http.put(`${productInstancesEndpointPath}/${resource.id}`, resource);
    }

    deleteProductInstance(id) {
        return this.http.delete(`${productInstancesEndpointPath}/${id}`);
    }

    // Specialized methods for inventory (existing)
    getExpiringProducts(days = 3) {
        return this.http.get(`${productsEndpointPath}?expiringIn=${days}`);
    }

    getLowStockProducts(threshold = 10) {
        return this.http.get(`${productsEndpointPath}?lowStock=${threshold}`);
    }

    // Product search and filtering (existing)
    searchProducts(query) {
        return this.http.get(`${productsEndpointPath}?search=${encodeURIComponent(query)}`);
    }

    getProductsByCategory(categoryId) {
        return this.http.get(`${productsEndpointPath}?categoryId=${categoryId}`);
    }
}