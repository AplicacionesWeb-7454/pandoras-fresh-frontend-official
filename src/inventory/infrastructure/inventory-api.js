import {BaseApi} from "../../shared/infrastructure/base-api.js";
import {BaseEndpoint} from "../../shared/infrastructure/base-endpoint.js";

const productsEndpointPath = import.meta.env.VITE_PRODUCTS_ENDPOINT_PATH || '/api/v1/products';
const inventoryEndpointPath = import.meta.env.VITE_INVENTORY_ENDPOINT_PATH || '/api/v1/inventory';

export class InventoryApi extends BaseApi {
    #productsEndpoint;
    #inventoryEndpoint;

    constructor() {
        super();
        this.#productsEndpoint = new BaseEndpoint(this, productsEndpointPath);
        this.#inventoryEndpoint = new BaseEndpoint(this, inventoryEndpointPath);
    }

    // Products endpoints
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

    // Inventory endpoints
    getInventory() {
        return this.#inventoryEndpoint.getAll();
    }

    getInventoryById(id) {
        return this.#inventoryEndpoint.getById(id);
    }

    updateInventory(resource) {
        return this.#inventoryEndpoint.update(resource.id, resource);
    }

    // Specialized methods for inventory
    getExpiringProducts(days = 3) {
        return this.http.get(`${productsEndpointPath}?expiringIn=${days}`);
    }

    getLowStockProducts(threshold = 10) {
        return this.http.get(`${productsEndpointPath}?lowStock=${threshold}`);
    }

    // Product search and filtering
    searchProducts(query) {
        return this.http.get(`${productsEndpointPath}?search=${encodeURIComponent(query)}`);
    }

    getProductsByCategory(categoryId) {
        return this.http.get(`${productsEndpointPath}?categoryId=${categoryId}`);
    }
}