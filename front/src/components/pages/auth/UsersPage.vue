<template>
    <div>
      <h2>Users</h2>
      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.username }}
        </li>
      </ul>
    </div>
  </template>
  
<script>
import axiosInstance from '../../../axios'

export default {
  name: 'UsersPage',
  data() {
    return {
      users: [],
      isRefreshing: false
    }
  },
  mounted() {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
  try {
    // Получаем JWT токен и объект пользователя из localStorage
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('userid');
    
    console.log("Token: ", token)
    console.log("User id: ", user);

    // Создаем конфигурацию запроса с заголовком Authorization и объектом пользователя
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: user
    };

    // Делаем запрос с конфигурацией
    const response = await axiosInstance.get('/api/auth/users', config);
    this.users = response.data;
  } catch (error) {
    if (error.response && error.response.status === 401 && !this.isRefreshing) {
      this.isRefreshing = true;
      try {
        // Запрашиваем обновление токена
        const refreshResponse = await axiosInstance.post('/api/security/refresh-token');
        const newToken = refreshResponse.data.token;
        localStorage.setItem('token', newToken);
        // Повторяем запрос с новым токеном
        const retryResponse = await axiosInstance.get('/api/auth/users', config);
        this.users = retryResponse.data;
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        // Перенаправляем пользователя на страницу входа
        this.$router.push('/login');
      } finally {
        this.isRefreshing = false;
      }
    } else {
      console.error('Error fetching users:', error);
    }
  }
    }
    }
}
  </script>