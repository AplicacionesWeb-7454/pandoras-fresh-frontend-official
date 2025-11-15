import { createRouter, createWebHistory } from 'vue-router'

// Rutas modulares
import {userManagementRoutes} from '../user-management/presentation/user-management-routes'
import inventoryRoutes from '../inventory/presentation/inventory-routes'
import AnalyticsDashboard from '../reporting-analytics/presentation/views/analytics-dashboard.vue'
import alertRoutes from '../alerts-notification/presentation/alert-routes.js'  // ← Agrega .js

// Debug
console.log('Alert routes imported:', alertRoutes)


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
    {
        path: '/analytics/dashboard',
        name: 'analytics-dashboard',
        component: AnalyticsDashboard,
        meta: { requiresAuth: true }
    },
    ...alertRoutes,
    ...userManagementRoutes,
    ...inventoryRoutes  // ← Así de simple, sin wrappers
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})