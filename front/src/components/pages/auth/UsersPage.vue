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
        users: []
      }
    },
    mounted() {
      this.fetchUsers()
    },
    methods: {
      async fetchUsers() {
        try {
          // Получаем JWT токен из localStorage
          const token = localStorage.getItem('token')
  
          // Создаем конфигурацию запроса с заголовком Authorization
          const config = {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
  
          // Делаем запрос с конфигурацией
          const response = await axiosInstance.get('/api/auth/users', config)
          this.users = response.data
        } catch (error) {
          console.error('Error fetching users:', error)
        }
      }
    }
  }
  </script>