import { ref } from "vue"
import { Alert } from "../Domain/Model/alert.entity.js"
import { AlertAPI } from "@/alerts-notification/infraestructure/alert-api.js"

export const useAlertStore = () => {
    const alerts = ref([])
    const loading = ref(false)
    const error = ref(null)

    // Cargar alertas desde Firestore
    const fetchAlerts = async () => {
        loading.value = true
        error.value = null
        try {
            const data = await AlertAPI.fetchAlerts()
            // Convertir datos de Firestore a entidades Alert
            alerts.value = data.map(alertData => new Alert(alertData))
        } catch (err) {
            error.value = err.message
            console.error('Error fetching alerts:', err)
            alerts.value = []
        } finally {
            loading.value = false
        }
    }

    // Marcar como resuelta
    const markAsResolved = async (id) => {
        try {
            await AlertAPI.markAsResolved(id)
            const alert = alerts.value.find(a => a.id === id)
            if (alert) {
                alert.status = "resolved"
            }
        } catch (err) {
            error.value = err.message
            console.error('Error marking alert as resolved:', err)
        }
    }

    return {
        alerts,
        loading,
        error,
        fetchAlerts,
        markAsResolved
    }
}