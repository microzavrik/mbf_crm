import MainPage from '../components/pages/MainPage.vue'
import LoginPage from '../components/pages/auth/LoginPage.vue'
import RegisterPage from '../components/pages/auth/RegisterPage.vue'
import {createRouter, createWebHistory} from 'vue-router'

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
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(import.meta.env.BASE_URL)
})

export default router