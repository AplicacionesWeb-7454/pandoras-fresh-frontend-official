import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProductsStore = defineStore('products', () => {
    const products = ref([
        {
            id: 1,
            name: 'Tomásic Cherry',
            category: 'Frutas',
            quantity: 5,
            expiryDate: '2025-04-23',
            registeredDate: '2025-04-20',
            temperature: 4.5,
            humidity: 75
        },
        {
            id: 2,
            name: 'Leche Entera',
            category: 'Lácteos',
            quantity: 3,
            expiryDate: '2025-04-25',
            registeredDate: '2025-04-21',
            temperature: 3.8,
            humidity: 70
        },
        {
            id: 3,
            name: 'Yogurt Natural',
            category: 'Lácteos',
            quantity: 2,
            expiryDate: '2025-04-26',
            registeredDate: '2025-04-19',
            temperature: 5.2,
            humidity: 65
        },
        {
            id: 4,
            name: 'Queso Fresco',
            category: 'Lácteos',
            quantity: 4,
            expiryDate: '2025-04-22',
            registeredDate: '2025-04-18',
            temperature: 6.1,
            humidity: 80
        }
    ])

    // Computed properties - cálculos en tiempo real
    const totalProducts = computed(() => {
        return products.value.reduce((sum, product) => sum + product.quantity, 0)
    })

    const registeredThisWeek = computed(() => {
        const today = new Date('2025-04-21')
        const startOfWeek = new Date(today)
        startOfWeek.setDate(today.getDate() - 7)
        return products.value.filter(product =>
            new Date(product.registeredDate) >= startOfWeek
        ).length
    })

    const expiringSoon = computed(() => {
        const today = new Date('2025-04-21')
        const threeDaysFromNow = new Date(today)
        threeDaysFromNow.setDate(today.getDate() + 3)

        return products.value.filter(product => {
            const expiryDate = new Date(product.expiryDate)
            return expiryDate <= threeDaysFromNow && expiryDate >= today
        }).length
    })

    const expired = computed(() => {
        const today = new Date('2025-04-21')
        return products.value.filter(product =>
            new Date(product.expiryDate) < today
        ).length
    })

    const availableProducts = computed(() => {
        const today = new Date('2025-04-21')
        const threeDaysFromNow = new Date(today)
        threeDaysFromNow.setDate(today.getDate() + 3)

        return products.value.filter(product => {
            const expiryDate = new Date(product.expiryDate)
            return expiryDate > threeDaysFromNow
        }).reduce((sum, product) => sum + product.quantity, 0)
    })

    const inventoryStatus = computed(() => {
        const expiredCount = expired.value
        const totalCount = products.value.length

        if (expiredCount === 0) return 'A'
        if (expiredCount <= totalCount * 0.1) return 'B'
        if (expiredCount <= totalCount * 0.2) return 'C'
        return 'D'
    })

    const availablePercent = computed(() => {
        return Math.round((availableProducts.value / totalProducts.value) * 100)
    })

    const expiredPercent = computed(() => {
        const expiredCount = expired.value
        const totalCount = products.value.length
        return ((expiredCount / totalCount) * 100).toFixed(1)
    })

    const statusBreakdown = computed(() => {
        const today = new Date('2025-04-21')
        const threeDaysFromNow = new Date(today)
        threeDaysFromNow.setDate(today.getDate() + 3)

        let available = 0
        let expiring = 0
        let alert = 0

        products.value.forEach(product => {
            const expiryDate = new Date(product.expiryDate)

            if (expiryDate > threeDaysFromNow) {
                available++
            } else if (expiryDate >= today) {
                expiring++
            } else {
                alert++
            }
        })

        return { available, expiring, alert }
    })

    const qualityAlert = computed(() => {
        const today = new Date('2025-04-21')
        const expiringProduct = products.value.find(product => {
            const expiryDate = new Date(product.expiryDate)
            const daysLeft = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24))
            return daysLeft <= 2 && daysLeft >= 0
        })
        return expiringProduct
            ? `Los ${expiringProduct.name} están próximos a caducar.`
            : 'No hay alertas críticas de calidad.'
    })

    const expiringProductsList = computed(() => {
        const today = new Date('2025-04-21')
        const threeDaysFromNow = new Date(today)
        threeDaysFromNow.setDate(today.getDate() + 3)

        return products.value
            .filter(product => {
                const expiryDate = new Date(product.expiryDate)
                return expiryDate <= threeDaysFromNow && expiryDate >= today
            })
            .map(product => ({
                id: product.id,
                name: product.name,
                daysLeft: Math.ceil((new Date(product.expiryDate) - today) / (1000 * 60 * 60 * 24))
            }))
    })

    const alertConditionsList = computed(() => {
        return products.value
            .filter(product => product.temperature > 6 || product.humidity > 78)
            .map(product => ({
                id: product.id,
                product: product.name,
                type: product.temperature > 6 ? 'Temperatura alta' : 'Humedad alta'
            }))
    })

    // Actions
    const addProduct = (productData) => {
        const newProduct = {
            id: Date.now(),
            ...productData,
            registeredDate: '2025-04-21'
        }
        products.value.push(newProduct)
    }

    const deleteProduct = (productId) => {
        products.value = products.value.filter(product => product.id !== productId)
    }

    return {
        products,
        totalProducts,
        registeredThisWeek,
        expiringSoon,
        expired,
        availableProducts,
        inventoryStatus,
        availablePercent,
        expiredPercent,
        statusBreakdown,
        qualityAlert,
        expiringProductsList,
        alertConditionsList,
        addProduct,
        deleteProduct
    }
})