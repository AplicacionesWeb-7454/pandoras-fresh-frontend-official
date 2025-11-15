import { createRouter, createWebHistory } from 'vue-router'

// Rutas modulares
import {userManagementRoutes} from '../user-management/presentation/user-management-routes'
import inventoryRoutes from '../inventory/presentation/inventory-routes'

// Vistas principales
import SensorDashboard from '../iot-monitoring/presentation/views/SensorDashboard.vue'
import Login from '../user-management/presentation/views/Login.vue'

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login,
        meta: { public: true }
    },
    {
        path: '/dashboard',
        component: SensorDashboard,
        meta: { requiresAuth: true }
    },
    ...userManagementRoutes,
    ...inventoryRoutes  // ← Así de simple, sin wrappers
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})