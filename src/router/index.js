import { createRouter, createWebHistory } from 'vue-router'
import AnalyticsDashboard from '../reporting-analytics/presentation/views/analytics-dashboard.vue'

const routes = [
    {
        path: '/',
        redirect: '/reporting/dashboard'
    },
    {
        path: '/reporting/dashboard',
        name: 'analytics-dashboard',
        component: AnalyticsDashboard
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/reporting/dashboard'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router