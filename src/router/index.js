import { createRouter, createWebHistory } from 'vue-router'
import { userManagementRoutes } from '../user-management/presentation/user-management-routes'

const routes = [
    { path: '/', component: { template: '<div class="p-6">Home</div>' } },
    ...userManagementRoutes
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})
