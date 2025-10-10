// Lazy-loaded components
const productList = () => import('./views/product-list.vue');
const productForm = () => import('./views/product-form.vue');
const inventoryDashboard = () => import('./views/inventory-dashboard.vue');

const inventoryRoutes = [
    { path: 'products',           name: 'inventory-products',      component: productList, meta: { title: 'Products' }},
    { path: 'products/new',       name: 'inventory-product-new',   component: productForm, meta: { title: 'New Product' }},
    { path: 'products/:id/edit',  name: 'inventory-product-edit',  component: productForm, meta: { title: 'Edit Product' }},
    { path: 'dashboard',          name: 'inventory-dashboard',     component: inventoryDashboard, meta: { title: 'Inventory Dashboard' }},
    { path: '',                   redirect: '/inventory/dashboard' }
];

export default inventoryRoutes;