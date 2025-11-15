export class ProductType {
    constructor({
                    id = null,
                    name = '',
                    category = '',
                    optimalTemperature = null,
                    optimalHumidity = null,
                    barcode = '',
                    categoryId = null
                }) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.optimalTemperature = optimalTemperature;
        this.optimalHumidity = optimalHumidity;
        this.barcode = barcode;
        this.categoryId = categoryId;
    }
}