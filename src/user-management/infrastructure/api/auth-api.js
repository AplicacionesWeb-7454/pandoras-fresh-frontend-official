import {
    collection,
    getDocs,
    addDoc,
    query,
    where
} from 'firebase/firestore'
import { db } from '@/firebase/config'

export const authApi = {
    async login(email, password) {
        try {
            const q = query(
                collection(db, 'users'),
                where('email', '==', email)
            )

            const querySnapshot = await getDocs(q)

            if (querySnapshot.empty) {
                throw new Error('Credenciales inválidas')
            }

            const userDoc = querySnapshot.docs[0]
            const userData = userDoc.data()

            // Verificar password
            if (userData.password !== password) {
                throw new Error('Credenciales inválidas')
            }

            // Retornar usuario encontrado
            return {
                id: userDoc.id,
                email: userData.email,
                company: userData.company,
                ruc: userData.ruc
            }
        } catch (error) {
            console.error('Login error:', error)
            throw error
        }
    },

    async register(payload) {
        try {
            // Verificar si el email ya existe
            const q = query(
                collection(db, 'users'),
                where('email', '==', payload.email)
            )

            const querySnapshot = await getDocs(q)

            if (!querySnapshot.empty) {
                throw new Error('El email ya está registrado')
            }

            // Crear nuevo usuario
            const docRef = await addDoc(collection(db, 'users'), {
                email: payload.email,
                password: payload.password,
                company: payload.company || '',
                ruc: payload.ruc || '',
                createdAt: new Date().toISOString()
            })

            return {
                id: docRef.id,
                ...payload
            }
        } catch (error) {
            console.error('Register error:', error)
            throw error
        }
    },

    async resetPassword(email) {
        try {
            const q = query(
                collection(db, 'users'),
                where('email', '==', email)
            )

            const querySnapshot = await getDocs(q)

            if (querySnapshot.empty) {
                throw new Error('Usuario no encontrado')
            }

            // Simulación de reset (en producción usar Firebase Auth)
            return {
                message: 'Instrucciones de reseteo enviadas (simulado)'
            }
        } catch (error) {
            console.error('Reset password error:', error)
            throw error
        }
    }
}