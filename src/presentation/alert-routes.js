import AlertManagement from './views/alert-management.vue';
import NotificationCenter from './views/notification-center.vue';
import AlertRules from './views/alert-rules.vue';
import NotificationSettings from './views/notification-settings.vue';

export default [
    {
        path: '/',
        name: 'AlertManagement',
        component: AlertManagement
    },
    {
        path: '/notifications',
        name: 'NotificationCenter',
        component: NotificationCenter
    },
    {
        path: '/rules',
        name: 'AlertRules',
        component: AlertRules
    },
    {
        path: '/settings',
        name: 'NotificationSettings',
        component: NotificationSettings
    }
];