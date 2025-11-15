export class Sensor {
    constructor({ id, name, description, status, lastReading, readings }) {
        this.id = id
        this.name = name
        this.description = description
        this.status = status || 'Activo'
        this.lastReading = lastReading || 'Hace unos segundos'
        this.readings = readings || { temperature: 0, humidity: 0, wind: 0 }
    }

    isActive() {
        return this.status === 'Activo'
    }
}