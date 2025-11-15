import AlertManagement from './views/alert-management.vue';
import NotificationCenter from './views/notification-center.vue';
import AlertRules from './views/alert-rules.vue';
import NotificationSettings from './views/notification-settings.vue';

export default [
    {
        path: '/alerts',  // ← Debe tener /alerts
        name: 'AlertManagement',
        component: AlertManagement
    },
    {
        path: '/alerts/notifications',
        name: 'NotificationCenter',
        component: NotificationCenter
    },
    {
        path: '/alerts/rules',
        name: 'AlertRules',
        component: AlertRules
    },
    {
        path: '/alerts/settings',
        name: 'NotificationSettings',
        component: NotificationSettings
    }
];