import { createRouter, createWebHistory } from "vue-router";
import inventoryRoutes from "./inventory/presentation/inventory-routes.js";

// Lazy-loaded components for other routes
const home = () => import('./shared/presentation/views/home.vue');
const about = () => import('./shared/presentation/views/about.vue');
const pageNotFound = () => import('./shared/presentation/views/page-not-found.vue');

const routes = [
    { path: '/home', name: 'home', component: home, meta: { title: 'Home' } },
    { path: '/about', name: 'about', component: about, meta: { title: 'About' } },
    {
        path: '/inventory',
        name: 'inventory',
        children: inventoryRoutes,
        meta: { title: 'Inventory' }
    },
    { path: '/', redirect: '/inventory' },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: pageNotFound, meta: { title: 'Page not found' } }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes
});

router.beforeEach((to, from, next) => {
    let baseTitle = 'Pandora\'s Fresh';
    document.title = `${to.meta?.title || 'App'} | ${baseTitle}`;
    next();
});

export default router;