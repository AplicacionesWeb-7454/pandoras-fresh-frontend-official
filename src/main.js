import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import i18n from "./i18n.js";
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import {
    Badge,
    Button,
    Calendar,
    Card,
    Column,
    ConfirmDialog,
    ConfirmationService,
    DataTable,
    Dialog,
    DialogService,
    IconField,
    InputIcon,
    InputNumber,
    InputText,
    Message,
    ProgressBar,
    Select,
    Skeleton,
    Tag,
    Textarea,
    Toast,
    ToastService,
    Tooltip
} from "primevue";
import router from "./router.js";
import pinia from "./pinia.js";

createApp(App)
    .use(i18n)
    .use(PrimeVue, {
        theme: {
            preset: Aura
        },
        ripple: true
    })
    .use(ConfirmationService)
    .use(DialogService)
    .use(ToastService)
    .component('pv-badge', Badge)
    .component('pv-button', Button)
    .component('pv-calendar', Calendar)
    .component('pv-card', Card)
    .component('pv-column', Column)
    .component('pv-confirm-dialog', ConfirmDialog)
    .component('pv-data-table', DataTable)
    .component('pv-dialog', Dialog)
    .component('pv-icon-field', IconField)
    .component('pv-input-icon', InputIcon)
    .component('pv-input-text', InputText)
    .component('pv-input-number', InputNumber)
    .component('pv-message', Message)
    .component('pv-progress-bar', ProgressBar)
    .component('pv-select', Select)
    .component('pv-skeleton', Skeleton)
    .component('pv-tag', Tag)
    .component('pv-textarea', Textarea)
    .component('pv-toast', Toast)
    .use(router)
    .use(pinia)
    .directive('tooltip', Tooltip)
    .mount('#app')