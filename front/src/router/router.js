import MainPage from '../components/pages/MainPage.vue'
import LoginPage from '../components/pages/auth/LoginPage.vue'
import RegisterPage from '../components/pages/auth/RegisterPage.vue'
import PanelMainPage from '../components/pages/panel/PanelMainPage.vue'
import {createRouter, createWebHistory} from 'vue-router'
import UsersPage from '../components/pages/auth/UsersPage.vue'
import EmployeeRegistrations from '../components/pages/auth/EmployeeRegistration.vue'

const routes = [
    {
        path:'/',
        component: MainPage
    },
    {
        path: '/login',
        component: LoginPage
    },
    {
        path: '/register',
        component: RegisterPage
    },
    {
        path: '/employee_register',
        component: EmployeeRegistrations
    },
    {
        path: '/users',
        component: UsersPage
    },
    {
        path: '/panel',
        component: PanelMainPage
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(import.meta.env.BASE_URL)
})

export default router