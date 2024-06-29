<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import orderIcon from '../../../assets/order_icon.png';
import usersIcon from '../../../assets/users.webp';
import productIcon from '../../../assets/product.webp';
import settingIcon from '../../../assets/settings.png';
import homeIcon from '../../../assets/home.png';

import UsersPage from './UsersPage.vue';
import MainPage from './MainPage.vue';
import OrdersPage from './OrdersPage.vue';
import ProductsPage from './ProductsPage.vue';
import SettingsPage from './SettingsPage.vue';

const router = useRouter();

const isClicked = ref('main');
const fullName = ref('');

const token = localStorage.getItem('token');
if (!token) {
    router.push('/error');
}

const username = localStorage.getItem('username');

onMounted(async () => {
  try {
    const response = await axios.get(`/api/employees/username/${username}`);
    fullName.value = response.data.fullName;
  } catch (error) {
    console.error('Error getting full name:', error);
  }
});

function ButtonClicked(button) {
  isClicked.value = button;
}
</script>

<template>
    <div class="container">
        <div class="top-bar">
            <div class="burger-menu">
                <div class="burger-line"></div>
                <div class="burger-line"></div>
                <div class="burger-line"></div>
            </div>
            <!-- Добавьте сюда любой другой контент, который вы хотите разместить в верхней панели -->
        </div>
        <div class="main-content">
            <div class="left-panel">
                <div class="avatar-container">
                    <img src="https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611768.jpg?w=740&t=st=1719660478~exp=1719661078~hmac=1f25deff644344a10def05d83e4c503dea3e53fe26151e7c4b525a14761aeaf3" class="avatar">
                </div>
                <div class="name">{{ fullName }}</div>
                <div class="buttons-container">
                    <button class="button" @click="ButtonClicked('main')">
                        <img :src="homeIcon" class="icon" />
                        Main
                    </button>
                    <button class="button" @click="ButtonClicked('orders')">
                        <img :src="orderIcon" class="icon" />
                        Orders
                    </button>
                   <button class="button" @click="ButtonClicked('users')">
                    <img :src="usersIcon" class="icon" />
                    Users
                    </button>
                    <button class="button" @click="ButtonClicked('products')">
                        <img :src="productIcon" class="icon" />
                        Products
                    </button>
                    <button class="button" @click="ButtonClicked('settings')">
                        <img :src="settingIcon" class="icon" />
                        Setting
                    </button>
                </div>
            </div>
            <div class="separator"></div>
            <div class="content">
            <UsersPage class="content-wrapper" v-if="isClicked === 'users'"></UsersPage>
            <MainPage class="content-wrapper" v-if="isClicked === 'main'"></MainPage>
            <OrdersPage class="content-wrapper" v-if="isClicked === 'orders'"></OrdersPage>
            <SettingsPage class="content-wrapper" v-if="isClicked === 'settings'"></SettingsPage>
            <ProductsPage class="content-wrapper" v-if="isClicked === 'products'"></ProductsPage>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .container {
        display: flex;
        height: 100vh;
        background-color: #f0f0f0;
        flex-direction: column;
    }

    .top-bar {
        background-color: #8b5fbd;
        color: white;
        padding: 0.5rem;
        display: flex;
        align-items: center;
    }

    .burger-menu {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin-right: 1rem;
    }

    .burger-line {
        width: 20px;
        height: 2px;
        background-color: white;
        margin: 3px 0;
    }

    .main-content {
        display: flex;
        flex-grow: 1;
    }

    .left-panel {
        background-color: #e0e0e0;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 250px;
    }

    .avatar-container {
        display: flex;
        justify-content: center;
        margin-top: -10rem;
    }

    .avatar {
        border-radius: 100px;
        height: 100px;
        aspect-ratio: 1/1;
    }

    .name {
        color: #3c3c6e;
        font-size: 1.2rem;
        font-weight: bold;
        text-align: center;
        margin-top: 1rem;
    }

    .buttons-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 2rem;
    }

    .button {
        background-color: #8b5fbd;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
        cursor: pointer;
        margin-bottom: 0.5rem;
        width: 190px;
        display: flex;
        align-items: center;
        text-decoration: none;
        transition: background-color 0.3s ease;
    }

    .button:hover {
        background-color: #a07bcd;
    }

    .button .icon {
        margin-right: 0.5rem;
        width: 16px;
        height: 16px;
    }

    .separator {
        border-left: 1px solid #ccc;
        height: 100%;
    }

    .content {
        flex-grow: 1;
        padding: 2rem;
        background-color: white;
    }
    .content-wrapper {
        flex-grow: 1;
        padding: 2rem;
        background-color: white;
      }
</style>