import { createRouter, createWebHistory } from 'vue-router'
import alertRoutes from './presentation/alert-routes.js'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...alertRoutes
    ]
})

export default router