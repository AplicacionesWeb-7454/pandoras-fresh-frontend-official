import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    doc,
    updateDoc,
    deleteDoc
} from 'firebase/firestore'
import { db } from '@/firebase/config'

export const AlertAPI = {
    // Obtener todas las alertas
    async fetchAlerts() {
        try {
            const querySnapshot = await getDocs(collection(db, 'alerts'))
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
        } catch (error) {
            console.error('Error fetching alerts:', error)
            return []
        }
    },

    // Crear nueva alerta
    async createAlert(alertData) {
        try {
            const docRef = await addDoc(collection(db, 'alerts'), {
                ...alertData,
                createdAt: new Date().toISOString()
            })
            return { id: docRef.id, ...alertData }
        } catch (error) {
            console.error('Error creating alert:', error)
            throw error
        }
    },

    // Actualizar alerta
    async updateAlert(id, alertData) {
        try {
            const docRef = doc(db, 'alerts', id)
            await updateDoc(docRef, {
                ...alertData,
                updatedAt: new Date().toISOString()
            })
            return { id, ...alertData }
        } catch (error) {
            console.error('Error updating alert:', error)
            throw error
        }
    },

    // Eliminar alerta
    async deleteAlert(id) {
        try {
            await deleteDoc(doc(db, 'alerts', id))
            return { id }
        } catch (error) {
            console.error('Error deleting alert:', error)
            throw error
        }
    },

    // Marcar como resuelta
    async markAsResolved(id) {
        try {
            const docRef = doc(db, 'alerts', id)
            await updateDoc(docRef, {
                status: 'resolved',
                resolvedAt: new Date().toISOString()
            })
            return { id, status: 'resolved' }
        } catch (error) {
            console.error('Error marking alert as resolved:', error)
            throw error
        }
    }
}