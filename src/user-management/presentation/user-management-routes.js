import Login from './views/login.vue'
import Register from './views/register.vue'
import ForgotPassword from './views/forgot-password.vue'
import ResetPassword from './views/reset-password.vue'
import UserList from './views/user-list.vue'
import UserForm from './views/user-form.vue'
import Profile from './views/profile.vue'
import DeleteAccount from './views/delete-account.vue'
import { requireAuth } from './guards/auth-guard'

export const userManagementRoutes = [
    { path: '/login', component: Login, meta: { public: true } },
    { path: '/register', component: Register, meta: { public: true } },
    { path: '/forgot-password', component: ForgotPassword, meta: { public: true } },
    { path: '/reset-password', component: ResetPassword, meta: { public: true } },
    { path: '/users', component: UserList, beforeEnter: requireAuth },
    { path: '/users/new', component: UserForm, beforeEnter: requireAuth },
    { path: '/profile', component: Profile, beforeEnter: requireAuth },
    { path: '/delete-account', component: DeleteAccount, beforeEnter: requireAuth }
]
