<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { RouterLink, RouterView } from 'vue-router';

const username = ref('')
const password = ref('')

const handleLogin = (e) => {
  e.preventDefault();
  console.log("нажата кнопка login");
  const form = new FormData(e.target);
  const formProps = Object.fromEntries(form.entries());

  axios.post('/api/auth/login', formProps)
    .then(response => {
      const { user, token } = response.data;
      // Сохраняем пользователя и токен в localStorage
      localStorage.setItem('userid', user.id);
      localStorage.setItem('token', token);

      console.log( response.data);
    })
    .catch(error => {
      console.error('Error logging in:', error);
    });
};

</script>

<template>
  <div class="login-container">
    <div class="form-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="username" id="username" name="username" v-model="username" placeholder="Username" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" v-model="password" placeholder="Password" required>
        </div>
        <button type="submit" class="submit-btn">Login</button >
      </form>
      <div class="register-link">
        Don't have an account? <a href="/register">Register</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #9370db;
}

.form-container {
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 350px;
}

.form-container h2 {
  color: #9370db;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.8rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  font-weight: 500;
  color: #3c3c6e;
  margin-bottom: 0.2rem;
  font-size: 0.9rem;
}

.form-group input {
  width: 100%;
  padding: 0.5em 0.5em;
  border: 1px solid #4b4b7a;
  border-radius: 4px;
  background-color: #f0f0f0;
  color: #3c3c6e;
  font-size: 0.9rem;
}

.submit-btn {
  background-color: #9370db;
  color: #fff;
  border: none;
  padding: 0.8em 1.2em;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  margin-top: 1rem;
}

.submit-btn:hover {
  background-color: #c8a2c8;
}

.register-link {
  text-align: center;
  margin-top: 1rem;
  color: #3c3c6e;
  font-size: 0.9rem;
}

.register-link a {
  color: #9370db;
  text-decoration: none;
}

.register-link a:hover {
  color: #c8a2c8;
}
</style>