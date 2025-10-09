export async function fetchSensors() {
    return [
        {
            id: 1,
            name: 'Sensor 1-G',
            description: 'Zona: Clínica Plegaria 1, Oficina 1',
            status: 'Activo',
            lastReading: 'Hace 2 minutos',
            readings: { temperature: 24.9, humidity: 48.2, wind: 12 }
        },
        {
            id: 2,
            name: 'Sensor 1-G2',
            description: 'Zona: Clínica Plegaria 1, Oficina 2',
            status: 'Activo',
            lastReading: 'Hace 5 minutos',
            readings: { temperature: 25.3, humidity: 47.0, wind: 10 }
        },
        {
            id: 3,
            name: 'Sensor 1-G3',
            description: 'Zona: Clínica Plegaria 1, Oficina 3',
            status: 'Activo',
            lastReading: 'Hace 1 minuto',
            readings: { temperature: 26.1, humidity: 49.5, wind: 14 }
        },
        {
            id: 4,
            name: 'Sensor 2-A',
            description: 'Zona: Planta Frigorífica, Cámara 1',
            status: 'Activo',
            lastReading: 'Hace 3 minutos',
            readings: { temperature: 2.1, humidity: 85.0, wind: 0 }
        },
        {
            id: 5,
            name: 'Sensor 2-B',
            description: 'Zona: Planta Frigorífica, Cámara 2',
            status: 'Activo',
            lastReading: 'Hace 4 minutos',
            readings: { temperature: 1.8, humidity: 87.0, wind: 0 }
        }
    ]
}
