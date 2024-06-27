<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="login-container">
    <div class="form-container">
      <h2>Welcome to MBF CRM</h2>
      <div class="content">
        <p>
            Our team leader Artem Usmanov created this for you. How Steve Jobs created the iPhone
        </p>
        <div class="buttons-container">
          <div class="buttons">
            <RouterLink to="/login" class="btn btn-primary">Login</RouterLink>
            <RouterLink to="/register" class="btn btn-secondary">Register</RouterLink>
          </div>
        </div>
      </div>
      <div class="footer">
        <p>&copy; 2024 MBF CORP. All rights reserved.</p>
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
  background-color: #1a1a2e;
  color: white;
  padding: 2rem;
}

.form-container {
  background-color: #2c2c54;
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

.content {
  text-align: center;
  margin-bottom: 2rem;
}

.buttons-container {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.buttons {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  text-decoration: none;
  font-weight: bold;
}

.btn-primary {
  background-color: #3a3aa4;
  color: white;
}

.btn-secondary {
  background-color: #7230b4;
  color: white;
}

.footer {
  font-size: 0.8rem;
}
</style>