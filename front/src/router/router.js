import MainPage from '../components/pages/MainPage.vue'
import LoginPage from '../components/pages/auth/LoginPage.vue'
import RegisterPage from '../components/pages/auth/RegisterPage.vue'
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
        path: '/users',
        component: UsersPage
    },
    {
        path: '/form_test',
        component: EmployeeRegistrations
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(import.meta.env.BASE_URL)
})

export default router