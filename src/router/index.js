import { createRouter, createWebHistory } from 'vue-router'
import { userManagementRoutes } from '../user-management/presentation/user-management-routes'
import Login from "@/user-management/presentation/views/login.vue";

const routes = [
    { path: '/', redirect: '/login' },
    {
        path: '/login',
        component: Login,
        meta: { public: true }
    },
    ...userManagementRoutes
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})
