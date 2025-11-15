import {Product} from "../domain/model/product.entity.js";

export class ProductAssembler {
    static toEntityFromResource(resource) {
        return new Product({...resource});
    }

    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            console.error(`${response.status}: ${response.statusText}`);
            return [];
        }
        let resources = response.data instanceof Array ? response.data : response.data['products'];
        return resources.map(resource => this.toEntityFromResource(resource));
    }

    static toResourceFromEntity(entity) {
        return {
            id: entity.id,
            name: entity.name,
            category: entity.category,
            quantity: entity.quantity,
            expirationDate: entity.expirationDate,
            optimalTemperature: entity.optimalTemperature,
            optimalHumidity: entity.optimalHumidity,
            barcode: entity.barcode,
            categoryId: entity.categoryId
        };
    }
}