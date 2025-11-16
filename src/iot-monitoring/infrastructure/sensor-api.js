import {
    collection,
    getDocs,
    query,
    where,
    orderBy
} from 'firebase/firestore'
import { db } from '@/firebase/config'

export async function fetchSensors() {
    try {
        // Obtener sensores y readings en paralelo
        const [sensorsSnapshot, readingsSnapshot] = await Promise.all([
            getDocs(collection(db, 'sensors')),
            getDocs(collection(db, 'readings'))
        ])

        // Convertir a arrays
        const sensors = sensorsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))

        const readings = readingsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))

        // Combinar sensores con sus lecturas
        return sensors.map(sensor => {
            const reading = readings.find(r => r.sensorId === sensor.id)

            return {
                id: sensor.id,
                name: sensor.name,
                description: `Zone: ${sensor.zone}, ${sensor.location}`,
                zone: sensor.zone,
                location: sensor.location,
                status: sensor.status,
                lastReading: formatRelativeTime(sensor.lastReading),
                readings: reading
                    ? {
                        temperature: reading.temperature,
                        humidity: reading.humidity,
                        wind: reading.wind
                    }
                    : {
                        temperature: null,
                        humidity: null,
                        wind: null
                    }
            }
        })
    } catch (error) {
        console.error('❌ fetchSensors error:', error)
        return []
    }
}

function formatRelativeTime(timestamp) {
    const now = new Date()
    const time = new Date(timestamp)
    const minutes = Math.floor((now - time) / 60000)
    return `Hace ${minutes} minuto${minutes !== 1 ? 's' : ''}`
}