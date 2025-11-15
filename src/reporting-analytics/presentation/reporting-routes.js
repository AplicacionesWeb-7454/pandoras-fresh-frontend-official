const routes = [
    {
        path: '/reporting',
        name: 'reporting',
        redirect: '/reporting/dashboard',
        meta: {
            requiresAuth: true,
            title: 'Reporting & Analytics'
        },
        children: [
            {
                path: 'dashboard',
                name: 'analytics-dashboard',
                component: () => import('./views/analytics-dashboard.vue'),
                meta: {
                    title: 'Dashboard de Analytics'
                }
            },
            {
                path: 'reports',
                name: 'report-generator',
                component: () => import('./views/report-generator.vue'),
                meta: {
                    title: 'Generador de Reportes'
                }
            },
            {
                path: 'reports/waste',
                name: 'waste-report',
                component: () => import('./views/waste-report.vue'),
                meta: {
                    title: 'Reporte de Desperdicios'
                }
            },
            {
                path: 'exports',
                name: 'export-management',
                component: () => import('./views/export-management.vue'),
                meta: {
                    title: 'Gestión de Exportaciones'
                }
            }
        ]
    }
];

export default routes;