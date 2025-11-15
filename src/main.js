import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import { router } from './router'
import App from './App.vue'
import './index.css'

// PrimeVue 4
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'

// PrimeVue Services
import ConfirmationService from 'primevue/confirmationservice'
import DialogService from 'primevue/dialogservice'
import ToastService from 'primevue/toastservice'

// PrimeVue Components
import Badge from 'primevue/badge'
import Button from 'primevue/button'
import Card from 'primevue/card'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import ProgressBar from 'primevue/progressbar'
import Tooltip from 'primevue/tooltip'

// Configuración de i18n
const i18n = createI18n({
    legacy: false,
    locale: 'es',
    fallbackLocale: 'en',
    messages: {
        es: {
            inventory: {
                dashboard: 'Panel de Inventario',
                products: 'Productos',
            }
        },
        en: {
            inventory: {
                dashboard: 'Inventory Dashboard',
                products: 'Products',
            }
        }
    }
})

const app = createApp(App)

app.use(createPinia())
app.use(i18n)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    },
    ripple: true
})
app.use(ConfirmationService)
app.use(DialogService)
app.use(ToastService)
app.use(router)

// Registrar componentes
app.component('pv-badge', Badge)
app.component('pv-button', Button)
app.component('pv-card', Card)
app.component('pv-tab-view', TabView)
app.component('pv-tab-panel', TabPanel)
app.component('pv-progress-bar', ProgressBar)

// Registrar directiva
app.directive('tooltip', Tooltip)

app.mount('#app')