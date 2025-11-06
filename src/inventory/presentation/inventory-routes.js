// Lazy-loaded components for simple inventory (existing)
const productList = () => import('./views/product-list.vue');
const productForm = () => import('./views/product-form.vue');
const inventoryDashboard = () => import('./views/inventory-dashboard.vue');

// Lazy-loaded components for advanced box-based inventory (new)
const inventoryList = () => import('./views/inventory-list.vue');
const inventoryDetail = () => import('./views/inventory-detail.vue');
const inventoryForm = () => import('./views/inventory-form.vue');
const boxDetail = () => import('./views/box-detail.vue');
const boxForm = () => import('./views/box-form.vue');
const productRegistration = () => import('./views/product-registration.vue');

const inventoryRoutes = [
    // Simple inventory routes (existing - maintain these)
    { path: 'products',           name: 'inventory-products',      component: productList, meta: { title: 'Products' }},
    { path: 'products/new',       name: 'inventory-product-new',   component: productForm, meta: { title: 'New Product' }},
    { path: 'products/:id/edit',  name: 'inventory-product-edit',  component: productForm, meta: { title: 'Edit Product' }},
    { path: 'dashboard',          name: 'inventory-dashboard',     component: inventoryDashboard, meta: { title: 'Inventory Dashboard' }},

    // Advanced box-based inventory routes (new)
    { path: 'management/inventories',         name: 'inventory-management-list',      component: inventoryList, meta: { title: 'Manage Inventories' }},
    { path: 'management/inventories/new',     name: 'inventory-management-new',       component: inventoryForm, meta: { title: 'Create Inventory' }},
    { path: 'management/inventories/:id',     name: 'inventory-management-detail',    component: inventoryDetail, meta: { title: 'Inventory Details' }},
    { path: 'management/inventories/:id/edit', name: 'inventory-management-edit',     component: inventoryForm, meta: { title: 'Edit Inventory' }},
    { path: 'management/boxes/:id',           name: 'box-detail',                     component: boxDetail, meta: { title: 'Box Details' }},
    { path: 'management/boxes/:id/edit',      name: 'box-edit',                       component: boxForm, meta: { title: 'Edit Box' }},
    { path: 'management/products/register',   name: 'product-registration',           component: productRegistration, meta: { title: 'Register Product' }},

    // Default redirect
    { path: '',                   redirect: '/inventory/dashboard' }
];

export default inventoryRoutes;