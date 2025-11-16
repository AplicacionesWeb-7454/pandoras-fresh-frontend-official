import { initializeApp } from 'firebase/app'
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore'
import { readFileSync } from 'fs'

// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD5NwRfexF9GkxvTiQuEK3QRAM_6wxZ9ss",
    authDomain: "pandora-fresh.firebaseapp.com",
    projectId: "pandora-fresh",
    storageBucket: "pandora-fresh.firebasestorage.app",
    messagingSenderId: "334780381698",
    appId: "1:334780381698:web:1a2a112e3542f511c5c61b"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Leer db.json
const data = JSON.parse(readFileSync('./db.json', 'utf8'))

async function migrate() {
    try {
        console.log('🚀 Iniciando migración...\n')

        // Migrar sensors
        if (data.sensors) {
            console.log('📡 Migrando sensors...')
            for (const item of data.sensors) {
                await setDoc(doc(db, 'sensors', item.id), item)
                console.log(`  ✅ Sensor ${item.id} migrado`)
            }
        }

        // Migrar readings
        if (data.readings) {
            console.log('\n📊 Migrando readings...')
            for (let i = 0; i < data.readings.length; i++) {
                const item = data.readings[i]
                await setDoc(doc(db, 'readings', `${item.sensorId}_${item.timestamp}`), item)
                console.log(`  ✅ Reading ${i + 1} migrado`)
            }
        }

        // Migrar zones
        if (data.zones) {
            console.log('\n🏢 Migrando zones...')
            for (const item of data.zones) {
                await setDoc(doc(db, 'zones', String(item.id)), item)
                console.log(`  ✅ Zone ${item.id} migrado`)
            }
        }

        // Migrar statuses
        if (data.statuses) {
            console.log('\n🔄 Migrando statuses...')
            for (const item of data.statuses) {
                await setDoc(doc(db, 'statuses', String(item.id)), item)
                console.log(`  ✅ Status ${item.id} migrado`)
            }
        }

        // Migrar links
        if (data.links) {
            console.log('\n🔗 Migrando links...')
            for (let i = 0; i < data.links.length; i++) {
                const item = data.links[i]
                await setDoc(doc(db, 'links', `link_${i + 1}`), item)
                console.log(`  ✅ Link ${i + 1} migrado`)
            }
        }

        // Migrar products
        if (data.products) {
            console.log('\n🛒 Migrando products...')
            for (const item of data.products) {
                await setDoc(doc(db, 'products', String(item.id)), item)
                console.log(`  ✅ Product ${item.id} migrado`)
            }
        }

        // Migrar inventory (simple)
        if (data.inventory) {
            console.log('\n📦 Migrando inventory...')
            for (const item of data.inventory) {
                await setDoc(doc(db, 'inventory', String(item.id)), item)
                console.log(`  ✅ Inventory ${item.id} migrado`)
            }
        }

        // Migrar inventories (advanced)
        if (data.inventories) {
            console.log('\n🏭 Migrando inventories...')
            for (const item of data.inventories) {
                await setDoc(doc(db, 'inventories', String(item.id)), item)
                console.log(`  ✅ Inventory ${item.id} migrado`)
            }
        }

        // Migrar boxes
        if (data.boxes) {
            console.log('\n📦 Migrando boxes...')
            for (const item of data.boxes) {
                await setDoc(doc(db, 'boxes', String(item.id)), item)
                console.log(`  ✅ Box ${item.id} migrado`)
            }
        }

        // Migrar productTypes
        if (data.productTypes) {
            console.log('\n🏷️ Migrando productTypes...')
            for (const item of data.productTypes) {
                await setDoc(doc(db, 'productTypes', String(item.id)), item)
                console.log(`  ✅ ProductType ${item.id} migrado`)
            }
        }

        // Migrar productInstances
        if (data.productInstances) {
            console.log('\n📋 Migrando productInstances...')
            for (const item of data.productInstances) {
                await setDoc(doc(db, 'productInstances', String(item.id)), item)
                console.log(`  ✅ ProductInstance ${item.id} migrado`)
            }
        }

        // Migrar users
        if (data.users) {
            console.log('\n👤 Migrando users...')
            for (const item of data.users) {
                await setDoc(doc(db, 'users', String(item.id)), item)
                console.log(`  ✅ User ${item.id} migrado`)
            }
        }

        console.log('\n✅ ¡Migración completada exitosamente!')
        console.log('\n📊 Resumen:')
        console.log(`   - Sensors: ${data.sensors?.length || 0}`)
        console.log(`   - Readings: ${data.readings?.length || 0}`)
        console.log(`   - Zones: ${data.zones?.length || 0}`)
        console.log(`   - Statuses: ${data.statuses?.length || 0}`)
        console.log(`   - Links: ${data.links?.length || 0}`)
        console.log(`   - Products: ${data.products?.length || 0}`)
        console.log(`   - Inventory (simple): ${data.inventory?.length || 0}`)
        console.log(`   - Inventories (advanced): ${data.inventories?.length || 0}`)
        console.log(`   - Boxes: ${data.boxes?.length || 0}`)
        console.log(`   - ProductTypes: ${data.productTypes?.length || 0}`)
        console.log(`   - ProductInstances: ${data.productInstances?.length || 0}`)
        console.log(`   - Users: ${data.users?.length || 0}`)

        process.exit(0)

    } catch (error) {
        console.error('❌ Error en la migración:', error)
        process.exit(1)
    }
}

migrate()