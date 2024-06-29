<script setup>
import { useRouter } from 'vue-router';
import orderIcon from '../../../assets/order_icon.png';
import usersIcon from '../../../assets/users.webp';
import productIcon from '../../../assets/product.webp';
import settingIcon from '../../../assets/settings.png';

const router = useRouter();

const token = localStorage.getItem('token');
if (!token) {
    router.push('/error');
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
                    <img src="../../../assets/video.gif" class="avatar">
                </div>
                <div class="name">Name Surname</div>
                <div class="buttons-container">
                    <a href="https://example.com/orders" class="button">
                        <img :src="orderIcon" class="icon" />
                        Orders
                    </a>
                    <a href="https://example.com/users" class="button">
                        <img :src="usersIcon" class="icon" />
                        Users
                    </a>
                    <a href="https://example.com/products" class="button">
                        <img :src="productIcon" class="icon" />
                        Products
                    </a>
                    <a href="https://example.com/settings" class="button">
                        <img :src="settingIcon" class="icon" />
                        Setting
                    </a>
                </div>
            </div>
            <div class="separator"></div>
            <div class="content">
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
        width: 150px;
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
</style>