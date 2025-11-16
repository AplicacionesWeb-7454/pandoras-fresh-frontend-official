import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
    query,
    where
} from 'firebase/firestore'
import { db } from '@/firebase/config'

export class InventoryApi {
    // INVENTORIES
    async getInventories() {
        const querySnapshot = await getDocs(collection(db, 'inventories'))
        return {
            data: querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
        }
    }

    async getInventoryById(id) {
        const docRef = doc(db, 'inventories', String(id))
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            return {
                data: { id: docSnap.id, ...docSnap.data() }
            }
        } else {
            throw new Error('Inventory not found')
        }
    }

    async createInventory(resource) {
        const docRef = await addDoc(collection(db, 'inventories'), {
            ...resource,
            createdAt: new Date().toISOString()
        })
        return {
            data: { id: docRef.id, ...resource }
        }
    }

    async updateInventory(resource) {
        const docRef = doc(db, 'inventories', String(resource.id))
        await updateDoc(docRef, resource)
        return {
            data: resource
        }
    }

    async deleteInventory(id) {
        await deleteDoc(doc(db, 'inventories', String(id)))
        return {
            data: { id }
        }
    }

    // BOXES
    async getBoxesByInventory(inventoryId) {
        const q = query(
            collection(db, 'boxes'),
            where('inventoryId', '==', Number(inventoryId))
        )
        const querySnapshot = await getDocs(q)
        return {
            data: querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
        }
    }

    async getBoxById(id) {
        const docRef = doc(db, 'boxes', String(id))
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            return {
                data: { id: docSnap.id, ...docSnap.data() }
            }
        } else {
            throw new Error('Box not found')
        }
    }

    async createBox(resource) {
        const docRef = await addDoc(collection(db, 'boxes'), {
            ...resource,
            createdAt: new Date().toISOString()
        })
        return {
            data: { id: docRef.id, ...resource }
        }
    }

    async updateBox(resource) {
        const docRef = doc(db, 'boxes', String(resource.id))
        await updateDoc(docRef, resource)
        return {
            data: resource
        }
    }

    async deleteBox(id) {
        await deleteDoc(doc(db, 'boxes', String(id)))
        return {
            data: { id }
        }
    }

    // PRODUCTS
    async getProducts() {
        const querySnapshot = await getDocs(collection(db, 'products'))
        return {
            data: querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
        }
    }

    async getProductById(id) {
        const docRef = doc(db, 'products', String(id))
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            return {
                data: { id: docSnap.id, ...docSnap.data() }
            }
        } else {
            throw new Error('Product not found')
        }
    }

    async createProduct(resource) {
        const docRef = await addDoc(collection(db, 'products'), resource)
        return {
            data: { id: docRef.id, ...resource }
        }
    }

    async updateProduct(resource) {
        const docRef = doc(db, 'products', String(resource.id))
        await updateDoc(docRef, resource)
        return {
            data: resource
        }
    }

    async deleteProduct(id) {
        await deleteDoc(doc(db, 'products', String(id)))
        return {
            data: { id }
        }
    }

    // PRODUCT INSTANCES
    async getProductInstancesByBox(boxId) {
        const q = query(
            collection(db, 'productInstances'),
            where('boxId', '==', Number(boxId))
        )
        const querySnapshot = await getDocs(q)
        return {
            data: querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
        }
    }

    async createProductInstance(resource) {
        const docRef = await addDoc(collection(db, 'productInstances'), resource)
        return {
            data: { id: docRef.id, ...resource }
        }
    }

    async updateProductInstance(resource) {
        const docRef = doc(db, 'productInstances', String(resource.id))
        await updateDoc(docRef, resource)
        return {
            data: resource
        }
    }

    async deleteProductInstance(id) {
        await deleteDoc(doc(db, 'productInstances', String(id)))
        return {
            data: { id }
        }
    }

    // LEGACY METHOD (compatibilidad)
    getInventory() {
        return this.getInventories()
    }
}