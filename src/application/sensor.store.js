import { ref } from 'vue'
import { Sensor } from '../domain/model/sensor.entity.js'
import { fetchSensors } from '../infrastructure/sensor-api.js'

export const sensors = ref([])
export const selectedSensor = ref(null)
export const showModal = ref(false)

export async function loadSensors() {
    const rawData = await fetchSensors()
    sensors.value = rawData.map(data => new Sensor(data))
}

export function selectSensor(sensor) {
    selectedSensor.value = sensor
}
export function removeSensor(id) {
    sensors.value = sensors.value.filter(sensor => sensor.id !== id)
    selectedSensor.value = null
}


export function addSensor(sensorData) {
    const newSensor = new Sensor({
        id: Date.now(),
        name: sensorData.code,
        description: `Zona: ${sensorData.zone}, Edificio: ${sensorData.building}, Oficina: ${sensorData.office}`,
        zone: sensorData.zone,
        building: sensorData.building,
        office: sensorData.office,
        observations: sensorData.notes || '',
        status: 'Activo',
        lastReading: 'Hace unos segundos',
        readings: {
            temperature: parseFloat(sensorData.temperature) || 0,
            humidity: parseFloat(sensorData.humidity) || 0,
            wind: parseFloat(sensorData.wind) || 0
        }
    })

    sensors.value.push(newSensor)
    selectedSensor.value = newSensor
}
