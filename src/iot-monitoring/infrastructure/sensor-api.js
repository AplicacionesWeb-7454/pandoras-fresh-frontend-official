const BASE_URL = import.meta.env.VITE_MONITORING_API_URL;
const SENSORS_ENDPOINT = import.meta.env.VITE_SENSORS_ENDPOINT;
const READINGS_ENDPOINT = import.meta.env.VITE_READINGS_ENDPOINT;

export async function fetchSensors() {
    try {
        const [sensorsRes, readingsRes] = await Promise.all([
            fetch(`${BASE_URL}${SENSORS_ENDPOINT}`),
            fetch(`${BASE_URL}${READINGS_ENDPOINT}`)
        ]);

        if (!sensorsRes.ok || !readingsRes.ok) throw new Error('Error fetching data');

        const sensors = await sensorsRes.json();
        const readings = await readingsRes.json();

        return sensors.map(sensor => {
            const reading = readings.find(r => r.sensorId === sensor.id);

            return {
                id: sensor.id,
                name: sensor.name,
                description: `Zone: ${sensor.zone}, ${sensor.location}`,
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
            };
        });
    } catch (error) {
        console.error('❌ fetchSensors error:', error);
        return [];
    }
}

function formatRelativeTime(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
    const minutes = Math.floor((now - time) / 60000);
    return `Hace ${minutes} minuto${minutes !== 1 ? 's' : ''}`;
}
